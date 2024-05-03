/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** Creates a HTML link element that loads the specified web font family. */
export function createLinkElementForWebFont(font, weights) {
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@${encodeURIComponent(weights.join(';'))}`;
    return linkEl;
}
/**
 * Extracts the text and URL from the HTML attribution that is returned by the
 * Places API.
 */
export function extractTextAndURL(htmlAttribution) {
    const div = document.createElement('div');
    div.innerHTML = htmlAttribution;
    const link = div.querySelector('a');
    return {
        text: div.textContent || undefined,
        url: (link && link.href) || undefined,
    };
}
//# sourceMappingURL=dom_utils.js.map