/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import { LoggingController } from './logging_controller.js';
/**
 * Controller that checks the host element for incorrectly slotted children.
 *
 * @param supportedSlotNames Names of supported slots under the host element.
 *     The default slot is denoted by an empty string.
 */
export declare class SlotValidationController implements ReactiveController {
    private readonly host;
    private readonly logger;
    private readonly supportedSlotNames;
    constructor(host: ReactiveControllerHost & LitElement, logger: LoggingController, supportedSlotNames: string[]);
    hostConnected(): void;
    private checkChildSlotValidity;
}
