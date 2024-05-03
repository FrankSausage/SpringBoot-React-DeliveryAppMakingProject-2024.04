/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement } from 'lit';
import { LoggingController } from './logging_controller.js';
/**
 * Base class for Web Components in the library.
 */
export class BaseComponent extends LitElement {
    constructor() {
        super(...arguments);
        /** @ignore A logger for outputting messages to the web console. */
        this.logger = new LoggingController(this);
    }
}
//# sourceMappingURL=base_component.js.map