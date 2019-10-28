import { Margin } from "../SwcwtBase";
var AbstractLayout = /** @class */ (function () {
    function AbstractLayout(composite, margin) {
        this.marginWidth = 0;
        this.marginHeight = 0;
        this.composite = composite;
        this.margin = margin ? margin : new Margin();
    }
    AbstractLayout.prototype.getComposite = function () {
        return this.composite;
    };
    AbstractLayout.prototype.getMargin = function () {
        return this.margin;
    };
    AbstractLayout.prototype.setMargin = function (margin) {
        this.margin = margin;
    };
    AbstractLayout.prototype.flushCache = function (control) {
        return false;
    };
    return AbstractLayout;
}());
export default AbstractLayout;
