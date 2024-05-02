/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
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
export class FocusController {
    get isKeyboardNavigating() {
        return this.isKeyboardNavigatingInternal ?? false;
    }
    constructor(host, changeCallback) {
        this.host = host;
        this.changeCallback = changeCallback;
        this.mousedownEventListener = () => {
            if (this.isKeyboardNavigatingInternal !== false) {
                this.isKeyboardNavigatingInternal = false;
                if (this.changeCallback)
                    this.changeCallback(false);
            }
        };
        this.keydownEventListener = ({ key }) => {
            if (key !== 'Tab' && key !== 'Enter')
                return;
            if (this.isKeyboardNavigatingInternal !== true) {
                this.isKeyboardNavigatingInternal = true;
                if (this.changeCallback)
                    this.changeCallback(true);
            }
        };
        this.host.addController(this);
    }
    hostConnected() {
        document.addEventListener('keydown', this.keydownEventListener);
        document.addEventListener('mousedown', this.mousedownEventListener);
    }
    hostDisconnected() {
        document.removeEventListener('keydown', this.keydownEventListener);
        document.removeEventListener('mousedown', this.mousedownEventListener);
    }
}
//# sourceMappingURL=focus_controller.js.map