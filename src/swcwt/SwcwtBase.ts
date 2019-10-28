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
export class Bounds {
    public left: number = 0;
    public top: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor(left: number, top: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}

export class AroundStyle {
    public left: number = 0;
    public top: number = 0;
    public right: number = 0;
    public bottom: number = 0;

    constructor(left?: number, top?: number, right?: number, bottom?: number) {
        this.left = left ? left : 0;
        this.top = top ? top : 0;
        this.right = right ? right : 0;
        this.bottom = bottom ? bottom : 0;
    }

    public getWidth(): number {
        return this.left + this.right;
    }

    public getHeight(): number {
        return this.top + this.bottom;
    }
}

export class Margin extends AroundStyle {
    constructor(left?: number, top?: number, right?: number, bottom?: number) {
        super(left, top, right, bottom);
    }
}

/**
 * Line endings style of a brush (one of "butt", "round", "square")
 */
export enum LineCap {
    BUTT = "butt",
    ROUND = "round",
    SQUARE = "square",
}

/**
 * Corner style of a brush (one of "bevil", "round", "miter")
 */
export enum LineJoin {
    BEVIL = "bevil",
    ROUND = "round",
    MITER = "miter",
}

export class Border {
    stroke: string;

    /**
     * Width of border.
     */
    width: number = 0;

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
