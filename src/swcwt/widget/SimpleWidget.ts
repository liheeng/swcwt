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
import Control, {WidgetOptions} from "./Control";
import {Bounds, Margin} from "../SwcwtBase";
import {fabric} from 'fabric';
import SwcwtDefs from "../SwcwtDefs";

export default abstract class SimpleWidget extends Control {

    margin: Margin;

    constructor(options?: WidgetOptions) {
        super(options);
        this.className = "SimpleWidget";
    }

    protected init(options?: WidgetOptions): void {
        this.margin = options ? options.margin : undefined;
    }

    public updateLayout(all: boolean): fabric.Point {
        const element = this.getInternalObjects()[1];
        const eleBounds = element.getBoundingRect(true, true);
        let l = this.left, t = this.top, w = eleBounds.width, h =  eleBounds.height;
        const bw = this.getBorderWidth();
        element.set({left: l + bw, top: t + bw, width: w, height: h});
        w += bw;
        h += bw;
        this.getWidgetBody().set({left: l, top: t, width: w, height: h});
        w += bw;
        h += bw;
        this.set("width", w);
        this.set("height", h);
        return new fabric.Point(w, h);
    }

    public computeSize(wHint: number, hHint: number, changed?: boolean): fabric.Point {
        const element = this.getInternalObjects()[1];
        const eleBounds = element.getBoundingRect(true, true);
        const size = new fabric.Point(eleBounds.width, eleBounds.height);
        const bw = this.getBorderWidth() * 2;
        size.x += bw;
        size.y += bw;
        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }
        return size;
    }
}
