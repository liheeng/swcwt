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
import Control from "../widget/Control";
import { fabric } from "fabric";
export default class FillLayout extends AbstractLayout {
    type: number;
    spacing: number;
    constructor(composite: Composite, type?: number);
    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point;
    protected computeChildSize(control: Control, wHint: number, hHint: number, flushCache: boolean): fabric.Point;
    flushCache(control: Control): boolean;
    layout(flushCache: boolean): fabric.Point;
}
