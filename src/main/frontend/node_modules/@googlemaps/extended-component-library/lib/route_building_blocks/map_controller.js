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
import { deepParentChain } from '../utils/deep_element_access.js';
import { Deferred } from '../utils/deferred.js';
import { ViewportManager } from './viewport_manager.js';
/**
 * Controller that finds a containing `<gmp-map>` element in the DOM when its
 * host is connected, and saves a reference to the internal Map for the host to
 * use.
 */
export class MapController {
    get map() {
        return this.deferredMap.value;
    }
    /**
     * Resolves to the map when it's ready. It might not be ready immediately due
     * to delays in connecting the host or loading the `<gmp-map>` component from
     * the Maps JS API.
     */
    get mapPromise() {
        return this.deferredMap.promise;
    }
    constructor(host) {
        this.host = host;
        this.deferredMap = new Deferred();
        host.addController(this);
    }
    async hostConnected() {
        const gmpMap = this.getContainingGmpMap();
        if (gmpMap) {
            if (!customElements.get('gmp-map')) {
                await customElements.whenDefined('gmp-map');
            }
            const mapElement = gmpMap;
            // Make sure the host hasn't been disconnected while awaiting
            if (this.host.isConnected) {
                this.deferredMap.resolve(mapElement.innerMap);
                this.viewportManager = ViewportManager.getInstanceForMap(mapElement);
            }
        }
    }
    hostDisconnected() {
        this.deferredMap = new Deferred();
    }
    /**
     * Finds and returns a `<gmp-map>` in the DOM that contains the host element,
     * even if the host is in a shadow root. The `<gmp-map>` is identified by its
     * tag and might not be an instance of MapElement, if the custom element is
     * not yet defined.
     */
    getContainingGmpMap() {
        for (const node of deepParentChain(this.host)) {
            if (node instanceof Element && node.localName === 'gmp-map') {
                return node;
            }
        }
        return null;
    }
}
//# sourceMappingURL=map_controller.js.map