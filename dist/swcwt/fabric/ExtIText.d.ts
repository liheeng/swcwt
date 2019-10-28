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
import { fabric } from "fabric";
export default class ExtIText extends fabric.IText {
    constructor(text: any, options: any);
    /**
     * Override this method to enable editable for any text in group or group hierarchy.
     *
     * @param options
     */
    mouseUpHandler(options: any): void;
}
