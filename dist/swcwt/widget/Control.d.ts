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
import { Border, Bounds, Margin } from "../SwcwtBase";
import Widget from "../interface/Widget";
import Composite from "./Composite";
import { fabric } from "fabric";
import Layout from "../interface/Layout";
import LayoutData from "../interface/LayoutData";
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
    static readonly LAYOUT_NEEDED: number;
    static readonly LAYOUT_CHANGED: number;
    static readonly LAYOUT_CHILD: number;
    protected className: string;
    protected border?: Border;
    protected parent: Composite;
    protected widgetBody: fabric.Object;
    protected layoutData: LayoutData;
    private valid;
    constructor(options?: WidgetOptions);
    private _createBody;
    protected init(options?: WidgetOptions): void;
    getBorder(): Border | undefined;
    setBorder(border: Border): void;
    hasBorder(): boolean;
    getBorderWidth(): number;
    invalidate(): void;
    isValid(): boolean;
    validate(all: boolean): void;
    revalidate(): void;
    getBounds(absolute?: boolean, calculate?: boolean): Bounds;
    computeSize(wHint: number, hHint: number, changed?: boolean): fabric.Point;
    markLayout(changed: boolean, all: boolean): void;
    abstract updateLayout(all: boolean): void;
    getParent(): Composite;
    setParent(parent: Composite): void;
    getLayoutData(): LayoutData;
    getInternalObjects(): Array<fabric.Object | fabric.Group>;
    protected getWidgetBody(): fabric.Rect;
    updateObjectsCoords(): void;
    setLayoutData(data: LayoutData): void;
    getClientArea(): Bounds;
    updateClientArea(left: number, top: number, width: number, height: number): void;
    setBounds(left: number, top: number, width: number, height: number): void;
    error(code: number): void;
    /**
     * Returns coords relative to canvas.
     */
    getGlobalCoords(): fabric.Point[];
}
