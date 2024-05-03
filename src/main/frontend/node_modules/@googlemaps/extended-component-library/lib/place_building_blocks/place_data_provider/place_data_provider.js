/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var PlaceDataProvider_1;
import { __decorate, __metadata } from "tslib";
import { ContextProvider, provide } from '@lit/context';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { BaseComponent } from '../../base/base_component.js';
import { RequestErrorEvent } from '../../base/events.js';
import { SlotValidationController } from '../../base/slot_validation_controller.js';
import { STRING_ARRAY_ATTRIBUTE_CONVERTER } from '../../utils/attribute_converters.js';
import { isNotAvailableError, isPlaceResult, makePlaceFromPlaceResult } from '../../utils/place_utils.js';
import { PlaceAttribution } from '../place_attribution/place_attribution.js';
import { placeConsumerRegistrationContext, placeContext } from '../place_data_consumer.js';
import { CachedPlaceLookup } from './cached_place_lookup.js';
var LoadingState;
(function (LoadingState) {
    LoadingState["EMPTY"] = "EMPTY";
    LoadingState["LOADING"] = "LOADING";
    LoadingState["LOADED"] = "LOADED";
    LoadingState["ERROR"] = "ERROR";
})(LoadingState || (LoadingState = {}));
const CACHE_SIZE = 100;
/**
 * Provides place data to child components as context.
 *
 * This component can fetch place data from the Places API, or forward a Place
 * or PlaceResult object provided elsewhere in code. By default, this component
 * will only request fields from the Places API which are required to render
 * child components. The component will locally cache place data to avoid
 * redundant API requests.
 *
 * @slot - Elements to receive Places data.
 * @slot initial-loading - If specified, display this content when the component
 * is initially loading Places data. Content in this slot will receive Places
 * data, but some or all fields may be undefined.
 * @slot error - If specified, display this content when there was any error
 * loading data from the Places API.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 */
let PlaceDataProvider = PlaceDataProvider_1 = class PlaceDataProvider extends BaseComponent {
    constructor() {
        super(...arguments);
        /**
         * If `place` is provided with a `Place` or `PlaceResult` instance, but does
         * not contain fields required by child components, this element will make a
         * request to the Place API to retrieve the missing data. Set
         * `auto-fetch-disabled` to prevent the component from performing these
         * requests.
         */
        this.autoFetchDisabled = false;
        /**
         * @ignore
         * Place consumer registration functions, passed to child `PlaceDataConsumer`s
         * via context.
         */
        this.contextRegistration = {
            registerPlaceConsumer: (c) => void this.registerPlaceConsumer(c),
            unregisterPlaceConsumer: (c) => void this.unregisterPlaceConsumer(c),
        };
        this.loadingState = LoadingState.EMPTY;
        this.slotValidator = new SlotValidationController(this, this.logger, ['', 'initial-loading', 'error']);
        this.placeConsumers = new Set();
        this.placeAttributions = new Set();
        this.placeContextProvider = new ContextProvider(this, { context: placeContext });
    }
    /**
     * Place data passed to child `PlaceDataConsumer`s via context.
     */
    get contextPlace() {
        return this.placeContextProvider.value;
    }
    set contextPlace(place) {
        // Force an update to the consumer even if the place is the same object.
        // This allows developers to refresh the consumers by setting
        // provider.place = provider.place, for example if they added/fetched new
        // fields to the place object themselves.
        this.placeContextProvider.setValue(place, /* force= */ true);
    }
    render() {
        return choose(this.loadingState, [
            [LoadingState.EMPTY, () => html ``],
            [LoadingState.LOADING, () => html `<slot name="initial-loading"></slot>`],
            [LoadingState.LOADED, () => html `<slot></slot>`],
            [LoadingState.ERROR, () => html `<slot name="error"></slot>`]
        ]);
    }
    async updated(changedProperties) {
        if (changedProperties.has('place')) {
            try {
                await this.updatePlace();
            }
            catch (error) {
                this.handleError(error);
            }
        }
    }
    async updatePlace() {
        this.loadingState = LoadingState.LOADING;
        // Set this.contextPlace to an appropriate Place v2, according to the
        // type of this.place
        if (!this.place) { // undefined or empty string
            this.contextPlace = undefined;
            this.loadingState = LoadingState.EMPTY;
            return;
        }
        else if (typeof this.place === 'string') {
            this.contextPlace =
                await PlaceDataProvider_1.placeLookup.getPlace(this.place);
        }
        else if (isPlaceResult(this.place)) {
            this.contextPlace = await makePlaceFromPlaceResult(this.place, this);
            PlaceDataProvider_1.placeLookup.updatePlace(this.contextPlace);
        }
        else { // this.place is a Place
            this.contextPlace = this.place;
            PlaceDataProvider_1.placeLookup.updatePlace(this.contextPlace);
        }
        // Fetch place data (a) if this.place is a Place ID, or (b) if this.place
        // is an object and auto-fetch is enabled
        if ((typeof this.place === 'string') || !this.autoFetchDisabled) {
            let fields;
            if (this.fields?.length) {
                fields = this.fields;
            }
            else {
                // Defer execution to ensure that place consumers finish registration
                await 0;
                fields = this.getConsumerFields();
            }
            try {
                await this.contextPlace.fetchFields({ fields });
            }
            catch (error) {
                if (isNotAvailableError(error, 'fetchFields()')) {
                    // If the SDK doesn't support fetchFields(), replace the Place with a
                    // shimmed version, taking advantage of the fallback capabilities of
                    // `makePlaceFromPlaceResult()`.
                    this.contextPlace =
                        await makePlaceFromPlaceResult({ place_id: this.contextPlace.id });
                    PlaceDataProvider_1.placeLookup.updatePlace(this.contextPlace);
                    await this.contextPlace.fetchFields({ fields });
                }
                else {
                    throw error;
                }
            }
            // Manually update consumers of the context Place, since the object has
            // been mutated
            for (const consumer of this.placeConsumers) {
                consumer.requestUpdate('contextPlace', consumer.contextPlace, { hasChanged: () => true });
            }
        }
        this.appendAttributionIfAbsent();
        this.loadingState = LoadingState.LOADED;
    }
    registerPlaceConsumer(consumer) {
        this.placeConsumers.add(consumer);
        if (consumer instanceof PlaceAttribution) {
            this.placeAttributions.add(consumer);
        }
    }
    unregisterPlaceConsumer(consumer) {
        this.placeConsumers.delete(consumer);
        if (consumer instanceof PlaceAttribution) {
            this.placeAttributions.delete(consumer);
        }
    }
    getConsumerFields() {
        const fieldSet = new Set();
        for (const consumer of this.placeConsumers) {
            for (const field of consumer.getRequiredFields()) {
                fieldSet.add(field);
            }
        }
        return Array.from(fieldSet.values());
    }
    /**
     * Appends a Place Attribution component as child if none exists in order to
     * comply with the Google Maps Platform Terms of Service.
     */
    appendAttributionIfAbsent() {
        if (this.placeAttributions.size === 0) {
            this.appendChild(new PlaceAttribution());
        }
    }
    handleError(error) {
        this.loadingState = LoadingState.ERROR;
        const requestErrorEvent = new RequestErrorEvent(error);
        this.dispatchEvent(requestErrorEvent);
    }
};
PlaceDataProvider.placeLookup = new CachedPlaceLookup(CACHE_SIZE);
__decorate([
    property({ type: Boolean, attribute: 'auto-fetch-disabled', reflect: true }),
    __metadata("design:type", Object)
], PlaceDataProvider.prototype, "autoFetchDisabled", void 0);
__decorate([
    property({ converter: STRING_ARRAY_ATTRIBUTE_CONVERTER, reflect: true }),
    __metadata("design:type", Array)
], PlaceDataProvider.prototype, "fields", void 0);
__decorate([
    property({ type: String, hasChanged: () => true }),
    __metadata("design:type", Object)
], PlaceDataProvider.prototype, "place", void 0);
__decorate([
    provide({ context: placeConsumerRegistrationContext }),
    property({ attribute: false }),
    __metadata("design:type", Object)
], PlaceDataProvider.prototype, "contextRegistration", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], PlaceDataProvider.prototype, "loadingState", void 0);
PlaceDataProvider = PlaceDataProvider_1 = __decorate([
    customElement('gmpx-place-data-provider')
], PlaceDataProvider);
export { PlaceDataProvider };
//# sourceMappingURL=place_data_provider.js.map