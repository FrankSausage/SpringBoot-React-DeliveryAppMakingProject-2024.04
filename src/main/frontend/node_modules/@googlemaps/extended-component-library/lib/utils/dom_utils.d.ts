/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** Creates a HTML link element that loads the specified web font family. */
export declare function createLinkElementForWebFont(font: string, weights: number[]): HTMLLinkElement;
/**
 * Extracts the text and URL from the HTML attribution that is returned by the
 * Places API.
 */
export declare function extractTextAndURL(htmlAttribution: string): {
    text?: string;
    url?: string;
};
