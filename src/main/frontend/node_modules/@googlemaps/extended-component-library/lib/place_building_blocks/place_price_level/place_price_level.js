/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { priceLevelToNumeric } from '../../utils/place_utils.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
function renderPriceLevel(priceLevel, symbol) {
    if (priceLevel == null || priceLevel < 0 || symbol.length === 0)
        return '';
    return Array.from(symbol)[0].repeat(priceLevel);
}
/**
 * Renders a symbolic representation of a place's price level (e.g. $$$).
 */
let PlacePriceLevel = class PlacePriceLevel extends PlaceDataConsumer {
    constructor() {
        super(...arguments);
        /**
         * The currency symbol (such as $) to use.
         */
        this.symbol = '$';
    }
    render() {
        return html `<span>${this.getDisplayPriceLevel()}</span>`;
    }
    /** @ignore */
    getRequiredFields() {
        return ['priceLevel'];
    }
    placeHasData(place) {
        return (place.priceLevel != null);
    }
    getDisplayPriceLevel() {
        const place = this.getPlace();
        if (place?.priceLevel == null)
            return '';
        return renderPriceLevel(priceLevelToNumeric(place.priceLevel), this.symbol);
    }
};
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], PlacePriceLevel.prototype, "symbol", void 0);
PlacePriceLevel = __decorate([
    customElement('gmpx-place-price-level')
], PlacePriceLevel);
export { PlacePriceLevel };
//# sourceMappingURL=place_price_level.js.map