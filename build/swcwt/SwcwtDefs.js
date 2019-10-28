import SwcwtError from "./error/SwcwtError";
import SwcwtException from "./error/SwcwtException";
import IllegalArgumentException from "./error/IllegalArgumentException";
var SwcwtDefs = /** @class */ (function () {
    function SwcwtDefs() {
    }
    SwcwtDefs.error = function (code, throwable, detail) {
        if (code !== 46) {
            if (throwable instanceof SwcwtError || throwable instanceof SwcwtException) {
                throw throwable;
            }
        }
        var message = this.findErrorText(code);
        if (detail != null) {
            message = message + detail;
        }
        var error;
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
                var exception = new SwcwtException(code, message);
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
    };
    SwcwtDefs.findErrorText = function (code) {
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
    };
    SwcwtDefs.DEFAULT = -1;
    SwcwtDefs.CENTER = 2;
    SwcwtDefs.BEGINNING = 1;
    SwcwtDefs.END = 3;
    SwcwtDefs.LEFT = 1;
    SwcwtDefs.RIGHT = 3;
    SwcwtDefs.TOP = 1;
    SwcwtDefs.BOTTOM = 3;
    SwcwtDefs.HEIGHT = 5;
    SwcwtDefs.WIDTH = 6;
    SwcwtDefs.HORIZONTAL = 7;
    SwcwtDefs.VERTICAL = 8;
    SwcwtDefs.FILL = 4;
    SwcwtDefs.DEFAULT_DENOMINATOR = 100;
    SwcwtDefs.DEFAULT_WIDTH = 64;
    SwcwtDefs.DEFAULT_HEIGHT = 64;
    SwcwtDefs.ERROR_INVALID_ARGUMENT = 5;
    SwcwtDefs.ERROR_INVALID_PARENT = 32;
    SwcwtDefs.ALL = 1 << 0;
    SwcwtDefs.CHANGED = 1 << 1;
    return SwcwtDefs;
}());
export default SwcwtDefs;
//# sourceMappingURL=SwcwtDefs.js.map