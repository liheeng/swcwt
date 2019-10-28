/**
 * Copyright 2019 geekapp.io and liheeng@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Point} from "fabric/fabric-impl";
import Composite from "../widget/Composite";
import LayoutData from "./LayoutData";
import {Border, Bounds} from "../SwcwtBase";

/**
 * This interface declares basic attributes of widget.
 */
export default interface Widget<E> {

    /**
     * Return border of widget.
     */
    getBorder(): Border | undefined;

    /**
     * Mark/flag container of the widget is invalid.
     */
    invalidate(): void;

    /**
     * Check if widget is valid.
     */
    isValid(): boolean;

    /**
     * Redo layout of widget.
     */
    validate(all: boolean): void;

    /**
     * Performs both of invalidate and validate.
     */
    revalidate(): void;

    /**
     * Return container of the widget, null means no container.
     */
    getParent(): Composite;

    /**
     * Return bounds of widget.
     *
     * @param absolute use absolute coordinates.
     * @param calculate caclulate bounds.
     */
    getBounds(absolute?: boolean, calculate?: boolean): Bounds;

    /**
     * Calculate size of widget.
     *
     * @param wHint
     * @param hHint
     * @param changed
     */
    computeSize(wHint: number, hHint: number, changed?: boolean): Point;

    /**
     * Update layout and its children layout.
     *
     * @param all update layout including any child recursively.
     */
    updateLayout(all: boolean): void;

    /**
     * Return layout data of widget.
     */
    getLayoutData(): LayoutData;

    /**
     * Return fabric objects of widget, widget actually is composite with fabric objects.
     */
    getInternalObjects(): E[];
}
