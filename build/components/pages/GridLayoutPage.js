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
import * as React from "react";
import { Card } from "antd";
import "./ExprEditor.less";
import { fabric } from "fabric";
import Label from "../../swcwt/widget/Label";
import Composite from "../../swcwt/widget/Composite";
import GridLayout from "../../swcwt/layout/GridLayout";
import GridData from "../../swcwt/layout/GridData";
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePage.prototype.drawGridLayout = function (canvas) {
        var opts = { left: 50, top: 50, width: 300, height: 300, border: { width: 10, stroke: "rgba(100,200,200,0.5)" } };
        var comp = new Composite(opts);
        var gridLayout = new GridLayout(comp);
        gridLayout.numColumns = 2;
        gridLayout.makeColumnsEqualWidth = true;
        comp.setLayout(gridLayout);
        opts = { subTargetCheck: true, showBorder: true, border: { width: 2, stroke: "red" } };
        var label = new Label("123", opts);
        var gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_BEGINNING);
        label.setLayoutData(gridData);
        comp.addChild(label);
        opts = { subTargetCheck: true, showBorder: true };
        var label1 = new Label("456", opts);
        label1.setLayoutData(GridData.newWithStyle(GridData.VERTICAL_ALIGN_CENTER));
        comp.addChild(label1);
        opts = { subTargetCheck: true, showBorder: true };
        var label2 = new Label("上课", opts);
        gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_END);
        gridData.horizontalIndent = 5;
        label2.setLayoutData(gridData);
        comp.addChild(label2);
        opts = { subTargetCheck: true, showBorder: true };
        var label3 = new Label("结束", opts);
        gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_FILL);
        label3.setLayoutData(gridData);
        comp.addChild(label3);
        comp.validate(true);
        canvas.add(comp);
    };
    // @ts-ignore
    HomePage.prototype.componentDidMount = function () {
        var canvas = new fabric.Canvas("c1");
        this.drawGridLayout(canvas);
    };
    HomePage.prototype.render = function () {
        return (React.createElement(Card, { bordered: true, title: "Hello React & Antd", style: { margin: "16px 16px" } },
            React.createElement("p", null, "Happy coding!"),
            React.createElement("h3", null, "originX/originY = left/top (default)"),
            React.createElement("div", null,
                React.createElement("p", null, "left/top not set"),
                React.createElement("canvas", { id: "c1", width: "800", height: "800" }))));
    };
    return HomePage;
}(React.Component));
export default HomePage;
//# sourceMappingURL=GridLayoutPage.js.map