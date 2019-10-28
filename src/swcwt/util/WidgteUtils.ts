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
import Widget from "../interface/Widget";

export default class WidgetUtils {

    public static initIntArray(array: number[], value?: number): number[] {
        const v = value ? value : 0;
        for (let i = 0; i < array.length; i++) {
            array[i] = v;
        }
        return array;
    }

    public static initBooleanArray(array: boolean[], value?: boolean): boolean[] {
        const v = value ? value : false;
        for (let i = 0; i < array.length; i++) {
            array[i] = v;
        }
        return array;
    }
}
