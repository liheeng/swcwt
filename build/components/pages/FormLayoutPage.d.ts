import * as React from "react";
import "./ExprEditor.less";
import { fabric } from "fabric";
declare class HomePage extends React.Component<{}, {}> {
    drawFormLayout(canvas: fabric.Canvas): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default HomePage;
