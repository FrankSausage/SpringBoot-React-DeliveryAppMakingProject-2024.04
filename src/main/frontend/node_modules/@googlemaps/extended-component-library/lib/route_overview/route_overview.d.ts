/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import '../route_building_blocks/route_data_provider/route_data_provider.js';
import '../route_building_blocks/route_polyline/route_polyline.js';
import '../route_building_blocks/route_marker/route_marker.js';
import { BaseComponent } from '../base/base_component.js';
type DirectionsRoute = google.maps.DirectionsRoute;
type LatLng = google.maps.LatLng;
type LatLngLiteral = google.maps.LatLngLiteral;
/**
 * The route overview component renders a route on a `<gmp-map>` component,
 * including origin and destination markers, an outlined polyline, and viewport
 * management.
 *
 * This component can fetch route data from the Directions API, or use a
 * `DirectionsRoute` object provided from elsewhere in code. The component will
 * locally cache route data to avoid redundant API requests.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 */
export declare class RouteOverview extends BaseComponent {
    /**
     * The destination of the directions request as a lat/lng. When setting the
     * destination, only one of lat/lng, Place ID, or address should be specified.
     */
    destinationLatLng?: LatLng | LatLngLiteral;
    /**
     * The destination of the directions request as a Place ID. When setting the
     * destination, only one of lat/lng, Place ID, or address should be specified.
     */
    destinationPlaceId?: string;
    /**
     * The destination of the directions request as an address query. When setting
     * the destination, only one of lat/lng, Place ID, or address should be
     * specified.
     */
    destinationAddress?: string;
    /**
     * The origin of the directions request as a lat/lng. When setting the origin,
     * only one of lat/lng, Place ID, or address should be specified.
     */
    originLatLng?: LatLng | LatLngLiteral;
    /**
     * The origin of the directions request as a Place ID. When setting the
     * origin, only one of lat/lng, Place ID, or address should be specified.
     */
    originPlaceId?: string;
    /**
     * The origin of the directions request as an address query. When setting the
     * origin, only one of lat/lng, Place ID, or address should be specified.
     */
    originAddress?: string;
    /**
     * Route data to render directly, instead of making an API call.
     */
    route?: DirectionsRoute;
    /**
     * The travel mode of the directions request.
     */
    travelMode: Lowercase<google.maps.TravelMode>;
    /**
     * Hides the red pin displayed at the destination.
     */
    noPin: boolean;
    private static numConstructed;
    private readonly zIndex;
    constructor();
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-route-overview': RouteOverview;
    }
}
export {};
