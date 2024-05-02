/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';
import { map } from 'lit/directives/map.js';
import { renderAttribution } from '../../utils/place_utils.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Component that renders any listing attributions from the Places API.
 *
 * When displaying data from the Places API, you are [required to
 * display](https://developers.google.com/maps/documentation/places/web-service/policies#other_attribution_requirements)
 * any attributions present in the response. This component assists in rendering
 * these listing attributions from a `Place` or `PlaceResult` object.
 *
 * The Place Data Provider component will automatically insert a Place
 * Attribution component if you do not include one. Please note that failure to
 * display this component can result in a violation of the Google Maps Platform
 * Terms Of Service.
 */
let PlaceAttribution = class PlaceAttribution extends PlaceDataConsumer {
    render() {
        const place = this.getPlace();
        if (!(place && this.placeHasData(place))) {
            return html ``;
        }
        const attributions = place.attributions || [];
        return html `${join(map(attributions, this.makeAttributionHTML), html `<span class="sep">, </span>`)}`;
    }
    /** @ignore */
    getRequiredFields() {
        return ['attributions'];
    }
    placeHasData(place) {
        return !!(place.attributions && place.attributions.length > 0);
    }
    makeAttributionHTML(attribution) {
        return renderAttribution(attribution.provider, attribution.providerURI);
    }
};
PlaceAttribution.styles = css `
    a {
      color: inherit;
      text-decoration: inherit;
    }

    a:hover {
      text-decoration: underline;
    }
  `;
PlaceAttribution = __decorate([
    customElement('gmpx-place-attribution')
], PlaceAttribution);
export { PlaceAttribution };
//# sourceMappingURL=place_attribution.js.map