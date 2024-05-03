/**
 * @fileoverview This file contains Google Maps JS SDK typings, which are
 * published as `@types/google.maps`. However, sometimes there is a delay
 * in published typings. Components should use types from this file so we
 * can centrally shim/unshim them when necessary.
 *
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** google.maps.addressValidation.ConfirmationLevel */
export var ConfirmationLevel;
(function (ConfirmationLevel) {
    ConfirmationLevel["CONFIRMATION_LEVEL_UNSPECIFIED"] = "CONFIRMATION_LEVEL_UNSPECIFIED";
    ConfirmationLevel["CONFIRMED"] = "CONFIRMED";
    ConfirmationLevel["UNCONFIRMED_BUT_PLAUSIBLE"] = "UNCONFIRMED_BUT_PLAUSIBLE";
    ConfirmationLevel["UNCONFIRMED_AND_SUSPICIOUS"] = "UNCONFIRMED_AND_SUSPICIOUS";
})(ConfirmationLevel || (ConfirmationLevel = {}));
/** google.maps.addressValidation.Granularity */
export var Granularity;
(function (Granularity) {
    Granularity["GRANULARITY_UNSPECIFIED"] = "GRANULARITY_UNSPECIFIED";
    Granularity["SUB_PREMISE"] = "SUB_PREMISE";
    Granularity["PREMISE"] = "PREMISE";
    Granularity["PREMISE_PROXIMITY"] = "PREMISE_PROXIMITY";
    Granularity["BLOCK"] = "BLOCK";
    Granularity["ROUTE"] = "ROUTE";
    Granularity["OTHER"] = "OTHER";
})(Granularity || (Granularity = {}));
//# sourceMappingURL=googlemaps_types.js.map