/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FeatureSet } from './interfaces.js';
/** Generates listing objects from a Quick Builder configuration. */
export function convertLocations(configuration) {
    function convertAction(action) {
        return { label: action.label ?? '', defaultUri: action.defaultUrl };
    }
    const mapListing = (location) => ({
        title: location.title ?? '',
        addressLines: [location.address1 ?? '', location.address2 ?? ''].filter(Boolean),
        position: location.coords ?? { lat: 0, lng: 0 },
        placeId: location.placeId,
        actions: (location.actions ?? []).map(convertAction),
    });
    return (configuration.locations ?? []).map(mapListing);
}
/**
 * Maps Quick Builder configuration capabilities to a Store Locator
 * `featureSet`.
 */
export function getFeatureSet(configuration) {
    if (configuration.capabilities?.directions) {
        return FeatureSet.ADVANCED;
    }
    else if (configuration.capabilities?.input) {
        return FeatureSet.INTERMEDIATE;
    }
    else {
        return FeatureSet.BASIC;
    }
}
/**
 * Sanitizes Quick Builder generated map options.
 */
export function getMapOptions(configuration) {
    const options = { ...(configuration.mapOptions ?? {}) };
    if (!options.mapId)
        delete options.mapId;
    return options;
}
//# sourceMappingURL=quick_builder.js.map