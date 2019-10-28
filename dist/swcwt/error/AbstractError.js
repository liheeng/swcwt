var AbstractError = /** @class */ (function () {
    function AbstractError(code, message, throwable) {
        this.code = code;
        this.message = message;
        this.throwable = throwable;
    }
    return AbstractError;
}());
export default AbstractError;
