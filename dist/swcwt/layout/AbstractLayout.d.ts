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
import { Margin } from "../SwcwtBase";
import { fabric } from 'fabric';
export default abstract class AbstractLayout implements Layout<Composite> {
    protected margin: Margin;
    protected marginWidth: number;
    protected marginHeight: number;
    protected composite: Composite;
    constructor(composite: Composite, margin?: Margin);
    getComposite(): Composite;
    getMargin(): Margin;
    setMargin(margin: Margin): void;
    abstract computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point;
    abstract layout(flushCache: boolean): fabric.Point;
    flushCache(control: Control): boolean;
}
