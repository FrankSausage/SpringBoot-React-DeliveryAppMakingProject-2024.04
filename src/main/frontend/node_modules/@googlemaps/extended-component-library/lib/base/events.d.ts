/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Event emitted when error occurs in an underlying request to the Google Maps
 * API web service.
 *
 * @param error The `Error` object thrown by the Maps JavaScript API.
 */
export declare class RequestErrorEvent extends Event {
    readonly error: unknown;
    constructor(error: unknown);
}
