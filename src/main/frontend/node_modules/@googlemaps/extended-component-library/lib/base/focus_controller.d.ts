/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
/**
 * Controller to help customize focus behavior depending on if the user is
 * keyboard navigating with Tab and Enter.
 *
 * The controller's boolean property `isKeyboardNavigating` is flipped to true
 * when the user presses Tab or Enter, and flipped to false when they click the
 * mouse.
 *
 * The controller optionally accepts a callback that it calls whenever
 * `isKeyboardNavigating` changes. This can be used, for example, to toggle a
 * class in the host's shadow DOM to remove the default focus ring with CSS,
 * when it appears due to keypresses other than Tab/Enter.
 */
export declare class FocusController implements ReactiveController {
    private readonly host;
    private readonly changeCallback?;
    private isKeyboardNavigatingInternal?;
    get isKeyboardNavigating(): boolean;
    private readonly mousedownEventListener;
    private readonly keydownEventListener;
    constructor(host: ReactiveControllerHost & LitElement, changeCallback?: ((isKeyboardNavigating: boolean) => void) | undefined);
    hostConnected(): void;
    hostDisconnected(): void;
}
