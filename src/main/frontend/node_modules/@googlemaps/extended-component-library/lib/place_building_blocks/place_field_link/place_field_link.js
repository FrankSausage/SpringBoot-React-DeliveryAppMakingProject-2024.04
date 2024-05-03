/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Supported field names for `PlaceFieldLink`, formatted as `Place` fields.
 */
export const PLACE_LINK_FIELDS = [
    'googleMapsURI',
    'websiteURI',
];
/**
 * Supported field names for `PlaceFieldLink`, formatted as `PlaceResult`
 * fields.
 */
export const PLACE_RESULT_LINK_FIELDS = [
    'url',
    'website',
];
function toPlaceLinkField(field) {
    switch (field) {
        case 'url':
            return 'googleMapsURI';
        case 'website':
            return 'websiteURI';
        default:
            return field;
    }
}
function getFieldValue(place, field) {
    switch (toPlaceLinkField(field)) {
        case 'googleMapsURI':
            return place.googleMapsURI;
        case 'websiteURI':
            return place.websiteURI;
        default:
            return undefined;
    }
}
function getUrlDomain(url) {
    const match = url.match(/^(https?:\/\/)?(www\.)?([^\/\?]+)/);
    return (match && match.length > 3) ? match[3] : url;
}
/**
 * Component that renders an anchor tag to one of this place's URLs:
 * `websiteURI` or `googleMapsURI`. By default, renders a link to `websiteURI`
 * with the URL's domain as the text.
 */
let PlaceFieldLink = class PlaceFieldLink extends PlaceDataConsumer {
    constructor() {
        super(...arguments);
        /**
         * The field to link to, formatted as it is on either a `Place` or
         * `PlaceResult`.
         *
         * Allowed fields are: `googleMapsURI` or `url` for a link to this place on
         * Google Maps; `websiteURI` or `website` for a link to this place's
         * website.
         */
        this.hrefField = 'websiteURI';
        /**
         * The link description that gets read by assistive technology.
         *
         * Set this to something more descriptive if the link's purpose isn't clear
         * from its text content alone. For example, if the link text is just
         * "Website", then the `aria-label` could be "Website for (business name)".
         */
        this.ariaLabel = null;
    }
    render() {
        const href = this.getHref();
        // clang-format off
        return html `${when(href, () => html `
      <a target="_blank" rel="noopener noreferrer" href=${href}
          aria-label=${this.ariaLabel ?? nothing}>
        ${when(this.hasContentForSlot(), () => html `<slot></slot>`, () => html `${this.getDefaultLinkText(href)}`)}
      </a>
    `)}`;
        // clang-format on
    }
    updated() {
        // If the aria-label attribute is set, hide it from the a11y tree. Otherwise
        // the component and its shadow DOM content show up as duplicate nodes with
        // the same aria-label.
        this.role = this.ariaLabel != null ? 'none' : null;
    }
    /** @ignore */
    getRequiredFields() {
        return [toPlaceLinkField(this.hrefField)];
    }
    placeHasData(place) {
        return (getFieldValue(place, this.hrefField) != null);
    }
    getHref() {
        const place = this.getPlace();
        if (!place)
            return null;
        return getFieldValue(place, this.hrefField) ?? null;
    }
    hasContentForSlot() {
        return !!(this.textContent?.trim() || (this.children.length > 0));
    }
    getDefaultLinkText(href) {
        switch (toPlaceLinkField(this.hrefField)) {
            case 'googleMapsURI':
                return 'View on Google Maps';
            case 'websiteURI':
            default:
                return getUrlDomain(href);
        }
    }
};
PlaceFieldLink.styles = css `
    :host(:hover) {
      text-decoration: underline;
    }

    a {
      color: inherit;
      text-decoration: inherit;
    }
  `;
__decorate([
    property({ type: String, reflect: true, attribute: 'href-field' }),
    __metadata("design:type", String)
], PlaceFieldLink.prototype, "hrefField", void 0);
__decorate([
    property({ attribute: 'aria-label', reflect: true, type: String }),
    __metadata("design:type", Object)
], PlaceFieldLink.prototype, "ariaLabel", void 0);
PlaceFieldLink = __decorate([
    customElement('gmpx-place-field-link')
], PlaceFieldLink);
export { PlaceFieldLink };
//# sourceMappingURL=place_field_link.js.map