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
import AbstractLayout from "./AbstractLayout";
import { Margin } from "../SwcwtBase";
import { fabric } from "fabric";
import Composite from "../widget/Composite";
import GridData from "./GridData";
import Control from "../widget/Control";
export default class GridLayout extends AbstractLayout {
    /**
     * numColumns specifies the number of cell columns in the layout.
     * If numColumns has a value less than 1, the layout will not
     * set the size and position of any controls.
     *
     * The default value is 1.
     */
    numColumns: number;
    /**
     * makeColumnsEqualWidth specifies whether all columns in the layout
     * will be forced to have the same width.
     *
     * The default value is false.
     */
    makeColumnsEqualWidth: boolean;
    /**
     * horizontalSpacing specifies the number of points between the right
     * edge of one cell and the left edge of its neighbouring cell to
     * the right.
     *
     * The default value is 5.
     */
    horizontalSpacing: number;
    /**
     * verticalSpacing specifies the number of points between the bottom
     * edge of one cell and the top edge of its neighbouring cell underneath.
     *
     * The default value is 5.
     */
    verticalSpacing: number;
    constructor(composite: Composite, margin?: Margin, numColumns?: number, makeColumnsEqualWidth?: boolean);
    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point;
    flushCache(control: Control): boolean;
    getData(grid: Control[][], row: number, column: number, rowCount: number, columnCount: number, first: boolean): GridData;
    layout(flushCache: boolean): fabric.Point;
    layoutInternal(move: boolean, x: number, y: number, width: number, height: number, flushCache: boolean): fabric.Point;
}
