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
var Bounds = /** @class */ (function () {
    function Bounds(left, top, width, height) {
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    return Bounds;
}());
export { Bounds };
var AroundStyle = /** @class */ (function () {
    function AroundStyle(left, top, right, bottom) {
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = left ? left : 0;
        this.top = top ? top : 0;
        this.right = right ? right : 0;
        this.bottom = bottom ? bottom : 0;
    }
    AroundStyle.prototype.getWidth = function () {
        return this.left + this.right;
    };
    AroundStyle.prototype.getHeight = function () {
        return this.top + this.bottom;
    };
    return AroundStyle;
}());
export { AroundStyle };
var Margin = /** @class */ (function (_super) {
    __extends(Margin, _super);
    function Margin(left, top, right, bottom) {
        return _super.call(this, left, top, right, bottom) || this;
    }
    return Margin;
}(AroundStyle));
export { Margin };
/**
 * Line endings style of a brush (one of "butt", "round", "square")
 */
export var LineCap;
(function (LineCap) {
    LineCap["BUTT"] = "butt";
    LineCap["ROUND"] = "round";
    LineCap["SQUARE"] = "square";
})(LineCap || (LineCap = {}));
/**
 * Corner style of a brush (one of "bevil", "round", "miter")
 */
export var LineJoin;
(function (LineJoin) {
    LineJoin["BEVIL"] = "bevil";
    LineJoin["ROUND"] = "round";
    LineJoin["MITER"] = "miter";
})(LineJoin || (LineJoin = {}));
// export interface StrokeStyle {
//     /**
//      * Color of border.
//      */
//     color?: fabric.Color;
//
//     /**
//      * Gradient setting
//      */
//     gradient?: fabric.Gradient;
//
//     /**
//      * paint pattern.
//      */
//     pattern?: fabric.Pattern;
//
//     isColor(): boolean;
//
//     isGradient(): boolean;
//
//     isPattern(): boolean;
// }
var Border = /** @class */ (function () {
    function Border() {
        /**
         * Width of border.
         */
        this.width = 0;
    }
    return Border;
}());
export { Border };
//# sourceMappingURL=SwcwtBase.js.map