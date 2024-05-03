/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
/** Web fonts that can be loaded. */
export declare enum WebFont {
    GOOGLE_SANS_TEXT = "Google Sans Text",
    MATERIAL_SYMBOLS_OUTLINED = "Material Symbols Outlined"
}
/**
 * Controller that handles loading one or more font resources in the document.
 */
export declare class WebFontController implements ReactiveController {
    private readonly host;
    private readonly fonts;
    constructor(host: ReactiveControllerHost & LitElement, fonts: WebFont[]);
    hostConnected(): void;
    private injectWebFontAsset;
}
