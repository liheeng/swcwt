import SwcwtDefs from "../SwcwtDefs";
var AbstractLayoutData = /** @class */ (function () {
    function AbstractLayoutData() {
        this.horizontalAlignment = SwcwtDefs.CENTER;
        this.verticalAlignment = SwcwtDefs.BEGINNING;
        this.hOffset = 0;
        this.vOffset = 0;
    }
    AbstractLayoutData.prototype.getHorizontalAlign = function () {
        return this.horizontalAlignment;
    };
    AbstractLayoutData.prototype.getHorizontalOffset = function () {
        return this.hOffset;
    };
    AbstractLayoutData.prototype.getVerticalAlign = function () {
        return this.verticalAlignment;
    };
    AbstractLayoutData.prototype.getVerticalOffset = function () {
        return this.vOffset;
    };
    return AbstractLayoutData;
}());
export default AbstractLayoutData;
