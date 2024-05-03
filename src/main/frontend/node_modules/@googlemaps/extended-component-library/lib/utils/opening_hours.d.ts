/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="google.maps" />
import type { Place } from './googlemaps_types.js';
type OpeningHoursPoint = google.maps.places.OpeningHoursPoint;
/**
 * Formats a relative point in time (specified in the Place's TZ), usually
 * including the weekday. However, if the point in time, as an absolute
 * timestamp, occurs within the next 24 hours, hide the weekday.
 *
 * @param point The relative time from the Places API (weekday, hour, minute)
 * @param absolutePoint The instant in time corresponding to `point`, i.e. a
 *     `Date` object
 * @param now Used to determine if `absolutePoint` is coming soon
 */
export declare function formatTimeWithWeekdayMaybe(point: OpeningHoursPoint, absolutePoint: Date, now?: Date): string;
/**
 * Returns whether the given date is in the future and soon approaching. "Soon"
 * means sooner than the `intervalMs` argument (default 24 hours).
 */
export declare function isSoon(date: Date, now?: Date, intervalMs?: number): boolean;
/** Status indicator for an upcoming close time. */
export declare enum NextCloseTimeStatus {
    UNKNOWN = 0,
    ALWAYS_OPEN = 1,
    NOT_OPEN_NOW = 2,
    WILL_CLOSE = 3
}
interface UpcomingCloseTimeResult {
    status: NextCloseTimeStatus;
    closePoint?: OpeningHoursPoint;
    closeDate?: Date;
}
/**
 * Finds the next closing time of a Place, returning it (if present) and a
 * status flag.
 *
 * Does not take into account exceptional hours (such as holidays) or business
 * status.
 */
export declare function getUpcomingCloseTime(place: Place, now?: Date): UpcomingCloseTimeResult;
/** Status indicator for an upcoming opening time. */
export declare enum NextOpenTimeStatus {
    UNKNOWN = 0,
    NEVER_OPEN = 1,
    ALREADY_OPEN = 2,
    WILL_OPEN = 3
}
interface UpcomingOpenTimeResult {
    status: NextOpenTimeStatus;
    openPoint?: OpeningHoursPoint;
    openDate?: Date;
}
/**
 * Finds the next open time of a Place, returning it (if present) and a
 * status flag.
 *
 * Does not take into account exceptional hours (such as holidays) or business
 * status.
 */
export declare function getUpcomingOpenTime(place: Place, now?: Date): UpcomingOpenTimeResult;
/**
 * Temporary (until Place is GA) replacement for the built-in isOpen() method.
 */
export declare function isOpen(place: Place, now?: Date): boolean | undefined;
export {};
