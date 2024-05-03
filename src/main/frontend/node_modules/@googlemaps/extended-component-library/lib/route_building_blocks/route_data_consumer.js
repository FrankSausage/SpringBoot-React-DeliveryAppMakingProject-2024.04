/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import { consume, createContext } from '@lit/context';
import { property } from 'lit/decorators.js';
import { BaseComponent } from '../base/base_component.js';
/**
 * The context shared by `RouteDataProvider` and `RouteDataConsumer`.
 */
export const routeContext = createContext(Symbol('route'));
/**
 * Base class for components which render route data provided elsewhere; i.e.
 * route building blocks.
 *
 * This class implements functionality to retrieve route data via context from a
 * parent `<gmpx-route-data-provider>` component.
 */
export class RouteDataConsumer extends BaseComponent {
    /**
     * Returns the `DirectionsRoute` to be used when rendering.
     *
     * If a route data object is specified directly on the component as a
     * property, it will take priority. Otherwise, this method attempts to return
     * one provided by a parent `<gmpx-route-data-provider>` element.
     */
    getRoute() {
        return this.route ?? this.contextRoute;
    }
}
__decorate([
    consume({ context: routeContext, subscribe: true }),
    property({ attribute: false }),
    __metadata("design:type", Object)
], RouteDataConsumer.prototype, "contextRoute", void 0);
__decorate([
    property({ attribute: false }),
    __metadata("design:type", Object)
], RouteDataConsumer.prototype, "route", void 0);
//# sourceMappingURL=route_data_consumer.js.map