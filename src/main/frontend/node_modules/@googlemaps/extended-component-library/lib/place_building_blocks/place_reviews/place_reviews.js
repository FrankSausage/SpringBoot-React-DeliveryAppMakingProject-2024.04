/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { getTypeScaleSizeFromPx, GMPX_BORDER_SEPARATOR, GMPX_COLOR_ON_SURFACE, GMPX_COLOR_ON_SURFACE_VARIANT, GMPX_FONT_BODY, GMPX_FONT_CAPTION, GMPX_FONT_TITLE_MEDIUM, GMPX_RATING_COLOR, GMPX_RATING_COLOR_EMPTY } from '../../base/common_styles.js';
import { LocalizationController } from '../../base/localization_controller.js';
import { WebFont, WebFontController } from '../../base/web_font_controller.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
const MAX_RATING = 5;
var IconType;
(function (IconType) {
    IconType["FULL"] = "full";
    IconType["EMPTY"] = "empty";
})(IconType || (IconType = {}));
function toStarIcons(rating) {
    return Array.from({ length: MAX_RATING })
        .fill(IconType.FULL, 0, rating)
        .fill(IconType.EMPTY, rating);
}
/**
 * Renders a list of user-generated place reviews.
 *
 * Reviews are displayed in an order corresponding to the default behavior of
 * the [Place
 * API](https://developers.google.com/maps/documentation/javascript/reference/place#Place).
 *
 * @cssproperty [--gmpx-rating-color] - Color of the star rating icons
 * when filled.
 * @cssproperty [--gmpx-rating-color-empty] - Color of the star rating
 * icons when empty.
 * @cssproperty [--gmpx-color-outline] - Divider color.
 */
let PlaceReviews = class PlaceReviews extends PlaceDataConsumer {
    constructor() {
        super(...arguments);
        this.fontLoader = new WebFontController(this, [WebFont.GOOGLE_SANS_TEXT]);
        this.getMsg = LocalizationController.buildLocalizer(this);
    }
    render() {
        const reviews = this.getReviews();
        return when(reviews && reviews.length, () => html `
      <div class="container">
        ${map(reviews, this.renderOneReview.bind(this))}
      </div>
    `);
    }
    /** @ignore */
    getRequiredFields() {
        return ['reviews'];
    }
    placeHasData(place) {
        return !!(place.reviews && place.reviews.length > 0);
    }
    renderOneReview(review) {
        const attribution = review.authorAttribution;
        const header = html `
      <div class="header">
        ${when(attribution?.photoURI, () => html `
          <a target="_blank" href="${attribution?.uri ?? ''}">
            <img class="author-photo"
                alt=${this.getMsg('PLACE_REVIEWS_AUTHOR_PHOTO_ALT', attribution?.displayName ?? '')}
                src=${attribution.photoURI}>
          </a>
        `)}
        <a class="author-name"
          target="_blank"
          href="${attribution?.uri ?? ''}">
          ${attribution?.displayName ?? ''}
        </a>
      </div>
    `;
        // clang-format off
        const subheader = html `
      <div class="subheader">
        ${when(review.rating, () => html `
          <span role="img" aria-label=${this.getMsg('PLACE_RATING_ARIA_LABEL', review.rating)}>
            <span aria-hidden="true">
              ${map(toStarIcons(review.rating), (iconType) => {
            return html `<span class="star-icon ${iconType}">&#x2605;</span>`;
        })}
            </span>
          </span>
        `)}
        <span class="relative-time">
          ${review.relativePublishTimeDescription ?? ''}
        </span>
      </div>
    `;
        // clang-format on
        return html `
      <div class="review">
        ${header}
        ${subheader}
        ${when(review.text, () => html `
          <div class="body">
            ${review.text}
          </div>
        `)}
      </div>
    `;
    }
    getReviews() {
        const reviews = this.getPlace()?.reviews;
        if (!reviews)
            return null;
        if (this.maxReviews === undefined)
            return reviews;
        if (this.maxReviews < 1)
            return null;
        return reviews.slice(0, Math.floor(this.maxReviews));
    }
};
PlaceReviews.styles = css `
    .container {
      color: ${GMPX_COLOR_ON_SURFACE};
      font: ${GMPX_FONT_BODY};
    }
    .review {
      padding: ${getTypeScaleSizeFromPx(20)};
      padding-bottom: ${getTypeScaleSizeFromPx(16)};
    }
    .review:not(:last-child) {
      border-bottom: ${GMPX_BORDER_SEPARATOR};
    }
    .header, .subheader {
      align-items: center;
      display: flex;
    }
    .subheader {
      margin-top: ${getTypeScaleSizeFromPx(16)};
    }
    .body {
      margin-top: ${getTypeScaleSizeFromPx(8)};
    }
    .author-photo {
      display: block;
      height: ${getTypeScaleSizeFromPx(32)};
    }
    .author-name {
      color: inherit;
      font: ${GMPX_FONT_TITLE_MEDIUM};
      margin-inline-start: ${getTypeScaleSizeFromPx(8)};
      text-decoration: none;
    }
    .author-name:hover {
      text-decoration: underline;
    }
    .star-icon.full {
      color: ${GMPX_RATING_COLOR};
    }
    .star-icon.empty {
      color: ${GMPX_RATING_COLOR_EMPTY};
    }
    .relative-time {
      color: ${GMPX_COLOR_ON_SURFACE_VARIANT};
      font: ${GMPX_FONT_CAPTION};
      margin-inline-start: ${getTypeScaleSizeFromPx(12)};
    }
  `;
__decorate([
    property({ type: Number, reflect: true, attribute: 'max-reviews' }),
    __metadata("design:type", Number)
], PlaceReviews.prototype, "maxReviews", void 0);
PlaceReviews = __decorate([
    customElement('gmpx-place-reviews')
], PlaceReviews);
export { PlaceReviews };
//# sourceMappingURL=place_reviews.js.map