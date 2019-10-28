import FormAttachment from "./FormAttachment";
import SwcwtDefs from "../SwcwtDefs";
var FormData = /** @class */ (function () {
    function FormData(width, height) {
        this.height = SwcwtDefs.DEFAULT;
        this.width = SwcwtDefs.DEFAULT;
        this.defaultWidth = -1;
        this.defaultHeight = -1;
        this.currentWidth = -1;
        this.currentHeight = -1;
        this.cacheWidth = -1;
        this.cacheHeight = -1;
        this.width = width ? width : SwcwtDefs.DEFAULT;
        this.height = height ? height : SwcwtDefs.DEFAULT;
    }
    FormData.prototype.computeSize = function (control, wHint, hHint, flushCache) {
        if (this.cacheWidth !== -1 && this.cacheHeight !== -1) {
            return;
        }
        if (wHint === this.width && hHint === this.height) {
            if (this.defaultWidth === -1 || this.defaultHeight === -1
                || wHint !== this.defaultWhint || hHint !== this.defaultHhint) {
                var size = control.computeSize(wHint, hHint, flushCache);
                this.defaultWhint = wHint;
                this.defaultHhint = hHint;
                this.defaultWidth = size.x;
                this.defaultHeight = size.y;
            }
            this.cacheWidth = this.defaultWidth;
            this.cacheHeight = this.defaultHeight;
            return;
        }
        if (this.currentWidth === -1 || this.currentHeight === -1
            || wHint !== this.currentWhint || hHint !== this.currentHhint) {
            var size = control.computeSize(wHint, hHint, flushCache);
            this.currentWhint = wHint;
            this.currentHhint = hHint;
            this.currentWidth = size.x;
            this.currentHeight = size.y;
        }
        this.cacheWidth = this.currentWidth;
        this.cacheHeight = this.currentHeight;
    };
    FormData.prototype.flushCache = function () {
        this.cacheWidth = this.cacheHeight = -1;
        this.defaultHeight = this.defaultWidth = -1;
        this.currentHeight = this.currentWidth = -1;
    };
    FormData.prototype.getWidth = function (control, flushCache) {
        this.needed = true;
        this.computeSize(control, this.width, this.height, flushCache);
        return this.cacheWidth;
    };
    FormData.prototype.getHeight = function (control, flushCache) {
        this.computeSize(control, this.width, this.height, flushCache);
        return this.cacheHeight;
    };
    FormData.prototype.getBottomAttachment = function (control, spacing, flushCache) {
        if (this.cacheBottom != null) {
            return this.cacheBottom;
        }
        if (this.isVisited) {
            return this.cacheBottom =
                FormAttachment.newAttachmentToOffset(0, undefined, this.getHeight(control, flushCache));
        }
        if (this.bottom == null) {
            if (top == null) {
                return this.cacheBottom =
                    FormAttachment.newAttachmentToOffset(0, this.getHeight(control, flushCache));
            }
            return this.cacheBottom =
                this.getTopAttachment(control, spacing, flushCache).plusOffset(this.getHeight(control, flushCache));
        }
        var bottomControl = this.bottom.control;
        if (bottomControl != null) {
            if (bottomControl.getParent() !== control.getParent()) {
                bottomControl = null;
            }
        }
        if (bottomControl == null) {
            return this.cacheBottom = this.bottom;
        }
        this.isVisited = true;
        var bottomData = bottomControl.getLayoutData();
        var bottomAttachment = bottomData.getBottomAttachment(bottomControl, spacing, flushCache);
        switch (this.bottom.alignment) {
            case SwcwtDefs.BOTTOM:
                this.cacheBottom = bottomAttachment.plusOffset(this.bottom.offset);
                break;
            case SwcwtDefs.CENTER: {
                var topAttachment = bottomData.getTopAttachment(bottomControl, spacing, flushCache);
                var bottomHeight = bottomAttachment.minus(topAttachment);
                this.cacheBottom = bottomAttachment.minus(bottomHeight.minusOffset(this.getHeight(control, flushCache)).divide(2));
                break;
            }
            default: {
                var topAttachment = bottomData.getTopAttachment(bottomControl, spacing, flushCache);
                this.cacheBottom = topAttachment.plusOffset(this.bottom.offset - spacing);
                break;
            }
        }
        this.isVisited = false;
        return this.cacheBottom;
    };
    FormData.prototype.getLeftAttachment = function (control, spacing, flushCache) {
        if (this.cacheLeft != null) {
            return this.cacheLeft;
        }
        if (this.isVisited) {
            return this.cacheLeft = FormAttachment.newAttachmentToOffset(0, undefined, 0);
        }
        if (this.left == null) {
            if (this.right == null) {
                return this.cacheLeft = FormAttachment.newAttachmentToOffset(0, 0);
            }
            return this.cacheLeft = this.getRightAttachment(control, spacing, flushCache)
                .minusOffset(this.getWidth(control, flushCache));
        }
        var leftControl = this.left.control;
        if (leftControl != null) {
            if (leftControl.getParent() !== control.getParent()) {
                leftControl = null;
            }
        }
        if (leftControl == null) {
            return this.cacheLeft = this.left;
        }
        this.isVisited = true;
        var leftData = leftControl.getLayoutData();
        var leftAttachment = leftData.getLeftAttachment(leftControl, spacing, flushCache);
        switch (this.left.alignment) {
            case SwcwtDefs.LEFT:
                this.cacheLeft = leftAttachment.plusOffset(this.left.offset);
                break;
            case SwcwtDefs.CENTER: {
                var rightAttachment = leftData.getRightAttachment(leftControl, spacing, flushCache);
                var leftWidth = rightAttachment.minus(leftAttachment);
                this.cacheLeft =
                    leftAttachment.plus(leftWidth.minusOffset(this.getWidth(control, flushCache)).divide(2));
                break;
            }
            default: {
                var rightAttachment = leftData.getRightAttachment(leftControl, spacing, flushCache);
                this.cacheLeft = rightAttachment.plusOffset(this.left.offset + spacing);
            }
        }
        this.isVisited = false;
        return this.cacheLeft;
    };
    FormData.prototype.getRightAttachment = function (control, spacing, flushCache) {
        if (this.cacheRight != null) {
            return this.cacheRight;
        }
        if (this.isVisited) {
            return this.cacheRight =
                FormAttachment.newAttachmentToOffset(0, this.getWidth(control, flushCache));
        }
        if (this.right == null) {
            if (this.left == null) {
                return this.cacheRight =
                    FormAttachment.newAttachmentToOffset(0, undefined, this.getWidth(control, flushCache));
            }
            return this.cacheRight =
                this.getLeftAttachment(control, spacing, flushCache).plusOffset(this.getWidth(control, flushCache));
        }
        var rightControl = this.right.control;
        if (rightControl != null) {
            if (rightControl.getParent() !== control.getParent()) {
                rightControl = null;
            }
        }
        if (rightControl == null) {
            return this.cacheRight = this.right;
        }
        this.isVisited = true;
        var rightData = rightControl.getLayoutData();
        var rightAttachment = rightData.getRightAttachment(rightControl, spacing, flushCache);
        switch (this.right.alignment) {
            case SwcwtDefs.RIGHT:
                this.cacheRight = rightAttachment.plusOffset(this.right.offset);
                break;
            case SwcwtDefs.CENTER: {
                var leftAttachment = rightData.getLeftAttachment(rightControl, spacing, flushCache);
                var rightWidth = rightAttachment.minus(leftAttachment);
                this.cacheRight =
                    rightAttachment.minus(rightWidth.minusOffset(this.getWidth(control, flushCache)).divide(2));
                break;
            }
            default: {
                var leftAttachment = rightData.getLeftAttachment(rightControl, spacing, flushCache);
                this.cacheRight = leftAttachment.plusOffset(this.right.offset - spacing);
                break;
            }
        }
        this.isVisited = false;
        return this.cacheRight;
    };
    FormData.prototype.getTopAttachment = function (control, spacing, flushCache) {
        if (this.cacheTop != null) {
            return this.cacheTop;
        }
        if (this.isVisited) {
            return this.cacheTop = FormAttachment.newAttachmentToOffset(0, 0);
        }
        if (this.top == null) {
            if (this.bottom == null) {
                return this.cacheTop = FormAttachment.newAttachmentToOffset(0, undefined, 0);
            }
            return this.cacheTop =
                this.getBottomAttachment(control, spacing, flushCache).minusOffset(this.getHeight(control, flushCache));
        }
        var topControl = this.top.control;
        if (topControl != null) {
            if (topControl.getParent() !== control.getParent()) {
                topControl = null;
            }
        }
        if (topControl == null) {
            return this.cacheTop = this.top;
        }
        this.isVisited = true;
        var topData = topControl.getLayoutData();
        var topAttachment = topData.getTopAttachment(topControl, spacing, flushCache);
        switch (this.top.alignment) {
            case SwcwtDefs.TOP:
                this.cacheTop = topAttachment.plusOffset(this.top.offset);
                break;
            case SwcwtDefs.CENTER: {
                var bottomAttachment = topData.getBottomAttachment(topControl, spacing, flushCache);
                var topHeight = bottomAttachment.minus(topAttachment);
                this.cacheTop =
                    topAttachment.plus(topHeight.minusOffset(this.getHeight(control, flushCache)).divide(2));
                break;
            }
            default: {
                var bottomAttachment = topData.getBottomAttachment(topControl, spacing, flushCache);
                this.cacheTop = bottomAttachment.plusOffset(this.top.offset + spacing);
                break;
            }
        }
        this.isVisited = false;
        return this.cacheTop;
    };
    FormData.prototype.toString = function () {
        var str = "formData" + " {";
        if (this.width !== SwcwtDefs.DEFAULT) {
            str += "width=" + this.width + " ";
        }
        if (this.height !== SwcwtDefs.DEFAULT) {
            str += "height=" + this.height + " ";
        }
        if (this.left != null) {
            str += "left=" + this.left + " ";
        }
        if (this.right != null) {
            str += "right=" + this.right + " ";
        }
        if (this.top != null) {
            str += "top=" + top + " ";
        }
        if (this.bottom != null) {
            str += "bottom=" + this.bottom + " ";
        }
        str = str.trim();
        str += "}";
        return str;
    };
    return FormData;
}());
export default FormData;
//# sourceMappingURL=FormData.js.map