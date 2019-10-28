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
import {fabric} from "fabric";
import {Bounds, Margin} from "../SwcwtBase";
import Composite from "../widget/Composite";
import Control from "../widget/Control";
import RowData from "./RowData";
import SwcwtDefs from "../SwcwtDefs";

export default class RowLayout extends AbstractLayout {
    type: number = SwcwtDefs.HORIZONTAL;

    spacing: number = 3;

    wrap: boolean = true;

    pack: boolean = true;

    fill: boolean = false;

    center: boolean = false;

    justify: boolean = false;

    constructor(composite: Composite, margin?: Margin) {
        super(composite, margin ? margin : new Margin(3, 3, 3, 3));
    }

    public computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point {
        let extent: fabric.Point;
        if (this.type === SwcwtDefs.HORIZONTAL) {
            extent = this.layoutHorizontal(false, (wHint !== SwcwtDefs.DEFAULT) && this.wrap, wHint, flushCache);
        } else {
            extent = this.layoutVertical(false, (hHint !== SwcwtDefs.DEFAULT) && this.wrap, hHint, flushCache);
        }
        if (wHint !== SwcwtDefs.DEFAULT) {
            extent.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            extent.y = hHint;
        }
        return extent;
    }

    private computeSizeInternal(control: Control, flushCache: boolean) {
        let wHint = SwcwtDefs.DEFAULT, hHint = SwcwtDefs.DEFAULT;
        let data = control.getLayoutData() as RowData;
        if (data != null) {
            wHint = data.width;
            hHint = data.height;
        }
        return control.computeSize(wHint, hHint, flushCache);
    }

    protected layoutHorizontal(move: boolean, wrap: boolean, width: number, flushCache: boolean): fabric.Point {
        let children = this.getComposite().getChildren();
        let count = 0;
        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as RowData;
                if (data == null || !data.exclude) {
                    children [count++] = child;
                }
            },
        );

        if (count === 0) {
            // tslint:disable-next-line:max-line-length
            return new fabric.Point(this.margin.getWidth() + this.marginWidth * 2, this.margin.getHeight() + this.marginHeight * 2);
        }

        let childWidth = 0, childHeight = 0, maxHeight = 0;
        if (!this.pack) {
            for (let i = 0; i < count; i++) {
                let child = children [i];
                let size = this.computeSizeInternal(child, flushCache);
                if (width > SwcwtDefs.DEFAULT && width < size.x && wrap) {
                    // tslint:disable-next-line:max-line-length
                    size = child.computeSize(width, child.getLayoutData() == null ? SwcwtDefs.DEFAULT : (child.getLayoutData() as RowData).height, flushCache);
                }
                childWidth = Math.max(childWidth, size.x);
                childHeight = Math.max(childHeight, size.y);
            }
            maxHeight = childHeight;
        }
        let clientX = 0, clientY = 0, clientWidth = 0;
        if (move) {
            let rect = this.getComposite().getClientArea() as Bounds;
            clientX = rect.left;
            clientY = rect.top;
            clientWidth = rect.width;
        }
        let wraps: number[] = null;
        let wrapped = false;
        let bounds: Bounds[] = null;
        if (move && (this.justify || this.fill || this.center)) {
            bounds = new Array(count);
            wraps = new Array(count);
        }
        let maxX = 0, x = this.margin.getWidth() + this.marginWidth, y = this.margin.getHeight() + this.marginHeight;
        children.map(
            (child: Control, index: number) => {
                if (this.pack) {
                    let size = this.computeSizeInternal(child, flushCache);
                    if (width > SwcwtDefs.DEFAULT && width < size.x && wrap) {
                        // tslint:disable-next-line:max-line-length
                        size = child.computeSize(width, child.getLayoutData() == null ? SwcwtDefs.DEFAULT : (child.getLayoutData() as RowData).height, flushCache);
                    }
                    childWidth = size.x;
                    childHeight = size.y;
                }
                if (wrap && (index !== 0) && (x + childWidth > width)) {
                    wrapped = true;
                    if (move && (this.justify || this.fill || this.center)) {
                        wraps [index - 1] = maxHeight;
                    }
                    x = this.margin.getWidth();
                    y += this.spacing + maxHeight;
                    if (this.pack) {
                        maxHeight = 0;
                    }
                }
                if (this.pack || this.fill || this.center) {
                    maxHeight = Math.max(maxHeight, childHeight);
                }
                if (move) {
                    let childX = x + clientX, childY = y + clientY;
                    if (this.justify || this.fill || this.center) {
                        bounds [index] = new Bounds(childX, childY, childWidth, childHeight);
                    } else {
                        child.setBounds(childX, childY, childWidth, childHeight);
                    }
                }
                x += this.spacing + childWidth;
                maxX = Math.max(maxX, x);
            },
        );

        maxX = Math.max(clientWidth + this.margin.left + this.marginWidth, maxX - this.spacing);
        if (!wrapped) {
            maxX += this.margin.right + this.marginWidth;
        }
        if (move && (this.justify || this.fill || this.center)) {
            let space = 0, margin = 0;
            if (!wrapped) {
                space = Math.max(0, (width - maxX) / (count + 1));
                margin = Math.max(0, ((width - maxX) % (count + 1)) / 2);
            } else {
                if (this.fill || this.justify || this.center) {
                    let last = 0;
                    if (count > 0) {
                        wraps [count - 1] = maxHeight;
                    }
                    for (let i = 0; i < count; i++) {
                        if (wraps [i] !== 0) {
                            let wrapCount = i - last + 1;
                            if (this.justify) {
                                let wrapX = 0;
                                for (let j = last; j <= i; j++) {
                                    wrapX += bounds [j].width + this.spacing;
                                }
                                space = Math.max(0, (width - wrapX) / (wrapCount + 1));
                                margin = Math.max(0, ((width - wrapX) % (wrapCount + 1)) / 2);
                            }
                            for (let j = last; j <= i; j++) {
                                if (this.justify) {
                                    bounds [j].left += (space * (j - last + 1)) + margin;
                                }
                                if (this.fill) {
                                    bounds [j].height = wraps [i];
                                } else {
                                    if (this.center) {
                                        bounds [j].top += Math.max(0, (wraps [i] - bounds [j].height) / 2);
                                    }
                                }
                            }
                            last = i + 1;
                        }
                    }
                }
            }
            for (let i = 0; i < count; i++) {
                if (!wrapped) {
                    if (this.justify) {
                        bounds [i].left += (space * (i + 1)) + margin;
                    }
                    if (this.fill) {
                        bounds [i].height = maxHeight;
                    } else {
                        if (this.center) {
                            bounds [i].top += Math.max(0, (maxHeight - bounds [i].height) / 2);
                        }
                    }
                }
                children [i].setBounds(bounds [i].left, bounds [i].top, bounds [i].width, bounds [i].height);
            }
        }
        return new fabric.Point(maxX, y + maxHeight + this.margin.bottom + this.marginHeight);
    }

    protected layoutVertical(move: boolean, wrap: boolean, height: number, flushCache: boolean): fabric.Point {
        let children = this.getComposite().getChildren();
        let count = 0;
        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as RowData;
                if (data == null || !data.exclude) {
                    children [count++] = child;
                }
            },
        );
        if (count === 0) {
            // tslint:disable-next-line:max-line-length
            return new fabric.Point(this.margin.getWidth() + this.marginWidth * 2, this.margin.getHeight() + this.marginHeight * 2);
        }
        let childWidth = 0, childHeight = 0, maxWidth = 0;
        if (!this.pack) {
            for (let i = 0; i < count; i++) {
                let child = children [i];
                let size = this.computeSizeInternal(child, flushCache);
                if (height > SwcwtDefs.DEFAULT && height < size.y && wrap) {
                    // tslint:disable-next-line:max-line-length
                    size = child.computeSize(child.getLayoutData() == null ? SwcwtDefs.DEFAULT : (child.getLayoutData() as RowData).width, height, flushCache);
                }
                childWidth = Math.max(childWidth, size.x);
                childHeight = Math.max(childHeight, size.y);
            }
            maxWidth = childWidth;
        }
        let clientX = 0, clientY = 0, clientHeight = 0;
        if (move) {
            let rect = this.getComposite().getClientArea() as Bounds;
            clientX = rect.left;
            clientY = rect.top;
            clientHeight = rect.height;
        }
        let wraps: number[] = null;
        let wrapped = false;
        let bounds: Bounds[] = null;
        if (move && (this.justify || this.fill || this.center)) {
            bounds = new Array(count);
            wraps = new Array(count);
        }
        let maxY = 0, x = this.margin.left + this.marginWidth, y = this.margin.top + this.marginHeight;
        for (let i = 0; i < count; i++) {
            let child = children [i];
            if (this.pack) {
                let size = this.computeSizeInternal(child, flushCache);
                if (height > SwcwtDefs.DEFAULT && height < size.y && wrap) {
                    // tslint:disable-next-line:max-line-length
                    size = child.computeSize(child.getLayoutData() == null ? SwcwtDefs.DEFAULT : (child.getLayoutData() as RowData).width, height, flushCache);
                }
                childWidth = size.x;
                childHeight = size.y;
            }
            if (wrap && (i !== 0) && (y + childHeight > height)) {
                wrapped = true;
                if (move && (this.justify || this.fill || this.center)) {
                    wraps [i - 1] = maxWidth;
                }
                x += this.spacing + maxWidth;
                y = this.margin.top + this.marginHeight;
                if (this.pack) {
                    maxWidth = 0;
                }
            }
            if (this.pack || this.fill || this.center) {
                maxWidth = Math.max(maxWidth, childWidth);
            }
            if (move) {
                let childX = x + clientX, childY = y + clientY;
                if (this.justify || this.fill || this.center) {
                    bounds [i] = new Bounds(childX, childY, childWidth, childHeight);
                } else {
                    child.setBounds(childX, childY, childWidth, childHeight);
                }
            }
            y += this.spacing + childHeight;
            maxY = Math.max(maxY, y);
        }
        maxY = Math.max(clientHeight + this.margin.top + this.marginHeight, maxY - this.spacing);
        if (!wrapped) {
            maxY += this.margin.bottom + this.marginHeight;
        }
        if (move && (this.justify || this.fill || this.center)) {
            let space = 0, margin = 0;
            if (!wrapped) {
                space = Math.max(0, (height - maxY) / (count + 1));
                margin = Math.max(0, ((height - maxY) % (count + 1)) / 2);
            } else {
                if (this.fill || this.justify || this.center) {
                    let last = 0;
                    if (count > 0) {
                        wraps [count - 1] = maxWidth;
                    }
                    for (let i = 0; i < count; i++) {
                        if (wraps [i] !== 0) {
                            let wrapCount = i - last + 1;
                            if (this.justify) {
                                let wrapY = 0;
                                for (let j = last; j <= i; j++) {
                                    wrapY += bounds [j].height + this.spacing;
                                }
                                space = Math.max(0, (height - wrapY) / (wrapCount + 1));
                                margin = Math.max(0, ((height - wrapY) % (wrapCount + 1)) / 2);
                            }
                            for (let j = last; j <= i; j++) {
                                if (this.justify) {
                                    bounds [j].top += (space * (j - last + 1)) + margin;
                                }
                                if (this.fill) {
                                    bounds [j].width = wraps [i];
                                } else {
                                    if (this.center) {
                                        bounds [j].left += Math.max(0, (wraps [i] - bounds [j].width) / 2);
                                    }
                                }
                            }
                            last = i + 1;
                        }
                    }
                }
            }
            for (let i = 0; i < count; i++) {
                if (!wrapped) {
                    if (this.justify) {
                        bounds [i].top += (space * (i + 1)) + margin;
                    }
                    if (this.fill) {
                        bounds [i].width = maxWidth;
                    } else {
                        if (this.center) {
                            bounds [i].left += Math.max(0, (maxWidth - bounds [i].width) / 2);
                        }
                    }

                }
                children [i].setBounds(bounds [i].left, bounds [i].top, bounds [i].width, bounds [i].height);
            }
        }
        return new fabric.Point(x + maxWidth + this.margin.right + this.marginWidth, maxY);
    }

    layout(flushCache: boolean): fabric.Point {
        let clientArea = this.getComposite().getClientArea();
        if (this.type === SwcwtDefs.HORIZONTAL) {
            return this.layoutHorizontal(true, this.wrap, clientArea.width, flushCache);
        } else {
            return this.layoutVertical(true, this.wrap, clientArea.height, flushCache);
        }
    }
}
