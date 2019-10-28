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
import {Border, Bounds, Margin} from "../SwcwtBase";
import Widget from "../interface/Widget";
import Composite from "./Composite";
import {fabric} from "fabric";
import Layout from "../interface/Layout";
import LayoutData from "../interface/LayoutData";
import SwcwtDefs from "../SwcwtDefs";

export interface WidgetOptions extends fabric.IGroupOptions {
    showBorder?: boolean;
    border?: Border;
    margin?: Margin;
    layout?: Layout<Control>;
}

/**
 * Simple widget which does not contain any children, e.g. label widget, text widget.
 */
export default abstract class Control extends fabric.Group implements Widget<fabric.Object> {
    /* A layout was requested on this widget */
    static readonly LAYOUT_NEEDED = 1 << 12;

    /* The preferred size of a child has changed */
    static readonly LAYOUT_CHANGED = 1 << 13;

    /* A layout was requested in this widget hierachy */
    static readonly LAYOUT_CHILD = 1 << 14;

    protected className = "Control";

    protected border?: Border;

    protected parent: Composite;

    protected widgetBody: fabric.Object;

    protected layoutData: LayoutData;

    private valid: boolean = false;

    constructor(options?: WidgetOptions) {
        super([], options, false);
        this.className = "Control";
        this.subTargetCheck = true;
        this.widgetBody = this._createBody();
        let hasBorder = options && options.border;
        let needBorder = options && options.showBorder;
        this.setBorder(hasBorder ? options.border : (needBorder ? {width: 1, stroke: "black"} : undefined));
        this.init(options);
    }

    private _createBody(): fabric.Rect {
        let rect = new fabric.Rect({strokeWidth: 0, fill: "rgb(0, 0, 0, 0)"});
        this.add(rect);
        return rect;
    }

    protected init(options?: WidgetOptions): void {
        // Sub-class needs to initialize native widget here.
    }

    public getBorder(): Border | undefined {
        return this.border;
    }

    public setBorder(border: Border): void {
        this.border = border;
        if (border) {
            this.widgetBody.stroke = border.stroke as any | "black";
            this.widgetBody.strokeWidth = border.width | 1;
            this.widgetBody.strokeLineCap = border.lineCap;
            this.widgetBody.strokeLineJoin = border.lineJoin;
            this.widgetBody.strokeDashOffset = border.lineDashOffset;
            this.widgetBody.strokeMiterLimit = border.miterLimit;
            this.widgetBody.strokeDashArray = border.dashArray;
            this.widgetBody.strokeUniform = border.uniform;
        } else {
            this.widgetBody.strokeWidth = 0;
        }

        this.markLayout(true, false);
    }

    public hasBorder(): boolean {
        return this.border && this.getBorderWidth() > 0 ? true : false;
    }

    public getBorderWidth(): number {
        return this.border ? this.getWidgetBody().strokeWidth : 0;
    }

    public invalidate(): void {
        this.valid = false;
    }

    public isValid(): boolean {
        return this.valid;
    }

    public validate(all: boolean): void {
        this.markLayout(true, all || false);
        this.updateLayout(all || false);
        this.updateObjectsCoords();
        this.valid = true;
    }

    public revalidate(): void {

        let root: Composite = this.getParent();
        if (!root) {
            this.validate(true);
        } else {
            while (!root.isValid()) {
                if (!root.getParent()) {
                    break;
                }

                root = root.getParent();
            }

            root.validate(true);
        }
    }

    public getBounds(absolute?: boolean, calculate?: boolean): Bounds {
        return this.getBoundingRect(absolute, calculate);
    }

    public computeSize(wHint: number, hHint: number, changed?: boolean): fabric.Point {
        let width = SwcwtDefs.DEFAULT_WIDTH;
        let height = SwcwtDefs.DEFAULT_HEIGHT;
        if (wHint !== SwcwtDefs.DEFAULT) {
            width = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            height = hHint;
        }

        const borderWidth = this.getBorderWidth();
        width += borderWidth * 2;
        height += borderWidth * 2;

        return new fabric.Point(width, height);
    }

    markLayout(changed: boolean, all: boolean): void {
        /* Do nothing */
    }

    abstract updateLayout(all: boolean): void;

    public getParent(): Composite {
        return this.parent;
    }

    public setParent(parent: Composite) {
        this.parent = parent;
    }

    public getLayoutData(): LayoutData {
        return this.layoutData;
    }

    public getInternalObjects(): Array<fabric.Object | fabric.Group> {
        return (this as any)._objects;
    }

    protected getWidgetBody(): fabric.Rect {
        return this.widgetBody;
    }

    public updateObjectsCoords(): void {
        this.getInternalObjects().map(
            (child: fabric.Object, index: number) => {
                if (!(child instanceof Control)) {
                    return;
                }
                child.updateObjectsCoords();
            },
        );

        // this.getWidgetBody().set({left: this.left, top: this.top});
        (this as any)._updateObjectsCoords();
    }

    setLayoutData(data: LayoutData) {
        this.layoutData = data;
    }

    public getClientArea(): Bounds {
        let bounds = this.getBounds();
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
    }

    public updateClientArea(left: number, top: number, width: number, height: number): void {
        let l = left, t = top, w = width, h = height;
        if (this.hasBorder()) {
            l -= this.getBorderWidth();
            t -= this.getBorderWidth();
            w += this.getBorderWidth() * 2;
            h += this.getBorderWidth() * 2;
        }
        this.setBounds(l, t, w, h);
    }

    setBounds(left: number, top: number, width: number, height: number) {
        this.getWidgetBody().set({"left": left, "top": top, "width": width - this.getBorderWidth(), "height": height - this.getBorderWidth()});

        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;

    }

    error(code: number): void {
        SwcwtDefs.error(code);
    }

    /**
     * Returns coords relative to canvas.
     */
    getGlobalCoords(): fabric.Point[] {
        let root: Control = this;
        const coords: fabric.Point[] = root.getCoords(false);
        root = root.parent;
        while (root) {
            let centPoint = root.getCenterPoint();

            coords[0] = coords[0].add(centPoint);
            coords[1] = coords[1].add(centPoint);
            coords[2] = coords[2].add(centPoint);
            coords[3] = coords[3].add(centPoint);

            root = root.parent;
        }

        return coords;
    }
}
