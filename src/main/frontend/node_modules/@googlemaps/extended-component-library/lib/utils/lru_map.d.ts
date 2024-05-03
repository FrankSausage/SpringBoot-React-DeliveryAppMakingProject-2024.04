/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A limited-capacity map with a least-recently-used eviction policy. Includes
 * the operations `get`, `set`, and `has`, which behave the same as on a `Map`.
 */
export declare class LRUMap<K, V> {
    private readonly capacity;
    private readonly map;
    /**
     * @param capacity - The maximum number of entries allowed in the map. When
     *     inserting a new entry beyond this limit, the least recently used entry
     *     will be evicted.
     */
    constructor(capacity: number);
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    delete(key: K): void;
    /**
     * Reinserts the entry with the given key if it exists. This is used to
     * implement the LRU policy: the native `Map` is ordered by insertion order,
     * so the reinsertion keeps it ordered by access time.
     */
    private reinsertIfPresent;
}
