/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { css, html, nothing } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { BaseComponent } from '../base/base_component.js';
import { getTypeScaleSizeFromPx, GMPX_BORDER_SEPARATOR, GMPX_COLOR_ON_PRIMARY, GMPX_COLOR_PRIMARY, GMPX_FONT_CAPTION, GMPX_FONT_SIZE_BASE, GMPX_FONT_TITLE_MEDIUM } from '../base/common_styles.js';
import { WebFont, WebFontController } from '../base/web_font_controller.js';
/**
 * The default icon to show when icon is not specified; this icon will only be
 * rendered if the button has no label or is in a condensed layout.
 */
const DEFAULT_ICON = 'add';
/** Names of variants supported by the Icon Button component. */
const BUTTON_VARIANTS = Object.freeze(['outlined', 'filled']);
/** Multiplier to scale margins and paddings based on font size. */
const SPACING_MULTIPLIER = 0.5;
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
let IconButton = class IconButton extends BaseComponent {
    constructor() {
        super(...arguments);
        /**
         * Indicates the availability and type of interactive popup element that can
         * be triggered by the button. See:
         * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup.
         *
         * This attribute has no effect when `href` is set.
         */
        this.ariaHasPopup = 'false';
        /**
         * A description that gets read by assistive devices. In the case of icon-only
         * buttons, you should always include an ARIA label for optimal accessibility.
         */
        this.ariaLabel = null;
        /**
         * Whether to render the button in a condensed layout, where the label appears
         * below the icon.
         */
        this.condensed = false;
        /** Specifies the display style of the button. */
        this.variant = 'outlined';
        this.hasLabel = false;
        this.fontLoader = new WebFontController(this, [WebFont.GOOGLE_SANS_TEXT, WebFont.MATERIAL_SYMBOLS_OUTLINED]);
    }
    willUpdate(changedProperties) {
        // If variant is set to an unsupported value, reset to default & log error.
        if (changedProperties.has('variant') &&
            !BUTTON_VARIANTS.includes(this.variant)) {
            this.logger.error(`Value "${this.variant}" for attribute "variant" is invalid. ` +
                `Acceptable choices are ${BUTTON_VARIANTS.map((size) => `"${size}"`).join(', ')}.`);
            this.variant = 'outlined';
        }
    }
    render() {
        if (this.href) {
            return html `
        <a
          aria-label=${this.ariaLabel ?? nothing}
          class="container"
          href=${this.href}
          target="_blank"
        >${this.renderContent()}</a>
      `;
        }
        return html `
      <button
        aria-haspopup=${this.ariaHasPopup}
        aria-label=${this.ariaLabel ?? nothing}
        class="container"
      >${this.renderContent()}</button>
    `;
    }
    updated() {
        // If the aria-label attribute is set, hide it from the a11y tree. Otherwise
        // the component and its shadow DOM content show up as duplicate nodes with
        // the same aria-label.
        this.role = this.ariaLabel != null ? 'none' : null;
    }
    renderContent() {
        const icon = this.icon ||
            (!this.hasLabel || this.condensed ? DEFAULT_ICON : undefined);
        // clang-format off
        return html `
      <div class="layout ${classMap({
            'condensed': this.condensed,
            'no-label': !this.hasLabel,
        })}">
        <div class="pill ${classMap({
            'filled': this.variant === 'filled',
            'outlined': this.variant !== 'filled',
        })}">
          <div class="overlay"></div>
          ${when(icon, () => html `
            <span aria-hidden="true" class="icon material-symbols-outlined">
              ${icon}
            </span>
          `)}
          ${when(!this.condensed, () => this.renderLabel())}
        </div>
        ${when(this.condensed, () => this.renderLabel())}
      </div>
    `;
        // clang-format on
    }
    renderLabel() {
        return html `
      <div class="label-container">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
    }
    handleSlotChange() {
        this.hasLabel =
            Boolean(this.defaultSlotNodes?.map((node) => node.textContent ?? '')
                .join('')
                .trim());
    }
};
IconButton.styles = css `
    .container {
      all: unset;
      color: ${GMPX_COLOR_PRIMARY};
      cursor: pointer;
      text-align: center;
    }

    .icon {
      font-size: ${getTypeScaleSizeFromPx(18)};
    }

    .layout.condensed {
      display: flex;
      flex-direction: column;
    }

    .layout.condensed .pill {
      align-self: center;
    }

    .layout.condensed .label-container {
      font: ${GMPX_FONT_CAPTION};
      margin-top: calc(${GMPX_FONT_SIZE_BASE} * ${SPACING_MULTIPLIER});
    }

    .layout.no-label .label-container {
      margin: 0;
    }

    .layout:not(.condensed):not(.no-label) .pill {
      padding-left: calc(${GMPX_FONT_SIZE_BASE} * ${SPACING_MULTIPLIER});
      padding-right: calc(${GMPX_FONT_SIZE_BASE} * ${SPACING_MULTIPLIER});
    }

    .pill {
      align-items: center;
      border-radius: calc(${GMPX_FONT_SIZE_BASE} * (1 + ${SPACING_MULTIPLIER}));
      display: flex;
      font: ${GMPX_FONT_TITLE_MEDIUM};
      justify-content: center;
      overflow: hidden;
      padding: calc(${GMPX_FONT_SIZE_BASE} * ${SPACING_MULTIPLIER} / 2);
      position: relative;
    }

    .pill > * {
      margin: calc(${GMPX_FONT_SIZE_BASE} * ${SPACING_MULTIPLIER} / 2);
    }

    .pill.filled {
      background-color: ${GMPX_COLOR_PRIMARY};
      color: ${GMPX_COLOR_ON_PRIMARY};
    }

    .pill.outlined {
      border: ${GMPX_BORDER_SEPARATOR};
    }

    .pill .overlay {
      inset: 0;
      margin: 0;
      opacity: 0;
      position: absolute;
    }

    .pill.outlined .overlay {
      background-color: ${GMPX_COLOR_PRIMARY};
    }

    .pill.filled .overlay {
      background-color: ${GMPX_COLOR_ON_PRIMARY};
    }

    .container:hover .overlay {
      opacity: 0.08;
    }

    .container:focus .overlay {
      opacity: 0.24;
    }

    .container:active .overlay {
      opacity: 0.32;
    }
  `;
// Set up focus delegation; see
// https://lit.dev/docs/components/shadow-dom/#setting-shadowrootoptions.
/** @ignore */
IconButton.shadowRootOptions = {
    ...BaseComponent.shadowRootOptions,
    delegatesFocus: true,
};
__decorate([
    property({ attribute: 'aria-haspopup', reflect: true, type: String }),
    __metadata("design:type", String)
], IconButton.prototype, "ariaHasPopup", void 0);
__decorate([
    property({ attribute: 'aria-label', reflect: true, type: String }),
    __metadata("design:type", Object)
], IconButton.prototype, "ariaLabel", void 0);
__decorate([
    property({ reflect: true, type: Boolean }),
    __metadata("design:type", Object)
], IconButton.prototype, "condensed", void 0);
__decorate([
    property({ reflect: true, type: String }),
    __metadata("design:type", String)
], IconButton.prototype, "href", void 0);
__decorate([
    property({ reflect: true, type: String }),
    __metadata("design:type", String)
], IconButton.prototype, "icon", void 0);
__decorate([
    property({ reflect: true, type: String }),
    __metadata("design:type", String)
], IconButton.prototype, "variant", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], IconButton.prototype, "hasLabel", void 0);
__decorate([
    queryAssignedNodes({ flatten: true }),
    __metadata("design:type", Array)
], IconButton.prototype, "defaultSlotNodes", void 0);
IconButton = __decorate([
    customElement('gmpx-icon-button')
], IconButton);
export { IconButton };
//# sourceMappingURL=icon_button.js.map