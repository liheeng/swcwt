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
import Scrollable from "./Scrollable";
import SwcwtDefs from "../SwcwtDefs";
import { fabric } from 'fabric';
/**
 * Container widget which contains child widget(s), e.g. rich-text widget.
 */
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite(options) {
        var _this = _super.call(this, options) || this;
        _this.state = 0;
        _this.className = "Composite";
        _this.layoutInstance = options ? options.layout : undefined;
        return _this;
    }
    Composite.prototype.setLayout = function (layout) {
        this.layoutInstance = layout;
    };
    Composite.prototype.getLayout = function () {
        return this.layoutInstance;
    };
    Composite.prototype.getChildren = function () {
        var objects = this.getInternalObjects();
        return objects.slice(1);
    };
    Composite.prototype.setChildren = function (children) {
        var _this = this;
        children.map(function (child) {
            _this.addChild(child);
        });
    };
    Composite.prototype.addChild = function (control) {
        this.getInternalObjects().push(control);
        control.setParent(this);
    };
    Composite.prototype.delChild = function (control) {
        return this.remove(control) != null;
    };
    Composite.prototype.delChildByIndex = function (index) {
        var result = this.getInternalObjects().splice(index + 1, 1);
        if (result.length > 0) {
            return result[0];
        }
        return undefined;
    };
    Composite.prototype.layout = function (changed, all) {
        if (this.layoutInstance == null) {
            return;
        }
        this.markLayout(changed, all ? all : false);
        this.updateLayout(all ? all : false);
    };
    Composite.prototype.layoutWithControl = function (changed, flags) {
        var _this = this;
        if (changed != null) {
            changed.map(function (control, index) {
                if (control == null) {
                    _this.error(SwcwtDefs.ERROR_INVALID_ARGUMENT);
                }
                var ancestor = false;
                var composite = control.getParent();
                while (composite != null) {
                    ancestor = composite === _this;
                    if (ancestor) {
                        break;
                    }
                    composite = composite.parent;
                }
                if (!ancestor) {
                    _this.error(SwcwtDefs.ERROR_INVALID_PARENT);
                }
            });
            var updateCount_1 = 0;
            var update_1 = new Array(16);
            changed.map(function (comp, index) {
                var child = comp;
                var composite = child.parent;
                // Update layout when the list of children has changed.
                child.markLayout(false, false);
                while (child !== _this) {
                    if (composite.layout != null) {
                        composite.state |= Composite.LAYOUT_NEEDED;
                        if (!composite.layoutInstance.flushCache(child)) {
                            composite.state |= Composite.LAYOUT_CHANGED;
                        }
                    }
                    if (updateCount_1 === update_1.length) {
                        var newUpdate = new Array(update_1.length + 16);
                        for (var i = 0; i < update_1.length; i++) {
                            newUpdate[i] = update_1[i];
                        }
                        update_1 = newUpdate;
                    }
                    child = update_1[updateCount_1++] = composite;
                    composite = child.parent;
                }
            });
            for (var i = updateCount_1 - 1; i >= 0; i--) {
                update_1[i].updateLayout(false);
            }
        }
        else {
            if (this.layoutInstance == null && (flags & SwcwtDefs.ALL) === 0) {
                return;
            }
            this.markLayout((flags & SwcwtDefs.CHANGED) !== 0, (flags & SwcwtDefs.ALL) !== 0);
            this.updateLayout((flags & SwcwtDefs.ALL) !== 0);
        }
    };
    Composite.prototype.updateLayout = function (all) {
        // if (!this.isValid()) {
        //     this.layoutInstance.layout(!this.isValid());
        // }
        if ((this.state & Composite.LAYOUT_NEEDED) !== 0) {
            var changed = (this.state & Composite.LAYOUT_CHANGED) !== 0;
            this.state &= ~(Composite.LAYOUT_NEEDED | Composite.LAYOUT_CHANGED);
            var size = this.layoutInstance.layout(changed);
            // Update border and bounds.
            var w = size.x + this.getBorderWidth() * 2;
            var h = size.y + this.getBorderWidth() * 2;
            w = Math.max(w, this.width | 0);
            h = Math.max(h, this.height | 0);
            this.setBounds(this.left, this.top, w, h);
        }
        if (all) {
            this.state &= ~Composite.LAYOUT_CHILD;
            this.getChildren().map(function (child) {
                child.updateLayout(all);
            });
        }
    };
    Composite.prototype.markLayout = function (changed, all) {
        if (this.layoutInstance != null) {
            // this.invalidate();
            this.state |= Composite.LAYOUT_NEEDED;
            if (changed) {
                this.state |= Composite.LAYOUT_CHANGED;
            }
        }
        if (all) {
            var children = this.getChildren();
            children.map(function (child) {
                child.markLayout(changed, all);
            });
        }
    };
    Composite.prototype.computeSize = function (wHint, hHint, changed) {
        var size;
        if (this.layoutInstance != null) {
            if ((wHint === SwcwtDefs.DEFAULT) || (hHint === SwcwtDefs.DEFAULT)) {
                var c = changed || (this.state & Composite.LAYOUT_CHANGED) !== 0;
                size = this.layoutInstance.computeSize(wHint, hHint, c);
                this.state &= ~Composite.LAYOUT_CHANGED;
            }
            else {
                size = new fabric.Point(wHint, hHint);
            }
        }
        else {
            size = this.minimumSize(wHint, hHint, changed);
            if (size.x === 0) {
                size.x = SwcwtDefs.DEFAULT_WIDTH;
            }
            if (size.y === 0) {
                size.y = SwcwtDefs.DEFAULT_HEIGHT;
            }
        }
        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }
        return size;
    };
    Composite.prototype.minimumSize = function (wHint, Hint, changed) {
        var width = 0, height = 0;
        var children = this.getChildren();
        var clientArea = this.getClientArea();
        children.map(function (child) {
            var rect = child.getBounds();
            width = Math.max(width, rect.left - clientArea.left + rect.width);
            height = Math.max(height, rect.top - clientArea.top + rect.height);
        });
        return new fabric.Point(width, height);
    };
    return Composite;
}(Scrollable));
export default Composite;
