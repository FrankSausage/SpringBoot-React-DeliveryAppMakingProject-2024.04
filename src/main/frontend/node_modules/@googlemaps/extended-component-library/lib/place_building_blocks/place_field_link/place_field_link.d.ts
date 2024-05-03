/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
/**
 * Supported field names for `PlaceFieldLink`, formatted as `Place` fields.
 */
export declare const PLACE_LINK_FIELDS: readonly ["googleMapsURI", "websiteURI"];
/**
 * Supported field names for `PlaceFieldLink`, formatted as `PlaceResult`
 * fields.
 */
export declare const PLACE_RESULT_LINK_FIELDS: readonly ["url", "website"];
type PlaceLinkField = typeof PLACE_LINK_FIELDS[number];
type PlaceResultLinkField = typeof PLACE_RESULT_LINK_FIELDS[number];
/**
 * String union type of all supported field names for `PlaceFieldLink`.
 */
export type LinkField = PlaceLinkField | PlaceResultLinkField;
/**
 * Component that renders an anchor tag to one of this place's URLs:
 * `websiteURI` or `googleMapsURI`. By default, renders a link to `websiteURI`
 * with the URL's domain as the text.
 */
export declare class PlaceFieldLink extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    /**
     * The field to link to, formatted as it is on either a `Place` or
     * `PlaceResult`.
     *
     * Allowed fields are: `googleMapsURI` or `url` for a link to this place on
     * Google Maps; `websiteURI` or `website` for a link to this place's
     * website.
     */
    hrefField: LinkField;
    /**
     * The link description that gets read by assistive technology.
     *
     * Set this to something more descriptive if the link's purpose isn't clear
     * from its text content alone. For example, if the link text is just
     * "Website", then the `aria-label` could be "Website for (business name)".
     */
    ariaLabel: string | null;
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(): void;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getHref;
    private hasContentForSlot;
    private getDefaultLinkText;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-field-link': PlaceFieldLink;
    }
}
export {};
