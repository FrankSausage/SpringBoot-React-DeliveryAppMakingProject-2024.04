/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utility class that allows callers to start or stop continuous polling of a
 * callback function at set intervals (without calling `setInterval` itself).
 */
export class Poll {
    /**
     * Starts continuous polling of the specified callback function after every
     * interval (in ms).
     */
    start(callback, interval) {
        this.stop();
        this.updateTimeout(callback, interval);
    }
    /** Stops the currently running poll, if any. */
    stop() {
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
    updateTimeout(callback, interval) {
        this.timeoutId = setTimeout(() => {
            callback();
            this.updateTimeout(callback, interval);
        }, interval);
    }
}
//# sourceMappingURL=poll.js.map