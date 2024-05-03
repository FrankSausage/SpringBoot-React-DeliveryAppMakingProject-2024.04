/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import '../../icon_button/icon_button.js';
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-directions-button': PlaceDirectionsButton;
    }
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
export declare class PlaceDirectionsButton extends PlaceDataConsumer {
    /** @ignore */
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    /**
     * A description that gets read by assistive devices. In the case of icon-only
     * buttons, you should always include an ARIA label for optimal accessibility.
     */
    ariaLabel: null;
    /**
     * Whether to render the button in a condensed layout, where the label appears
     * below the icon.
     */
    condensed: boolean;
    /**
     * Optionally specify the starting location or Place. Otherwise Google Maps
     * will ask for or estimate the user’s starting location.
     */
    origin?: google.maps.LatLng | google.maps.LatLngLiteral | Place;
    /** Get directions from destination to origin instead. */
    reversed: boolean;
    /** Specifies the display style of the button. */
    variant: 'outlined' | 'filled';
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(): void;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getHref;
}
