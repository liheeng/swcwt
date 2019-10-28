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
import SwcwtDefs from "../SwcwtDefs";
import Control from "../widget/Control";

export default class GridData extends AbstractLayoutData {
    widthHint: number = SwcwtDefs.DEFAULT;

    heightHint: number = SwcwtDefs.DEFAULT;

    horizontalIndent: number = 0;

    verticalIndent: number = 0;

    horizontalSpan: number = 1;

    verticalSpan: number = 1;

    grabExcessHorizontalSpace: boolean = false;

    grabExcessVerticalSpace: boolean = false;

    minimumWidth: number = 0;

    minimumHeight: number = 0;

    exclude: boolean = false;

    static readonly BEGINNING = SwcwtDefs.BEGINNING;

    static readonly CENTER = 2;

    static readonly END = 3;

    static readonly FILL = SwcwtDefs.FILL;

    static readonly VERTICAL_ALIGN_BEGINNING = 1 << 1;

    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control in the vertical center of the cell.
     * Not recommended. Use
     * <code>new GridData(int, SWT.CENTER, boolean, boolean)</code>
     * instead.
     */
    static readonly VERTICAL_ALIGN_CENTER = 1 << 2;

    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the bottom of the cell.
     * Not recommended. Use
     * <code>new GridData(int, SWT.END, boolean, boolean)</code>
     * instead.
     */
    static readonly VERTICAL_ALIGN_END = 1 << 3;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell vertically.
     * Not recommended. Use
     * <code>new GridData(int, SWT.FILL, boolean, boolean)</code>
     * instead
     */
    static readonly VERTICAL_ALIGN_FILL = 1 << 4;

    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the left of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.BEGINNING, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_BEGINNING = 1 << 5;

    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control in the horizontal center of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.CENTER, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_CENTER = 1 << 6;

    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the right of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.END, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_END = 1 << 7;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally.
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, int, boolean, boolean)</code>
     * instead.
     */
    static readonly HORIZONTAL_ALIGN_FILL = 1 << 8;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fit the remaining horizontal space.
     * Not recommended. Use
     * <code>new GridData(int, int, true, boolean)</code>
     * instead.
     */
    static readonly GRAB_HORIZONTAL = 1 << 9;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fit the remaining vertical space.
     * Not recommended. Use
     * <code>new GridData(int, int, boolean, true)</code>
     * instead.
     */
    static readonly GRAB_VERTICAL = 1 << 10;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell vertically and to fit the remaining
     * vertical space.
     * FILL_VERTICAL = VERTICAL_ALIGN_FILL | GRAB_VERTICAL
     * Not recommended. Use
     * <code>new GridData(int, SWT.FILL, boolean, true)</code>
     * instead.
     */
    static readonly FILL_VERTICAL = GridData.VERTICAL_ALIGN_FILL | GridData.GRAB_VERTICAL;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally and to fit the remaining
     * horizontal space.
     * FILL_HORIZONTAL = HORIZONTAL_ALIGN_FILL | GRAB_HORIZONTAL
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, int, true, boolean)</code>
     * instead.
     */
    static readonly FILL_HORIZONTAL = GridData.HORIZONTAL_ALIGN_FILL | GridData.GRAB_HORIZONTAL;

    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally and vertically and
     * to fit the remaining horizontal and vertical space.
     * FILL_BOTH = FILL_VERTICAL | FILL_HORIZONTAL
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, SWT.FILL, true, true)</code>
     * instead.
     */
    static readonly FILL_BOTH = GridData.FILL_VERTICAL | GridData.FILL_HORIZONTAL;

    cacheWidth: number = -1;
    cacheHeight: number = -1;
    defaultWhint: number;
    defaultHhint: number;
    defaultWidth: number = -1;
    defaultHeight: number = -1;
    currentWhint: number;
    currentHhint: number;
    currentWidth: number = -1;
    currentHeight: number = -1;

    constructor(horizontalAlignment?: number, verticalAlignment?: number, grabExcessHorizontalSpace?: boolean,
                grabExcessVerticalSpace?: boolean, horizontalSpan?: number, verticalSpan?: number) {
        super();
        this.horizontalAlignment = horizontalAlignment ? horizontalAlignment : SwcwtDefs.CENTER;
        this.verticalAlignment = verticalAlignment ? verticalAlignment : SwcwtDefs.BEGINNING;
        this.grabExcessHorizontalSpace = grabExcessHorizontalSpace ? grabExcessHorizontalSpace : false;
        this.grabExcessVerticalSpace = grabExcessVerticalSpace ? grabExcessVerticalSpace : false;
        this.horizontalSpan = horizontalSpan ? horizontalSpan : 1;
        this.verticalSpan = verticalSpan ? verticalSpan : 1;
    }

    public static newWithStyle(style?: number): GridData {
        const gd = new GridData();
        if (style) {
            if ((style & GridData.VERTICAL_ALIGN_BEGINNING) !== 0) { gd.verticalAlignment = GridData.BEGINNING; }
            if ((style & GridData.VERTICAL_ALIGN_CENTER) !== 0) { gd.verticalAlignment = GridData.CENTER; }
            if ((style & GridData.VERTICAL_ALIGN_FILL) !== 0) { gd.verticalAlignment = GridData.FILL; }
            if ((style & GridData.VERTICAL_ALIGN_END) !== 0) { gd.verticalAlignment = GridData.END; }
            if ((style & GridData.HORIZONTAL_ALIGN_BEGINNING) !== 0) { gd.horizontalAlignment = GridData.BEGINNING; }
            if ((style & GridData.HORIZONTAL_ALIGN_CENTER) !== 0) { gd.horizontalAlignment = GridData.CENTER; }
            if ((style & GridData.HORIZONTAL_ALIGN_FILL) !== 0) { gd.horizontalAlignment = GridData.FILL; }
            if ((style & GridData.HORIZONTAL_ALIGN_END) !== 0) { gd.horizontalAlignment = GridData.END; }
            gd.grabExcessHorizontalSpace = (style & GridData.GRAB_HORIZONTAL) !== 0;
            gd.grabExcessVerticalSpace = (style & GridData.GRAB_VERTICAL) !== 0;
        }
        return gd;
    }

    public static newWithSize(width: number, height: number): GridData {
        let gd = new GridData();
        gd.widthHint = width;
        gd.heightHint = height;
        return gd;
    }

    computeSize(control: Control, wHint: number, hHint: number, flushCache: boolean): void {
        if (this.cacheWidth !== -1 && this.cacheHeight !== -1) { return; }
        if (wHint === this.widthHint && hHint === this.heightHint) {
            if (this.defaultWidth === -1 || this.defaultHeight === -1
                || wHint !== this.defaultWhint || hHint !== this.defaultHhint) {
                let size = control.computeSize(wHint, hHint, flushCache);
                this.defaultWhint = wHint;
                this.defaultHhint = hHint;
                this.defaultWidth = size.x;
                this.defaultHeight = size.y;
            }
            this.cacheWidth = this.defaultWidth;
            this.cacheHeight = this.defaultHeight;
            return;
        }

        if (this.currentWidth === -1 || this.currentHeight === -1
            || wHint !== this.currentWhint || hHint !== this.currentHhint) {
            let size = control.computeSize(wHint, hHint, flushCache);
            this.currentWhint = wHint;
            this.currentHhint = hHint;
            this.currentWidth = size.x;
            this.currentHeight = size.y;
        }
        this.cacheWidth = this.currentWidth;
        this.cacheHeight = this.currentHeight;
    }

    flushCache(): void {
        this.cacheWidth = this.cacheHeight = -1;
        this.defaultWidth = this.defaultHeight = -1;
        this.currentWidth = this.currentHeight = -1;
    }
}
