/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import './optional_data_container.js';
import '../place_building_blocks/place_attribution/place_attribution.js';
import '../place_building_blocks/place_data_provider/place_data_provider.js';
import '../place_building_blocks/place_distance_label/place_distance_label.js';
import '../place_building_blocks/place_field_boolean/place_field_boolean.js';
import '../place_building_blocks/place_field_link/place_field_link.js';
import '../place_building_blocks/place_field_text/place_field_text.js';
import '../place_building_blocks/place_opening_hours/place_opening_hours.js';
import '../place_building_blocks/place_photo_gallery/place_photo_gallery.js';
import '../place_building_blocks/place_price_level/place_price_level.js';
import '../place_building_blocks/place_rating/place_rating.js';
import '../place_building_blocks/place_reviews/place_reviews.js';
import { PropertyValues } from 'lit';
import { BaseComponent } from '../base/base_component.js';
import { SlotValidationController } from '../base/slot_validation_controller.js';
import { WebFontController } from '../base/web_font_controller.js';
import type { LatLng, LatLngLiteral, Place, PlaceResult } from '../utils/googlemaps_types.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-overview': PlaceOverview;
    }
}
/**
 * The place overview component displays detailed information about millions of
 * businesses, including opening hours, star reviews, and photos, plus
 * directions and other actions in a premade UI in 5 sizes and formats.
 *
 * This component can fetch Place data from the GMP Place API, or forward Place
 * data provided elsewhere in code. The component may attempt to locally cache
 * Place data to avoid redundant API requests.
 *
 * (x-large version) Reviews are displayed in an order corresponding to the
 * default behavior of the [Place
 * API](https://developers.google.com/maps/documentation/javascript/reference/place#Place).
 *
 * ![](./doc_src/place-overview.png)
 *
 * The easiest way to use this component is to start with a Place ID, which can
 * be retrieved from various Google Maps APIs or [looked up
 * directly](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
 *
 * This component is designed to display any provided buttons for custom
 * actions, such as a [directions
 * button](../place_building_blocks/place_directions_button/README.md) or [icon
 * button](../icon_button/README.md). **Be sure to include `slot="action"` on
 * the button components to be shown in the actions row.**
 *
 * @slot action - Optionally specify elements to be displayed as actions for
 * this Place. We recommend using `<gmpx-icon-button>` elements for this
 * purpose, which are styled consistently with Place Overview and designed to
 * produce the best result. Note that smaller sizes of Place Overview may
 * suppress the display of some or all action elements.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 *
 * @cssproperty [--gmpx-color-surface] - Background color.
 * @cssproperty [--gmpx-color-on-surface] - Main text color.
 * @cssproperty [--gmpx-color-on-surface-variant] - Color of less important text
 * such as captions.
 * @cssproperty [--gmpx-color-primary] - Color of buttons and icons.
 * @cssproperty [--gmpx-color-outline] - Color of divider elements and button
 * outlines.
 * @cssproperty [--gmpx-font-family-base] - Font family for regular text.
 * @cssproperty [--gmpx-font-family-headings] - Font family for headings.
 * @cssproperty [--gmpx-font-size-base] - Text size, sets scale for the
 * component.
 * @cssproperty [--gmpx-rating-color] - Color of star rating icons.
 * @cssproperty [--gmpx-rating-color-empty] - Background color of star
 * rating icons.
 * @cssproperty [--gmpx-hours-color-open] - Opening hours text color
 * when the place is open.
 * @cssproperty [--gmpx-hours-color-closed] - Opening hours text color
 * when the place is closed.
 */
export declare class PlaceOverview extends BaseComponent {
    static styles: import("lit").CSSResult;
    /**
     * If a `Place` or `PlaceResult` is provided for the `place` property, this
     * component will automatically make API calls to fetch any missing data
     * fields required for display. However, you can set this attribute to prevent
     * the component from making any API calls to fetch missing data. In this
     * case, the component will only display information present in the original
     * `Place` or `PlaceResult` object.
     */
    autoFetchDisabled: boolean;
    /**
     * @ignore
     * Place data passed from a parent `PlaceDataProvider` via context.
     */
    contextPlace: Place | undefined;
    /**
     * This component displays the Google logo to abide by Google Maps Platform
     * [attribution
     * policies](https://developers.google.com/maps/documentation/places/web-service/policies#logo).
     * However, if you otherwise satisfy these requirements (e.g. by placing this
     * component on the same screen as a Google Map), you may hide the logo.
     */
    googleLogoAlreadyDisplayed: boolean;
    /**
     * The place to be displayed by this component. Provide a [Place
     * ID](https://developers.google.com/maps/documentation/places/web-service/place-id)
     * as a string to have the component look up and display details from the
     * Place API. Alternatively, assign a `Place` or `PlaceResult` object to
     * `place` property to render it directly (note that the attribute, on the
     * other hand, only accepts a Place ID string).
     */
    place?: string | Place | PlaceResult;
    /**
     * Specifies a variation of this component, from smallest to largest. Larger
     * variations of this component display more data, which may affect cost:
     * - `x-small` size uses [Basic
     * Data](https://developers.google.com/maps/documentation/javascript/place-data-fields#basic)
     * and
     * [Atmosphere
     * Data](https://developers.google.com/maps/documentation/javascript/place-data-fields#atmosphere).
     * - All other sizes use [Basic
     * Data](https://developers.google.com/maps/documentation/javascript/place-data-fields#basic),
     * [Contact
     * Data](https://developers.google.com/maps/documentation/javascript/place-data-fields#contact),
     * and [Atmosphere
     * Data](https://developers.google.com/maps/documentation/javascript/place-data-fields#atmosphere).
     */
    size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
    /**
     * Travel mode to be used when computing transit time from `travel-origin`.
     */
    travelMode: Lowercase<google.maps.TravelMode>;
    /**
     * If specified, small, medium, large, and extra-large versions will
     * calculate transit time from this location to the current place, then
     * display the result.
     */
    travelOrigin?: LatLng | LatLngLiteral | Place;
    private readonly dataProviderElement?;
    protected readonly fontLoader: WebFontController;
    protected readonly slotValidator: SlotValidationController;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected readonly getMsg: <T extends keyof import("../base/strings.js").StringLiterals>(id: T, ...args: import("../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../base/strings.js").StringLiterals[T] ? T_1 extends import("../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1>;
    private getDisplayNameClass;
    private readonly renderHeaderSuffixContent;
    private readonly renderCondensedSummary;
    private readonly renderSummary;
    private readonly renderContacts;
    private readonly renderReviews;
    private forwardRequestError;
}
