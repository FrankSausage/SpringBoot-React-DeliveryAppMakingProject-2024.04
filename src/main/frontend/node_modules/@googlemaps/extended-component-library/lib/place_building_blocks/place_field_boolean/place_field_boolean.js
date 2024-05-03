/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Deferred } from '../../utils/deferred.js';
import { hasDataForOpeningCalculations } from '../../utils/place_utils.js';
import { Poll } from '../../utils/poll.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
const PLACE_BOOLEAN_FIELDS_SYNC_ACCESS = [
    'hasCurbsidePickup',
    'hasDelivery',
    'hasDineIn',
    'hasTakeout',
    'hasWheelchairAccessibleEntrance',
    'isReservable',
    'servesBeer',
    'servesBreakfast',
    'servesBrunch',
    'servesDinner',
    'servesLunch',
    'servesVegetarianFood',
    'servesWine',
];
const PLACE_BOOLEAN_FIELDS_ASYNC_ACCESS = [
    'isOpen()',
];
/**
 * Supported field names for `PlaceFieldBoolean`, formatted as `Place` fields.
 */
export const PLACE_BOOLEAN_FIELDS = [
    ...PLACE_BOOLEAN_FIELDS_SYNC_ACCESS,
    ...PLACE_BOOLEAN_FIELDS_ASYNC_ACCESS,
];
/**
 * Supported field names for `PlaceFieldBoolean`, formatted as `PlaceResult`
 * fields.
 */
export const PLACE_RESULT_BOOLEAN_FIELDS = [
    'opening_hours.isOpen()',
];
// Fields representing methods can request polled updates.
const FIELD_TO_POLLING_INTERVAL_MS = {
    'isOpen()': 60 * 1000
};
function toPlaceBooleanField(field) {
    return (field === 'opening_hours.isOpen()') ? 'isOpen()' : field;
}
async function isOpenWithoutFetching(place) {
    // On a `Place`, `isOpen()` will asynchronously fetch these three fields. If
    // we don't have all three already, then we treat `isOpen` is missing data
    // instead of making an unintended API call.
    //
    // When using the Place Data Provider component, these fields will be
    // automatically fetched in advance.
    if (place && hasDataForOpeningCalculations(place)) {
        return await place.isOpen();
    }
    else {
        return undefined;
    }
}
/**
 * This function retrieves a static value from a `Place` by its string name.
 * Note that it does not evaluate Place methods such as `isOpen()`.
 */
function getFieldValue(place, field) {
    switch (field) {
        case 'hasCurbsidePickup':
            return place.hasCurbsidePickup;
        case 'hasDelivery':
            return place.hasDelivery;
        case 'hasDineIn':
            return place.hasDineIn;
        case 'hasTakeout':
            return place.hasTakeout;
        case 'hasWheelchairAccessibleEntrance':
            return place.accessibilityOptions?.hasWheelchairAccessibleEntrance;
        case 'isReservable':
            return place.isReservable;
        case 'servesBeer':
            return place.servesBeer;
        case 'servesBreakfast':
            return place.servesBreakfast;
        case 'servesBrunch':
            return place.servesBrunch;
        case 'servesDinner':
            return place.servesDinner;
        case 'servesLunch':
            return place.servesLunch;
        case 'servesVegetarianFood':
            return place.servesVegetarianFood;
        case 'servesWine':
            return place.servesWine;
        default:
            return undefined;
    }
}
function isAsyncBooleanField(field) {
    return field === 'isOpen()';
}
async function getBooleanAsync(place, field) {
    if (field === 'isOpen()') {
        return isOpenWithoutFetching(place);
    }
    return null;
}
function getBooleanSync(place, field) {
    return getFieldValue(place, field) ?? null;
}
/**
 * Component that conditionally renders content depending on the value of a
 * boolean field, or the `isOpen()` method which returns a boolean.
 *
 * Include a child element with `slot="true"` to display content when the
 * boolean value is true. Likewise, a child element with `slot="false"` will be
 * displayed when the boolean value is false.
 *
 * @slot true - Content to be displayed when the boolean value is true.
 * @slot false - Content to be displayed when the boolean value is false.
 */
let PlaceFieldBoolean = class PlaceFieldBoolean extends PlaceDataConsumer {
    constructor() {
        super(...arguments);
        this.poll = new Poll();
    }
    render() {
        return html `${choose(this.valueToRender, [
            [true, () => html `<slot name="true"></slot>`],
            [false, () => html `<slot name="false"></slot>`],
        ], () => html ``)}`;
    }
    /** @ignore */
    getRequiredFields() {
        if (!this.field)
            return [];
        const placeField = toPlaceBooleanField(this.field);
        switch (placeField) {
            case 'isOpen()':
                return [
                    'businessStatus',
                    'regularOpeningHours',
                    'utcOffsetMinutes',
                ];
            case 'hasWheelchairAccessibleEntrance':
                return ['accessibilityOptions'];
            default:
                return [placeField];
        }
    }
    placeHasData(place) {
        if (!this.field)
            return false;
        const placeField = toPlaceBooleanField(this.field);
        if (placeField === 'isOpen()') {
            return hasDataForOpeningCalculations(place);
        }
        return getFieldValue(place, placeField) != null;
    }
    /** @ignore */
    async getUpdateComplete() {
        const result = await super.getUpdateComplete();
        // Modify the updateComplete promise to also await an async internal
        // state update + render.
        if (this.asyncRenderComplete) {
            await this.asyncRenderComplete.promise;
        }
        return result;
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        this.updateValueToRender();
        // Set up polled updates for certain fields.
        if (changedProperties.has('field')) {
            this.poll.stop();
            if (this.field) {
                const pollingInterval = FIELD_TO_POLLING_INTERVAL_MS[toPlaceBooleanField(this.field)];
                if (pollingInterval) {
                    this.poll.start(() => void this.requestUpdate(), pollingInterval);
                }
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.poll.stop();
        this.resetAsyncRenderPromise();
    }
    /**
     * Updates the internal state value used for rendering HTML. Depending on
     * the Place field chosen, this method may make a synchronous update, or may
     * trigger a task to update the value later [e.g. with isOpen()].
     */
    updateValueToRender() {
        const place = this.getPlace();
        this.resetAsyncRenderPromise();
        if (!place || !this.field) {
            // No Place or field to render? Do a synchronous update.
            this.valueToRender = undefined;
            return;
        }
        const placeField = toPlaceBooleanField(this.field);
        if (isAsyncBooleanField(placeField)) {
            // Getting the value of this field is an async operation. Kick off a task
            // to fetch it.
            this.asyncRenderComplete = new Deferred();
            getBooleanAsync(place, placeField).then(val => {
                this.valueToRender = val;
                this.asyncRenderComplete?.resolve();
            });
        }
        else {
            // Synchronously update the value to render.
            this.valueToRender = getBooleanSync(place, placeField);
        }
    }
    resetAsyncRenderPromise() {
        this.asyncRenderComplete?.resolve();
        this.asyncRenderComplete = undefined;
    }
};
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], PlaceFieldBoolean.prototype, "field", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], PlaceFieldBoolean.prototype, "valueToRender", void 0);
PlaceFieldBoolean = __decorate([
    customElement('gmpx-place-field-boolean')
], PlaceFieldBoolean);
export { PlaceFieldBoolean };
//# sourceMappingURL=place_field_boolean.js.map