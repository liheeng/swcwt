import Control from "../widget/Control";
import AbstractLayoutData from "./AbstractLayoutData";
import { fabric } from "fabric";
export default class FillData extends AbstractLayoutData {
    defaultWidth: number;
    defaultHeight: number;
    currentWhint: number;
    currentHhint: number;
    currentWidth: number;
    currentHeight: number;
    computeSize(control: Control, wHint: number, hHint: number, flushCache: boolean): fabric.Point;
    flushCache(): void;
}
