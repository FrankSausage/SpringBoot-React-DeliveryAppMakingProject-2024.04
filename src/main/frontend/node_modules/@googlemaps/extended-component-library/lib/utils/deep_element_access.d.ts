/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Gets the active element, even if it's nested inside shadow DOMs.
 *
 * If the active element is in a shadow DOM, document.activeElement will be the
 * light DOM element whose shadow DOM contains it, so this is needed to find the
 * true active element.
 *
 * @return The active element, or `<body>` or null if there is none.
 */
export declare function getDeepActiveElement(): Element | null;
/**
 * Generator function that yields the chain of parent nodes upwards in the DOM
 * starting at `node`, and piercing shadow boundaries.
 */
export declare function deepParentChain(node: Node): Generator<Node, void, unknown>;
/**
 * Behaves like Node.contains() but accounts for shadow descendants as well.
 *
 * @param rootNode - A node that might be the ancestor.
 * @param otherNode - A node that might be the descendant.
 * @return true if otherNode is a light or shadow descendant of rootNode.
 */
export declare function deepContains(rootNode: Node | null | undefined, otherNode: Node | null | undefined): boolean;
/**
 * Returns true if for some node in rootNodes, otherNode is a light or shadow
 * descendant of the node. Uses a single search in
 * O(|rootNodes| + (depth of otherNode)).
 */
export declare function someDeepContains(rootNodes: Node[], otherNode: Node | null | undefined): boolean;
