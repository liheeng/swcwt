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
var RowData = /** @class */ (function (_super) {
    __extends(RowData, _super);
    function RowData(width, height) {
        var _this = _super.call(this) || this;
        _this.width = SwcwtDefs.DEFAULT;
        _this.height = SwcwtDefs.DEFAULT;
        _this.exclude = false;
        _this.width = width ? width : SwcwtDefs.DEFAULT;
        _this.height = height ? height : SwcwtDefs.DEFAULT;
        return _this;
    }
    return RowData;
}(AbstractLayoutData));
export default RowData;
//# sourceMappingURL=RowData.js.map