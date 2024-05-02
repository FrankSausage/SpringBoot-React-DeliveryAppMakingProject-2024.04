/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResultGroup } from 'lit';
import { BaseComponent } from '../base/base_component.js';
import { SlotValidationController } from '../base/slot_validation_controller.js';
/**
 * The overlay layout component allows you to display information in a
 * responsive panel view that sits on top of main content, like a map or a list.
 * You might use this to show a modal dialog, more details about a place, or
 * settings.
 *
 * This component helps manage keyboard focus when opening and closing the
 * overlay.
 *
 * The size of the gmpx-overlay-layout can be set directly with the `width` and
 * `height` properties. If none are provided, it will fill the size of its
 * containing element.
 *
 * ![](./doc_src/overlay-layout.gif)
 *
 * **To use this component, you'll need to specify `slot="main"` or
 * `slot="overlay"` on its children.** Read more on using slots
 * [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots).
 *
 * @slot main - Main content, displayed by default.
 * @slot overlay - Overlay content that replaces the main content when the panel
 * is opened.
 */
export declare class OverlayLayout extends BaseComponent {
    static styles: CSSResultGroup;
    private readonly mainAssignedEls;
    private readonly overlayAssignedEls;
    private readonly mainContainer;
    private readonly overlayContainer;
    private opened;
    private mainLastActiveEl;
    protected slotValidator: SlotValidationController;
    /**
     * Opens the overlay panel.
     *
     * If focus is currently in the main content, the focused element will be
     * saved to regain focus when closing the overlay. Focus will then move to
     * the element in the overlay slot with autofocus, if present. If no element
     * has autofocus, the internal overlay container will be focused so that
     * pressing Tab will focus the first interactive element in the overlay slot.
     *
     * Overlay content will be scrolled to the top, if the panel was previously
     * opened and scrolled down.
     */
    showOverlay(): Promise<void>;
    /**
     * Closes the overlay panel.
     *
     * If focus is currently in the overlay content, focus will move to the last
     * focused main element, if this was saved when opening the panel. If no
     * focused element was saved, the internal main container will be focused
     * so that pressing Tab will focus the first interactive element in the main
     * slot.
     */
    hideOverlay(): Promise<void>;
    protected render(): import("lit-html").TemplateResult<1>;
    private handleOverlayKeydown;
    /**
     * Returns the active element if it's a descendant, even across shadow
     * boundaries, of one of the elements in els.
     */
    private getContainedActiveEl;
    private getMainActiveEl;
    private getOverlayActiveEl;
    private getOverlayAutofocusEl;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-overlay-layout': OverlayLayout;
    }
}
