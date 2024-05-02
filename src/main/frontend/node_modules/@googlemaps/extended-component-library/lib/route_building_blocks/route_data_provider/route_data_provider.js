/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { provide } from '@lit/context';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '../../base/base_component.js';
import { DirectionsController } from '../../place_building_blocks/place_distance_label/directions_controller.js';
import { LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER } from '../../utils/attribute_converters.js';
import { routeContext } from '../route_data_consumer.js';
/**
 * Provides route data to child components as context.
 *
 * This component can fetch route data from the Directions API, or forward a
 * `DirectionsRoute` object provided from elsewhere in code. The component will
 * locally cache route data to avoid redundant API requests.
 *
 * @slot - Elements to receive route data.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 */
let RouteDataProvider = class RouteDataProvider extends BaseComponent {
    constructor() {
        super(...arguments);
        /**
         * The travel mode of the directions request.
         */
        this.travelMode = 'driving';
        this.directionsController = new DirectionsController(this);
    }
    updated() {
        this.updateContextRoute();
    }
    async updateContextRoute() {
        if (this.route) {
            this.contextRoute = this.route;
            return;
        }
        const numOrigins = numTruthy(this.originAddress, this.originPlaceId, this.originLatLng);
        const numDestinations = numTruthy(this.destinationAddress, this.destinationPlaceId, this.destinationLatLng);
        if (numOrigins === 1 && numDestinations === 1) {
            this.contextRoute = await this.fetchRoute();
        }
        else {
            if (numOrigins > 1 && numDestinations !== 0) {
                this.logger.error('Too many origins. Only one of origin-lat-lng, ' +
                    'origin-place-id, or origin-address may be specified.');
            }
            if (numDestinations > 1 && numOrigins !== 0) {
                this.logger.error('Too many destinations. Only one of destination-lat-lng, ' +
                    'destination-place-id, or destination-address may be specified.');
            }
            this.contextRoute = undefined;
        }
    }
    async fetchRoute() {
        // If the request fails, directionsController.route will dispatch a
        // RequestErrorEvent and return null.
        const result = await this.directionsController.route({
            origin: this.getOriginRequestObject(),
            destination: this.getDestinationRequestObject(),
            travelMode: this.travelMode?.toUpperCase(),
        });
        return result?.routes ? result.routes[0] : undefined;
    }
    getOriginRequestObject() {
        if (this.originLatLng) {
            return { location: this.originLatLng };
        }
        else if (this.originPlaceId) {
            return { placeId: this.originPlaceId };
        }
        else {
            return { query: this.originAddress };
        }
    }
    getDestinationRequestObject() {
        if (this.destinationLatLng) {
            return { location: this.destinationLatLng };
        }
        else if (this.destinationPlaceId) {
            return { placeId: this.destinationPlaceId };
        }
        else {
            return { query: this.destinationAddress };
        }
    }
};
__decorate([
    provide({ context: routeContext }),
    property({
        attribute: false,
        // The contextRoute property is only set by the component itself during its
        // update cycle. Don't trigger a second update when this happens.
        hasChanged: () => false,
    }),
    __metadata("design:type", Object)
], RouteDataProvider.prototype, "contextRoute", void 0);
__decorate([
    property({
        converter: LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER,
        attribute: 'destination-lat-lng',
        reflect: true
    }),
    __metadata("design:type", Object)
], RouteDataProvider.prototype, "destinationLatLng", void 0);
__decorate([
    property({ type: String, attribute: 'destination-place-id', reflect: true }),
    __metadata("design:type", String)
], RouteDataProvider.prototype, "destinationPlaceId", void 0);
__decorate([
    property({ type: String, attribute: 'destination-address', reflect: true }),
    __metadata("design:type", String)
], RouteDataProvider.prototype, "destinationAddress", void 0);
__decorate([
    property({
        converter: LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER,
        attribute: 'origin-lat-lng',
        reflect: true
    }),
    __metadata("design:type", Object)
], RouteDataProvider.prototype, "originLatLng", void 0);
__decorate([
    property({ type: String, attribute: 'origin-place-id', reflect: true }),
    __metadata("design:type", String)
], RouteDataProvider.prototype, "originPlaceId", void 0);
__decorate([
    property({ type: String, attribute: 'origin-address', reflect: true }),
    __metadata("design:type", String)
], RouteDataProvider.prototype, "originAddress", void 0);
__decorate([
    property({ attribute: false }),
    __metadata("design:type", Object)
], RouteDataProvider.prototype, "route", void 0);
__decorate([
    property({ type: String, attribute: 'travel-mode', reflect: true }),
    __metadata("design:type", Object)
], RouteDataProvider.prototype, "travelMode", void 0);
RouteDataProvider = __decorate([
    customElement('gmpx-route-data-provider')
], RouteDataProvider);
export { RouteDataProvider };
/**
 * Counts and returns the number of arguments that are truthy.
 */
function numTruthy(...args) {
    return args.filter((x) => x).length;
}
//# sourceMappingURL=route_data_provider.js.map