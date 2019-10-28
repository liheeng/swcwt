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
import RowLayout from "../../swcwt/layout/RowLayout";
import RowData from "../../swcwt/layout/RowData";
import FormLayout from "../../swcwt/layout/FormLayout";
import FormData from "../../swcwt/layout/FormData";
import FormAttachment from "../../swcwt/layout/FormAttachment";
import GridLayout from "../../swcwt/layout/GridLayout";
import GridData from "../../swcwt/layout/GridData";

class HomePage extends React.Component<{}, {}> {

    drawHorizontalFillLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 50, top: 50, width: 200, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
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
        let opts: WidgetOptions | any = {left: 260, top: 50, height: 200, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
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

    drawHorizontalRowLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 50, top: 250, width: 300, height: 100, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
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
        let label2: Label = new Label("上课的积分了", opts);
        label2.setLayoutData(new RowData());
        comp.addChild(label2);

        comp.validate(true);
        canvas.add(comp);
    }

    drawVerticalRowLayout(canvas: fabric.Canvas) {
        let opts: WidgetOptions | any = {left: 300, top: 250, width: 50, height: 200, border: {width: 10, stroke: "rgba(100,200,200,0.5)"}};
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
        let label2: Label = new Label("上课的积分了", opts);
        label2.setLayoutData(new RowData());
        comp.addChild(label2);

        comp.validate(true);
        canvas.add(comp);
    }

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
        formData.top = FormAttachment.newAttachmentToOffset(30 );
        label1.setLayoutData(formData);
        comp.addChild(label1);

        opts = {subTargetCheck: true, left: 50, top: 50, showBorder: true};
        let label2: Label = new Label("上课的积分了", opts);
        formData = new FormData();
        formData.left =  FormAttachment.newAttchmentToWidget( label, 30, SwcwtDefs.LEFT);
        formData.top = FormAttachment.newAttchmentToWidget(label, 20, SwcwtDefs.TOP);
        label2.setLayoutData(formData);
        comp.addChild(label2);

        comp.validate(true);
        canvas.add(comp);
    }

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
        let label2: Label = new Label("上课", opts);
        gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_END);
        gridData.horizontalIndent = 5;
        label2.setLayoutData(gridData);
        comp.addChild(label2);

        opts = {subTargetCheck: true, showBorder: true};
        let label3: Label = new Label("结束", opts);
        gridData = GridData.newWithStyle(GridData.VERTICAL_ALIGN_FILL);
        label3.setLayoutData(gridData);
        comp.addChild(label3);

        comp.validate(true);
        canvas.add(comp);

        console.log(label1.getGlobalCoords());
        console.log(label2.getGlobalCoords());
        console.log(label3.getGlobalCoords());
    }

    // @ts-ignore
    componentDidMount() {
        let canvas = new fabric.Canvas("c1");
        // this.drawHorizontalFillLayout(canvas);
        // this.drawVerticalFillLayout(canvas);
        // this.drawHorizontalRowLayout(canvas);
        // this.drawVerticalRowLayout(canvas);
        // this.drawFormLayout(canvas);
        this.drawGridLayout(canvas);


        canvas.on({
            'touch:gesture': function() {

            },
            'touch:drag': function() {

            },
            'touch:orientation': function() {

            },
            'touch:shake': function() {

            },
            'touch:longpress': function() {

            },
        });
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
