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
import { GMPX_RATING_COLOR, GMPX_RATING_COLOR_EMPTY } from '../../base/common_styles.js';
import { LocalizationController } from '../../base/localization_controller.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
const MIN_RATING = 1;
const MAX_RATING = 5;
var IconType;
(function (IconType) {
    IconType["FULL"] = "full";
    IconType["HALF"] = "half";
    IconType["EMPTY"] = "empty";
})(IconType || (IconType = {}));
function toStarIcons(rating) {
    let numHalfStars = Math.round(rating * 2);
    const icons = [];
    while (numHalfStars > 1) {
        icons.push(IconType.FULL);
        numHalfStars -= 2;
    }
    if (numHalfStars > 0) {
        icons.push(IconType.HALF);
    }
    while (icons.length < MAX_RATING) {
        icons.push(IconType.EMPTY);
    }
    return icons;
}
/**
 * Renders a place's star rating in either full (4.9 ★★★★★) or condensed
 * (4.9 ★) form.
 *
 * @cssproperty [--gmpx-rating-color] - Color of the stars in a star
 * rating.
 * @cssproperty [--gmpx-rating-color-empty] - Color of the empty stars
 * in a star rating.
 */
let PlaceRating = class PlaceRating extends PlaceDataConsumer {
    constructor() {
        super(...arguments);
        /**
         * Render a condensed star rating (4.9 ★) instead of the full format
         * (4.9 ★★★★★).
         */
        this.condensed = false;
        this.getMsg = LocalizationController.buildLocalizer(this);
    }
    render() {
        const rating = this.getRating();
        return when(rating !== null, () => {
            const icons = this.condensed ? [IconType.FULL] : toStarIcons(rating);
            // clang-format off
            return html `
        <span role="img" aria-label=${this.getMsg('PLACE_RATING_ARIA_LABEL', rating.toFixed(1))}>
          <span aria-hidden="true">
            <span>${rating.toFixed(1)}</span>
            ${map(icons, (iconType) => {
                return html `<span class="star-icon ${iconType}">&#x2605;</span>`;
            })}
          </span>
        </span>
      `;
            // clang-format on
        });
    }
    /** @ignore */
    getRequiredFields() {
        return ['rating'];
    }
    placeHasData(place) {
        return (place.rating != null);
    }
    getRating() {
        const rating = this.getPlace()?.rating;
        if (!rating || rating < MIN_RATING || rating > MAX_RATING)
            return null;
        return rating;
    }
};
PlaceRating.styles = css `
    .star-icon.full {
      color: ${GMPX_RATING_COLOR};
    }
    .star-icon.empty {
      color: ${GMPX_RATING_COLOR_EMPTY};
    }
    .star-icon.half {
      color: ${GMPX_RATING_COLOR_EMPTY};
      position: relative;
    }
    .star-icon.half::before {
      color: ${GMPX_RATING_COLOR};
      content: '\\2605';
      overflow: hidden;
      position: absolute;
      width: 50%;
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], PlaceRating.prototype, "condensed", void 0);
PlaceRating = __decorate([
    customElement('gmpx-place-rating')
], PlaceRating);
export { PlaceRating };
//# sourceMappingURL=place_rating.js.map