/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Supported field names for `PlaceFieldText`, formatted as `Place` fields.
 */
export declare const PLACE_TEXT_FIELDS: readonly ["businessStatus", "displayName", "formattedAddress", "id", "internationalPhoneNumber", "location", "location.lat", "location.lng", "nationalPhoneNumber", "plusCode.compoundCode", "plusCode.globalCode", "rating", "types", "userRatingCount"];
/**
 * Supported field names for `PlaceFieldText`, formatted as `PlaceResult`
 * fields.
 */
export declare const PLACE_RESULT_TEXT_FIELDS: readonly ["business_status", "name", "formatted_address", "place_id", "international_phone_number", "geometry.location", "geometry.location.lat", "geometry.location.lng", "formatted_phone_number", "plus_code.compound_code", "plus_code.global_code", "rating", "types", "user_ratings_total"];
type PlaceTextField = typeof PLACE_TEXT_FIELDS[number];
type PlaceResultTextField = typeof PLACE_RESULT_TEXT_FIELDS[number];
/**
 * String union type of all supported field names for `PlaceFieldText`.
 */
export type TextField = PlaceTextField | PlaceResultTextField;
/**
 * Component that renders a string or numeric field of a `Place` or
 * `PlaceResult` as text. It can also render the field "types", in which case it
 * will show only the most applicable place type, if available.
 */
export declare class PlaceFieldText extends PlaceDataConsumer {
    /**
     * The field to display, formatted as it is on either a `Place` or
     * `PlaceResult`.
     *
     * Allowed [`Place`
     * fields](https://developers.google.com/maps/documentation/javascript/reference/place)
     * are: `businessStatus`, `displayName`, `formattedAddress`, `id`,
     * `internationalPhoneNumber`, `location`, `location.lat`, `location.lng`,
     * `nationalPhoneNumber`, `plusCode.compoundCode`, `plusCode.globalCode`,
     * `rating`, `types`, and `userRatingCount`.
     *
     * You may also specify one of the equivalent [`PlaceResult` field
     * names](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult):
     * `business_status`, `name`, `formatted_address`, `place_id`,
     * `international_phone_number`, `geometry.location`, `geometry.location.lat`,
     * `geometry.location.lng`, `formatted_phone_number`,
     * `plus_code.compound_code`, `plus_code.global_code`, `rating`, `types`,
     * and `user_ratings_total`.
     */
    field?: TextField;
    protected readonly getMsg: <T extends keyof import("../../base/strings.js").StringLiterals>(id: T, ...args: import("../../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../../base/strings.js").StringLiterals[T] ? T_1 extends import("../../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1>;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getDisplayText;
    private getFieldValue;
    private renderBusinessStatus;
    /**
     * From a list of multiple place types, returns the formatted type to be
     * rendered by PlaceFieldText.
     *
     * @param placeTypes - A list of place types
     * @return The first allowed place type in the list, formatted for display,
     *     or null if there is no allowed type.
     */
    private getDisplayType;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-field-text': PlaceFieldText;
    }
}
export {};
