/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PropertyValues } from 'lit';
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
declare const PLACE_BOOLEAN_FIELDS_SYNC_ACCESS: readonly ["hasCurbsidePickup", "hasDelivery", "hasDineIn", "hasTakeout", "hasWheelchairAccessibleEntrance", "isReservable", "servesBeer", "servesBreakfast", "servesBrunch", "servesDinner", "servesLunch", "servesVegetarianFood", "servesWine"];
declare const PLACE_BOOLEAN_FIELDS_ASYNC_ACCESS: readonly ["isOpen()"];
/**
 * Supported field names for `PlaceFieldBoolean`, formatted as `Place` fields.
 */
export declare const PLACE_BOOLEAN_FIELDS: readonly ["hasCurbsidePickup", "hasDelivery", "hasDineIn", "hasTakeout", "hasWheelchairAccessibleEntrance", "isReservable", "servesBeer", "servesBreakfast", "servesBrunch", "servesDinner", "servesLunch", "servesVegetarianFood", "servesWine", "isOpen()"];
/**
 * Supported field names for `PlaceFieldBoolean`, formatted as `PlaceResult`
 * fields.
 */
export declare const PLACE_RESULT_BOOLEAN_FIELDS: readonly ["opening_hours.isOpen()"];
type AsyncPlaceBooleanField = typeof PLACE_BOOLEAN_FIELDS_ASYNC_ACCESS[number];
type SyncPlaceBooleanField = typeof PLACE_BOOLEAN_FIELDS_SYNC_ACCESS[number];
type PlaceBooleanField = AsyncPlaceBooleanField | SyncPlaceBooleanField;
type PlaceResultBooleanField = typeof PLACE_RESULT_BOOLEAN_FIELDS[number];
/**
 * String union type of all supported field names for `PlaceFieldBoolean`.
 */
export type BooleanField = PlaceBooleanField | PlaceResultBooleanField;
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
export declare class PlaceFieldBoolean extends PlaceDataConsumer {
    /**
     * The field to display, formatted as it is on either a `Place` or
     * `PlaceResult`.
     *
     * Allowed [Place
     * fields](https://developers.google.com/maps/documentation/javascript/reference/place)
     * are `hasCurbsidePickup`, `hasDelivery`, `hasDineIn`, `hasTakeout`,
     * `hasWheelchairAccessibleEntrance`, `isReservable`, `servesBeer`,
     * `servesBreakfast`, `servesBrunch`, `servesDinner`, `servesLunch`,
     * `servesVegetarianFood`, `servesWine`, and `isOpen()`. Please note that only
     * `isOpen()` is supported by the legacy [`PlaceResult`
     * class](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult).
     *
     * The component also supports the `PlaceResult` field specifier
     * `opening_hours.isOpen()` as an alias for `isOpen()`.
     */
    field?: BooleanField;
    /** Boolean value to be rendered synchronously. */
    private valueToRender?;
    private readonly poll;
    private asyncRenderComplete?;
    protected render(): import("lit-html").TemplateResult<1>;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    /** @ignore */
    protected getUpdateComplete(): Promise<boolean>;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    disconnectedCallback(): void;
    /**
     * Updates the internal state value used for rendering HTML. Depending on
     * the Place field chosen, this method may make a synchronous update, or may
     * trigger a task to update the value later [e.g. with isOpen()].
     */
    private updateValueToRender;
    private resetAsyncRenderPromise;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-field-boolean': PlaceFieldBoolean;
    }
}
export {};
