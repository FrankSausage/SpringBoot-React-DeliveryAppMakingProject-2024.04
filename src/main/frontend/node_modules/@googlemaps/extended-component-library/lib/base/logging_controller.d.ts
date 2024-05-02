/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
/**
 * Controller that handles logging messages to the web console. Components
 * should use this controller rather than calling `console` directly to prepend
 * useful information to the messages.
 */
export declare class LoggingController implements ReactiveController {
    private readonly host;
    constructor(host: ReactiveControllerHost & LitElement);
    hostUpdate(): void;
    /** Outputs an informational message to the web console. */
    info(message: string, ...data: unknown[]): void;
    /** Outputs a warning message to the web console. */
    warn(message: string, ...data: unknown[]): void;
    /** Outputs an error message to the web console. */
    error(message: string, ...data: unknown[]): void;
    /** Returns a formatted message for display in the web console. */
    formatMessage(message: string): string;
    private prependTagName;
}
