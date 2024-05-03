/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { PropertyValues } from 'lit';
import { WebFontController } from '../../base/web_font_controller.js';
import type { LatLng, LatLngLiteral, Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
type TravelMode = google.maps.TravelMode;
type TravelModeAttribute = Lowercase<TravelMode>;
/**
 * Component that displays as text the distance to this place from an origin,
 * or the duration if a travel mode is also specified.
 *
 * @package Intended for template usage in the Place Overview component only.
 */
export declare class PlaceDistanceLabel extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    /**
     * Travel mode to be used when computing transit time from `origin`.
     * If undefined (default), this component will render the distance instead.
     */
    travelMode?: TravelModeAttribute;
    /** Starting location or Place. */
    origin?: LatLng | LatLngLiteral | Place;
    private directionsData?;
    protected readonly fontLoader: WebFontController;
    private readonly directionsController;
    private isFetchingDirectionsData;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected placeChangedCallback(value?: Place | null, oldValue?: Place | null): void;
    protected render(): import("lit-html").TemplateResult<1>;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(): boolean;
    private updateDirectionsData;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-distance-label-internal': PlaceDistanceLabel;
    }
}
export {};
