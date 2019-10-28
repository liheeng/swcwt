var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import AbstractException from "./AbstractException";
var SwcwtException = /** @class */ (function (_super) {
    __extends(SwcwtException, _super);
    function SwcwtException(code, message, throwable) {
        return _super.call(this, code, message, throwable) || this;
    }
    return SwcwtException;
}(AbstractException));
export default SwcwtException;
//# sourceMappingURL=SwcwtException.js.map