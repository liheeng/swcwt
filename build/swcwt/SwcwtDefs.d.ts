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
import Throwable from "./error/Throwable";
export default class SwcwtDefs {
    static DEFAULT: number;
    static CENTER: number;
    static BEGINNING: number;
    static END: number;
    static LEFT: number;
    static RIGHT: number;
    static TOP: number;
    static BOTTOM: number;
    static HEIGHT: number;
    static WIDTH: number;
    static HORIZONTAL: number;
    static VERTICAL: number;
    static FILL: number;
    static DEFAULT_DENOMINATOR: number;
    static DEFAULT_WIDTH: number;
    static DEFAULT_HEIGHT: number;
    static ERROR_INVALID_ARGUMENT: number;
    static ERROR_INVALID_PARENT: number;
    static ALL: number;
    static CHANGED: number;
    static error(code: number, throwable?: Throwable, detail?: string): void;
    static findErrorText(code: number): string;
}
