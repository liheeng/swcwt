import * as React from "react";
import { Card } from "antd";
import "./ExprEditor.less";
import {fabric} from "fabric";
import Label from "../../swcwt/widget/Label";
import SwcwtDefs from "../../swcwt/SwcwtDefs";
import Composite from "../../swcwt/widget/Composite";
import {WidgetOptions} from "../../swcwt/widget/Control";
import FormLayout from "../../swcwt/layout/FormLayout";
import FormData from "../../swcwt/layout/FormData";
import FormAttachment from "../../swcwt/layout/FormAttachment";

class HomePage extends React.Component<{}, {}> {

    drawFormLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 50, top: 50, width: 500, height: 500, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
        let comp: Composite = new Composite(opts);
        let formLayout = new FormLayout(comp);
        comp.setLayout(formLayout)

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true, border: {width: 2, stroke: "red"}};
        let label: Label = new Label("123", opts);
        let formData = new FormData();
        formData.left =  FormAttachment.newAttachmentToOffset(10);
        formData.top = FormAttachment.newAttachmentToOffset(20);
        label.setLayoutData(formData);
        comp.addChild(label);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label1: Label = new Label("456", opts);
        formData = new FormData();
        formData.left =  FormAttachment.newAttachmentToOffset(10, 100, 20);
        formData.top = FormAttachment.newAttachmentToOffset(50 );
        label1.setLayoutData(formData);
        comp.addChild(label1);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label2: Label = new Label("Hello World!", opts);
        formData = new FormData();
        formData.left =  FormAttachment.newAttchmentToWidget( label, 30, SwcwtDefs.RIGHT);
        formData.top = FormAttachment.newAttchmentToWidget(label, 20, SwcwtDefs.TOP);
        label2.setLayoutData(formData);
        comp.addChild(label2);

        comp.validate(true);
        canvas.add(comp);
    }

    // @ts-ignore
    componentDidMount() {
        let canvas = new fabric.Canvas("c1");
        this.drawFormLayout(canvas);
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
