/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { PropertyValues } from 'lit';
import { BaseComponent } from '../base/base_component.js';
import { FocusController } from '../base/focus_controller.js';
import { WebFontController } from '../base/web_font_controller.js';
import type { Place } from '../utils/googlemaps_types.js';
/** Data field names in a `Place` that are fetched by Place Picker. */
export declare const PLACE_DATA_FIELDS: readonly ["addressComponents", "adrFormatAddress", "businessStatus", "displayName", "formattedAddress", "googleMapsURI", "iconBackgroundColor", "location", "photos", "id", "plusCode", "svgIconMaskURI", "types", "utcOffsetMinutes", "viewport"];
/** Data field names in a `PlaceResult` that are fetched by Place Picker. */
export declare const PLACE_RESULT_DATA_FIELDS: readonly ["address_component", "adr_address", "business_status", "formatted_address", "geometry", "icon", "icon_mask_base_uri", "icon_background_color", "name", "photos", "place_id", "plus_code", "type", "url", "utc_offset_minutes"];
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-picker': PlacePicker;
    }
}
/**
 * The place picker component is a text input that allows end users to search
 * Google Maps’ global database for a specific address or place using
 * autocomplete.
 *
 * ![](./doc_src/place-picker.gif)
 *
 * @event {Event} gmpx-placechange - This event is fired when a Place object is
 * made available for a Place the user has selected, when user clears the input
 * after selection, or when no Place result is found based on the input query.
 * (React: onPlaceChange)
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 *
 * @cssproperty [--gmpx-color-surface] - Background color of the input.
 * @cssproperty [--gmpx-color-on-surface] - Main text color.
 * @cssproperty [--gmpx-color-primary] - Color of the input focus ring.
 * @cssproperty [--gmpx-font-family-base] - Font family.
 * @cssproperty [--gmpx-font-size-base] - Font size, used to scale the
 * component.
 */
export declare class PlacePicker extends BaseComponent {
    static styles: import("lit").CSSResult;
    /** @ignore */
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    /**
     * Restricts predictions to up to five countries identified by their ISO
     * 3166-1 Alpha-2 country codes, case insensitive ('us', 'br', 'au', etc.).
     *
     * Multiple country codes can be specified in the attribute as a set of
     * space-separated tokens (for example, "us ca").
     */
    country?: string[];
    /**
     * The HTML id of a `<gmp-map>` element on the page that Place Autocomplete
     * should bind to for location biasing. Note that the map need not be a parent
     * of the current element.
     */
    forMap?: string;
    /**
     * Location of the region to bias predictions towards (or restrict if
     * `strict-bounds` is set), in "lat,lng" format.
     *
     * This attribute must be used in conjunction with `radius`.
     */
    locationBias?: google.maps.LatLngLiteral;
    /** Placeholder text to display before the user has entered any input. */
    placeholder?: string;
    /**
     * Radius of the region, in meters, to bias predictions towards.
     *
     * This attribute must be used in conjunction with `location-bias`.
     */
    radius?: number;
    /**
     * If true, only predictions that are within the specified location/radius
     * or map viewport will be returned.
     *
     * Setting this property to false (which is the default) will make the results
     * biased towards, but not restricted to, places contained within the bounds.
     */
    strictBounds: boolean;
    /**
     * The type of predictions to return. Some examples include “restaurant”,
     * “country” and “address”. This property supports any one type found in
     * Tables 1~3 of [Place
     * Types](https://developers.google.com/maps/documentation/javascript/supported_types).
     *
     * If no type is specified, predictions of all types will be returned.
     */
    type?: string;
    /**
     * This readonly property contains data about the user-selected place.
     *
     * If the user selects a valid place, then the object is guaranteed to contain
     * at minimum its Place ID, along with all available [Basic Data
     * fields](https://developers.google.com/maps/documentation/places/web-service/place-data-fields#basic).
     *
     * This property is undefined when user input is empty, and null when no
     * results are found based on user input.
     */
    get value(): Place | null | undefined;
    private valueInternal?;
    private disableSearch;
    private hideClearButton;
    private readonly inputElement?;
    private readonly clearButtonElement?;
    private readonly searchButtonElement?;
    protected readonly focusController: FocusController;
    protected readonly fontLoader: WebFontController;
    private readonly autocomplete;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected readonly getMsg: <T extends keyof import("../base/strings.js").StringLiterals>(id: T, ...args: import("../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../base/strings.js").StringLiterals[T] ? T_1 extends import("../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1>;
    protected firstUpdated(): void;
    protected updated(changedProperties: PropertyValues): Promise<void>;
    /**
     * Binds Place Autocomplete to the specified map so that its results are
     * biased towards the map’s viewport.
     */
    bindTo(map: google.maps.Map): Promise<void>;
    /**
     * Finds a `<gmp-map>` element under the same root node as this component with
     * the specified HTML ID and returns its inner `google.maps.Map` object.
     *
     * Note that this method may block indefinitely if the `<gmp-map>` custom
     * element never gets defined.
     */
    private getMapById;
    private shouldUpdateAutocompleteOptions;
    private makeAutocompleteOptions;
    private initializeAutocomplete;
    /**
     * Fetches a Place object based on input query when the user does not select
     * one of the Place Autocomplete predictions, or null if no result is found.
     */
    private search;
    /** Looks up a Place using the GA API. */
    private searchWithFindPlaceFromQuery;
    private handleClear;
    private handleInput;
    private handleSearch;
    private updateInputTextFromPlace;
}
