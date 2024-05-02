/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
/**
 * Query parameters for the script loading URL of the Maps JavaScript API.
 * See: https://developers.google.com/maps/documentation/javascript/url-params.
 */
declare interface BootstrapParams {
    key: string;
    v?: string;
    language?: string;
    region?: string;
    solutionChannel?: string;
    authReferrerPolicy?: string;
}
/**
 * Loads inline script for the Dynamic Library Import API. See:
 * https://developers.google.com/maps/documentation/javascript/dynamic-loading.
 */
declare function load(params: BootstrapParams): typeof google.maps;
declare const _default: {
    load: typeof load;
};
export default _default;
