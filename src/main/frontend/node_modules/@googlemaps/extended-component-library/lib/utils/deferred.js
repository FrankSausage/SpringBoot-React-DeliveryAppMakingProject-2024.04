/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utility wrapper of a Promise object with methods to resolve or reject the
 * promise after it is initialized.
 */
export class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolveCallback = resolve;
            this.rejectCallback = reject;
        });
    }
    /** Resolves the promise with the provided value. */
    resolve(value) {
        this.value = value;
        this.resolveCallback(value);
    }
    /** Rejects the promise with the provided error. */
    reject(error) {
        this.rejectCallback(error);
    }
}
//# sourceMappingURL=deferred.js.map