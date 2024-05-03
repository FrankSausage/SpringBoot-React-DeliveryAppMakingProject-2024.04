/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { APILoader } from '../../api_loader/api_loader.js';
import { Deferred } from '../../utils/deferred.js';
import { MapController } from '../map_controller.js';
import { RouteDataConsumer } from '../route_data_consumer.js';
/**
 * Renders a marker indicating the origin or destination of a route.
 *
 * @slot - An element to be used as custom marker content on the map. The
 * element will be detached from the DOM and moved into the map's
 * implementation.
 */
let RouteMarker = class RouteMarker extends RouteDataConsumer {
    /**
     * The inner `google.maps.marker.AdvancedMarkerElement` from the Maps JS API.
     * This value is set once `innerMarkerPromise` is resolved.
     */
    get innerMarker() {
        return this.innerMarkerDeferred.value;
    }
    /**
     * Resolves to the inner marker when it's ready. It might not be ready
     * immediately becasue the `AdvancedMarkerElement` class is loaded
     * asynchronously from the Maps JS API.
     */
    get innerMarkerPromise() {
        return this.innerMarkerDeferred.promise;
    }
    constructor() {
        super();
        /**
         * Which waypoint of the route to position the marker on. For now, this is
         * either "origin" or "destination"; intermediate waypoints are not yet
         * supported.
         */
        this.waypoint = 'origin';
        /**
         * Rollover text for the marker, displayed on mouse hover.
         */
        this.title = '';
        this.innerMarkerDeferred = new Deferred();
        this.mapController = new MapController(this);
        this.initMarker();
    }
    async initMarker() {
        const { AdvancedMarkerElement } = await APILoader.importLibrary('marker', this);
        const marker = new AdvancedMarkerElement();
        this.innerMarkerDeferred.resolve(marker);
    }
    async connectedCallback() {
        super.connectedCallback();
        const map = await this.mapController.mapPromise;
        const marker = await this.innerMarkerPromise;
        // Make sure the component hasn't been disconnected while awaiting
        if (this.isConnected)
            marker.map = map;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.innerMarker)
            this.innerMarker.map = null;
    }
    render() {
        return html `<slot @slotchange=${this.onSlotChange}></slot>`;
    }
    updated(changedProperties) {
        if (changedProperties.has('waypoint') || changedProperties.has('route') ||
            changedProperties.has('contextRoute')) {
            this.updatePosition();
        }
        if (changedProperties.has('title'))
            this.updateTitle();
        if (changedProperties.has('zIndex'))
            this.updateZIndex();
    }
    async updatePosition() {
        const marker = await this.innerMarkerPromise;
        const route = this.getRoute();
        if (!route?.legs?.length) {
            marker.position = null;
            return;
        }
        const firstLeg = route.legs[0];
        const lastLeg = route.legs[route.legs.length - 1];
        if (!this.waypoint || this.waypoint === 'origin') {
            marker.position = firstLeg.start_location;
        }
        else if (this.waypoint === 'destination') {
            marker.position = lastLeg.end_location;
        }
        else {
            this.logger.error(`Unsupported waypoint "${this.waypoint}". Waypoint must be "origin" or "destination".`);
        }
    }
    async updateTitle() {
        const marker = await this.innerMarkerPromise;
        marker.title = this.title;
    }
    async updateZIndex() {
        const marker = await this.innerMarkerPromise;
        marker.zIndex = this.zIndex;
    }
    async onSlotChange(e) {
        const slot = e.target;
        const assignedElement = slot.assignedElements()[0];
        if (assignedElement) {
            const marker = await this.innerMarkerPromise;
            marker.content = assignedElement;
        }
    }
};
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], RouteMarker.prototype, "waypoint", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], RouteMarker.prototype, "title", void 0);
__decorate([
    property({ type: Number, attribute: false }),
    __metadata("design:type", Number)
], RouteMarker.prototype, "zIndex", void 0);
RouteMarker = __decorate([
    customElement('gmpx-route-marker'),
    __metadata("design:paramtypes", [])
], RouteMarker);
export { RouteMarker };
//# sourceMappingURL=route_marker.js.map