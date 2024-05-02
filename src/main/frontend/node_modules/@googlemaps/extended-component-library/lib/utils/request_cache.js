/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LRUMap } from './lru_map.js';
/**
 * A limited-capacity cache keyed by serialized request objects.
 */
export class RequestCache {
    /**
     * @param capacity - The maximum number of objects to keep in the cache.
     * @param shouldRetry - Callback that determines if a request should be
     * retried, or if the failure should be cached.
     */
    constructor(capacity, shouldRetry) {
        this.shouldRetry = shouldRetry;
        this.requestCacheMap = new LRUMap(capacity);
    }
    /**
     * Gets the cached result with the given request
     */
    get(request) {
        return this.requestCacheMap.get(this.serialize(request)) ?? null;
    }
    /**
     * Adds the provided request to the cache, replacing the
     * existing result if one exists already.
     */
    set(key, value) {
        const serializedKey = this.serialize(key);
        this.requestCacheMap.set(serializedKey, value);
        value.catch((error) => {
            if (this.shouldRetry(error)) {
                this.requestCacheMap.delete(serializedKey);
            }
        });
    }
    /**
     * Deterministically serializes arbitrary objects to strings.
     */
    serialize(request) {
        // Non-numeric keys in modern JS are iterated in order of insertion.
        // Make a new object and insert the keys in alphabetical order so that
        // the object is serialized alphabetically.
        const replacer = (key, value) => {
            if (value instanceof Object && !(value instanceof Array)) {
                const obj = value;
                const sorted = {};
                for (const key of Object.keys(obj).sort()) {
                    sorted[key] = obj[key];
                }
                return sorted;
            }
            else {
                return value;
            }
        };
        return JSON.stringify(request, replacer);
    }
}
//# sourceMappingURL=request_cache.js.map