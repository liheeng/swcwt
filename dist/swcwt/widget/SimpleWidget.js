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
import Control from "./Control";
import { fabric } from 'fabric';
import SwcwtDefs from "../SwcwtDefs";
var SimpleWidget = /** @class */ (function (_super) {
    __extends(SimpleWidget, _super);
    function SimpleWidget(options) {
        var _this = _super.call(this, options) || this;
        _this.className = "SimpleWidget";
        return _this;
    }
    SimpleWidget.prototype.init = function (options) {
        this.margin = options ? options.margin : undefined;
    };
    SimpleWidget.prototype.updateLayout = function (all) {
        var element = this.getInternalObjects()[1];
        var eleBounds = element.getBoundingRect(true, true);
        var l = this.left, t = this.top, w = eleBounds.width, h = eleBounds.height;
        var bw = this.getBorderWidth();
        element.set({ left: l + bw, top: t + bw, width: w, height: h });
        w += bw;
        h += bw;
        this.getWidgetBody().set({ left: l, top: t, width: w, height: h });
        w += bw;
        h += bw;
        this.set("width", w);
        this.set("height", h);
        return new fabric.Point(w, h);
    };
    SimpleWidget.prototype.computeSize = function (wHint, hHint, changed) {
        var element = this.getInternalObjects()[1];
        var eleBounds = element.getBoundingRect(true, true);
        var size = new fabric.Point(eleBounds.width, eleBounds.height);
        var bw = this.getBorderWidth() * 2;
        size.x += bw;
        size.y += bw;
        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }
        return size;
    };
    return SimpleWidget;
}(Control));
export default SimpleWidget;
