import * as React from "react";
import "./ExprEditor.less";
import { fabric } from "fabric";
declare class HomePage extends React.Component<{}, {}> {
    drawHorizontalFillLayout(canvas: fabric.Canvas): void;
    drawVerticalFillLayout(canvas: fabric.Canvas): void;
    drawHorizontalRowLayout(canvas: fabric.Canvas): void;
    drawVerticalRowLayout(canvas: fabric.Canvas): void;
    drawFormLayout(canvas: fabric.Canvas): void;
    drawGridLayout(canvas: fabric.Canvas): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default HomePage;
