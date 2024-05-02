/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { createLinkElementForWebFont } from '../utils/dom_utils.js';
/** Web fonts that can be loaded. */
export var WebFont;
(function (WebFont) {
    WebFont["GOOGLE_SANS_TEXT"] = "Google Sans Text";
    WebFont["MATERIAL_SYMBOLS_OUTLINED"] = "Material Symbols Outlined";
})(WebFont || (WebFont = {}));
const WEB_FONT_CONFIGS = Object.freeze({
    [WebFont.GOOGLE_SANS_TEXT]: {
        loadInDocumentHead: true,
        loadInShadowRoot: false,
        weights: [400, 500],
    },
    [WebFont.MATERIAL_SYMBOLS_OUTLINED]: {
        // Material Symbols ligatures must be added under a component's shadow root
        // in order for its CSS style rule to take effect;
        // The font must also be loaded in the main document due to a long-standing
        // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=336876.
        loadInDocumentHead: true,
        loadInShadowRoot: true,
        weights: [400],
    },
});
/**
 * Controller that handles loading one or more font resources in the document.
 */
export class WebFontController {
    constructor(host, fonts) {
        this.host = host;
        this.fonts = fonts;
        host.addController(this);
        for (const font of fonts) {
            if (WEB_FONT_CONFIGS[font].loadInDocumentHead) {
                this.injectWebFontAsset(document.head, font);
            }
        }
    }
    hostConnected() {
        for (const font of this.fonts) {
            if (WEB_FONT_CONFIGS[font].loadInShadowRoot) {
                this.injectWebFontAsset(this.host.renderRoot, font);
            }
        }
    }
    injectWebFontAsset(rootNode, font) {
        const existing = rootNode.querySelector(`link[href*="${encodeURIComponent(font)}"]`);
        if (!existing) {
            rootNode.appendChild(createLinkElementForWebFont(font, WEB_FONT_CONFIGS[font].weights));
        }
    }
}
//# sourceMappingURL=web_font_controller.js.map