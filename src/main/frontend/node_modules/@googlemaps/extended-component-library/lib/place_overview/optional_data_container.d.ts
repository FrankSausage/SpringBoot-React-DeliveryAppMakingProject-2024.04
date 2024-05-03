/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseComponent } from '../base/base_component.js';
/**
 * Container component that hides itself if any of its slotted children gains
 * the `no-data` boolean attribute.
 *
 * @package Intended for template usage in the Place Overview component only.
 */
export declare class OptionalDataContainer extends BaseComponent {
    private observer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-optional-data-container-internal': OptionalDataContainer;
    }
}
