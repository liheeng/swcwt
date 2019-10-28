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
import Control from "../widget/Control";
import {Margin} from "../SwcwtBase";
import {fabric} from "fabric";

/**
 * This interface declares basic method of layout.
 */
export default interface Layout<E extends Control> {
    /**
     * Return composite which is set to apply this layout.
     */
    getComposite(): E;

    /**
     * Return margin which defines gaps(left/top/right/bottom) between composite bounds and layout content.
     */
    getMargin(): Margin;

    /**
     * Calculate size of layout content which don't include margin.
     *
     * @param wHint
     * @param hHint
     * @param flushCache
     */
    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point;

    /**
     * Do layout for content of composite.
     * @param flushCache
     */
    layout(flushCache: boolean): fabric.Point;

    /**
     * Clear cache of layout.
     *
     * @param control
     */
    flushCache(control: Control): boolean;
}
