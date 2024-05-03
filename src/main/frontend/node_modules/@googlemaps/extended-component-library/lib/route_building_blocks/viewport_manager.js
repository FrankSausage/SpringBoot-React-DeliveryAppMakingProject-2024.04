/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { APILoader } from '../api_loader/api_loader.js';
/**
 * Manages a map's viewport to fit the bounds of one or several `LatLngBounded`
 * components.
 */
export class ViewportManager {
    constructor(map) {
        this.map = map;
        this.managedComponents = new Set();
    }
    /**
     * Returns the `ViewportManager` instance for the given `MapElement`,
     * constructing one if none exists already. Each `MapElement` will have only
     * one associated `ViewportManager` instance.
     */
    static getInstanceForMap(map) {
        if (!ViewportManager.instances.has(map)) {
            ViewportManager.instances.set(map, new ViewportManager(map));
        }
        return ViewportManager.instances.get(map);
    }
    /**
     * Registers a `LatLngBounded` component to be included in the viewport.
     * Triggers an `updateViewport()` if the component was not already registered.
     */
    async register(component) {
        if (!this.managedComponents.has(component)) {
            this.managedComponents.add(component);
            await this.updateViewport();
        }
    }
    /**
     * If the given `LatLngBounded` component is registered, unregisters it and
     * triggers an `updateViewport()`.
     */
    async unregister(component) {
        if (this.managedComponents.has(component)) {
            this.managedComponents.delete(component);
            await this.updateViewport();
        }
    }
    /**
     * Updates the map's viewport to fit all registered `LatLngBounded`
     * components.
     */
    async updateViewport() {
        const boundsUnion = await this.getBoundsUnion();
        if (boundsUnion) {
            this.map.innerMap.fitBounds(boundsUnion);
        }
    }
    async getBoundsUnion() {
        let result = null;
        for (const component of this.managedComponents) {
            const bounds = component.getBounds();
            if (bounds) {
                if (!result) {
                    const { LatLngBounds } = await APILoader.importLibrary('core');
                    result = new LatLngBounds();
                }
                result.union(bounds);
            }
        }
        return result;
    }
}
ViewportManager.instances = new Map();
//# sourceMappingURL=viewport_manager.js.map