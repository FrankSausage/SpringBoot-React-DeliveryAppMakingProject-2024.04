/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { customElement, property } from 'lit/decorators.js';
import { APILoader } from '../../api_loader/api_loader.js';
import { Deferred } from '../../utils/deferred.js';
import { MapController } from '../map_controller.js';
import { RouteDataConsumer } from '../route_data_consumer.js';
const POLYLINE_OPTIONS_PROPS = [
    'strokeColor',
    'strokeWeight',
    'strokeOpacity',
    'zIndex',
    'invisible',
];
/**
 * Renders a polyline indicating the path of a route.
 */
let RoutePolyline = class RoutePolyline extends RouteDataConsumer {
    /**
     * The inner `google.maps.Polyline` from the Maps JS API. This value is set
     * once `innerPolylinePromise` is resolved.
     */
    get innerPolyline() {
        return this.innerPolylineDeferred.value;
    }
    /**
     * Resolves to the inner polyline when it's ready. It might not be ready
     * immediately because the `Polyline` class is loaded asynchronously from
     * the Maps JS API.
     */
    get innerPolylinePromise() {
        return this.innerPolylineDeferred.promise;
    }
    constructor() {
        super();
        /**
         * Whether or not to automatically adjust the map's viewport to include the
         * polyline.
         */
        this.fitInViewport = false;
        /**
         * Whether or not the polyline is invisible or visible on the map.
         */
        this.invisible = false;
        this.innerPolylineDeferred = new Deferred();
        this.mapController = new MapController(this);
        this.initPolyline();
    }
    async initPolyline() {
        const { Polyline } = await APILoader.importLibrary('maps', this);
        const polyline = new Polyline();
        this.innerPolylineDeferred.resolve(polyline);
    }
    async connectedCallback() {
        super.connectedCallback();
        const polyline = await this.innerPolylinePromise;
        const map = await this.mapController.mapPromise;
        // Make sure the component hasn't been disconnected while awaiting
        if (this.isConnected) {
            polyline.setMap(map);
            await this.mapController.viewportManager.register(this);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.mapController.viewportManager?.unregister(this);
        this.innerPolyline?.setMap(null);
    }
    updated(changedProperties) {
        if (POLYLINE_OPTIONS_PROPS.some((prop) => changedProperties.has(prop))) {
            this.setInnerPolylineOptions();
        }
        if (changedProperties.has('route') ||
            changedProperties.has('contextRoute')) {
            this.updatePath();
        }
        if (changedProperties.has('fitInViewport') ||
            (this.fitInViewport &&
                (changedProperties.has('route') ||
                    changedProperties.has('contextRoute')))) {
            this.mapController.viewportManager?.updateViewport();
        }
    }
    /**
     * Returns the `LatLngBounds` of the polyline that should be included in the
     * map's viewport, for use by the `ViewportManager`.
     * @ignore
     */
    getBounds() {
        if (!this.fitInViewport)
            return null;
        return this.getRoute()?.bounds ?? null;
    }
    async setInnerPolylineOptions() {
        const options = {
            strokeColor: this.strokeColor,
            strokeWeight: this.strokeWeight,
            zIndex: this.zIndex,
            strokeOpacity: this.strokeOpacity,
            visible: !this.invisible,
        };
        const polyline = await this.innerPolylinePromise;
        polyline.setOptions(options);
    }
    async updatePath() {
        let path = [];
        const route = this.getRoute();
        if (route) {
            for (const leg of route.legs) {
                for (const step of leg.steps) {
                    path = path.concat(step.path);
                }
            }
        }
        const polyline = await this.innerPolylinePromise;
        polyline.setPath(path);
    }
};
__decorate([
    property({ attribute: 'fit-in-viewport', type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], RoutePolyline.prototype, "fitInViewport", void 0);
__decorate([
    property({ attribute: 'invisible', type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], RoutePolyline.prototype, "invisible", void 0);
__decorate([
    property({ attribute: 'stroke-color', type: String, reflect: true }),
    __metadata("design:type", String)
], RoutePolyline.prototype, "strokeColor", void 0);
__decorate([
    property({ attribute: 'stroke-opacity', type: Number, reflect: true }),
    __metadata("design:type", Number)
], RoutePolyline.prototype, "strokeOpacity", void 0);
__decorate([
    property({ attribute: 'stroke-weight', type: Number, reflect: true }),
    __metadata("design:type", Number)
], RoutePolyline.prototype, "strokeWeight", void 0);
__decorate([
    property({ attribute: 'z-index', type: Number, reflect: true }),
    __metadata("design:type", Number)
], RoutePolyline.prototype, "zIndex", void 0);
RoutePolyline = __decorate([
    customElement('gmpx-route-polyline'),
    __metadata("design:paramtypes", [])
], RoutePolyline);
export { RoutePolyline };
//# sourceMappingURL=route_polyline.js.map