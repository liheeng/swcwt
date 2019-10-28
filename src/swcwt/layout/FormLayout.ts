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
import {Bounds} from "../SwcwtBase";
import AbstractLayoutData from "./AbstractLayoutData";
import Widget from "../interface/Widget";
import {fabric} from "fabric";
import Control from "../widget/Control";
import FormData from "./FormData";
import Scrollable from "../widget/Scrollable";
import Composite from "../widget/Composite";
import SwcwtDefs from "../SwcwtDefs";

export default class FormLayout extends AbstractLayout {

    spacing?: number = 0;

    /*
 * Computes the preferred height of the form with
 * respect to the preferred height of the control.
 *
 * Given that the equations for top (T) and bottom (B)
 * of the control in terms of the height of the form (X)
 * are:
 *		T = AX + B
 *		B = CX + D
 *
 * The equation for the height of the control (H)
 * is bottom (B) minus top (T) or (H = B - T) or:
 *
 *		H = (CX + D) - (AX + B)
 *
 * Solving for (X), the height of the form, we get:
 *
 *		X = (H + B - D) / (C - A)
 *
 * When (A = C), (C - A = 0) and the equation has no
 * solution for X.  This is a special case meaning that
 * the control does not constrain the height of the
 * form.  In this case, we need to arbitrarily define
 * the height of the form (X):
 *
 * Case 1: A = C, A = 0, C = 0
 *
 * 		Let X = D, the distance from the top of the form
 * 		to the bottom edge of the control.  In this case,
 * 		the control was attached to the top of the form
 * 		and the form needs to be large enough to show the
 * 		bottom edge of the control.
 *
 * Case 2: A = C, A = 1, C = 1
 *
 * 		Let X = -B, the distance from the bottom of the
 *		form to the top edge of the control.  In this case,
 * 		the control was attached to the bottom of the form
 * 		and the only way that the control would be visible
 * 		is if the offset is negative.  If the offset is
 * 		positive, there is no possible height for the form
 * 		that will show the control as it will always be
 * 		below the bottom edge of the form.
 *
 * Case 3: A = C, A !== 0, C !== 0 and A !== 1, C !== 0
 *
 * 		Let X = D / (1 - C), the distance from the top of the
 * 		form to the bottom edge of the control.  In this case,
 * 		since C is not 0 or 1, it must be a fraction, U / V.
 * 		The offset D is the distance from CX to the bottom edge
 * 		of the control.  This represents a fraction of the form
 * 		(1 - C)X. Since the height of a fraction of the form is
 * 		known, the height of the entire form can be found by setting
 * 		(1 - C)X = D.  We solve this equation for X in terms of U
 * 		and V, giving us X = (U * D) / (U - V). Similarly, if the
 * 		offset D is	negative, the control is positioned above CX.
 * 		The offset -B is the distance from the top edge of the control
 * 		to CX. We can find the height of the entire form by setting
 * 		CX = -B. Solving in terms of U and V gives us X = (-B * V) / U.
 */
    protected computeHeight(control: Control, data: FormData, flushCache: boolean): number {
        let top = data.getTopAttachment(control, this.spacing, flushCache);
        let bottom = data.getBottomAttachment(control, this.spacing, flushCache);
        let height = bottom.minus(top);
        if (height.numerator === 0) {
            if (bottom.numerator === 0) { return bottom.offset; }
            if (bottom.numerator === bottom.denominator) { return -top.offset; }
            if (bottom.offset <= 0) {
                return -top.offset * top.denominator / bottom.numerator;
            }
            let divider = bottom.denominator - bottom.numerator;
            return bottom.denominator * bottom.offset / divider;
        }
        return height.solveY(data.getHeight(control, flushCache));
    }

    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point {
        let size = this.layoutInternal(false, 0, 0, wHint, hHint, flushCache);
        if (wHint !== SwcwtDefs.DEFAULT) { size.x = wHint; }
        if (hHint !== SwcwtDefs.DEFAULT) { size.y = hHint; }
        return size;
    }

    flushCache(control: Control): boolean {
        let data = control.getLayoutData() as FormData;
        if (data != null) { data.flushCache(); }
        return true;
    }

    /*
     * Computes the preferred height of the form with
     * respect to the preferred height of the control.
     */
    protected computeWidth(control: Control, data: FormData, flushCache: boolean): number {
        let left = data.getLeftAttachment(control, this.spacing, flushCache);
        let right = data.getRightAttachment(control, this.spacing, flushCache);
        let width = right.minus(left);
        if (width.numerator === 0) {
            if (right.numerator === 0) { return right.offset; }
            if (right.numerator === right.denominator) { return -left.offset; }
            if (right.offset <= 0) {
                return -left.offset * left.denominator / left.numerator;
            }
            let divider = right.denominator - right.numerator;
            return right.denominator * right.offset / divider;
        }
        return width.solveY(data.getWidth(control, flushCache));
    }

    layout(flushCache: boolean): fabric.Point {
        let rect = this.getComposite().getClientArea();
        let x = rect.left + this.margin.left + this.marginWidth;
        let y = rect.top + this.margin.top + this.marginHeight;
        let width = Math.max(0, rect.width - this.margin.getWidth() - 2 * this.marginWidth);
        let height = Math.max(0, rect.height - this.margin.getHeight() - 2 * this.marginHeight);
        return this.layoutInternal(true, x, y, width, height, flushCache);
    }

    private layoutInternal(move: boolean, x: number, y: number, width: number, height: number, flushCache: boolean): fabric.Point {
        let children = this.getComposite().getChildren();
        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as FormData;
                if (data == null) { child.setLayoutData(data = new FormData()); }
                if (flushCache) { data.flushCache(); }
                data.cacheLeft = data.cacheRight = data.cacheTop = data.cacheBottom = null;
            },
        );

        let flush: boolean[] = null;
        let bounds: Bounds[] = null;
        let w = 0, h = 0;
        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as FormData;
                if (width !== SwcwtDefs.DEFAULT) {
                    data.needed = false;
                    let left = data.getLeftAttachment(child, this.spacing, flushCache);
                    let right = data.getRightAttachment(child, this.spacing, flushCache);
                    let x1 = left.solveX(width), x2 = right.solveX(width);
                    if (data.height === SwcwtDefs.DEFAULT && !data.needed) {
                        let trim = 0;
                        // TEMPORARY CODE
                        if (child instanceof Scrollable) {
                            let rect = child.computeTrim(0, 0, 0, 0);
                            trim = rect.width;
                        } else {
                            trim = child.getBorderWidth() * 2;
                        }
                        data.cacheWidth = data.cacheHeight = -1;
                        let currentWidth = Math.max(0, x2 - x1 - trim);
                        data.computeSize(child, currentWidth, data.height, flushCache);
                        if (flush == null) { flush = new Array(children.length); }
                        flush [index] = true;
                    }
                    w = Math.max(x2, w);
                    if (move) {
                        if (bounds == null) { bounds = new Array(children.length); }
                        bounds [index] = new Bounds(0, 0, 0, 0);
                        bounds [index].left = x + x1;
                        bounds [index].width = x2 - x1;
                    }
                } else {
                    w = Math.max(this.computeWidth(child, data, flushCache), w);
                }
            },
        );

        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as FormData;
                if (height !== SwcwtDefs.DEFAULT) {
                    let y1 = data.getTopAttachment(child, this.spacing, flushCache).solveX(height);
                    let y2 = data.getBottomAttachment(child, this.spacing, flushCache).solveX(height);
                    h = Math.max(y2, h);
                    if (move) {
                        bounds [index].top = y + y1;
                        bounds [index].height = y2 - y1;
                    }
                } else {
                    h = Math.max(this.computeHeight(child, data, flushCache), h);
                }
            },
        );

        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as FormData;
                if (flush != null && flush [index]) { data.cacheWidth = data.cacheHeight = -1; }
                data.cacheLeft = data.cacheRight = data.cacheTop = data.cacheBottom = null;
            },
        );

        if (move) {
            children.map(
                (child: Control, index: number) => {
                    child.setBounds(bounds [index].left, bounds [index].top,
                        bounds [index].width, bounds [index].height);
                },
            );
        }

        w += this.margin.getWidth() + this.marginWidth * 2;
        h += this.margin.getHeight() + this.marginHeight * 2;
        return new fabric.Point(w, h);
    }
}
