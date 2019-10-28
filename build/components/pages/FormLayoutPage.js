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
import SwcwtDefs from "../../swcwt/SwcwtDefs";
import Composite from "../../swcwt/widget/Composite";
import FormLayout from "../../swcwt/layout/FormLayout";
import FormData from "../../swcwt/layout/FormData";
import FormAttachment from "../../swcwt/layout/FormAttachment";
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePage.prototype.drawFormLayout = function (canvas) {
        var opts = { left: 50, top: 50, width: 500, height: 500, border: { width: 10, stroke: "rgba(100,200,200,0.5)" } };
        var comp = new Composite(opts);
        var formLayout = new FormLayout(comp);
        comp.setLayout(formLayout);
        opts = { subTargetCheck: true, left: 50, top: 50, showBorder: true, border: { width: 2, stroke: "red" } };
        var label = new Label("123", opts);
        var formData = new FormData();
        formData.left = FormAttachment.newAttachmentToOffset(10);
        formData.top = FormAttachment.newAttachmentToOffset(20);
        label.setLayoutData(formData);
        comp.addChild(label);
        opts = { subTargetCheck: true, left: 50, top: 50, showBorder: true };
        var label1 = new Label("456", opts);
        formData = new FormData();
        formData.left = FormAttachment.newAttachmentToOffset(10, 100, 20);
        formData.top = FormAttachment.newAttachmentToOffset(30);
        label1.setLayoutData(formData);
        comp.addChild(label1);
        opts = { subTargetCheck: true, left: 50, top: 50, showBorder: true };
        var label2 = new Label("上课的积分了", opts);
        formData = new FormData();
        formData.left = FormAttachment.newAttchmentToWidget(label, 30, SwcwtDefs.LEFT);
        formData.top = FormAttachment.newAttchmentToWidget(label, 20, SwcwtDefs.TOP);
        label2.setLayoutData(formData);
        comp.addChild(label2);
        comp.validate(true);
        canvas.add(comp);
    };
    // @ts-ignore
    HomePage.prototype.componentDidMount = function () {
        var canvas = new fabric.Canvas("c1");
        this.drawFormLayout(canvas);
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
//# sourceMappingURL=FormLayoutPage.js.map