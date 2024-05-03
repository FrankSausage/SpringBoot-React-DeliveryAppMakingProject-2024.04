/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A limited-capacity cache keyed by serialized request objects.
 */
export declare class RequestCache<RequestType, ResponseType, ErrorType extends Error> {
    private readonly shouldRetry;
    private readonly requestCacheMap;
    /**
     * @param capacity - The maximum number of objects to keep in the cache.
     * @param shouldRetry - Callback that determines if a request should be
     * retried, or if the failure should be cached.
     */
    constructor(capacity: number, shouldRetry: (error: ErrorType) => boolean);
    /**
     * Gets the cached result with the given request
     */
    get(request: RequestType): Promise<ResponseType> | null;
    /**
     * Adds the provided request to the cache, replacing the
     * existing result if one exists already.
     */
    set(key: RequestType, value: Promise<ResponseType>): void;
    /**
     * Deterministically serializes arbitrary objects to strings.
     */
    private serialize;
}
