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
export declare class Bounds {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left: number, top: number, width: number, height: number);
}
export declare class AroundStyle {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left?: number, top?: number, right?: number, bottom?: number);
    getWidth(): number;
    getHeight(): number;
}
export declare class Margin extends AroundStyle {
    constructor(left?: number, top?: number, right?: number, bottom?: number);
}
/**
 * Line endings style of a brush (one of "butt", "round", "square")
 */
export declare enum LineCap {
    BUTT = "butt",
    ROUND = "round",
    SQUARE = "square"
}
/**
 * Corner style of a brush (one of "bevil", "round", "miter")
 */
export declare enum LineJoin {
    BEVIL = "bevil",
    ROUND = "round",
    MITER = "miter"
}
export declare class Border {
    stroke: string;
    /**
     * Width of border.
     */
    width: number;
    /**
     * Line endings style of a brush (one of "butt", "round", "square")
     */
    lineCap?: LineCap;
    /**
     * Corner style of a brush (one of "bevil", "round", "miter")
     */
    lineJoin?: LineJoin;
    /**
     * Line offset of an object's border
     */
    lineDashOffset?: number;
    /**
     * Maximum miter length (used for lineJoin = "miter") of an object's border
     */
    miterLimit?: number;
    dashArray?: number[];
    uniform?: boolean;
}
