/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { WebFontController } from '../../base/web_font_controller.js';
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Renders a list of user-generated place reviews.
 *
 * Reviews are displayed in an order corresponding to the default behavior of
 * the [Place
 * API](https://developers.google.com/maps/documentation/javascript/reference/place#Place).
 *
 * @cssproperty [--gmpx-rating-color] - Color of the star rating icons
 * when filled.
 * @cssproperty [--gmpx-rating-color-empty] - Color of the star rating
 * icons when empty.
 * @cssproperty [--gmpx-color-outline] - Divider color.
 */
export declare class PlaceReviews extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    /**
     * The maximum number of reviews to display. If undefined, displays all
     * reviews returned by the Places API, which provides at most 5.
     */
    maxReviews?: number;
    protected readonly fontLoader: WebFontController;
    protected readonly getMsg: <T extends keyof import("../../base/strings.js").StringLiterals>(id: T, ...args: import("../../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../../base/strings.js").StringLiterals[T] ? T_1 extends import("../../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1> | undefined;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private renderOneReview;
    private getReviews;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-reviews': PlaceReviews;
    }
}
