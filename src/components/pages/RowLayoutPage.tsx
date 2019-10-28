import * as React from "react";
import { Card } from "antd";
import "./ExprEditor.less";
import {fabric} from "fabric";
import Label from "../../swcwt/widget/Label";
import SwcwtDefs from "../../swcwt/SwcwtDefs";
import Composite from "../../swcwt/widget/Composite";
import {WidgetOptions} from "../../swcwt/widget/Control";
import RowLayout from "../../swcwt/layout/RowLayout";
import RowData from "../../swcwt/layout/RowData";

class HomePage extends React.Component<{}, {}> {

    drawHorizontalRowLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 50, top: 100, width: 300, height: 100, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
        let comp: Composite = new Composite(opts);
        let rowLayout = new RowLayout(comp);
        comp.setLayout(rowLayout)

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true, border: {width: 2, stroke: "red"}};
        let label: Label = new Label("123", opts);
        label.setLayoutData(new RowData());
        comp.addChild(label);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label1: Label = new Label("456", opts);
        label1.setLayoutData(new RowData());
        comp.addChild(label1);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: false};
        let label2: Label = new Label("Hello World!", opts);
        label2.setLayoutData(new RowData());
        comp.addChild(label2);

        comp.validate(true);
        canvas.add(comp);
    }

    drawVerticalRowLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 400, top: 100, width: 50, height: 200, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
        let comp: Composite = new Composite(opts);
        let rowLayout = new RowLayout(comp);
        rowLayout.type = SwcwtDefs.VERTICAL;
        comp.setLayout(rowLayout)

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true, border: {width: 2, stroke: "red"}};
        let label: Label = new Label("123", opts);
        label.setLayoutData(new RowData());
        comp.addChild(label);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label1: Label = new Label("456", opts);
        label1.setLayoutData(new RowData());
        comp.addChild(label1);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: false};
        let label2: Label = new Label("Hello World!", opts);
        label2.setLayoutData(new RowData());
        comp.addChild(label2);

        comp.validate(true);
        canvas.add(comp);
    }

    // @ts-ignore
    componentDidMount() {
        let canvas = new fabric.Canvas("c1");
        this.drawHorizontalRowLayout(canvas);
        this.drawVerticalRowLayout(canvas);
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
