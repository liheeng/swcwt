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
import Layout from "../interface/Layout";
import Control, { WidgetOptions } from "./Control";
import Scrollable from "./Scrollable";
import { fabric } from 'fabric';
/**
 * Container widget which contains child widget(s), e.g. rich-text widget.
 */
export default class Composite extends Scrollable {
    private state;
    protected layoutInstance: Layout<Control>;
    constructor(options?: WidgetOptions);
    setLayout(layout: Layout<Control>): void;
    getLayout(): Layout<Control>;
    getChildren(): Control[];
    setChildren(children: Control[]): void;
    addChild(control: Control): void;
    delChild(control: Control): boolean;
    delChildByIndex(index: number): Control;
    layout(changed?: boolean, all?: boolean): void;
    layoutWithControl(changed: Control[], flags: number): void;
    updateLayout(all: boolean): void;
    markLayout(changed: boolean, all: boolean): void;
    computeSize(wHint: number, hHint: number, changed?: boolean): fabric.Point;
    protected minimumSize(wHint: number, Hint: number, changed: boolean): fabric.Point;
}
