/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import { ViewportManager } from './viewport_manager.js';
/**
 * Controller that finds a containing `<gmp-map>` element in the DOM when its
 * host is connected, and saves a reference to the internal Map for the host to
 * use.
 */
export declare class MapController implements ReactiveController {
    private readonly host;
    private deferredMap;
    get map(): google.maps.Map | undefined;
    /**
     * Resolves to the map when it's ready. It might not be ready immediately due
     * to delays in connecting the host or loading the `<gmp-map>` component from
     * the Maps JS API.
     */
    get mapPromise(): Promise<google.maps.Map>;
    /**
     * The viewport manager instance for the map. This is first defined when `map`
     * is defined, so it can be safely accessed after awaiting `mapPromise`.
     *
     * When the host is disconnected and `map` is unset, `viewportManager` remains
     * set to the most recent viewport manager, so that components can be
     * unregistered in the host's `disconnectedCallback`.
     */
    viewportManager?: ViewportManager;
    constructor(host: ReactiveControllerHost & LitElement);
    hostConnected(): Promise<void>;
    hostDisconnected(): void;
    /**
     * Finds and returns a `<gmp-map>` in the DOM that contains the host element,
     * even if the host is in a shadow root. The `<gmp-map>` is identified by its
     * tag and might not be an instance of MapElement, if the custom element is
     * not yet defined.
     */
    private getContainingGmpMap;
}
