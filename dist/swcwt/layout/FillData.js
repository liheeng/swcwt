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
import AbstractLayoutData from "./AbstractLayoutData";
import SwcwtDefs from "../SwcwtDefs";
import { fabric } from "fabric";
var FillData = /** @class */ (function (_super) {
    __extends(FillData, _super);
    function FillData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultWidth = -1;
        _this.defaultHeight = -1;
        _this.currentWidth = -1;
        _this.currentHeight = -1;
        return _this;
    }
    FillData.prototype.computeSize = function (control, wHint, hHint, flushCache) {
        if (flushCache) {
            this.flushCache();
        }
        if (wHint === SwcwtDefs.DEFAULT && hHint === SwcwtDefs.DEFAULT) {
            if (this.defaultWidth === -1 || this.defaultHeight === -1) {
                var size = control.computeSize(wHint, hHint, flushCache);
                this.defaultWidth = size.x;
                this.defaultHeight = size.y;
            }
            return new fabric.Point(this.defaultWidth, this.defaultHeight);
        }
        if (this.currentWidth === -1 || this.currentHeight === -1
            || wHint !== this.currentWhint || hHint !== this.currentHhint) {
            var size = control.computeSize(wHint, hHint, flushCache);
            this.currentWhint = wHint;
            this.currentHhint = hHint;
            this.currentWidth = size.x;
            this.currentHeight = size.y;
        }
        return new fabric.Point(this.currentWidth, this.currentHeight);
    };
    FillData.prototype.flushCache = function () {
        this.defaultWidth = this.defaultHeight = -1;
        this.currentWidth = this.currentHeight = -1;
    };
    return FillData;
}(AbstractLayoutData));
export default FillData;
