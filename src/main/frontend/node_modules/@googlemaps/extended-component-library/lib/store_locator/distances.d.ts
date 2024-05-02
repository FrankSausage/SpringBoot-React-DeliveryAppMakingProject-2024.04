/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { LatLng, LatLngLiteral } from '../utils/googlemaps_types.js';
/** How a distance was calculated. */
export declare enum DistanceSource {
    GEOMETRIC = 0,
    DISTANCE_MATRIX = 1
}
/** Distance measurement between two locations. */
export interface DistanceInfo {
    value?: number;
    text?: string;
    source?: DistanceSource;
}
/**
 * A utility for calculating distances from a single point to N other points.
 *
 * This class combines the Maps JS Distance Matrix API with a global request
 * cache and a fallback for when N is more than allowed by the API.
 */
export declare class DistanceMeasurer {
    private readonly elementForLogging?;
    private static service?;
    private static cache;
    constructor(elementForLogging?: HTMLElement | undefined);
    /**
     * Computes travel distance between `origin` and each of the `destinations`.
     *
     * If there are more than 25 `destinations`, the Distance Matrix API cannot
     * process them in a single request. In this case, the method will assign
     * a geometric distance to all N `destinations`, then use Distance Matrix
     * to compute accurate distances to the nearest 25 options.
     */
    computeDistances(origin: LatLng | LatLngLiteral, destinations: Array<LatLng | LatLngLiteral>, units: google.maps.UnitSystem): Promise<DistanceInfo[]>;
    private getService;
    /**
     * Resets Distance Measurer state by deleting any existing service object
     * and clearing its cache.
     * This method should be invoked for testing purposes only.
     * @ignore
     */
    static reset(): void;
}
