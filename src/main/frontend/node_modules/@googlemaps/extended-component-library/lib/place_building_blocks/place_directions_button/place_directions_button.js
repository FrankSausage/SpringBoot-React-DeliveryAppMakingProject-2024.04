/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import '../../icon_button/icon_button.js';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { makeWaypoint } from '../../utils/place_utils.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Creates a Google Maps URL for directions from origin to destination
 * (https://developers.google.com/maps/documentation/urls#directions-action).
 */
function buildMapsDirectionsURL(origin, destination) {
    let url = 'https://www.google.com/maps/dir/?api=1';
    if (origin) {
        url = appendEncodedWaypointURLParams(url, 'origin', origin);
    }
    if (destination) {
        url = appendEncodedWaypointURLParams(url, 'destination', destination);
    }
    return url;
}
/**
 * Appends encoded URL parameters to a Google Maps Directions URL based on
 * waypoint information. Always includes a Place ID if it is specified by the
 * waypoint. Describes waypoint by query if available, or "lat,lng" otherwise.
 */
function appendEncodedWaypointURLParams(url, side, waypoint) {
    if (waypoint.placeId) {
        url += `&${side}_place_id=${waypoint.placeId}`;
    }
    if (waypoint.query) {
        url += `&${side}=${encodeURIComponent(waypoint.query)}`;
    }
    else if (waypoint.location) {
        url += `&${side}=${waypoint.location.lat},${waypoint.location.lng}`;
    }
    else if (waypoint.placeId) {
        // A Place ID can be used as an origin/destination, but it *must* be
        // accompanied by a query.
        url += `&${side}=${encodeURIComponent('Selected Place')}`;
    }
    return url;
}
/**
 * Component that opens a new tab with directions to this place in Google Maps.
 *
 * @slot - Content to display as the button’s label.
 *
 * @cssproperty [--gmpx-color-primary] - Button text and outline color in the
 * `outlined` variant, or background color in `filled` variant.
 * @cssproperty [--gmpx-color-on-primary] - Button text color in `filled`
 * variant.
 * @cssproperty [--gmpx-font-size-base] - Font size for the button.
 * @cssproperty [--gmpx-font-family-headings] - Font face for the button, except
 * for condensed mode.
 * @cssproperty [--gmpx-font-family-base] - Font face used when the button is in
 * condensed mode.
 */
let PlaceDirectionsButton = class PlaceDirectionsButton extends PlaceDataConsumer {
    constructor() {
        super(...arguments);
        /**
         * A description that gets read by assistive devices. In the case of icon-only
         * buttons, you should always include an ARIA label for optimal accessibility.
         */
        this.ariaLabel = null;
        /**
         * Whether to render the button in a condensed layout, where the label appears
         * below the icon.
         */
        this.condensed = false;
        /** Get directions from destination to origin instead. */
        this.reversed = false;
        /** Specifies the display style of the button. */
        this.variant = 'outlined';
    }
    render() {
        return html `
      <gmpx-icon-button
        .ariaLabel=${this.ariaLabel}
        .condensed=${this.condensed}
        .href=${this.getHref()}
        icon="directions"
        .variant=${this.variant}
      >
        <slot></slot>
      </gmpx-icon-button>
    `;
    }
    updated() {
        // If the aria-label attribute is set, hide it from the a11y tree. Otherwise
        // the component and its shadow DOM content show up as duplicate nodes with
        // the same aria-label.
        this.role = this.ariaLabel != null ? 'none' : null;
    }
    /** @ignore */
    getRequiredFields() {
        return ['displayName', 'formattedAddress', 'location'];
    }
    placeHasData(place) {
        // A Place requires a Place ID, which is enough to generate a link.
        return true;
    }
    getHref() {
        const place = this.getPlace();
        const origin = this.reversed ? place : this.origin;
        const destination = this.reversed ? this.origin : place;
        return buildMapsDirectionsURL(origin ? makeWaypoint(origin) : undefined, destination ? makeWaypoint(destination) : undefined);
    }
};
// https://lit.dev/docs/components/shadow-dom/#setting-shadowrootoptions
/** @ignore */
PlaceDirectionsButton.shadowRootOptions = {
    ...PlaceDataConsumer.shadowRootOptions,
    delegatesFocus: true,
};
__decorate([
    property({ attribute: 'aria-label', reflect: true, type: String }),
    __metadata("design:type", Object)
], PlaceDirectionsButton.prototype, "ariaLabel", void 0);
__decorate([
    property({ reflect: true, type: Boolean }),
    __metadata("design:type", Object)
], PlaceDirectionsButton.prototype, "condensed", void 0);
__decorate([
    property({ attribute: false }),
    __metadata("design:type", Object)
], PlaceDirectionsButton.prototype, "origin", void 0);
__decorate([
    property({ reflect: true, type: Boolean }),
    __metadata("design:type", Object)
], PlaceDirectionsButton.prototype, "reversed", void 0);
__decorate([
    property({ reflect: true, type: String }),
    __metadata("design:type", String)
], PlaceDirectionsButton.prototype, "variant", void 0);
PlaceDirectionsButton = __decorate([
    customElement('gmpx-place-directions-button')
], PlaceDirectionsButton);
export { PlaceDirectionsButton };
//# sourceMappingURL=place_directions_button.js.map