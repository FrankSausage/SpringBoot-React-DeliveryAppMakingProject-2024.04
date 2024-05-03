/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { consume, createContext } from '@lit/context';
import { property, state } from 'lit/decorators.js';
import { BaseComponent } from '../base/base_component.js';
import { attachContextRoot } from '../utils/context_utils.js';
import { isPlaceResult, makePlaceFromPlaceResult } from '../utils/place_utils.js';
// If this module is loaded before the definitions of other elements
// (specifically, Place data providers), adding a context root ensures
// registration of data consumers by late-upgraded data providers.
attachContextRoot();
export const placeContext = createContext(Symbol('place'));
export const placeConsumerRegistrationContext = createContext(Symbol('place-consumer-registration'));
/**
 * Base class for components which render Place data provided elsewhere; i.e.
 * Place Representation Building Blocks.
 *
 * This class implements functionality to retrieve a `Place` or `PlaceResult`
 * via context from a parent `<gmpx-place-data-provider>` component.
 */
export class PlaceDataConsumer extends BaseComponent {
    constructor() {
        super(...arguments);
        /**
         * This read-only property and attribute indicate whether the component
         * has the required Place data to display itself.
         *
         * Use the attribute to target CSS rules if you wish to hide this component,
         * or display alternate content, when there's no valid data.
         */
        this.noData = true;
    }
    /**
     * Place data to render, overriding anything provided by context.
     */
    get place() {
        return this.placeInternal;
    }
    set place(value) {
        this.placeInternal = value;
        this.updatePlaceV2(value);
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('contextPlace') && !this.placeV2) {
            // Trigger callback if Place from context changes and is not overridden.
            this.placeChangedCallback(this.contextPlace, changedProperties.get('contextPlace'));
        }
        // Always refresh the value of `noData` on update; this also reverts any
        // change to the property from outside the component since it's read-only.
        const place = this.getPlace();
        this.noData = !(place && this.placeHasData(place));
        if (changedProperties.has('contextRegistration')) {
            this.contextRegistration?.registerPlaceConsumer(this);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.contextRegistration?.unregisterPlaceConsumer(this);
    }
    /**
     * Callback to be invoked when the object returned by calling `getPlace()`
     * changes, including when fields in the object are newly populated.
     *
     * @param value New value of the object returned by `getPlace()`.
     * @param oldValue Old value of the object returned by `getPlace()`.
     */
    placeChangedCallback(value, oldValue) { }
    /**
     * @ignore
     * Components should override this method if they wish to show a `no-data`
     * attribute for use with CSS styling.
     */
    placeHasData(place) {
        return true;
    }
    /**
     * Returns the Place data object to be used when rendering.
     *
     * If a `Place` or `PlaceResult` object is specified directly on the component
     * as a property, it will take priority. Otherwise, this method attempts to
     * return one provided by a parent `<gmpx-place-data-provider>` element.
     *
     * The convention for data providers is to use `undefined` to indicate Place
     * data has not been requested, or is in the process of being requested. The
     * value `null` indicates that Place data could not be found.
     */
    getPlace() {
        return this.placeV2 ?? this.contextPlace;
    }
    async updatePlaceV2(value) {
        const oldPlace = this.getPlace();
        if (!value || !isPlaceResult(value)) {
            this.placeV2 = value;
        }
        else {
            this.placeV2 = await makePlaceFromPlaceResult(value, this);
        }
        this.placeChangedCallback(this.placeV2, oldPlace);
    }
}
__decorate([
    consume({ context: placeConsumerRegistrationContext, subscribe: true }),
    property({ attribute: false }),
    __metadata("design:type", Object)
], PlaceDataConsumer.prototype, "contextRegistration", void 0);
__decorate([
    consume({ context: placeContext, subscribe: true }),
    property({ attribute: false }),
    __metadata("design:type", Object)
], PlaceDataConsumer.prototype, "contextPlace", void 0);
__decorate([
    property({ type: Boolean, attribute: 'no-data', reflect: true }),
    __metadata("design:type", Object)
], PlaceDataConsumer.prototype, "noData", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], PlaceDataConsumer.prototype, "placeV2", void 0);
//# sourceMappingURL=place_data_consumer.js.map