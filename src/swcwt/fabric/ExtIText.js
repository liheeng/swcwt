/**
 * Copyright 2019 geekapp.io and liheeng@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {fabric} from "fabric";

export default class ExtIText extends fabric.IText {

    constructor(text, options) {
        super(text, options);
    }

    // renderCursor(boundaries, ctx) {
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
    // }

    // _onTickComplete() {
    //     if (this._cursorTimeout1) {
    //         clearTimeout(this._cursorTimeout1);
    //     }
    //     this._cursorTimeout1 = setTimeout(() => {
    //         this._currentTickCompleteState = this._animateCursor(this, 0, this.cursorDuration / 2, '_tick');
    //     }, 100);
    // }

    /**
     * Override this method to enable editable for any text in group or group hierarchy.
     *
     * @param options
     */
    mouseUpHandler(options) {
        this.__isMousedown = false;
        if (!this.editable ||
            (options.transform && options.transform.actionPerformed) ||
            (options.e.button && options.e.button !== 1)) {
            return;
        }

        if (this.canvas) {
            var currentActive = this.canvas._activeObject;
            if (this.canvas._activeObject instanceof fabric.Group && this.canvas.targets.length > 0) {
                currentActive = this.canvas.targets[0];
            }

            if (currentActive && (currentActive !== this)) {
                // avoid running this logic when there is an active object
                // this because is possible with shift click and fast clicks,
                // to rapidly deselect and reselect this object and trigger an enterEdit
                return;
            }
        }

        if (this.__lastSelected && !this.__corner) {
            this.selected = false;
            this.__lastSelected = false;
            this.enterEditing(options.e);
            if (this.selectionStart === this.selectionEnd) {
                this.initDelayedCursor(true);
            } else {
                this.renderCursorOrSelection();
            }
        } else {
            this.selected = true;
        }
    }
}