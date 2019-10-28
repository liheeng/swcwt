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
import { fabric } from "fabric";
import SwcwtDefs from "../SwcwtDefs";
/**
 * Simple widget which does not contain any children, e.g. label widget, text widget.
 */
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control(options) {
        var _this = _super.call(this, [], options, false) || this;
        _this.className = "Control";
        _this.valid = false;
        _this.className = "Control";
        _this.subTargetCheck = true;
        _this.widgetBody = _this._createBody();
        var hasBorder = options && options.border;
        var needBorder = options && options.showBorder;
        _this.setBorder(hasBorder ? options.border : (needBorder ? { width: 1, stroke: "black" } : undefined));
        _this.init(options);
        return _this;
    }
    Control.prototype._createBody = function () {
        var rect = new fabric.Rect({ strokeWidth: 0, fill: "rgb(0, 0, 0, 0)" });
        this.add(rect);
        return rect;
    };
    Control.prototype.init = function (options) {
        // Sub-class needs to initialize native widget here.
    };
    Control.prototype.getBorder = function () {
        return this.border;
    };
    Control.prototype.setBorder = function (border) {
        this.border = border;
        if (border) {
            this.widgetBody.stroke = border.stroke;
            this.widgetBody.strokeWidth = border.width | 1;
            this.widgetBody.strokeLineCap = border.lineCap;
            this.widgetBody.strokeLineJoin = border.lineJoin;
            this.widgetBody.strokeDashOffset = border.lineDashOffset;
            this.widgetBody.strokeMiterLimit = border.miterLimit;
            this.widgetBody.strokeDashArray = border.dashArray;
            this.widgetBody.strokeUniform = border.uniform;
        }
        else {
            this.widgetBody.strokeWidth = 0;
        }
        this.markLayout(true, false);
    };
    Control.prototype.hasBorder = function () {
        return this.border && this.getBorderWidth() > 0 ? true : false;
    };
    Control.prototype.getBorderWidth = function () {
        return this.border ? this.getWidgetBody().strokeWidth : 0;
    };
    Control.prototype.invalidate = function () {
        this.valid = false;
    };
    Control.prototype.isValid = function () {
        return this.valid;
    };
    Control.prototype.validate = function (all) {
        this.markLayout(true, all || false);
        this.updateLayout(all || false);
        this.updateObjectsCoords();
        this.valid = true;
    };
    Control.prototype.revalidate = function () {
        var root = this.getParent();
        if (!root) {
            this.validate(true);
        }
        else {
            while (!root.isValid()) {
                if (!root.getParent()) {
                    break;
                }
                root = root.getParent();
            }
            root.validate(true);
        }
    };
    Control.prototype.getBounds = function (absolute, calculate) {
        return this.getBoundingRect(absolute, calculate);
    };
    Control.prototype.computeSize = function (wHint, hHint, changed) {
        var width = SwcwtDefs.DEFAULT_WIDTH;
        var height = SwcwtDefs.DEFAULT_HEIGHT;
        if (wHint !== SwcwtDefs.DEFAULT) {
            width = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            height = hHint;
        }
        var borderWidth = this.getBorderWidth();
        width += borderWidth * 2;
        height += borderWidth * 2;
        return new fabric.Point(width, height);
    };
    Control.prototype.markLayout = function (changed, all) {
        /* Do nothing */
    };
    Control.prototype.getParent = function () {
        return this.parent;
    };
    Control.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    Control.prototype.getLayoutData = function () {
        return this.layoutData;
    };
    Control.prototype.getInternalObjects = function () {
        return this._objects;
    };
    Control.prototype.getWidgetBody = function () {
        return this.widgetBody;
    };
    Control.prototype.updateObjectsCoords = function () {
        this.getInternalObjects().map(function (child, index) {
            if (!(child instanceof Control)) {
                return;
            }
            child.updateObjectsCoords();
        });
        // this.getWidgetBody().set({left: this.left, top: this.top});
        this._updateObjectsCoords();
    };
    Control.prototype.setLayoutData = function (data) {
        this.layoutData = data;
    };
    Control.prototype.getClientArea = function () {
        var bounds = this.getBounds();
        if (this.hasBorder()) {
            if (bounds.left) {
                bounds.left += this.getBorderWidth();
            }
            if (bounds.top) {
                bounds.top += this.getBorderWidth();
            }
            if (bounds.width) {
                bounds.width -= this.getBorderWidth() * 2;
            }
            if (bounds.height) {
                bounds.height -= this.getBorderWidth() * 2;
            }
        }
        return bounds;
    };
    Control.prototype.updateClientArea = function (left, top, width, height) {
        var l = left, t = top, w = width, h = height;
        if (this.hasBorder()) {
            l -= this.getBorderWidth();
            t -= this.getBorderWidth();
            w += this.getBorderWidth() * 2;
            h += this.getBorderWidth() * 2;
        }
        this.setBounds(l, t, w, h);
    };
    Control.prototype.setBounds = function (left, top, width, height) {
        this.getWidgetBody().set({ "left": left, "top": top, "width": width - this.getBorderWidth(), "height": height - this.getBorderWidth() });
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    };
    Control.prototype.error = function (code) {
        SwcwtDefs.error(code);
    };
    /**
     * Returns coords relative to canvas.
     */
    Control.prototype.getGlobalCoords = function () {
        var root = this;
        var coords = root.getCoords(false);
        root = root.parent;
        while (root) {
            var centPoint = root.getCenterPoint();
            coords[0] = coords[0].add(centPoint);
            coords[1] = coords[1].add(centPoint);
            coords[2] = coords[2].add(centPoint);
            coords[3] = coords[3].add(centPoint);
            root = root.parent;
        }
        return coords;
    };
    /* A layout was requested on this widget */
    Control.LAYOUT_NEEDED = 1 << 12;
    /* The preferred size of a child has changed */
    Control.LAYOUT_CHANGED = 1 << 13;
    /* A layout was requested in this widget hierachy */
    Control.LAYOUT_CHILD = 1 << 14;
    return Control;
}(fabric.Group));
export default Control;
