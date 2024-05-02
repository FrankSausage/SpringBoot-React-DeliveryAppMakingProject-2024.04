/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultGroup } from 'lit';
import { BaseComponent } from '../base/base_component.js';
import { SlotValidationController } from '../base/slot_validation_controller.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-split-layout': SplitLayout;
    }
}
/**
 * The split layout component allows you to display custom HTML information in a
 * responsive panel view alongside main content. In a narrow container, such as
 * a mobile viewport, the panel will be shown below the main content.
 *
 * ![](./doc_src/split-layout.png)
 *
 * **To use this component, you'll need to specify `slot="main"` or
 * `slot="fixed"` on its children.** Read more on using slots
 * [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots).
 *
 * @slot main - Main content.
 * @slot fixed - Content to be slotted inside the panel with fixed width/height.
 * This panel is displayed on the side of main content when the component has
 * sufficient width, or below main content otherwise.
 *
 * @cssproperty [--gmpx-fixed-panel-width-row-layout=320px] - Controls the fixed
 * panel width when the component is displayed in row direction. Main content
 * width will adjust automatically to fill remaining space.
 * @cssproperty [--gmpx-fixed-panel-height-column-layout=50%] - Controls the
 * fixed panel height when the component is displayed in column direction. Main
 * content height will adjust automatically to fill remaining space.
 */
export declare class SplitLayout extends BaseComponent {
    static styles: CSSResultGroup;
    /**
     * By default, the fixed panel is rendered below the main content when layout
     * is in column direction. If this attribute is specified, then the fixed
     * panel will appear above the main content instead.
     */
    columnReverse: boolean;
    /**
     * When the component’s width in pixels is less than this amount, it displays
     * in a mobile-friendly column layout instead.
     */
    rowLayoutMinWidth: number;
    /**
     * By default, the fixed panel is rendered before the main content when layout
     * is in row direction (left for LTR and vice versa). If this attribute is
     * specified, then the fixed panel will appear after the main content instead
     * (right for LTR and vice versa).
     */
    rowReverse: boolean;
    private hasRowLayout;
    protected slotValidator: SlotValidationController;
    private resizeObserver?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    private updateLayout;
}
