/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
/**
 * Controller that interfaces with the Maps JavaScript API Directions Service.
 */
export declare class DirectionsController implements ReactiveController {
    private readonly host;
    private static service?;
    private static cache;
    constructor(host: ReactiveControllerHost & LitElement);
    hostUpdate(): void;
    /**
     * Makes a call to `DirectionsService.route` and returns the result as a
     * promise. If request fails, the promise will resolve to null, and this
     * method will dispatch a `RequestErrorEvent` from the host element.
     */
    route(request: google.maps.DirectionsRequest): Promise<google.maps.DirectionsResult | null>;
    private getService;
    /**
     * Resets Directions Controller state by deleting any existing service object
     * and clearing its cache.
     * This method should be invoked for testing purposes only.
     * @ignore
     */
    static reset(): void;
}
