/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var RouteOverview_1;
import { __decorate, __metadata } from "tslib";
import '../route_building_blocks/route_data_provider/route_data_provider.js';
import '../route_building_blocks/route_polyline/route_polyline.js';
import '../route_building_blocks/route_marker/route_marker.js';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { BaseComponent } from '../base/base_component.js';
import { LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER } from '../utils/attribute_converters.js';
const INNER_POLYLINE_BLUE = '#1faefb';
const OUTER_POLYLINE_BLUE = '#2565cd';
/**
 * The route overview component renders a route on a `<gmp-map>` component,
 * including origin and destination markers, an outlined polyline, and viewport
 * management.
 *
 * This component can fetch route data from the Directions API, or use a
 * `DirectionsRoute` object provided from elsewhere in code. The component will
 * locally cache route data to avoid redundant API requests.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 */
let RouteOverview = RouteOverview_1 = class RouteOverview extends BaseComponent {
    constructor() {
        super();
        /**
         * The travel mode of the directions request.
         */
        this.travelMode = 'driving';
        /**
         * Hides the red pin displayed at the destination.
         */
        this.noPin = false;
        this.zIndex = 10 * RouteOverview_1.numConstructed++;
    }
    render() {
        // clang-format off
        return html `
      <gmpx-route-data-provider
          .destinationLatLng=${this.destinationLatLng}
          .destinationPlaceId=${this.destinationPlaceId}
          .destinationAddress=${this.destinationAddress}
          .originLatLng=${this.originLatLng}
          .originPlaceId=${this.originPlaceId}
          .originAddress=${this.originAddress}
          .route=${this.route}
          .travelMode=${this.travelMode}>
        <gmpx-route-polyline
            fit-in-viewport
            stroke-color="${OUTER_POLYLINE_BLUE}"
            stroke-weight="9"
            .zIndex=${this.zIndex}>
        </gmpx-route-polyline>
        <gmpx-route-polyline
            stroke-color="${INNER_POLYLINE_BLUE}"
            stroke-weight="5"
            .zIndex=${this.zIndex + 1}>
        </gmpx-route-polyline>
        <gmpx-route-marker
            waypoint="origin"
            .title=${this.originAddress ?? ''}
            .zIndex=${this.zIndex}>
          <svg width="20" height="20" style="position: relative; top: 13px;">
            <circle cx="10" cy="10" r="6" stroke="black" stroke-width="3" 
                fill="white"/>
          </svg>
        </gmpx-route-marker>
        <gmpx-route-marker
            waypoint="destination"
            .title=${this.destinationAddress ?? ''}
            .zIndex=${this.zIndex + 1}>
          <svg width="20" height="20" style="position: relative; top: 13px;">
            <circle cx="10" cy="10" r="7" stroke="black" stroke-width="3" 
                fill="white"/>
            <circle cx="10" cy="10" r="1.8" stroke="black" stroke-width="3" 
                fill="black"/>
          </svg>
        </gmpx-route-marker>
        ${when(!this.noPin, () => html `
          <gmpx-route-marker
              waypoint="destination"
              .title=${this.destinationAddress ?? ''}
              .zIndex=${this.zIndex + 2}>
          </gmpx-route-marker>`)}
      </gmpx-route-data-provider>
    `;
        // clang-format on
    }
};
RouteOverview.numConstructed = 0;
__decorate([
    property({
        converter: LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER,
        attribute: 'destination-lat-lng',
        reflect: true
    }),
    __metadata("design:type", Object)
], RouteOverview.prototype, "destinationLatLng", void 0);
__decorate([
    property({ type: String, attribute: 'destination-place-id', reflect: true }),
    __metadata("design:type", String)
], RouteOverview.prototype, "destinationPlaceId", void 0);
__decorate([
    property({ type: String, attribute: 'destination-address', reflect: true }),
    __metadata("design:type", String)
], RouteOverview.prototype, "destinationAddress", void 0);
__decorate([
    property({
        converter: LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER,
        attribute: 'origin-lat-lng',
        reflect: true
    }),
    __metadata("design:type", Object)
], RouteOverview.prototype, "originLatLng", void 0);
__decorate([
    property({ type: String, attribute: 'origin-place-id', reflect: true }),
    __metadata("design:type", String)
], RouteOverview.prototype, "originPlaceId", void 0);
__decorate([
    property({ type: String, attribute: 'origin-address', reflect: true }),
    __metadata("design:type", String)
], RouteOverview.prototype, "originAddress", void 0);
__decorate([
    property({ attribute: false }),
    __metadata("design:type", Object)
], RouteOverview.prototype, "route", void 0);
__decorate([
    property({ type: String, attribute: 'travel-mode', reflect: true }),
    __metadata("design:type", Object)
], RouteOverview.prototype, "travelMode", void 0);
__decorate([
    property({ type: Boolean, attribute: 'no-pin', reflect: true }),
    __metadata("design:type", Object)
], RouteOverview.prototype, "noPin", void 0);
RouteOverview = RouteOverview_1 = __decorate([
    customElement('gmpx-route-overview'),
    __metadata("design:paramtypes", [])
], RouteOverview);
export { RouteOverview };
//# sourceMappingURL=route_overview.js.map