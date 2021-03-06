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
import { fabric } from "fabric";
import { Margin } from "../SwcwtBase";
import Composite from "../widget/Composite";
export default class RowLayout extends AbstractLayout {
    type: number;
    spacing: number;
    wrap: boolean;
    pack: boolean;
    fill: boolean;
    center: boolean;
    justify: boolean;
    constructor(composite: Composite, margin?: Margin);
    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point;
    private computeSizeInternal;
    protected layoutHorizontal(move: boolean, wrap: boolean, width: number, flushCache: boolean): fabric.Point;
    protected layoutVertical(move: boolean, wrap: boolean, height: number, flushCache: boolean): fabric.Point;
    layout(flushCache: boolean): fabric.Point;
}
