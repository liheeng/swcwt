import * as React from "react";
import { Card } from "antd";
import "./ExprEditor.less";
import {fabric} from "fabric";
import Label from "../../swcwt/widget/Label";
import FillLayout from "../../swcwt/layout/FillLayout";
import SwcwtDefs from "../../swcwt/SwcwtDefs";
import FillData from "../../swcwt/layout/FillData";
import Composite from "../../swcwt/widget/Composite";
import {WidgetOptions} from "../../swcwt/widget/Control";

class HomePage extends React.Component<{}, {}> {

    drawHorizontalFillLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {subTargetCheck: true, left: 50, top: 50, width: 200, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
        let comp: Composite = new Composite(opts);
        let fillLayout = new FillLayout(comp, SwcwtDefs.HORIZONTAL);
        comp.setLayout(fillLayout)
        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true, border: {width: 2, stroke: "red"}};
        let label: Label = new Label("123", opts);
        label.setLayoutData(new FillData());
        comp.addChild(label);
        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label1: Label = new Label("456", opts);
        label1.setLayoutData(new FillData());
        comp.addChild(label1);
        comp.validate(true);
        canvas.add(comp);
    }

    drawVerticalFillLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {subTargetCheck: true, left: 260, top: 50, height: 200, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
        let comp: Composite = new Composite(opts);
        let fillLayout = new FillLayout(comp, SwcwtDefs.VERTICAL);
        comp.setLayout(fillLayout)
        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true, border: {width: 2, stroke: "red"}};
        let label: Label = new Label("123", opts);
        label.setLayoutData(new FillData());
        comp.addChild(label);
        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label1: Label = new Label("456", opts);
        label1.setLayoutData(new FillData());
        comp.addChild(label1);
        comp.validate(true);
        canvas.add(comp);
    }

    // @ts-ignore
    componentDidMount() {
        let canvas = new fabric.Canvas("c1");
        this.drawHorizontalFillLayout(canvas);
        this.drawVerticalFillLayout(canvas);

    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Hello React & Antd" style={{ margin: "16px 16px"}}>
                <p>Happy coding!</p>
                <h3>originX/originY = left/top (default)</h3>

                <div>
                    <p>left/top not set</p>
                    <canvas id="c1" width="800" height="800"></canvas>
                </div>
            </Card>
        );
    }
}

export default HomePage;
