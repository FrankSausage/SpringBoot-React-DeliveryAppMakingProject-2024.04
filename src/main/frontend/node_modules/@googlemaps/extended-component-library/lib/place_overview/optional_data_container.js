/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '../base/base_component.js';
/**
 * Container component that hides itself if any of its slotted children gains
 * the `no-data` boolean attribute.
 *
 * @package Intended for template usage in the Place Overview component only.
 */
let OptionalDataContainer = class OptionalDataContainer extends BaseComponent {
    connectedCallback() {
        super.connectedCallback();
        this.observer = new MutationObserver(() => {
            this.hidden = !!this.querySelector('[no-data]');
        });
        this.observer.observe(this, { subtree: true, attributeFilter: ['no-data'] });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.observer?.disconnect();
    }
    render() {
        return html `<slot></slot>`;
    }
};
OptionalDataContainer = __decorate([
    customElement('gmpx-optional-data-container-internal')
], OptionalDataContainer);
export { OptionalDataContainer };
//# sourceMappingURL=optional_data_container.js.map