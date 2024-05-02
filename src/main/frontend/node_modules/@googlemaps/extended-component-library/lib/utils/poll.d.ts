/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utility class that allows callers to start or stop continuous polling of a
 * callback function at set intervals (without calling `setInterval` itself).
 */
export declare class Poll {
    private timeoutId?;
    /**
     * Starts continuous polling of the specified callback function after every
     * interval (in ms).
     */
    start(callback: Function, interval: number): void;
    /** Stops the currently running poll, if any. */
    stop(): void;
    private updateTimeout;
}
