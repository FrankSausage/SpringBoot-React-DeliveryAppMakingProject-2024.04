/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { PropertyValues } from 'lit';
import { RouteDataConsumer } from '../route_data_consumer.js';
import { LatLngBounded } from '../viewport_manager.js';
/**
 * Renders a polyline indicating the path of a route.
 */
export declare class RoutePolyline extends RouteDataConsumer implements LatLngBounded {
    /**
     * Whether or not to automatically adjust the map's viewport to include the
     * polyline.
     */
    fitInViewport: boolean;
    /**
     * Whether or not the polyline is invisible or visible on the map.
     */
    invisible: boolean;
    /**
     * Stroke color of the polyline. All CSS3 colors are supported except for
     * extended named colors.
     */
    strokeColor?: string;
    /**
     * The stroke opacity of the polyline between 0.0 and 1.0.
     */
    strokeOpacity?: number;
    /**
     * The stroke width of the polyline in pixels.
     */
    strokeWeight?: number;
    /**
     * The z-index of the polyline compared to other polys.
     */
    zIndex?: number;
    private readonly innerPolylineDeferred;
    /**
     * The inner `google.maps.Polyline` from the Maps JS API. This value is set
     * once `innerPolylinePromise` is resolved.
     */
    get innerPolyline(): google.maps.Polyline | undefined;
    /**
     * Resolves to the inner polyline when it's ready. It might not be ready
     * immediately because the `Polyline` class is loaded asynchronously from
     * the Maps JS API.
     */
    get innerPolylinePromise(): Promise<google.maps.Polyline>;
    private readonly mapController;
    constructor();
    private initPolyline;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    protected updated(changedProperties: PropertyValues<this>): void;
    /**
     * Returns the `LatLngBounds` of the polyline that should be included in the
     * map's viewport, for use by the `ViewportManager`.
     * @ignore
     */
    getBounds(): google.maps.LatLngBounds | null;
    private setInnerPolylineOptions;
    private updatePath;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-route-polyline': RoutePolyline;
    }
}
