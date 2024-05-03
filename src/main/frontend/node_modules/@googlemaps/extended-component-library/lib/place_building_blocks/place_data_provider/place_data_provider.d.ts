/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PropertyValues } from 'lit';
import { BaseComponent } from '../../base/base_component.js';
import { SlotValidationController } from '../../base/slot_validation_controller.js';
import type { Place, PlaceResult } from '../../utils/googlemaps_types.js';
import { type PlaceConsumerRegistration } from '../place_data_consumer.js';
/**
 * Provides place data to child components as context.
 *
 * This component can fetch place data from the Places API, or forward a Place
 * or PlaceResult object provided elsewhere in code. By default, this component
 * will only request fields from the Places API which are required to render
 * child components. The component will locally cache place data to avoid
 * redundant API requests.
 *
 * @slot - Elements to receive Places data.
 * @slot initial-loading - If specified, display this content when the component
 * is initially loading Places data. Content in this slot will receive Places
 * data, but some or all fields may be undefined.
 * @slot error - If specified, display this content when there was any error
 * loading data from the Places API.
 *
 * @event {RequestErrorEvent} gmpx-requesterror - Indicates an error condition
 * in an underlying Google Maps JavaScript API call. (React: onRequestError)
 */
export declare class PlaceDataProvider extends BaseComponent {
    /**
     * If `place` is provided with a `Place` or `PlaceResult` instance, but does
     * not contain fields required by child components, this element will make a
     * request to the Place API to retrieve the missing data. Set
     * `auto-fetch-disabled` to prevent the component from performing these
     * requests.
     */
    autoFetchDisabled: boolean;
    /**
     * Manually specify the fields to request from the Places API.
     *
     * If unspecified, the component will request only fields used by child
     * components.
     */
    fields?: string[];
    /**
     * The place to be displayed by this component. Provide a [Place
     * ID](https://developers.google.com/maps/documentation/places/web-service/place-id)
     * as a string to have the component look up and display details from the
     * Place API. The component will not make further API requests if child
     * components are added at a later time. If required, explicitly request a
     * data fetch by re-setting `place` to the same Place ID as before.
     *
     * Alternatively, assign a `Place` or `PlaceResult` object to the `place`
     * property to render it directly (note that the attribute, on the other hand,
     * only accepts a Place ID string).
     */
    place?: string | Place | PlaceResult;
    /**
     * @ignore
     * Place consumer registration functions, passed to child `PlaceDataConsumer`s
     * via context.
     */
    contextRegistration: PlaceConsumerRegistration;
    private loadingState;
    protected readonly slotValidator: SlotValidationController;
    private readonly placeConsumers;
    private readonly placeAttributions;
    private readonly placeContextProvider;
    /**
     * Place data passed to child `PlaceDataConsumer`s via context.
     */
    private get contextPlace();
    private set contextPlace(value);
    private static readonly placeLookup;
    protected render(): import("lit-html").TemplateResult<1> | undefined;
    protected updated(changedProperties: PropertyValues<this>): Promise<void>;
    private updatePlace;
    private registerPlaceConsumer;
    private unregisterPlaceConsumer;
    private getConsumerFields;
    /**
     * Appends a Place Attribution component as child if none exists in order to
     * comply with the Google Maps Platform Terms of Service.
     */
    private appendAttributionIfAbsent;
    private handleError;
}
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-data-provider': PlaceDataProvider;
    }
}
