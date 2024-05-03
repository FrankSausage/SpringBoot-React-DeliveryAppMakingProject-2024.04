/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import type { QuickBuilderConfiguration, StoreLocatorListing } from './interfaces.js';
import { FeatureSet } from './interfaces.js';
/** Generates listing objects from a Quick Builder configuration. */
export declare function convertLocations(configuration: QuickBuilderConfiguration): StoreLocatorListing[];
/**
 * Maps Quick Builder configuration capabilities to a Store Locator
 * `featureSet`.
 */
export declare function getFeatureSet(configuration: QuickBuilderConfiguration): FeatureSet;
/**
 * Sanitizes Quick Builder generated map options.
 */
export declare function getMapOptions(configuration: QuickBuilderConfiguration): Partial<google.maps.MapOptions>;
