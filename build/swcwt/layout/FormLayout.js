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
import AbstractLayout from "./AbstractLayout";
import { Bounds } from "../SwcwtBase";
import { fabric } from "fabric";
import FormData from "./FormData";
import Scrollable from "../widget/Scrollable";
import SwcwtDefs from "../SwcwtDefs";
var FormLayout = /** @class */ (function (_super) {
    __extends(FormLayout, _super);
    function FormLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spacing = 0;
        return _this;
    }
    /*
 * Computes the preferred height of the form with
 * respect to the preferred height of the control.
 *
 * Given that the equations for top (T) and bottom (B)
 * of the control in terms of the height of the form (X)
 * are:
 *		T = AX + B
 *		B = CX + D
 *
 * The equation for the height of the control (H)
 * is bottom (B) minus top (T) or (H = B - T) or:
 *
 *		H = (CX + D) - (AX + B)
 *
 * Solving for (X), the height of the form, we get:
 *
 *		X = (H + B - D) / (C - A)
 *
 * When (A = C), (C - A = 0) and the equation has no
 * solution for X.  This is a special case meaning that
 * the control does not constrain the height of the
 * form.  In this case, we need to arbitrarily define
 * the height of the form (X):
 *
 * Case 1: A = C, A = 0, C = 0
 *
 * 		Let X = D, the distance from the top of the form
 * 		to the bottom edge of the control.  In this case,
 * 		the control was attached to the top of the form
 * 		and the form needs to be large enough to show the
 * 		bottom edge of the control.
 *
 * Case 2: A = C, A = 1, C = 1
 *
 * 		Let X = -B, the distance from the bottom of the
 *		form to the top edge of the control.  In this case,
 * 		the control was attached to the bottom of the form
 * 		and the only way that the control would be visible
 * 		is if the offset is negative.  If the offset is
 * 		positive, there is no possible height for the form
 * 		that will show the control as it will always be
 * 		below the bottom edge of the form.
 *
 * Case 3: A = C, A !== 0, C !== 0 and A !== 1, C !== 0
 *
 * 		Let X = D / (1 - C), the distance from the top of the
 * 		form to the bottom edge of the control.  In this case,
 * 		since C is not 0 or 1, it must be a fraction, U / V.
 * 		The offset D is the distance from CX to the bottom edge
 * 		of the control.  This represents a fraction of the form
 * 		(1 - C)X. Since the height of a fraction of the form is
 * 		known, the height of the entire form can be found by setting
 * 		(1 - C)X = D.  We solve this equation for X in terms of U
 * 		and V, giving us X = (U * D) / (U - V). Similarly, if the
 * 		offset D is	negative, the control is positioned above CX.
 * 		The offset -B is the distance from the top edge of the control
 * 		to CX. We can find the height of the entire form by setting
 * 		CX = -B. Solving in terms of U and V gives us X = (-B * V) / U.
 */
    FormLayout.prototype.computeHeight = function (control, data, flushCache) {
        var top = data.getTopAttachment(control, this.spacing, flushCache);
        var bottom = data.getBottomAttachment(control, this.spacing, flushCache);
        var height = bottom.minus(top);
        if (height.numerator === 0) {
            if (bottom.numerator === 0) {
                return bottom.offset;
            }
            if (bottom.numerator === bottom.denominator) {
                return -top.offset;
            }
            if (bottom.offset <= 0) {
                return -top.offset * top.denominator / bottom.numerator;
            }
            var divider = bottom.denominator - bottom.numerator;
            return bottom.denominator * bottom.offset / divider;
        }
        return height.solveY(data.getHeight(control, flushCache));
    };
    FormLayout.prototype.computeSize = function (wHint, hHint, flushCache) {
        var size = this.layoutInternal(false, 0, 0, wHint, hHint, flushCache);
        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }
        return size;
    };
    FormLayout.prototype.flushCache = function (control) {
        var data = control.getLayoutData();
        if (data != null) {
            data.flushCache();
        }
        return true;
    };
    /*
     * Computes the preferred height of the form with
     * respect to the preferred height of the control.
     */
    FormLayout.prototype.computeWidth = function (control, data, flushCache) {
        var left = data.getLeftAttachment(control, this.spacing, flushCache);
        var right = data.getRightAttachment(control, this.spacing, flushCache);
        var width = right.minus(left);
        if (width.numerator === 0) {
            if (right.numerator === 0) {
                return right.offset;
            }
            if (right.numerator === right.denominator) {
                return -left.offset;
            }
            if (right.offset <= 0) {
                return -left.offset * left.denominator / left.numerator;
            }
            var divider = right.denominator - right.numerator;
            return right.denominator * right.offset / divider;
        }
        return width.solveY(data.getWidth(control, flushCache));
    };
    FormLayout.prototype.layout = function (flushCache) {
        var rect = this.getComposite().getClientArea();
        var x = rect.left + this.margin.left + this.marginWidth;
        var y = rect.top + this.margin.top + this.marginHeight;
        var width = Math.max(0, rect.width - this.margin.getWidth() - 2 * this.marginWidth);
        var height = Math.max(0, rect.height - this.margin.getHeight() - 2 * this.marginHeight);
        return this.layoutInternal(true, x, y, width, height, flushCache);
    };
    FormLayout.prototype.layoutInternal = function (move, x, y, width, height, flushCache) {
        var _this = this;
        var children = this.getComposite().getChildren();
        children.map(function (child, index) {
            var data = child.getLayoutData();
            if (data == null) {
                child.setLayoutData(data = new FormData());
            }
            if (flushCache) {
                data.flushCache();
            }
            data.cacheLeft = data.cacheRight = data.cacheTop = data.cacheBottom = null;
        });
        var flush = null;
        var bounds = null;
        var w = 0, h = 0;
        children.map(function (child, index) {
            var data = child.getLayoutData();
            if (width !== SwcwtDefs.DEFAULT) {
                data.needed = false;
                var left = data.getLeftAttachment(child, _this.spacing, flushCache);
                var right = data.getRightAttachment(child, _this.spacing, flushCache);
                var x1 = left.solveX(width), x2 = right.solveX(width);
                if (data.height === SwcwtDefs.DEFAULT && !data.needed) {
                    var trim = 0;
                    // TEMPORARY CODE
                    if (child instanceof Scrollable) {
                        var rect = child.computeTrim(0, 0, 0, 0);
                        trim = rect.width;
                    }
                    else {
                        trim = child.getBorderWidth() * 2;
                    }
                    data.cacheWidth = data.cacheHeight = -1;
                    var currentWidth = Math.max(0, x2 - x1 - trim);
                    data.computeSize(child, currentWidth, data.height, flushCache);
                    if (flush == null) {
                        flush = new Array(children.length);
                    }
                    flush[index] = true;
                }
                w = Math.max(x2, w);
                if (move) {
                    if (bounds == null) {
                        bounds = new Array(children.length);
                    }
                    bounds[index] = new Bounds(0, 0, 0, 0);
                    bounds[index].left = x + x1;
                    bounds[index].width = x2 - x1;
                }
            }
            else {
                w = Math.max(_this.computeWidth(child, data, flushCache), w);
            }
        });
        children.map(function (child, index) {
            var data = child.getLayoutData();
            if (height !== SwcwtDefs.DEFAULT) {
                var y1 = data.getTopAttachment(child, _this.spacing, flushCache).solveX(height);
                var y2 = data.getBottomAttachment(child, _this.spacing, flushCache).solveX(height);
                h = Math.max(y2, h);
                if (move) {
                    bounds[index].top = y + y1;
                    bounds[index].height = y2 - y1;
                }
            }
            else {
                h = Math.max(_this.computeHeight(child, data, flushCache), h);
            }
        });
        children.map(function (child, index) {
            var data = child.getLayoutData();
            if (flush != null && flush[index]) {
                data.cacheWidth = data.cacheHeight = -1;
            }
            data.cacheLeft = data.cacheRight = data.cacheTop = data.cacheBottom = null;
        });
        if (move) {
            children.map(function (child, index) {
                child.setBounds(bounds[index].left, bounds[index].top, bounds[index].width, bounds[index].height);
            });
        }
        w += this.margin.getWidth() + this.marginWidth * 2;
        h += this.margin.getHeight() + this.marginHeight * 2;
        return new fabric.Point(w, h);
    };
    return FormLayout;
}(AbstractLayout));
export default FormLayout;
//# sourceMappingURL=FormLayout.js.map