import * as React from "react";
import { Card } from "antd";
import "./HomePage.less";
import {fabric} from "fabric";

class HomePage extends React.Component<{}, {}> {
    componentDidMount() {
        // fabric.IText.prototype.renderCursor = function(boundaries, ctx) {
        //
        //     let cursorLocation = this.get2DCursorLocation(),
        //         lineIndex = cursorLocation.lineIndex,
        //         charIndex = cursorLocation.charIndex > 0 ? cursorLocation.charIndex - 1 : 0,
        //         charHeight = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontSize'),
        //         multiplier = this.scaleX * this.canvas.getZoom(),
        //         cursorWidth = this.cursorWidth / multiplier,
        //         topOffset = boundaries.topOffset,
        //         dy = this.getValueOfPropertyAt(lineIndex, charIndex, 'deltaY');
        //
        //     topOffset += (1 - this._fontSizeFraction) * this.getHeightOfLine(lineIndex) / this.lineHeight
        //         - charHeight * (1 - this._fontSizeFraction);
        //
        //     if (this.inCompositionMode) {
        //         this.renderSelection(boundaries, ctx);
        //     }
        //
        //     ctx.fillStyle = this.getValueOfPropertyAt(lineIndex, charIndex, 'fill');
        //     ctx.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity;
        //     /*     if (!b[key]) {
        //          key = (boundaries.left + boundaries.leftOffset - cursorWidth / 2).toString();
        //          b[key] = boundaries;
        //          console.log(boundaries);
        //               }  */
        //     // console.log(boundaries);
        //     ctx.fillRect(
        //         boundaries.left + boundaries.leftOffset - cursorWidth / 2,
        //         topOffset + boundaries.top + dy,
        //         cursorWidth,
        //         charHeight);
        // };
        // fabric.IText.prototype._onTickComplete = function() {
        //
        //     let _this = this;
        //
        //     if (this._cursorTimeout1) {
        //         clearTimeout(this._cursorTimeout1);
        //     }
        //     this._cursorTimeout1 = setTimeout(function() {
        //         _this._currentTickCompleteState = _this._animateCursor(_this, 0, this.cursorDuration / 2, '_tick');
        //     }, 500);
        // };
        // fabric.IText.prototype.mouseUpHandler = function(options) {
        //     this.__isMousedown = false;
        //     if (!this.editable ||
        //         (options.transform && options.transform.actionPerformed) ||
        //         (options.e.button && options.e.button !== 1)) {
        //         return;
        //     }
        //
        //     if (this.canvas) {
        //         var currentActive = this.canvas._activeObject;
        //         if (this.canvas._activeObject instanceof fabric.Group && this.canvas.targets.length > 0) {
        //             currentActive = this.canvas.targets[0];
        //         }
        //
        //         if (currentActive && (currentActive !== this)) {
        //             // avoid running this logic when there is an active object
        //             // this because is possible with shift click and fast clicks,
        //             // to rapidly deselect and reselect this object and trigger an enterEdit
        //             return;
        //         }
        //     }
        //
        //     if (this.__lastSelected && !this.__corner) {
        //         this.selected = false;
        //         this.__lastSelected = false;
        //         this.enterEditing(options.e);
        //         if (this.selectionStart === this.selectionEnd) {
        //             this.initDelayedCursor(true);
        //         } else {
        //             this.renderCursorOrSelection();
        //         }
        //     } else {
        //         this.selected = true;
        //     }
        // };
        //
        // let canvas1 = new fabric.Canvas("c1");
        // let borderWidth = 10;
        // // var circle = new fabric.Circle({ radius: 50, fill: '#eef' });
        // let group = new fabric.Group([ ], {subTargetCheck: true, left: 50, top: 50, stroke: '#ff1318',
        //     strokeWidth: 1});
        //
        // let rect = new fabric.Rect({fill: 'white', stroke: '#ff1318', strokeWidth: borderWidth});
        // group.add(rect);
        //
        // let text = new fabric.IText("111", {
        //     stroke: '#ff1318',
        //     strokeWidth: 1,
        // });
        // text.on('changed', (evt) => {
        //     layout();
        // });
        // group.add(text);
        //
        // text = new fabric.IText("222", {
        //     stroke: '#ff1318',
        //     strokeWidth: 1,
        // });
        // text.on('changed', (evt) => {
        //     layout();
        // });
        // group.add(text)
        //
        // text = new fabric.IText("333", {
        //     stroke: '#ff1318',
        //     strokeWidth: 1,
        // });
        // text.on('changed', (evt) => {
        //     layout();
        // });
        // group.add(text);
        //
        // let layout = () => {
        //     let x = group.left, y = group.top, w = 0, totalW = 0, h = 0;
        //     group._objects.map((obj, index) => {
        //         if (obj instanceof fabric.Rect) {
        //             return;
        //         }
        //         let bounds = obj.getBoundingRect(false, false);
        //         x += w;
        //         obj.set("left", x + borderWidth);
        //         obj.set("top", y + borderWidth);
        //         w = bounds.width + borderWidth;
        //         totalW += w;
        //         h = Math.max(h, bounds.height + borderWidth);
        //     });
        //
        //     rect.set({left: group.left, top: group.top, width: totalW, height: h});
        //     group.set("width", totalW + borderWidth);
        //     group.set("height", h + borderWidth);
        //     group._updateObjectsCoords();
        //     group.render(canvas1.getContext());
        // }
        //
        // layout();
        //
        // // tslint:disable-next-line:max-line-length
        // // var rect1 = new fabric.Rect({left: 50, top: 50, width: 200, height: 200, fill: 'white', stroke: 'blue', strokeWidth: 3});
        // // var group1 = new fabric.Group([rect1, group], {'subTargetCheck': true, 'left': 50, 'top':50});
        // // group.on('moved', (evt) =>{
        // //     console.log(canvas1._normalizePointer(canvas1._objects[0]._objects[1], canvas1.getPointer(evt, true)));
        // // });
        // canvas1.add(group);
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
