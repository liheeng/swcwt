import * as React from "react";
import { Card } from "antd";
import "./ExprEditor.less";
import {fabric} from "fabric";
import Label from "../../swcwt/widget/Label";
import Composite from "../../swcwt/widget/Composite";
import {WidgetOptions} from "../../swcwt/widget/Control";
import GridLayout from "../../swcwt/layout/GridLayout";
import GridData from "../../swcwt/layout/GridData";

class HomePage extends React.Component<{}, {}> {

    drawGridLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 50, top: 50, width: 300, height: 300, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
        let comp: Composite = new Composite(opts);
        let gridLayout = new GridLayout(comp);
        gridLayout.numColumns = 2;
        gridLayout.makeColumnsEqualWidth = true;
        comp.setLayout(gridLayout)

        opts = {subTargetCheck: true, showBorder: true, border: {width: 2, stroke: "red"}};
        let label: Label = new Label("123", opts);
        let gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_BEGINNING);
        label.setLayoutData(gridData);
        comp.addChild(label);

        opts = {subTargetCheck: true,  showBorder: true};
        let label1: Label = new Label("456", opts);
        label1.setLayoutData(GridData.newWithStyle(GridData.VERTICAL_ALIGN_CENTER));
        comp.addChild(label1);

        opts = {subTargetCheck: true,  showBorder: true};
        let label2: Label = new Label("Hello", opts);
        gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_END);
        gridData.horizontalIndent = 5;
        label2.setLayoutData(gridData);
        comp.addChild(label2);

        opts = {subTargetCheck: true, showBorder: true};
        let label3: Label = new Label("World", opts);
        gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_FILL);
        label3.setLayoutData(gridData);
        comp.addChild(label3);

        comp.validate(true);
        canvas.add(comp);
    }

    // @ts-ignore
    componentDidMount() {
        let canvas = new fabric.Canvas("c1");
        this.drawGridLayout(canvas);
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
