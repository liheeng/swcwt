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
import FillData from "./FillData";
import SwcwtDefs from "../SwcwtDefs";
import { fabric } from "fabric";
var FillLayout = /** @class */ (function (_super) {
    __extends(FillLayout, _super);
    function FillLayout(composite, type) {
        var _this = _super.call(this, composite) || this;
        _this.type = SwcwtDefs.HORIZONTAL;
        _this.spacing = 0;
        _this.type = type;
        return _this;
    }
    FillLayout.prototype.computeSize = function (wHint, hHint, flushCache) {
        var _this = this;
        var children = this.getComposite().getChildren();
        var count = children.length;
        var maxWidth = 0, maxHeight = 0;
        children.map(function (child) {
            var w = wHint, h = hHint;
            if (count > 0) {
                if (_this.type === SwcwtDefs.HORIZONTAL && wHint !== SwcwtDefs.DEFAULT) {
                    w = Math.max(0, (wHint - (count - 1) * _this.spacing) / count);
                }
                if (_this.type === SwcwtDefs.VERTICAL && hHint !== SwcwtDefs.DEFAULT) {
                    h = Math.max(0, (hHint - (count - 1) * _this.spacing) / count);
                }
            }
            var size = _this.computeChildSize(child, w, h, flushCache);
            maxWidth = Math.max(maxWidth, size.x);
            maxHeight = Math.max(maxHeight, size.y);
        });
        var width = 0, height = 0;
        if (this.type === SwcwtDefs.HORIZONTAL) {
            width = count * maxWidth;
            if (count !== 0) {
                width += (count - 1) * this.spacing;
            }
            height = maxHeight;
        }
        else {
            width = maxWidth;
            height = count * maxHeight;
            if (count !== 0) {
                height += (count - 1) * this.spacing;
            }
        }
        if (wHint !== SwcwtDefs.DEFAULT) {
            width = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            height = hHint;
        }
        return new fabric.Point(width, height);
    };
    FillLayout.prototype.computeChildSize = function (control, wHint, hHint, flushCache) {
        var data = control.getLayoutData();
        if (data == null) {
            data = new FillData();
            control.setLayoutData(data);
        }
        var size = null;
        if (wHint === SwcwtDefs.DEFAULT && hHint === SwcwtDefs.DEFAULT) {
            size = data.computeSize(control, wHint, hHint, flushCache);
        }
        else {
            // TEMPORARY CODE
            var trimX = void 0, trimY = void 0;
            trimX = trimY = control.getBorderWidth() * 2;
            var w = wHint === SwcwtDefs.DEFAULT ? wHint : Math.max(0, wHint - trimX);
            var h = hHint === SwcwtDefs.DEFAULT ? hHint : Math.max(0, hHint - trimY);
            size = data.computeSize(control, w, h, flushCache);
        }
        return size;
    };
    FillLayout.prototype.flushCache = function (control) {
        var data = control.getLayoutData();
        if (data != null) {
            data.flushCache();
        }
        return true;
    };
    FillLayout.prototype.layout = function (flushCache) {
        var _this = this;
        var rect = this.getComposite().getClientArea();
        var children = this.getComposite().getChildren();
        var count = children.length;
        if (count === 0) {
            return new fabric.Point(rect.width, rect.height);
        }
        var margin = this.getMargin();
        var width = rect.width - margin.getWidth();
        var height = rect.height - margin.getHeight();
        var totalW = margin.getWidth(), totalH = margin.getHeight();
        if (this.type === SwcwtDefs.HORIZONTAL) {
            width -= (count - 1) * this.spacing;
            var x_1 = rect.left + margin.left;
            var y_1 = rect.top + margin.top;
            var extra_1 = width % count;
            var cellWidth_1 = width / count;
            children.map(function (child, index) {
                var childWidth = cellWidth_1;
                if (index === 0) {
                    childWidth += extra_1 / 2;
                }
                else {
                    if (index === count - 1) {
                        childWidth += (extra_1 + 1) / 2;
                    }
                }
                var h = (!height || height <= 0) ? child.computeSize(childWidth, SwcwtDefs.DEFAULT, true).y : height;
                child.setBounds(x_1, y_1, childWidth, h);
                x_1 += childWidth + _this.spacing;
                totalW += childWidth + _this.spacing;
                totalH = Math.max(totalH, h + margin.getHeight());
            });
        }
        else {
            height -= (count - 1) * this.spacing;
            var x_2 = rect.left + margin.left;
            var y_2 = rect.top + margin.top;
            var extra_2 = height % count;
            var cellHeight_1 = height / count;
            children.map(function (child, index) {
                var childHeight = cellHeight_1;
                if (index === 0) {
                    childHeight += extra_2 / 2;
                }
                else {
                    if (index === count - 1) {
                        childHeight += (extra_2 + 1) / 2;
                    }
                }
                var w = !width || width <= 0 ? child.computeSize(SwcwtDefs.DEFAULT, childHeight, true).x : width;
                child.setBounds(x_2, y_2, w, childHeight);
                y_2 += childHeight + _this.spacing;
                totalH += childHeight + _this.spacing;
                totalW = Math.max(totalW, w + margin.getWidth());
            });
        }
        return new fabric.Point(totalW, totalH);
    };
    return FillLayout;
}(AbstractLayout));
export default FillLayout;
//# sourceMappingURL=FillLayout.js.map