var AbstractException = /** @class */ (function () {
    function AbstractException(code, message, throwable) {
        this.code = code;
        this.message = message;
        this.throwable = throwable;
    }
    return AbstractException;
}());
export default AbstractException;
