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
import AbstractLayout from "./AbstractLayout";
import Composite from "../widget/Composite";
import {Bounds} from "../SwcwtBase";
import Control from "../widget/Control";
import FillData from "./FillData";
import SwcwtDefs from "../SwcwtDefs";
import {fabric} from "fabric";

export default class FillLayout extends AbstractLayout {

    type: number = SwcwtDefs.HORIZONTAL;

    spacing: number = 0;

    constructor(composite: Composite, type?: number) {
        super(composite);
        this.type = type;
    }

    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point {
        const children = this.getComposite().getChildren();
        let count = children.length;
        let maxWidth = 0, maxHeight = 0;
        children.map(
            (child: Control) => {
                let w = wHint, h = hHint;
                if (count > 0) {
                    if (this.type === SwcwtDefs.HORIZONTAL && wHint !== SwcwtDefs.DEFAULT) {
                        w = Math.max(0, (wHint - (count - 1) * this.spacing) / count);
                    }
                    if (this.type === SwcwtDefs.VERTICAL && hHint !== SwcwtDefs.DEFAULT) {
                        h = Math.max(0, (hHint - (count - 1) * this.spacing) / count);
                    }
                }
                const size = this.computeChildSize(child, w, h, flushCache);
                maxWidth = Math.max(maxWidth, size.x);
                maxHeight = Math.max(maxHeight, size.y);
            });

        let width = 0, height = 0;
        if (this.type === SwcwtDefs.HORIZONTAL) {
            width = count * maxWidth;
            if (count !== 0) { width += (count - 1) * this.spacing; }
            height = maxHeight;
        } else {
            width = maxWidth;
            height = count * maxHeight;
            if (count !== 0) { height += (count - 1) * this.spacing; }
        }

        if (wHint !== SwcwtDefs.DEFAULT) { width = wHint; }
        if (hHint !== SwcwtDefs.DEFAULT) { height = hHint; }
        return new fabric.Point(width, height);
    }

    protected computeChildSize(control: Control, wHint: number, hHint: number, flushCache: boolean): fabric.Point {
        let data = control.getLayoutData() as FillData;
        if (data == null) {
            data = new FillData();
            control.setLayoutData(data);
        }
        let size = null;
        if (wHint === SwcwtDefs.DEFAULT && hHint === SwcwtDefs.DEFAULT) {
            size = data.computeSize(control, wHint, hHint, flushCache);
        } else {
            // TEMPORARY CODE
            let trimX, trimY;
            trimX = trimY = control.getBorderWidth() * 2;
            const w = wHint === SwcwtDefs.DEFAULT ? wHint : Math.max(0, wHint - trimX);
            const h = hHint === SwcwtDefs.DEFAULT ? hHint : Math.max(0, hHint - trimY);
            size = data.computeSize(control, w, h, flushCache);
        }
        return size;
    }

    flushCache(control: Control): boolean {
        const data = control.getLayoutData() as FillData;
        if (data != null) { data.flushCache(); }
        return true;
    }

    layout(flushCache: boolean): fabric.Point {
        const rect = this.getComposite().getClientArea () as Bounds;
        const children = this.getComposite().getChildren ();
        const count = children.length;
        if (count === 0) { return new fabric.Point(rect.width, rect.height); }
        const margin = this.getMargin();
        let width = rect.width - margin.getWidth();
        let height = rect.height - margin.getHeight();
        let totalW = margin.getWidth(), totalH = margin.getHeight();
        if (this.type === SwcwtDefs.HORIZONTAL) {
            width -= (count - 1) * this.spacing;
            let x = rect.left + margin.left;
            let y = rect.top + margin.top;
            const extra = width % count;
            const cellWidth = width / count;
            children.map(
                (child: Control, index: number) => {
                    let childWidth = cellWidth;
                    if (index === 0) {
                        childWidth += extra / 2;
                    } else {
                        if (index === count - 1) { childWidth += (extra + 1) / 2; }
                    }

                    let h = (!height || height <= 0) ? child.computeSize(childWidth, SwcwtDefs.DEFAULT, true).y : height;

                    child.setBounds (x, y, childWidth, h);
                    x += childWidth + this.spacing;
                    totalW += childWidth + this.spacing;
                    totalH = Math.max(totalH, h + margin.getHeight());
                },
            );
        } else {
            height -= (count - 1) * this.spacing;
            let x = rect.left + margin.left;
            let y = rect.top + margin.top;
            let extra = height % count;
            let cellHeight = height / count;
            children.map(
                (child: Control, index: number) => {
                    let childHeight = cellHeight;
                    if (index === 0) {
                        childHeight += extra / 2;
                    } else {
                        if (index === count - 1) { childHeight += (extra + 1) / 2; }
                    }

                    const w = !width || width <= 0 ? child.computeSize(SwcwtDefs.DEFAULT, childHeight, true).x : width;
                    child.setBounds (x, y, w, childHeight);
                    y += childHeight + this.spacing;
                    totalH += childHeight + this.spacing;
                    totalW = Math.max(totalW, w + margin.getWidth());
                },
            );
        }

        return new fabric.Point(totalW, totalH);
    }

}
