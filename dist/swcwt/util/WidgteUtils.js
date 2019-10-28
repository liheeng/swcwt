var WidgetUtils = /** @class */ (function () {
    function WidgetUtils() {
    }
    WidgetUtils.initIntArray = function (array, value) {
        var v = value ? value : 0;
        for (var i = 0; i < array.length; i++) {
            array[i] = v;
        }
        return array;
    };
    WidgetUtils.initBooleanArray = function (array, value) {
        var v = value ? value : false;
        for (var i = 0; i < array.length; i++) {
            array[i] = v;
        }
        return array;
    };
    return WidgetUtils;
}());
export default WidgetUtils;
//# sourceMappingURL=WidgteUtils.js.map