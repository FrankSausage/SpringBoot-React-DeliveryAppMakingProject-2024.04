/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utility wrapper of a Promise object with methods to resolve or reject the
 * promise after it is initialized.
 */
export declare class Deferred<T = void> {
    /** Value that the promise resolves to; undefined otherwise. */
    value?: T;
    private resolveCallback;
    private rejectCallback;
    readonly promise: Promise<T>;
    /** Resolves the promise with the provided value. */
    resolve(value: T): void;
    /** Rejects the promise with the provided error. */
    reject(error?: Error): void;
}
