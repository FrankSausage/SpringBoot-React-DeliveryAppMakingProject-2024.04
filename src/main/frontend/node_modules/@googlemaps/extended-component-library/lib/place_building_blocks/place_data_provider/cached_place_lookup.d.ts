/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Place } from '../../utils/googlemaps_types.js';
/**
 * A limited-capacity cache of `Place` objects keyed by place ID. Creates new
 * `Place` objects as needed when they do not exist already.
 */
export declare class CachedPlaceLookup {
    private readonly consumer?;
    private readonly cache;
    /**
     * @param capacity - The maximum number of `Place` objects to keep in the
     *     cache.
     * @param consumer - Optionally specify the custom element using the cached
     *     place lookup, to provide more helpful console warnings when the places
     *     library cannot be loaded.
     */
    constructor(capacity: number, consumer?: HTMLElement | undefined);
    /**
     * Gets the cached `Place` with the given ID. If none exists, a new `Place`
     * will be created, cached, and returned.
     *
     * Note: The returned promise will be rejected with an error from the `Place`
     * constructor if `id` is an empty string.
     */
    getPlace(id: string): Promise<Place>;
    /**
     * Adds the provided `Place` to the cache, replacing the existing `Place` if
     * one exists already.
     */
    updatePlace(place: Place): void;
}
