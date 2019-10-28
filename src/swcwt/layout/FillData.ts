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
import LayoutData from "../interface/LayoutData";
import Control from "../widget/Control";
import AbstractLayoutData from "./AbstractLayoutData";
import SwcwtDefs from "../SwcwtDefs";
import {fabric} from "fabric";

export default class FillData extends AbstractLayoutData {

    defaultWidth: number = -1;
    defaultHeight: number = -1;
    currentWhint: number;
    currentHhint: number;
    currentWidth: number = -1;
    currentHeight: number = -1;

    public computeSize(control: Control, wHint: number, hHint: number, flushCache: boolean): fabric.Point {
        if (flushCache) {
            this.flushCache();
        }
        if (wHint === SwcwtDefs.DEFAULT && hHint === SwcwtDefs.DEFAULT) {
            if (this.defaultWidth === -1 || this.defaultHeight === -1) {
                const size = control.computeSize(wHint, hHint, flushCache);
                this.defaultWidth = size.x;
                this.defaultHeight = size.y;
            }
            return new fabric.Point(this.defaultWidth, this.defaultHeight);
        }

        if (this.currentWidth === -1 || this.currentHeight === -1
            || wHint !== this.currentWhint || hHint !== this.currentHhint) {
            const size = control.computeSize(wHint, hHint, flushCache);
            this.currentWhint = wHint;
            this.currentHhint = hHint;
            this.currentWidth = size.x;
            this.currentHeight = size.y;
        }
        return new fabric.Point(this.currentWidth, this.currentHeight);
    }

    public flushCache(): void {
        this.defaultWidth = this.defaultHeight = -1;
        this.currentWidth = this.currentHeight = -1;
    }
}
