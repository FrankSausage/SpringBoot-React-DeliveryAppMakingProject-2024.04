/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import '../split_layout/split_layout.js';
import '../overlay_layout/overlay_layout.js';
import '../route_overview/route_overview.js';
import '../place_overview/place_overview.js';
import '../place_picker/place_picker.js';
import '../icon_button/icon_button.js';
import '../place_building_blocks/place_directions_button/place_directions_button.js';
import { nothing } from 'lit';
import { BaseComponent } from '../base/base_component.js';
import { WebFontController } from '../base/web_font_controller.js';
import type { StoreLocatorListing } from './interfaces.js';
import { FeatureSet, QuickBuilderConfiguration } from './interfaces.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-store-locator': StoreLocator;
    }
}
/**
 * The store locator component displays an experience where your website's users
 * can browse a list of locations, find the nearest one, and view details.
 *
 * While store locations are the most common use case, you can use this
 * component to show many nearby points of interest like parks, ATMs, or gas
 * stations.
 *
 * To use `<gmpx-store-locator>`, pass it a JavaScript array containing the
 * locations you want to present. Each location, called a listing, is defined as
 * an object with the following properties:
 *
 * ```
 * interface StoreLocatorListing {
 *   // Name of the location or store
 *   title: string;
 *
 *   // Address lines, used when displaying the list.
 *   addressLines?: string[];
 *
 *   // Geographic coordinates of the location
 *   position: LatLng|LatLngLiteral;
 *
 *   // Place ID for this location, used to retrieve additional details
 *   placeId?: string;
 *
 *   // Optional list of additional actions to display with each location
 *   actions?: StoreLocatorAction[];
 * }
 *
 * interface StoreLocatorAction {
 *   // Button label for this action
 *   label: string;
 *
 *   // URI that will be opened in a new tab
 *   defaultUri?: string;
 * }
 * ```
 *
 * See below for a full example.
 *
 * @cssproperty [--gmpx-color-surface] - Background color.
 * @cssproperty [--gmpx-color-on-surface] - Main text color.
 * @cssproperty [--gmpx-color-on-surface-variant] - Color of less important text
 * such as captions.
 * @cssproperty [--gmpx-color-primary] - Color of buttons and icons.
 * @cssproperty [--gmpx-color-outline] - Button outline and divider color.
 * @cssproperty [--gmpx-fixed-panel-width-row-layout=28.5em] - Controls the side
 * panel width when the component is displayed in row direction. The map
 * width will adjust automatically to fill remaining space.
 * @cssproperty [--gmpx-fixed-panel-height-column-layout=65%] - Controls the
 * side panel height when the component is displayed in column direction. The
 * map height will adjust automatically to fill remaining space.
 * @cssproperty [--gmpx-font-family-base] - Font family for regular text.
 * @cssproperty [--gmpx-font-family-headings] - Font family for headings.
 * @cssproperty [--gmpx-font-size-base] - Text size, sets scale for the
 * component.
 * @cssproperty [--gmpx-hours-color-open] - Opening hours text color
 * when the place is open (`advanced` feature set only).
 * @cssproperty [--gmpx-hours-color-closed] - Opening hours text color
 * when the place is closed (`advanced` feature set only).
 * @cssproperty [--gmpx-rating-color] - Color of star rating icons in the
 * details view (`advanced` feature set only).
 * @cssproperty [--gmpx-rating-color-empty] - Background color of star
 * rating icons in the details view (`advanced` feature set only).
 */
export declare class StoreLocator extends BaseComponent {
    static styles: import("lit").CSSResult;
    /**
     * Chooses the capabilities of this store locator:
     *
     * * `'basic'` shows a list of locations with pins on a map.
     *
     * * `'intermediate'` adds a search input so users can find the location
     * closest to them.
     *
     * * `'advanced'` brings in a Place details view to show photos, hours, and
     * reviews for each location.
     */
    featureSet: FeatureSet;
    /**
     * The Map ID of the map. See the [Map ID
     * documentation](https://developers.google.com/maps/documentation/get-map-id)
     * for more information.
     */
    mapId?: string;
    /**
     * List of locations to display in the store locator.
     */
    listings?: StoreLocatorListing[];
    /**
     * Overrides for the map options. Provide values for `center` and `zoom` to
     * display a map when `listings` is empty.
     */
    mapOptions?: Partial<google.maps.MapOptions>;
    private internalListings;
    private selectedListing?;
    private searchLocation?;
    private detailsPlaceId?;
    private initialized;
    private overlayLayout?;
    private mapElement?;
    protected readonly getMsg: <T extends keyof import("../base/strings.js").StringLiterals>(id: T, ...args: import("../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../base/strings.js").StringLiterals[T] ? T_1 extends import("../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected readonly fontLoader: WebFontController;
    private mapsCoreLibrary?;
    private userCountry?;
    private readonly distanceMeasurer;
    private readonly listingDistances;
    constructor();
    /**
     * Blocks Lit lifecycle methods until the component is async-initialized. All
     * other component methods (except for the constructor) can expect that
     * `this.initialized` is true.
     */
    protected shouldUpdate(changedProperties: Map<string, unknown>): boolean;
    /**
     * Notes on willUpdate():
     * - This method will only be called when `this.initialized` is true.
     * - Unable to use `PropertyValues<this>` as the TS type since we are checking
     *   a private property.
     * https://lit.dev/docs/components/lifecycle/#typescript-types-for-changedproperties
     */
    protected willUpdate(changedProperties: Map<string, unknown>): void;
    protected updated(changedProperties: Map<string, unknown>): void;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
    /**
     * Configures the Store Locator component from data generated by the [Quick
     * Builder
     * tool](https://console.cloud.google.com/google/maps-apis/build/locator-plus)
     * in the Maps Console.
     *
     * @param configuration The configuration object generated by the Quick
     *     Builder tool.
     */
    configureFromQuickBuilder(configuration: QuickBuilderConfiguration): void;
    /**
     * Perform one-time initialization tasks; effectively an async constructor.
     */
    private initialize;
    private createInternalListing;
    private isIntermediateOrBetter;
    private updateDistances;
    /** Updates the end user's location, used for travel times and sorting. */
    private updateSearchLocation;
    /**
     * Updates the selected location.
     *
     * @returns true if the selected location was changed.
     */
    private selectLocation;
    /** Updates the map bounds to markers. */
    private updateBounds;
    private renderSidePanelOverlay;
    private renderListItem;
    private renderSidePanelMain;
    private renderSearchMarker;
    private renderMapMarker;
    private renderMapDirections;
    private renderMapPanel;
}
