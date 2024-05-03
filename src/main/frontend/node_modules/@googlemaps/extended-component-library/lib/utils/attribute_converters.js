/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Converter that transforms an optional `google.maps.LatLngLiteral` property
 * to/from an attribute string literal in the `lat,lng` format.
 */
export const LAT_LNG_LITERAL_ATTRIBUTE_CONVERTER = {
    fromAttribute(attr) {
        if (attr === null)
            return undefined;
        const [lat, lng] = attr.split(',').map((s) => Number(s.trim()));
        return { lat: lat || 0, lng: lng || 0 };
    },
    toAttribute(prop) {
        return prop ? `${prop.lat},${prop.lng}` : null;
    },
};
/**
 * Converter that transforms an optional string-array property to/from a
 * space-delimited attribute value.
 */
export const STRING_ARRAY_ATTRIBUTE_CONVERTER = {
    fromAttribute(attr) {
        return attr?.split(/\s+/).filter((s) => s !== '') ?? undefined;
    },
    toAttribute(prop) {
        return prop?.join(' ') ?? null;
    },
};
//# sourceMappingURL=attribute_converters.js.map