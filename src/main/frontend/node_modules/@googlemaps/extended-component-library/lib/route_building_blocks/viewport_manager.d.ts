/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { MapElement } from '../utils/googlemaps_types.js';
/**
 * Interface for components that occupy an area on the map in LatLng space, and
 * can be managed by the `ViewportManager`.
 */
export interface LatLngBounded {
    /**
     * Returns the `LatLngBounds` of the component that should be included in the
     * map's viewport, or `null` if the component should be ignored.
     */
    getBounds(): google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | null;
}
/**
 * Manages a map's viewport to fit the bounds of one or several `LatLngBounded`
 * components.
 */
export declare class ViewportManager {
    readonly map: MapElement;
    constructor(map: MapElement);
    private static readonly instances;
    /**
     * Returns the `ViewportManager` instance for the given `MapElement`,
     * constructing one if none exists already. Each `MapElement` will have only
     * one associated `ViewportManager` instance.
     */
    static getInstanceForMap(map: MapElement): ViewportManager;
    private readonly managedComponents;
    /**
     * Registers a `LatLngBounded` component to be included in the viewport.
     * Triggers an `updateViewport()` if the component was not already registered.
     */
    register(component: LatLngBounded): Promise<void>;
    /**
     * If the given `LatLngBounded` component is registered, unregisters it and
     * triggers an `updateViewport()`.
     */
    unregister(component: LatLngBounded): Promise<void>;
    /**
     * Updates the map's viewport to fit all registered `LatLngBounded`
     * components.
     */
    updateViewport(): Promise<void>;
    private getBoundsUnion;
}
