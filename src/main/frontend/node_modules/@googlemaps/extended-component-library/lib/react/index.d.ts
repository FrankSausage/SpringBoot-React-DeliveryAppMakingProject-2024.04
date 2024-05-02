/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { EventName } from '@lit/react';
import { RequestErrorEvent } from '../base/events.js';
import { APILoader as APILoaderWC } from '../api_loader/api_loader.js';
export declare const APILoader: import("@lit/react").ReactWebComponent<APILoaderWC, {}>;
import { IconButton as IconButtonWC } from '../icon_button/icon_button.js';
export declare const IconButton: import("@lit/react").ReactWebComponent<IconButtonWC, {}>;
import { OverlayLayout as OverlayLayoutWC } from '../overlay_layout/overlay_layout.js';
export declare const OverlayLayout: import("@lit/react").ReactWebComponent<OverlayLayoutWC, {}>;
import { PlaceAttribution as PlaceAttributionWC } from '../place_building_blocks/place_attribution/place_attribution.js';
export declare const PlaceAttribution: import("@lit/react").ReactWebComponent<PlaceAttributionWC, {}>;
import { PlaceDataProvider as PlaceDataProviderWC } from '../place_building_blocks/place_data_provider/place_data_provider.js';
export declare const PlaceDataProvider: import("@lit/react").ReactWebComponent<PlaceDataProviderWC, {
    onRequestError: EventName<RequestErrorEvent>;
}>;
import { PlaceDirectionsButton as PlaceDirectionsButtonWC } from '../place_building_blocks/place_directions_button/place_directions_button.js';
export declare const PlaceDirectionsButton: import("@lit/react").ReactWebComponent<PlaceDirectionsButtonWC, {}>;
import { PlaceFieldBoolean as PlaceFieldBooleanWC } from '../place_building_blocks/place_field_boolean/place_field_boolean.js';
export declare const PlaceFieldBoolean: import("@lit/react").ReactWebComponent<PlaceFieldBooleanWC, {}>;
import { PlaceFieldLink as PlaceFieldLinkWC } from '../place_building_blocks/place_field_link/place_field_link.js';
export declare const PlaceFieldLink: import("@lit/react").ReactWebComponent<PlaceFieldLinkWC, {}>;
import { PlaceFieldText as PlaceFieldTextWC } from '../place_building_blocks/place_field_text/place_field_text.js';
export declare const PlaceFieldText: import("@lit/react").ReactWebComponent<PlaceFieldTextWC, {}>;
import { PlaceOpeningHours as PlaceOpeningHoursWC } from '../place_building_blocks/place_opening_hours/place_opening_hours.js';
export declare const PlaceOpeningHours: import("@lit/react").ReactWebComponent<PlaceOpeningHoursWC, {}>;
import { PlaceOverview as PlaceOverviewWC } from '../place_overview/place_overview.js';
export declare const PlaceOverview: import("@lit/react").ReactWebComponent<PlaceOverviewWC, {
    onRequestError: EventName<RequestErrorEvent>;
}>;
import { PlacePhotoGallery as PlacePhotoGalleryWC } from '../place_building_blocks/place_photo_gallery/place_photo_gallery.js';
export declare const PlacePhotoGallery: import("@lit/react").ReactWebComponent<PlacePhotoGalleryWC, {}>;
import { PlacePicker as PlacePickerWC } from '../place_picker/place_picker.js';
export declare const PlacePicker: import("@lit/react").ReactWebComponent<PlacePickerWC, {
    onPlaceChange: EventName<Event>;
    onRequestError: EventName<RequestErrorEvent>;
}>;
import { PlacePriceLevel as PlacePriceLevelWC } from '../place_building_blocks/place_price_level/place_price_level.js';
export declare const PlacePriceLevel: import("@lit/react").ReactWebComponent<PlacePriceLevelWC, {}>;
import { PlaceRating as PlaceRatingWC } from '../place_building_blocks/place_rating/place_rating.js';
export declare const PlaceRating: import("@lit/react").ReactWebComponent<PlaceRatingWC, {}>;
import { PlaceReviews as PlaceReviewsWC } from '../place_building_blocks/place_reviews/place_reviews.js';
export declare const PlaceReviews: import("@lit/react").ReactWebComponent<PlaceReviewsWC, {}>;
import { RouteDataProvider as RouteDataProviderWC } from '../route_building_blocks/route_data_provider/route_data_provider.js';
export declare const RouteDataProvider: import("@lit/react").ReactWebComponent<RouteDataProviderWC, {
    onRequestError: EventName<RequestErrorEvent>;
}>;
import { RouteMarker as RouteMarkerWC } from '../route_building_blocks/route_marker/route_marker.js';
export declare const RouteMarker: import("@lit/react").ReactWebComponent<RouteMarkerWC, {}>;
import { RouteOverview as RouteOverviewWC } from '../route_overview/route_overview.js';
export declare const RouteOverview: import("@lit/react").ReactWebComponent<RouteOverviewWC, {
    onRequestError: EventName<RequestErrorEvent>;
}>;
import { RoutePolyline as RoutePolylineWC } from '../route_building_blocks/route_polyline/route_polyline.js';
export declare const RoutePolyline: import("@lit/react").ReactWebComponent<RoutePolylineWC, {}>;
import { SplitLayout as SplitLayoutWC } from '../split_layout/split_layout.js';
export declare const SplitLayout: import("@lit/react").ReactWebComponent<SplitLayoutWC, {}>;
import { StoreLocator as StoreLocatorWC } from '../store_locator/store_locator.js';
export declare const StoreLocator: import("@lit/react").ReactWebComponent<StoreLocatorWC, {}>;
