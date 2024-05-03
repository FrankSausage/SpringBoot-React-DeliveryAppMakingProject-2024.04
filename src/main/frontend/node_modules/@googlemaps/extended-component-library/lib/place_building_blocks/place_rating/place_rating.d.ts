/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Renders a place's star rating in either full (4.9 ★★★★★) or condensed
 * (4.9 ★) form.
 *
 * @cssproperty [--gmpx-rating-color] - Color of the stars in a star
 * rating.
 * @cssproperty [--gmpx-rating-color-empty] - Color of the empty stars
 * in a star rating.
 */
export declare class PlaceRating extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    /**
     * Render a condensed star rating (4.9 ★) instead of the full format
     * (4.9 ★★★★★).
     */
    condensed: boolean;
    protected readonly getMsg: <T extends keyof import("../../base/strings.js").StringLiterals>(id: T, ...args: import("../../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../../base/strings.js").StringLiterals[T] ? T_1 extends import("../../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1> | undefined;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getRating;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-rating': PlaceRating;
    }
}
