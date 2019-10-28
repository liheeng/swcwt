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
import FormAttachment from "./FormAttachment";
import LayoutData from "../interface/LayoutData";
import Control from "../widget/Control";
import SwcwtDefs from "../SwcwtDefs";

export default class FormData implements LayoutData {
    left?: FormAttachment;
    top?: FormAttachment;
    right?: FormAttachment;
    bottom?: FormAttachment;
    height: number = SwcwtDefs.DEFAULT;
    width: number = SwcwtDefs.DEFAULT;

    defaultWhint: number;
    defaultHhint: number;
    defaultWidth: number = -1;
    defaultHeight: number = -1;
    currentWhint: number;
    currentHhint: number;
    currentWidth: number = -1;
    currentHeight: number = -1;

    cacheWidth: number = -1;
    cacheHeight: number = -1;
    cacheLeft: FormAttachment;
    cacheRight: FormAttachment;
    cacheTop: FormAttachment;
    cacheBottom: FormAttachment;
    isVisited: boolean;
    needed: boolean;

    constructor(width?: number, height?: number) {
        this.width = width ? width : SwcwtDefs.DEFAULT;
        this.height = height ? height : SwcwtDefs.DEFAULT;
    }

    public computeSize(control: Control, wHint: number, hHint: number, flushCache: boolean): void {
        if (this.cacheWidth !== -1 && this.cacheHeight !== -1) {
            return;
        }
        if (wHint === this.width && hHint === this.height) {
            if (this.defaultWidth === -1 || this.defaultHeight === -1
                || wHint !== this.defaultWhint || hHint !== this.defaultHhint) {
                let size = control.computeSize(wHint, hHint, flushCache);
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
            let size = control.computeSize(wHint, hHint, flushCache);
            this.currentWhint = wHint;
            this.currentHhint = hHint;
            this.currentWidth = size.x;
            this.currentHeight = size.y;
        }
        this.cacheWidth = this.currentWidth;
        this.cacheHeight = this.currentHeight;
    }

    public flushCache(): void {
        this.cacheWidth = this.cacheHeight = -1;
        this.defaultHeight = this.defaultWidth = -1;
        this.currentHeight = this.currentWidth = -1;
    }

    public getWidth(control: Control, flushCache: boolean): number {
        this.needed = true;
        this.computeSize(control, this.width, this.height, flushCache);
        return this.cacheWidth;
    }

    public getHeight(control: Control, flushCache: boolean): number {
        this.computeSize(control, this.width, this.height, flushCache);
        return this.cacheHeight;
    }

    public getBottomAttachment(control: Control, spacing: number, flushCache: boolean): FormAttachment {
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
        let bottomControl = this.bottom.control;
        if (bottomControl != null) {
            if (bottomControl.getParent() !== control.getParent()) {
                bottomControl = null;
            }
        }
        if (bottomControl == null) {
            return this.cacheBottom = this.bottom;
        }
        this.isVisited = true;
        let bottomData = bottomControl.getLayoutData() as FormData;
        let bottomAttachment = bottomData.getBottomAttachment(bottomControl, spacing, flushCache) as FormAttachment;
        switch (this.bottom.alignment) {
            case SwcwtDefs.BOTTOM:
                this.cacheBottom = bottomAttachment.plusOffset(this.bottom.offset);
                break;
            case SwcwtDefs.CENTER: {
                let topAttachment = bottomData.getTopAttachment(bottomControl, spacing, flushCache);
                let bottomHeight = bottomAttachment.minus(topAttachment);
                this.cacheBottom = bottomAttachment.minus(bottomHeight.minusOffset(
                    this.getHeight(control, flushCache)).divide(2));
                break;
            }
            default: {
                let topAttachment = bottomData.getTopAttachment(bottomControl, spacing, flushCache);
                this.cacheBottom = topAttachment.plusOffset(this.bottom.offset - spacing);
                break;
            }
        }
        this.isVisited = false;
        return this.cacheBottom;
    }

    public getLeftAttachment(control: Control, spacing: number, flushCache: boolean): FormAttachment {
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
        let leftControl = this.left.control;
        if (leftControl != null) {
            if (leftControl.getParent() !== control.getParent()) {
                leftControl = null;
            }
        }
        if (leftControl == null) {
            return this.cacheLeft = this.left;
        }
        this.isVisited = true;
        let leftData = leftControl.getLayoutData() as FormData;
        let leftAttachment = leftData.getLeftAttachment(leftControl, spacing, flushCache);
        switch (this.left.alignment) {
            case SwcwtDefs.LEFT:
                this.cacheLeft = leftAttachment.plusOffset(this.left.offset);
                break;
            case SwcwtDefs.CENTER: {
                let rightAttachment = leftData.getRightAttachment(leftControl, spacing, flushCache);
                let leftWidth = rightAttachment.minus(leftAttachment);
                this.cacheLeft =
                    leftAttachment.plus(leftWidth.minusOffset(this.getWidth(control, flushCache)).divide(2));
                break;
            }
            default: {
                let rightAttachment = leftData.getRightAttachment(leftControl, spacing, flushCache);
                this.cacheLeft = rightAttachment.plusOffset(this.left.offset + spacing);
            }
        }
        this.isVisited = false;
        return this.cacheLeft;
    }

    public getRightAttachment(control: Control, spacing: number, flushCache: boolean): FormAttachment {
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
        let rightControl = this.right.control;
        if (rightControl != null) {

            if (rightControl.getParent() !== control.getParent()) {
                rightControl = null;
            }
        }
        if (rightControl == null) {
            return this.cacheRight = this.right;
        }
        this.isVisited = true;
        let rightData = rightControl.getLayoutData() as FormData;
        let rightAttachment = rightData.getRightAttachment(rightControl, spacing, flushCache);
        switch (this.right.alignment) {
            case SwcwtDefs.RIGHT:
                this.cacheRight = rightAttachment.plusOffset(this.right.offset);
                break;
            case SwcwtDefs.CENTER: {
                let leftAttachment = rightData.getLeftAttachment(rightControl, spacing, flushCache);
                let rightWidth = rightAttachment.minus(leftAttachment);
                this.cacheRight =
                    rightAttachment.minus(rightWidth.minusOffset(this.getWidth(control, flushCache)).divide(2));
                break;
            }
            default: {
                let leftAttachment = rightData.getLeftAttachment(rightControl, spacing, flushCache);
                this.cacheRight = leftAttachment.plusOffset(this.right.offset - spacing);
                break;
            }
        }
        this.isVisited = false;
        return this.cacheRight;
    }

    public getTopAttachment(control: Control, spacing: number, flushCache: boolean): FormAttachment {
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
        let topControl = this.top.control;
        if (topControl != null) {

            if (topControl.getParent() !== control.getParent()) {
                topControl = null;
            }
        }
        if (topControl == null) {
            return this.cacheTop = this.top;
        }
        this.isVisited = true;
        let topData = topControl.getLayoutData() as FormData;
        let topAttachment = topData.getTopAttachment(topControl, spacing, flushCache) as FormAttachment;
        switch (this.top.alignment) {
            case SwcwtDefs.TOP:
                this.cacheTop = topAttachment.plusOffset(this.top.offset);
                break;
            case SwcwtDefs.CENTER: {
                let bottomAttachment = topData.getBottomAttachment(topControl, spacing, flushCache);
                let topHeight = bottomAttachment.minus(topAttachment);
                this.cacheTop =
                    topAttachment.plus(topHeight.minusOffset(this.getHeight(control, flushCache)).divide(2));
                break;
            }
            default: {
                let bottomAttachment = topData.getBottomAttachment(topControl, spacing, flushCache);
                this.cacheTop = bottomAttachment.plusOffset(this.top.offset + spacing);
                break;
            }
        }
        this.isVisited = false;
        return this.cacheTop;
    }

    public toString(): string {
        let str: string = "formData" + " {";
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
    }

}