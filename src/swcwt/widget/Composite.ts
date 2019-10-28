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
import Layout from "../interface/Layout";
import {Bounds} from "../SwcwtBase";
import WidgetUtils from "../util/WidgteUtils";
import Control, {WidgetOptions} from "./Control";
import Scrollable from "./Scrollable";
import SwcwtDefs from "../SwcwtDefs";
import {fabric} from 'fabric';

/**
 * Container widget which contains child widget(s), e.g. rich-text widget.
 */
export default class Composite extends Scrollable {

    private state: number = 0;

    protected layoutInstance: Layout<Control>;

    constructor(options?: WidgetOptions) {
        super(options);
        this.className = "Composite";
        this.layoutInstance = options ? options.layout : undefined;
    }

    public setLayout(layout: Layout<Control>): void {
        this.layoutInstance = layout;
    }

    public getLayout(): Layout<Control> {
        return this.layoutInstance;
    }

    public getChildren(): Control[] {
        const objects = this.getInternalObjects();
        return objects.slice(1) as any[];
    }

    public setChildren(children: Control[]): void {
        children.map(
            (child: Control) => {
                this.addChild(child);
            },
        );
    }

    public addChild(control: Control): void {
        this.getInternalObjects().push(control as any);
        control.setParent(this);
    }

    public delChild(control: Control): boolean {
        return this.remove(control as any) != null;
    }

    public delChildByIndex(index: number): Control {
        const result = this.getInternalObjects().splice(index + 1, 1);
        if (result.length > 0) {
            return result[0] as any;
        }
        return undefined;
    }

    public layout(changed?: boolean, all?: boolean): void {
        if (this.layoutInstance == null) { return; }
        this.markLayout(changed, all ? all : false);
        this.updateLayout(all ? all : false);
    }

    public layoutWithControl(changed: Control[], flags: number): void {
        if (changed != null) {
            changed.map(
                (control: Control, index: number) => {
                    if (control == null) {
                        this.error(SwcwtDefs.ERROR_INVALID_ARGUMENT);
                    }
                    let ancestor: boolean = false;
                    let composite = control.getParent();
                    while (composite != null) {
                        ancestor = composite === this;
                        if (ancestor) {
                            break;
                        }
                        composite = composite.parent;
                    }
                    if (!ancestor) {
                        this.error(SwcwtDefs.ERROR_INVALID_PARENT);
                    }
                },
            );

            let updateCount = 0;
            let update: Composite[] = new Array(16);
            changed.map(
                (comp: Composite, index: number) => {
                    let child = comp;
                    let composite = child.parent;
                    // Update layout when the list of children has changed.
                    child.markLayout(false, false);
                    while (child !== this) {
                        if (composite.layout != null) {
                            composite.state |= Composite.LAYOUT_NEEDED;
                            if (!composite.layoutInstance.flushCache(child)) {
                                composite.state |= Composite.LAYOUT_CHANGED;
                            }
                        }
                        if (updateCount === update.length) {
                            const newUpdate: Composite[] = new Array(update.length + 16);
                            for (let i = 0; i < update.length; i++) {
                                newUpdate[i] = update[i];
                            }
                            update = newUpdate;
                        }
                        child = update [updateCount++] = composite;
                        composite = child.parent;
                    }
                },
            );

            for (let i = updateCount - 1; i >= 0; i--) {
                update [i].updateLayout(false);
            }

        } else {
            if (this.layoutInstance == null && (flags & SwcwtDefs.ALL) === 0) {
                return;
            }
            this.markLayout((flags & SwcwtDefs.CHANGED) !== 0, (flags & SwcwtDefs.ALL) !== 0);
            this.updateLayout((flags & SwcwtDefs.ALL) !== 0);
        }
    }

    public updateLayout(all: boolean): void {
        // if (!this.isValid()) {
        //     this.layoutInstance.layout(!this.isValid());
        // }
        if ((this.state & Composite.LAYOUT_NEEDED) !== 0) {
            const changed = (this.state & Composite.LAYOUT_CHANGED) !== 0;
            this.state &= ~(Composite.LAYOUT_NEEDED | Composite.LAYOUT_CHANGED);
            let size = this.layoutInstance.layout(changed);

            // Update border and bounds.
            let w = size.x + this.getBorderWidth() * 2;
            let h = size.y + this.getBorderWidth() * 2;
            w = Math.max(w, this.width | 0);
            h = Math.max(h, this.height | 0);
            this.setBounds(this.left, this.top, w, h);
        }

        if (all) {
            this.state &= ~Composite.LAYOUT_CHILD;
            this.getChildren().map(
                (child: Control) => {
                    child.updateLayout(all);
                },
            );
        }
    }

    public markLayout(changed: boolean, all: boolean): void {
        if (this.layoutInstance != null) {
            // this.invalidate();
            this.state |= Composite.LAYOUT_NEEDED;
            if (changed) {
                this.state |= Composite.LAYOUT_CHANGED;
            }
        }

        if (all) {
            const children = this.getChildren();
            children.map(
                (child: Control) => {
                    child.markLayout(changed, all);
                },
            );
        }
    }

    public computeSize(wHint: number, hHint: number, changed?: boolean): fabric.Point {
        let size: fabric.Point;
        if (this.layoutInstance != null) {
            if ((wHint === SwcwtDefs.DEFAULT) || (hHint === SwcwtDefs.DEFAULT)) {
                const c = changed || (this.state & Composite.LAYOUT_CHANGED) !== 0;
                size = this.layoutInstance.computeSize(wHint, hHint, c);
                this.state &= ~Composite.LAYOUT_CHANGED;
            } else {
                size = new fabric.Point(wHint, hHint);
            }
        } else {
            size = this.minimumSize(wHint, hHint, changed);
            if (size.x === 0) {
                size.x = SwcwtDefs.DEFAULT_WIDTH;
            }
            if (size.y === 0) {
                size.y = SwcwtDefs.DEFAULT_HEIGHT;
            }
        }

        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }

        return size;
    }

    protected minimumSize(wHint: number, Hint: number, changed: boolean): fabric.Point {
        let width = 0, height = 0;
        const children: Control[] = this.getChildren();
        const clientArea = this.getClientArea();
        children.map(
            (child: Control) => {
                const rect = child.getBounds();
                width = Math.max(width, rect.left - clientArea.left + rect.width);
                height = Math.max(height, rect.top - clientArea.top + rect.height);
            },
        );

        return new fabric.Point(width, height);
    }
}
