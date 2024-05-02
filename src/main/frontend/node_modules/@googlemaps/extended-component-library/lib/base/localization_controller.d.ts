/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import { StringFunction, StringLiterals } from './strings.js';
type ParametersOrEmpty<T extends string | StringFunction> = T extends StringFunction ? Parameters<T> : [];
/**
 * Controller that provides localized string literals (`en-US` by default)
 * for use in components of this library.
 */
export declare class LocalizationController implements ReactiveController {
    private readonly host;
    private static readonly connectedComponents;
    private static translatedStringLiterals;
    constructor(host: ReactiveControllerHost & LitElement);
    hostConnected(): void;
    hostDisconnected(): void;
    /**
     * Returns a localized string literal with the specified ID.
     *
     * @param args If the value keyed by that ID is a string function, provide
     * one or more inputs as function arguments.
     */
    getStringLiteral<T extends keyof StringLiterals>(id: T, ...args: ParametersOrEmpty<StringLiterals[T]>): string;
    /**
     * Sets one or many localized string literals in the new locale then
     * requests an update for all currently connected components.
     */
    static setStringLiterals(stringLiterals: Partial<StringLiterals>): void;
    /**
     * Builds instance of localizer controller to be used for getting string
     * literal messages.
     */
    static buildLocalizer(baseComponent: LitElement): <T extends keyof StringLiterals>(id: T, ...args: ParametersOrEmpty<StringLiterals[T]>) => string;
    /**
     * Resets Localization Controller state by clearing its connected components
     * and translated string literals. This method should be invoked for testing
     * purposes only.
     * @ignore
     */
    static reset(): void;
}
export {};
