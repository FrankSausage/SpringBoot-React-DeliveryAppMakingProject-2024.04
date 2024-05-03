/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Attaches a `ContextRoot` to document body if one was not attached already.
 *
 * In some cases, context consumers may be slotted into a parent component that
 * renders context provider in its shadow DOM. If the parent component is
 * upgraded late, its children may end up requesting a context that is not
 * currently provided by any provider.
 *
 * The `ContextRoot` class intercepts and tracks unsatisfied `context-request`
 * events and then redispatch these requests once providers become available.
 */
export declare function attachContextRoot(): void;
