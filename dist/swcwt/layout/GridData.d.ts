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
import AbstractLayoutData from "./AbstractLayoutData";
import Control from "../widget/Control";
export default class GridData extends AbstractLayoutData {
    widthHint: number;
    heightHint: number;
    horizontalIndent: number;
    verticalIndent: number;
    horizontalSpan: number;
    verticalSpan: number;
    grabExcessHorizontalSpace: boolean;
    grabExcessVerticalSpace: boolean;
    minimumWidth: number;
    minimumHeight: number;
    exclude: boolean;
    static readonly BEGINNING: number;
    static readonly CENTER = 2;
    static readonly END = 3;
    static readonly FILL: number;
    static readonly VERTICAL_ALIGN_BEGINNING: number;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control in the vertical center of the cell.
     * Not recommended. Use
     * <code>new GridData(int, SWT.CENTER, boolean, boolean)</code>
     * instead.
     */
    static readonly VERTICAL_ALIGN_CENTER: number;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the bottom of the cell.
     * Not recommended. Use
     * <code>new GridData(int, SWT.END, boolean, boolean)</code>
     * instead.
     */
    static readonly VERTICAL_ALIGN_END: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell vertically.
     * Not recommended. Use
     * <code>new GridData(int, SWT.FILL, boolean, boolean)</code>
     * instead
     */
    static readonly VERTICAL_ALIGN_FILL: number;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the left of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.BEGINNING, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_BEGINNING: number;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control in the horizontal center of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.CENTER, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_CENTER: number;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the right of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.END, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_END: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally.
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_FILL: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fit the remaining horizontal space.
     * Not recommended. Use
     * <code>new GridData(int, int, true, boolean)</code>
     * instead.
     */
    static readonly GRAB_HORIZONTAL: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fit the remaining vertical space.
     * Not recommended. Use
     * <code>new GridData(int, int, boolean, true)</code>
     * instead.
     */
    static readonly GRAB_VERTICAL: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell vertically and to fit the remaining
     * vertical space.
     * FILL_VERTICAL = VERTICAL_ALIGN_FILL | GRAB_VERTICAL
     * Not recommended. Use
     * <code>new GridData(int, SWT.FILL, boolean, true)</code>
     * instead.
     */
    static readonly FILL_VERTICAL: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally and to fit the remaining
     * horizontal space.
     * FILL_HORIZONTAL = HORIZONTAL_ALIGN_FILL | GRAB_HORIZONTAL
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, int, true, boolean)</code>
     * instead.
     */
    static readonly FILL_HORIZONTAL: number;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally and vertically and
     * to fit the remaining horizontal and vertical space.
     * FILL_BOTH = FILL_VERTICAL | FILL_HORIZONTAL
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, SWT.FILL, true, true)</code>
     * instead.
     */
    static readonly FILL_BOTH: number;
    cacheWidth: number;
    cacheHeight: number;
    defaultWhint: number;
    defaultHhint: number;
    defaultWidth: number;
    defaultHeight: number;
    currentWhint: number;
    currentHhint: number;
    currentWidth: number;
    currentHeight: number;
    constructor(horizontalAlignment?: number, verticalAlignment?: number, grabExcessHorizontalSpace?: boolean, grabExcessVerticalSpace?: boolean, horizontalSpan?: number, verticalSpan?: number);
    static newWithStyle(style?: number): GridData;
    static newWithSize(width: number, height: number): GridData;
    computeSize(control: Control, wHint: number, hHint: number, flushCache: boolean): void;
    flushCache(): void;
}
