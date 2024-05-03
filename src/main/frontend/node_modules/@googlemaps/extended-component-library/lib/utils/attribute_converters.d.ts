/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { ComplexAttributeConverter } from 'lit';
type LatLngLiteral = google.maps.LatLngLiteral;
/**
 * Converter that transforms an optional `google.maps.LatLngLiteral` property
 * to/from an attribute string literal in the `lat,lng` format.
 */
export declare const LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER: ComplexAttributeConverter<LatLngLiteral | undefined>;
/**
 * Converter that transforms an optional string-array property to/from a
 * space-delimited attribute value.
 */
export declare const STRING_ARRAY_ATTRIBUTE_CONVERTER: ComplexAttributeConverter<string[] | undefined>;
export {};
