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
import Composite from "../widget/Composite";
import Control from "../widget/Control";
import Layout from "../interface/Layout";
import {Bounds, Margin} from "../SwcwtBase";
import {fabric} from 'fabric';

export default abstract class AbstractLayout implements Layout<Composite> {

    protected margin: Margin;

    protected marginWidth: number = 0;

    protected marginHeight: number = 0;

    protected composite: Composite;

    constructor(composite: Composite, margin?: Margin) {
        this.composite = composite;
        this.margin = margin ? margin : new Margin();
    }

    public getComposite(): Composite {
        return this.composite;
    }

    getMargin(): Margin {
        return this.margin;
    }

    public setMargin(margin: Margin): void {
        this.margin = margin;
    }
    // abstract doLayout(left: number, top: number, wHint?: number, hHint?: number): Point;

    abstract computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point;

    abstract layout(flushCache: boolean): fabric.Point;

    flushCache(control: Control): boolean {
        return false;
    }
}
