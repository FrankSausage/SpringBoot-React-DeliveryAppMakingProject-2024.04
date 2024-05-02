/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { LatLng, LatLngLiteral, Place, PlaceResult, PriceLevel } from './googlemaps_types.js';
/**
 * Returns true if `place` is a `PlaceResult`, and false if it's a `Place`.
 *
 * @param place - A `google.maps.places.Place` or
 *     `google.maps.places.PlaceResult`.
 */
export declare function isPlaceResult(place: Place | PlaceResult): place is PlaceResult;
/**
 * Contains info that describes the origin or destination of a journey. This
 * interface is compatible with `google.maps.Place` and is suitable for use in
 * a request to the Directions or Distance Matrix services.
 */
export interface WaypointInfo {
    location?: LatLngLiteral;
    placeId?: string;
    query?: string;
}
/** Creates a new `WaypointInfo` object based on input data. */
export declare function makeWaypoint(data: LatLng | LatLngLiteral | Place): WaypointInfo;
/**
 * Converts an enum price level to the corresponding numeric value. If passed a
 * numeric value, it will return it unchanged.
 */
export declare function priceLevelToNumeric(level: number | PriceLevel): number | null;
/**
 * Converts a numeric price level to the corresponding enum value. If passed an
 * enum value, it will return it unchanged.
 */
export declare function numericToPriceLevel(level: number | PriceLevel): PriceLevel | null;
/**
 * Renders attribution data returned by the Places API as either an `<a>` or a
 * `<span>` depending on the presence of the URL field.
 *
 * @param text Name of the author or provider.
 * @param url URL that links to the author or provider page.
 */
export declare function renderAttribution(text: string, url: string | null): import("lit-html").TemplateResult<1>;
/**
 * Creates a new `Place` object that sources its property values from
 * equivalent fields in the `PlaceResult` object, if they are defined.
 */
export declare function makePlaceFromPlaceResult(placeResult: PlaceResult, consumer?: HTMLElement): Promise<Place>;
/**
 * Determines whether the current Place object has enough data to evaluate
 * `isOpen()` or `getNextOpeningTime()` without making additional fetches.
 */
export declare function hasDataForOpeningCalculations(place: Place): boolean;
/** Maps a list of Place field names to equivalent PlaceResult field names. */
export declare function mapPlaceFieldsToPlaceResultFields(fields: Array<keyof Place>): Array<keyof PlaceResult>;
/**
 * Determines if the error results from a specified property not being
 * available on the Place class (or an instance of that class).
 */
export declare function isNotAvailableError(e: unknown, property: string): e is Error;
