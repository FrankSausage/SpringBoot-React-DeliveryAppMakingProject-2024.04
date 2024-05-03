/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CSSResult } from 'lit';
/**
 * Primary theme color (e.g. buttons, hyperlinks). Can be modified via
 * `--gmpx-color-primary`.
 */
export declare const GMPX_COLOR_PRIMARY: CSSResult;
/**
 * Surface theme color (e.g. card background). Can be modified via
 * `--gmpx-color-surface`.
 */
export declare const GMPX_COLOR_SURFACE: CSSResult;
/**
 * Color of text on a primary-color background. Can be modified via
 * `--gmpx-color-on-primary`.
 */
export declare const GMPX_COLOR_ON_PRIMARY: CSSResult;
/**
 * Color of text on a surface-color background. Can be modified via
 * `--gmpx-color-on-surface`.
 */
export declare const GMPX_COLOR_ON_SURFACE: CSSResult;
/**
 * Color of supporting text on a surface-color background. Can be modified via
 * `--gmpx-color-on-surface-variant`.
 */
export declare const GMPX_COLOR_ON_SURFACE_VARIANT: CSSResult;
/**
 * Color of a button outline or divider element. Can be modified via
 * `--gmpx-color-outline`.
 */
export declare const GMPX_COLOR_OUTLINE: CSSResult;
/**
 * Color of the stars in a star rating. Can be modified via
 * `--gmpx-rating-color`.
 */
export declare const GMPX_RATING_COLOR: CSSResult;
/**
 * Color of the empty stars in a star rating. Can be modified via
 * `--gmpx-rating-color-empty`.
 */
export declare const GMPX_RATING_COLOR_EMPTY: CSSResult;
/** Typeface for body text. Can be modified via `--gmpx-font-family-base`. */
export declare const GMPX_FONT_FAMILY_BASE: CSSResult;
/**
 * Typeface for heading text (same as body text if unspecified). Can be
 * modified via `--gmpx-font-family-headings`.
 */
export declare const GMPX_FONT_FAMILY_HEADINGS: CSSResult;
/**
 * Baseline font size, from which other text elements in a component are scaled.
 * Can be modified via `--gmpx-font-size-base`.
 */
export declare const GMPX_FONT_SIZE_BASE: CSSResult;
/**
 * Computes CSS length on the type scale that scales with the base font size.
 * The result is affected by `--gmpx-font-size-base`.
 * For a 20px margin at the default font size of 14px, use this as:
 *
 *     margin: ${getTypeScaleSizeFromPx(20)};
 */
export declare function getTypeScaleSizeFromPx(px: number): CSSResult;
/**
 * Font of headline text. Can be modified via `--gmpx-font-family-headings` and
 * `--gmpx-font-size-base`.
 */
export declare const GMPX_FONT_HEADLINE: CSSResult;
/**
 * Font of large title text. Can be modified via `--gmpx-font-family-headings`
 * and `--gmpx-font-size-base`.
 */
export declare const GMPX_FONT_TITLE_LARGE: CSSResult;
/**
 * Font of medium title/label text. Can be modified via
 * `--gmpx-font-family-headings` and `--gmpx-font-size-base`.
 */
export declare const GMPX_FONT_TITLE_MEDIUM: CSSResult;
/**
 * Font of body text. Can be modified via `--gmpx-font-family-base` and
 * `--gmpx-font-size-base`.
 */
export declare const GMPX_FONT_BODY: CSSResult;
/**
 * Font of caption text. Can be modified via `--gmpx-font-family-base` and
 * `--gmpx-font-size-base`.
 */
export declare const GMPX_FONT_CAPTION: CSSResult;
/** Border style for separating UI sections. */
export declare const GMPX_BORDER_SEPARATOR: CSSResult;
