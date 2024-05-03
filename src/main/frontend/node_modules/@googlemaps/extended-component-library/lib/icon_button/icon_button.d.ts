/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PropertyValues } from 'lit';
import { BaseComponent } from '../base/base_component.js';
import { WebFontController } from '../base/web_font_controller.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-icon-button': IconButton;
    }
}
/**
 * The icon button component is used for actions in the UI that help users get
 * things done with a single tap. It contains an icon and a text label.
 *
 * This element is designed to be visually consistent when used with other
 * components in the Extended Component Library. For example, Icon Buttons can
 * be used in the `action` slot of the [Place
 * Overview](../place_overview/README.md) component to provide a consistent look
 * and feel.
 *
 * ![](doc_src/icon-button.png)
 *
 * @slot - Content to display as the button’s label.
 *
 * @cssproperty [--gmpx-color-primary] - Button text and outline color in the
 * `outlined` variant, or background color in `filled` variant.
 * @cssproperty [--gmpx-color-on-primary] - Button text color in `filled`
 * variant.
 * @cssproperty [--gmpx-color-outline] - Outline color.
 * @cssproperty [--gmpx-font-size-base] - Font size for the button.
 * @cssproperty [--gmpx-font-family-headings] - Font face for the button, except
 * for condensed mode.
 * @cssproperty [--gmpx-font-family-base] - Font face used when the button is in
 * condensed mode.
 */
export declare class IconButton extends BaseComponent {
    static styles: import("lit").CSSResult;
    /** @ignore */
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    /**
     * Indicates the availability and type of interactive popup element that can
     * be triggered by the button. See:
     * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup.
     *
     * This attribute has no effect when `href` is set.
     */
    ariaHasPopup: 'true' | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid' | 'false';
    /**
     * A description that gets read by assistive devices. In the case of icon-only
     * buttons, you should always include an ARIA label for optimal accessibility.
     */
    ariaLabel: string | null;
    /**
     * Whether to render the button in a condensed layout, where the label appears
     * below the icon.
     */
    condensed: boolean;
    /**
     * Set this attribute to a URL to have the Icon Button open it in a new tab,
     * when clicked. Alternatively, specify on-click behavior for this component
     * by attaching an event listener.
     *
     * Per accessibility best practice, the component will render its content
     * inside an `<a>` instead of `<button>` element when this attribute is set.
     */
    href?: string;
    /**
     * Name of icon from [Material Symbols Set](https://fonts.google.com/icons) to
     * display before the button label.
     *
     * If icon is unspecified, then a "+" icon will be rendered by default. This
     * default icon is omitted if button has a label or other content and is not
     * in condensed layout.
     */
    icon?: string;
    /** Specifies the display style of the button. */
    variant: 'outlined' | 'filled';
    private hasLabel;
    private readonly defaultSlotNodes?;
    protected readonly fontLoader: WebFontController;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(): void;
    private renderContent;
    private renderLabel;
    private handleSlotChange;
}
