/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A limited-capacity map with a least-recently-used eviction policy. Includes
 * the operations `get`, `set`, and `has`, which behave the same as on a `Map`.
 */
export class LRUMap {
    /**
     * @param capacity - The maximum number of entries allowed in the map. When
     *     inserting a new entry beyond this limit, the least recently used entry
     *     will be evicted.
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    has(key) {
        this.reinsertIfPresent(key);
        return this.map.has(key);
    }
    get(key) {
        this.reinsertIfPresent(key);
        return this.map.get(key);
    }
    set(key, value) {
        // Rather than reinserting the entry, just delete it to avoid the extra call
        // to this.map.set().
        this.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            const [lruKey] = this.map.keys();
            this.map.delete(lruKey);
        }
    }
    delete(key) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }
    }
    /**
     * Reinserts the entry with the given key if it exists. This is used to
     * implement the LRU policy: the native `Map` is ordered by insertion order,
     * so the reinsertion keeps it ordered by access time.
     */
    reinsertIfPresent(key) {
        if (this.map.has(key)) {
            const value = this.map.get(key);
            this.map.delete(key);
            this.map.set(key, value);
        }
    }
}
//# sourceMappingURL=lru_map.js.map