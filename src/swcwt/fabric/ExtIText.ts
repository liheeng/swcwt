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

    /**
     * Override this method to enable editable for any text in group or group hierarchy.
     *
     * @param options
     */
    mouseUpHandler(options) {
        const thiz: any = this;
        thiz.__isMousedown = false;
        if (!thiz.editable ||
            (options.transform && options.transform.actionPerformed) ||
            (options.e.button && options.e.button !== 1)) {
            return;
        }

        if (this.canvas) {
            var currentActive = thiz.canvas._activeObject;
            if (thiz.canvas._activeObject instanceof fabric.Group && thiz.canvas.targets.length > 0) {
                currentActive = thiz.canvas.targets[0];
            }

            if (currentActive && (currentActive !== this)) {
                // avoid running this logic when there is an active object
                // this because is possible with shift click and fast clicks,
                // to rapidly deselect and reselect this object and trigger an enterEdit
                return;
            }
        }

        if (thiz.__lastSelected && !thiz.__corner) {
            thiz.selected = false;
            thiz.__lastSelected = false;
            thiz.enterEditing(options.e);
            if (thiz.selectionStart === thiz.selectionEnd) {
                thiz.initDelayedCursor(true);
            } else {
                thiz.renderCursorOrSelection();
            }
        } else {
            thiz.selected = true;
        }
    }
}