/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PropertyValues } from 'lit';
import { AdvancedMarkerElement } from '../../utils/googlemaps_types.js';
import { RouteDataConsumer } from '../route_data_consumer.js';
/**
 * Renders a marker indicating the origin or destination of a route.
 *
 * @slot - An element to be used as custom marker content on the map. The
 * element will be detached from the DOM and moved into the map's
 * implementation.
 */
export declare class RouteMarker extends RouteDataConsumer {
    /**
     * Which waypoint of the route to position the marker on. For now, this is
     * either "origin" or "destination"; intermediate waypoints are not yet
     * supported.
     */
    waypoint: 'origin' | 'destination';
    /**
     * Rollover text for the marker, displayed on mouse hover.
     */
    title: string;
    /**
     * The z-index of the marker relative to other Advanced Markers.
     */
    zIndex?: number;
    private readonly innerMarkerDeferred;
    /**
     * The inner `google.maps.marker.AdvancedMarkerElement` from the Maps JS API.
     * This value is set once `innerMarkerPromise` is resolved.
     */
    get innerMarker(): AdvancedMarkerElement | undefined;
    /**
     * Resolves to the inner marker when it's ready. It might not be ready
     * immediately becasue the `AdvancedMarkerElement` class is loaded
     * asynchronously from the Maps JS API.
     */
    get innerMarkerPromise(): Promise<AdvancedMarkerElement>;
    private readonly mapController;
    constructor();
    private initMarker;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(changedProperties: PropertyValues<this>): void;
    private updatePosition;
    private updateTitle;
    private updateZIndex;
    private onSlotChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-route-marker': RouteMarker;
    }
}
