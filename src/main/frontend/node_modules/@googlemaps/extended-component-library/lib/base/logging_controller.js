/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Controller that handles logging messages to the web console. Components
 * should use this controller rather than calling `console` directly to prepend
 * useful information to the messages.
 */
export class LoggingController {
    constructor(host) {
        this.host = host;
        this.host.addController(this);
    }
    hostUpdate() { }
    /** Outputs an informational message to the web console. */
    info(message, ...data) {
        console.info(this.formatMessage(message), ...data);
    }
    /** Outputs a warning message to the web console. */
    warn(message, ...data) {
        console.warn(this.formatMessage(message), ...data);
    }
    /** Outputs an error message to the web console. */
    error(message, ...data) {
        console.error(this.formatMessage(message), ...data);
    }
    /** Returns a formatted message for display in the web console. */
    formatMessage(message) {
        return this.prependTagName(message);
    }
    prependTagName(message) {
        return `<${this.host.tagName.toLowerCase()}>: ${message}`;
    }
}
//# sourceMappingURL=logging_controller.js.map