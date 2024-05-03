/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AddressValidationResponse } from '../utils/googlemaps_types.js';
/** Suggested action to take for this validation result. */
export declare enum SuggestedAction {
    ACCEPT = "ACCEPT",
    CONFIRM = "CONFIRM",
    FIX = "FIX",
    ADD_SUBPREMISES = "ADD_SUBPREMISES"
}
interface ValidationSuggestion {
    suggestedAction: SuggestedAction;
}
/**
 * This is a JavaScript function that analyzes an Address Validation API
 * response and outputs a single recommended follow-up action you should take
 * based on the quality of the address.
 *
 * This function returns an object with a property `suggestedAction`, which can
 * be one of the following values:
 *
 * * `'FIX'`: the address returned by the API is low quality. You should prompt
 * your user for more information.
 *
 * * `'CONFIRM'`: the address returned by the API is high quality, but the API
 * had to make significant changes to the input address. You might prompt your
 * user for confirmation.
 *
 * * `'ACCEPT'`: the address returned by the API is high quality. There may be
 * small corrections made by the Address Validation API. You can accept the
 * address.
 *
 * * `'ADD_SUBPREMISES'`: The end user entered an address that should have a
 * subpremises (e.g. apartment number) but did not include one. Your app should
 * ask the end user for this extra information and try again.
 *
 * You should call this function after making a call to the Address Validation
 * API, providing the API response as its argument. Your system should either
 * accept the address or prompt the user, based on the response from this
 * function.
 *
 * The logic for converting the API response into a single recommended action is
 * based on the principles discussed in the [Build your validation
 * logic](https://developers.google.com/maps/documentation/address-validation/build-validation-logic).
 * There are many ways to analyze the API response; this function serves as
 * a suggested implementation.
 *
 * **Best Practices**
 *
 * * See [Workflow
 * overview](https://developers.google.com/maps/documentation/address-validation/build-validation-logic#workflow-overview)
 * for the recommended behavior your system should have for each recommended
 * action.
 *
 * * Allow your system to accept the entered address even if the user does
 * not respond to prompts to fix the address.
 *
 * * If you want to make your own modifications to the logic, we recommend
 * reading through [Build your validation
 * logic](https://developers.google.com/maps/documentation/address-validation/build-validation-logic)
 * for guidance.
 *
 * @param response - A response object from the Address Validation API in the
 *     Maps JS SDK.
 */
export declare function suggestValidationAction(response: AddressValidationResponse): ValidationSuggestion;
export {};
