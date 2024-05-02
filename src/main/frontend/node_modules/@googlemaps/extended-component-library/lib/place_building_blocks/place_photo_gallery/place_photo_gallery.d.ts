/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FocusController } from '../../base/focus_controller.js';
import { WebFontController } from '../../base/web_font_controller.js';
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-photo-gallery': PlacePhotoGallery;
    }
}
/**
 * Component that displays photos of this place as tiles, with a lightbox view
 * when a photo is clicked. The lightbox includes proper photo attribution.
 *
 * @csspart tile - Styles each individual photo tile, including border radius,
 * width/height, margin, background color before image is loaded, etc.
 *
 * @cssproperty [--gmpx-font-family-base] - Font family used for captions in the lightbox.
 * @cssproperty [--gmpx-font-family-headings] - Font family of the place title in the lightbox.
 * @cssproperty [--gmpx-font-size-base] - Used to scale the component.
 */
export declare class PlacePhotoGallery extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    /**
     * The maximum number of photos to display as tiles. If undefined, all
     * available photos from the Place object will be displayed.
     *
     * Note that the Places API can fetch up to ten photos of a place.
     */
    maxTiles?: number;
    private selectedIndex;
    private tileSize?;
    private readonly containerElement?;
    private readonly lightboxElement?;
    private readonly firstTileElement?;
    protected readonly focusController: FocusController;
    protected readonly fontLoader: WebFontController;
    private readonly keydownEventListener;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected readonly getMsg: <T extends keyof import("../../base/strings.js").StringLiterals>(id: T, ...args: import("../../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../../base/strings.js").StringLiterals[T] ? T_1 extends import("../../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(): void;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getFormattedPhotos;
    private isRTL;
    private openLightbox;
    private closeLightbox;
    private navigateToPrevious;
    private navigateToNext;
}
