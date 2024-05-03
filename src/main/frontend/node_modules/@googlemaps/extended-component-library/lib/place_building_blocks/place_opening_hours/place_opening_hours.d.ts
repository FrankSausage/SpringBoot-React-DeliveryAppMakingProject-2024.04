/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../place_field_boolean/place_field_boolean.js';
import '../place_field_text/place_field_text.js';
import { nothing, PropertyValues } from 'lit';
import { WebFontController } from '../../base/web_font_controller.js';
import type { Place } from '../../utils/googlemaps_types.js';
import { PlaceDataConsumer } from '../place_data_consumer.js';
declare global {
    interface HTMLElementTagNameMap {
        'gmpx-place-opening-hours': PlaceOpeningHours;
    }
}
/**
 * Component that renders a summary of the place’s current opening status and an
 * accordion that shows the weekly opening hours when expanded.
 *
 * This component will display content only if there is sufficient data to
 * calculate the place’s opening status (unless the place is not operational, in
 * which case it will render the place’s business status instead). A place’s
 * opening status is determined by its business status, opening hours periods,
 * and UTC offset minutes.
 *
 * @cssproperty [--gmpx-hours-color-open] - Text color when the place is
 * currently open.
 * @cssproperty [--gmpx-hours-color-closed] - Text color when the place
 * is currently closed.
 */
export declare class PlaceOpeningHours extends PlaceDataConsumer {
    static styles: import("lit").CSSResult;
    /**
     * Render only the summary line, without the accordion containing weekly
     * opening hours.
     */
    summaryOnly: boolean;
    private expanded;
    private readonly poll;
    protected readonly fontLoader: WebFontController;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected readonly getMsg: <T extends keyof import("../../base/strings.js").StringLiterals>(id: T, ...args: import("../../base/strings.js").StringLiterals[T] extends infer T_1 ? T_1 extends import("../../base/strings.js").StringLiterals[T] ? T_1 extends import("../../base/strings.js").StringFunction ? Parameters<T_1> : [] : never : never) => string;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
    /** @ignore */
    getRequiredFields(): Array<keyof Place>;
    protected placeHasData(place: Place): boolean;
    private getOpenSummaryContent;
    private getClosedSummaryContent;
}
