/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Renders a symbolic representation of a place's price level (e.g. $$$).
 */
export declare class PlacePriceLevel extends PlaceDataConsumer {
    /**
     * The currency symbol (such as $) to use.
     */
    symbol: string;
    protected render(): import("lit-html").TemplateResult<1>;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getDisplayPriceLevel;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-price-level': PlacePriceLevel;
    }
}
