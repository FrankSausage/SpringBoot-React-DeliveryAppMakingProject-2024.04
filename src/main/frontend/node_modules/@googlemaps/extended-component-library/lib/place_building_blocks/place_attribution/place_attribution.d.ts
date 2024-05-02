/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TemplateResult } from 'lit';
import type { Place } from '../../utils/googlemaps_types.js';
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
export declare class PlaceAttribution extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    protected render(): TemplateResult<1>;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private makeAttributionHTML;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-attribution': PlaceAttribution;
    }
}
