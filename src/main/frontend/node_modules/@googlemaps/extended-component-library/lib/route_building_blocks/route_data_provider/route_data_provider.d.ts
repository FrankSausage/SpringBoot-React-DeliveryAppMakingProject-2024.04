/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { BaseComponent } from '../../base/base_component.js';
type DirectionsRoute = google.maps.DirectionsRoute;
type LatLng = google.maps.LatLng;
type LatLngLiteral = google.maps.LatLngLiteral;
/**
 * Provides route data to child components as context.
 *
 * This component can fetch route data from the Directions API, or forward a
 * `DirectionsRoute` object provided from elsewhere in code. The component will
 * locally cache route data to avoid redundant API requests.
 *
 * @slot - Elements to receive route data.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 */
export declare class RouteDataProvider extends BaseComponent {
    /**
     * @ignore
     * Route data passed to child `RouteDataConsumer`s via context.
     */
    contextRoute: DirectionsRoute | undefined;
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
     * Route data to be provided to consumers directly, instead of making an API
     * call.
     */
    route?: DirectionsRoute;
    /**
     * The travel mode of the directions request.
     */
    travelMode: Lowercase<google.maps.TravelMode>;
    private readonly directionsController;
    protected updated(): void;
    private updateContextRoute;
    private fetchRoute;
    private getOriginRequestObject;
    private getDestinationRequestObject;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-route-data-provider': RouteDataProvider;
    }
}
export {};
