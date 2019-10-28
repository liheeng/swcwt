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
import SwcwtError from "./error/SwcwtError";
import SwcwtException from "./error/SwcwtException";
import IllegalArgumentException from "./error/IllegalArgumentException";

export default class SwcwtDefs {
    public static DEFAULT: number = -1;
    public static CENTER: number = 2;
    public static BEGINNING: number = 1;
    public static END: number = 3;
    public static LEFT = 1;
    public static RIGHT = 3;
    public static TOP = 1;
    public static BOTTOM = 3;
    public static HEIGHT = 5;
    public static WIDTH = 6;
    public static HORIZONTAL = 7;
    public static VERTICAL = 8;
    public static FILL = 4;

    public static DEFAULT_DENOMINATOR = 100;
    public static DEFAULT_WIDTH = 64;
    public static DEFAULT_HEIGHT = 64;
    public static ERROR_INVALID_ARGUMENT = 5;
    public static ERROR_INVALID_PARENT = 32;

    public static ALL = 1 << 0;
    public static CHANGED = 1 << 1;

    public static error(code: number, throwable?: Throwable, detail?: string): void {
        if (code !== 46) {
            if (throwable instanceof SwcwtError || throwable instanceof SwcwtException) {
                throw throwable;
            }
        }

        let message = this.findErrorText(code);
        if (detail != null) {
            message = message + detail;
        }
        let error: SwcwtError;

        switch (code) {
            case 4:
            case 5:
            case 6:
            case 7:
            case 21:
            case 27:
            case 32:
            case 33:
            case 37:
                throw new IllegalArgumentException(message);
            case 10:
            case 16:
            case 22:
            case 24:
            case 38:
            case 39:
            case 40:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 49:
            case 50:
            case 51:
                const exception = new SwcwtException(code, message);
                exception.throwable = throwable;
                throw exception;
            case 1:
            case 2:
            case 3:
            case 8:
            case 9:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 20:
            case 28:
            case 29:
            case 30:
            case 31:
            case 36:
            case 47:
                error = new SwcwtError(code, message);
                error.throwable = throwable;
                throw error;
            case 17:
            case 18:
            case 19:
            case 23:
            case 25:
            case 26:
            case 34:
            case 35:
            case 41:
            case 48:
        }

        error = new SwcwtError(code, message);
        error.throwable = throwable;
        throw error;
    }

    public static findErrorText(code: number): string {
        switch (code) {
            case 1:
                return "Unspecified error";
            case 2:
                return "No more handles";
            case 3:
                return "No more callbacks";
            case 4:
                return "Argument cannot be null";
            case 5:
                return "Argument not valid";
            case 51:
                return "Return value not valid";
            case 6:
                return "Index out of bounds";
            case 7:
                return "Argument cannot be zero";
            case 8:
                return "Cannot get item";
            case 9:
                return "Cannot get selection";
            case 11:
                return "Cannot get item height";
            case 12:
                return "Cannot get text";
            case 13:
                return "Cannot set text";
            case 14:
                return "Item not added";
            case 15:
                return "Item not removed";
            case 20:
                return "Not implemented";
            case 21:
                return "Menu must be a drop down";
            case 22:
                return "Invalid thread access";
            case 24:
                return "Widget is disposed";
            case 27:
                return "Menu item is not a CASCADE";
            case 28:
                return "Cannot set selection";
            case 29:
                return "Cannot set menu";
            case 30:
                return "Cannot set the enabled state";
            case 31:
                return "Cannot get the enabled state";
            case 32:
                return "Widget has the wrong parent";
            case 33:
                return "Menu is not a BAR";
            case 36:
                return "Cannot get count";
            case 37:
                return "Menu is not a POP_UP";
            case 38:
                return "Unsupported color depth";
            case 39:
                return "i/o error";
            case 40:
                return "Invalid image";
            case 42:
                return "Unsupported or unrecognized format";
            case 43:
                return "Subclassing not allowed";
            case 44:
                return "Graphic is disposed";
            case 45:
                return "Device is disposed";
            case 49:
                return "BrowserFunction is disposed";
            case 46:
                return "Failed to execute runnable";
            case 50:
                return "Failed to evaluate javascript expression";
            case 47:
                return "Unable to load library";
            case 10:
                return "Cannot invert matrix";
            case 16:
                return "Unable to load graphics library";
            case 48:
                return "Font not valid";
            case 17:
            case 18:
            case 19:
            case 23:
            case 25:
            case 26:
            case 34:
            case 35:
            case 41:
        }
        return "Unknown error";
    }
}
