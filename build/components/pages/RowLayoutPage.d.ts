import * as React from "react";
import "./ExprEditor.less";
import { fabric } from "fabric";
declare class HomePage extends React.Component<{}, {}> {
    drawHorizontalRowLayout(canvas: fabric.Canvas): void;
    drawVerticalRowLayout(canvas: fabric.Canvas): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default HomePage;
