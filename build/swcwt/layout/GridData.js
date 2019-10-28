var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var GridData = /** @class */ (function (_super) {
    __extends(GridData, _super);
    function GridData(horizontalAlignment, verticalAlignment, grabExcessHorizontalSpace, grabExcessVerticalSpace, horizontalSpan, verticalSpan) {
        var _this = _super.call(this) || this;
        _this.widthHint = SwcwtDefs.DEFAULT;
        _this.heightHint = SwcwtDefs.DEFAULT;
        _this.horizontalIndent = 0;
        _this.verticalIndent = 0;
        _this.horizontalSpan = 1;
        _this.verticalSpan = 1;
        _this.grabExcessHorizontalSpace = false;
        _this.grabExcessVerticalSpace = false;
        _this.minimumWidth = 0;
        _this.minimumHeight = 0;
        _this.exclude = false;
        _this.cacheWidth = -1;
        _this.cacheHeight = -1;
        _this.defaultWidth = -1;
        _this.defaultHeight = -1;
        _this.currentWidth = -1;
        _this.currentHeight = -1;
        _this.horizontalAlignment = horizontalAlignment ? horizontalAlignment : SwcwtDefs.CENTER;
        _this.verticalAlignment = verticalAlignment ? verticalAlignment : SwcwtDefs.BEGINNING;
        _this.grabExcessHorizontalSpace = grabExcessHorizontalSpace ? grabExcessHorizontalSpace : false;
        _this.grabExcessVerticalSpace = grabExcessVerticalSpace ? grabExcessVerticalSpace : false;
        _this.horizontalSpan = horizontalSpan ? horizontalSpan : 1;
        _this.verticalSpan = verticalSpan ? verticalSpan : 1;
        return _this;
    }
    GridData.newWithStyle = function (style) {
        var gd = new GridData();
        if (style) {
            if ((style & GridData.VERTICAL_ALIGN_BEGINNING) !== 0) {
                gd.verticalAlignment = GridData.BEGINNING;
            }
            if ((style & GridData.VERTICAL_ALIGN_CENTER) !== 0) {
                gd.verticalAlignment = GridData.CENTER;
            }
            if ((style & GridData.VERTICAL_ALIGN_FILL) !== 0) {
                gd.verticalAlignment = GridData.FILL;
            }
            if ((style & GridData.VERTICAL_ALIGN_END) !== 0) {
                gd.verticalAlignment = GridData.END;
            }
            if ((style & GridData.HORIZONTAL_ALIGN_BEGINNING) !== 0) {
                gd.horizontalAlignment = GridData.BEGINNING;
            }
            if ((style & GridData.HORIZONTAL_ALIGN_CENTER) !== 0) {
                gd.horizontalAlignment = GridData.CENTER;
            }
            if ((style & GridData.HORIZONTAL_ALIGN_FILL) !== 0) {
                gd.horizontalAlignment = GridData.FILL;
            }
            if ((style & GridData.HORIZONTAL_ALIGN_END) !== 0) {
                gd.horizontalAlignment = GridData.END;
            }
            gd.grabExcessHorizontalSpace = (style & GridData.GRAB_HORIZONTAL) !== 0;
            gd.grabExcessVerticalSpace = (style & GridData.GRAB_VERTICAL) !== 0;
        }
        return gd;
    };
    GridData.newWithSize = function (width, height) {
        var gd = new GridData();
        gd.widthHint = width;
        gd.heightHint = height;
        return gd;
    };
    GridData.prototype.computeSize = function (control, wHint, hHint, flushCache) {
        if (this.cacheWidth !== -1 && this.cacheHeight !== -1) {
            return;
        }
        if (wHint === this.widthHint && hHint === this.heightHint) {
            if (this.defaultWidth === -1 || this.defaultHeight === -1
                || wHint !== this.defaultWhint || hHint !== this.defaultHhint) {
                var size = control.computeSize(wHint, hHint, flushCache);
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
            var size = control.computeSize(wHint, hHint, flushCache);
            this.currentWhint = wHint;
            this.currentHhint = hHint;
            this.currentWidth = size.x;
            this.currentHeight = size.y;
        }
        this.cacheWidth = this.currentWidth;
        this.cacheHeight = this.currentHeight;
    };
    GridData.prototype.flushCache = function () {
        this.cacheWidth = this.cacheHeight = -1;
        this.defaultWidth = this.defaultHeight = -1;
        this.currentWidth = this.currentHeight = -1;
    };
    GridData.BEGINNING = SwcwtDefs.BEGINNING;
    GridData.CENTER = 2;
    GridData.END = 3;
    GridData.FILL = SwcwtDefs.FILL;
    GridData.VERTICAL_ALIGN_BEGINNING = 1 << 1;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control in the vertical center of the cell.
     * Not recommended. Use
     * <code>new GridData(int, SWT.CENTER, boolean, boolean)</code>
     * instead.
     */
    GridData.VERTICAL_ALIGN_CENTER = 1 << 2;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the bottom of the cell.
     * Not recommended. Use
     * <code>new GridData(int, SWT.END, boolean, boolean)</code>
     * instead.
     */
    GridData.VERTICAL_ALIGN_END = 1 << 3;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell vertically.
     * Not recommended. Use
     * <code>new GridData(int, SWT.FILL, boolean, boolean)</code>
     * instead
     */
    GridData.VERTICAL_ALIGN_FILL = 1 << 4;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the left of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.BEGINNING, int, boolean, boolean)</code>
     * instead.
     */
    GridData.HORIZONTAL_ALIGN_BEGINNING = 1 << 5;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control in the horizontal center of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.CENTER, int, boolean, boolean)</code>
     * instead.
     */
    GridData.HORIZONTAL_ALIGN_CENTER = 1 << 6;
    /**
     * Style bit for <code>new GridData(int)</code> to position the
     * control at the right of the cell.
     * Not recommended. Use
     * <code>new GridData(SWT.END, int, boolean, boolean)</code>
     * instead.
     */
    GridData.HORIZONTAL_ALIGN_END = 1 << 7;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally.
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, int, boolean, boolean)</code>
     * instead.
     */
    GridData.HORIZONTAL_ALIGN_FILL = 1 << 8;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fit the remaining horizontal space.
     * Not recommended. Use
     * <code>new GridData(int, int, true, boolean)</code>
     * instead.
     */
    GridData.GRAB_HORIZONTAL = 1 << 9;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fit the remaining vertical space.
     * Not recommended. Use
     * <code>new GridData(int, int, boolean, true)</code>
     * instead.
     */
    GridData.GRAB_VERTICAL = 1 << 10;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell vertically and to fit the remaining
     * vertical space.
     * FILL_VERTICAL = VERTICAL_ALIGN_FILL | GRAB_VERTICAL
     * Not recommended. Use
     * <code>new GridData(int, SWT.FILL, boolean, true)</code>
     * instead.
     */
    GridData.FILL_VERTICAL = GridData.VERTICAL_ALIGN_FILL | GridData.GRAB_VERTICAL;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally and to fit the remaining
     * horizontal space.
     * FILL_HORIZONTAL = HORIZONTAL_ALIGN_FILL | GRAB_HORIZONTAL
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, int, true, boolean)</code>
     * instead.
     */
    GridData.FILL_HORIZONTAL = GridData.HORIZONTAL_ALIGN_FILL | GridData.GRAB_HORIZONTAL;
    /**
     * Style bit for <code>new GridData(int)</code> to resize the
     * control to fill the cell horizontally and vertically and
     * to fit the remaining horizontal and vertical space.
     * FILL_BOTH = FILL_VERTICAL | FILL_HORIZONTAL
     * Not recommended. Use
     * <code>new GridData(SWT.FILL, SWT.FILL, true, true)</code>
     * instead.
     */
    GridData.FILL_BOTH = GridData.FILL_VERTICAL | GridData.FILL_HORIZONTAL;
    return GridData;
}(AbstractLayoutData));
export default GridData;
//# sourceMappingURL=GridData.js.map