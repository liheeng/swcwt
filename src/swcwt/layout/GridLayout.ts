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
import AbstractLayout from "./AbstractLayout";
import {Bounds, Margin} from "../SwcwtBase";
import AbstractLayoutData from "./AbstractLayoutData";
import {fabric} from "fabric";
import Composite from "../widget/Composite";
import SwcwtDefs from "../SwcwtDefs";
import GridData from "./GridData";
import Control from "../widget/Control";
import Scrollable from "../widget/Scrollable";
import WidgetUtils from "../util/WidgteUtils";

export default class GridLayout extends AbstractLayout {
    /**
     * numColumns specifies the number of cell columns in the layout.
     * If numColumns has a value less than 1, the layout will not
     * set the size and position of any controls.
     *
     * The default value is 1.
     */
    public numColumns: number = 1;

    /**
     * makeColumnsEqualWidth specifies whether all columns in the layout
     * will be forced to have the same width.
     *
     * The default value is false.
     */
    public makeColumnsEqualWidth: boolean = false;

    /**
     * horizontalSpacing specifies the number of points between the right
     * edge of one cell and the left edge of its neighbouring cell to
     * the right.
     *
     * The default value is 5.
     */
    public horizontalSpacing: number = 5;

    /**
     * verticalSpacing specifies the number of points between the bottom
     * edge of one cell and the top edge of its neighbouring cell underneath.
     *
     * The default value is 5.
     */
    public verticalSpacing: number = 5;

    constructor(composite: Composite, margin?: Margin, numColumns?: number, makeColumnsEqualWidth?: boolean) {
        super(composite, margin);

        this.marginWidth = 5;
        this.marginHeight = 5;
        this.numColumns = numColumns ? numColumns : 1;
        this.makeColumnsEqualWidth = makeColumnsEqualWidth ? makeColumnsEqualWidth : false;
    }

    computeSize(wHint: number, hHint: number, flushCache: boolean): fabric.Point {
        let size = this.layoutInternal(false, 0, 0, wHint, hHint, flushCache);
        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }
        return size;
    }

    flushCache(control: Control): boolean {
        let data = control.getLayoutData() as GridData;
        if (data != null) {
            data.flushCache();
        }
        return true;
    }

    getData(grid: Control[][], row: number, column: number, rowCount: number,
            columnCount: number, first: boolean): GridData {
        let control = grid [row] [column];
        if (control != null) {
            let data = control.getLayoutData() as GridData;
            let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
            let vSpan = Math.max(1, data.verticalSpan);
            let i = first ? row + vSpan - 1 : row - vSpan + 1;
            let j = first ? column + hSpan - 1 : column - hSpan + 1;
            if (0 <= i && i < rowCount) {
                if (0 <= j && j < columnCount) {
                    if (control === grid [i][j]) {
                        return data;
                    }
                }
            }
        }
        return null;
    }

    layout(flushCache: boolean): fabric.Point {
        let rect = this.getComposite().getClientArea();
        return this.layoutInternal(true, rect.left, rect.top, rect.width, rect.height, flushCache);
    }

    layoutInternal(move: boolean, x: number, y: number, width: number, height: number, flushCache: boolean): fabric.Point {
        if (this.numColumns < 1) {
            return new fabric.Point(this.margin.getWidth() + this.marginWidth * 2,
                this.margin.getHeight() + this.marginHeight * 2);
        }
        let children = this.getComposite().getChildren();
        let count = 0;
        children.map(
            (child: Control, index: number) => {
                let data = child.getLayoutData() as GridData;
                if (data == null || !data.exclude) {
                    children [count++] = child;
                }
            },
        );

        if (count === 0) {
            return new fabric.Point(this.margin.getWidth() + this.marginWidth * 2,
                this.margin.getHeight() + this.marginHeight * 2);
        }

        for (let i = 0; i < count; i++) {
            let child = children [i];
            let data = child.getLayoutData() as GridData;
            if (data == null) {
                child.setLayoutData(data = new GridData());
            }
            if (flushCache) {
                data.flushCache();
            }
            data.computeSize(child, data.widthHint, data.heightHint, flushCache);
            if (data.grabExcessHorizontalSpace && data.minimumWidth > 0) {
                if (data.cacheWidth < data.minimumWidth) {
                    let trim = 0;
                    // TEMPORARY CODE
                    if (child instanceof Scrollable) {
                        let rect = child.computeTrim(0, 0, 0, 0);
                        trim = rect.width;
                    } else {
                        trim = child.getBorderWidth() * 2;
                    }
                    data.cacheWidth = data.cacheHeight = SwcwtDefs.DEFAULT;
                    data.computeSize(child, Math.max(0, data.minimumWidth - trim), data.heightHint, false);
                }
            }
            if (data.grabExcessVerticalSpace && data.minimumHeight > 0) {
                data.cacheHeight = Math.max(data.cacheHeight, data.minimumHeight);
            }
        }

        /* Build the grid */
        let row = 0, column = 0, rowCount = 0, columnCount = this.numColumns;
        let grid: Control[][] = new Array(4);
        for (let i = 0; i < count; i++) {
            let child = children [i];
            let data = child.getLayoutData() as GridData;
            let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
            let vSpan = Math.max(1, data.verticalSpan);
            while (true) {
                let lastRow = row + vSpan;
                if (lastRow >= grid.length) {
                    let newGrid: Control[][] = new Array(lastRow + 4);
                    for (let ii = 0; ii < grid.length; ii++) {
                        newGrid[ii] = grid[ii];
                    }
                    grid = newGrid;
                }
                if (grid [row] == null) {
                    grid [row] = new Array(columnCount);
                }
                while (column < columnCount && grid [row] [column] != null) {
                    column++;
                }

                let endCount = column + hSpan;
                if (endCount <= columnCount) {
                    let index = column;
                    while (index < endCount && grid [row] [index] == null) {
                        index++;
                    }
                    if (index === endCount) {
                        break;
                    }
                    column = index;
                }
                if (column + hSpan >= columnCount) {
                    column = 0;
                    row++;
                }
            }
            for (let j = 0; j < vSpan; j++) {
                if (grid [row + j] == null) {
                    grid [row + j] = new Array(columnCount);
                }
                for (let k = 0; k < hSpan; k++) {
                    grid [row + j] [column + k] = child;
                }
            }
            rowCount = Math.max(rowCount, row + vSpan);
            column += hSpan;
        }

        /* Column widths */
        let availableWidth =
            width - this.horizontalSpacing * (columnCount - 1) - (this.margin.getWidth() + this.marginWidth * 2);
        let expandCount = 0;
        let widths: number[] = new Array(columnCount);
        widths = WidgetUtils.initIntArray(widths);
        let minWidths: number[] = new Array(columnCount);
        minWidths = WidgetUtils.initIntArray(minWidths);
        let expandColumn: boolean[] = new Array(columnCount);
        expandColumn = WidgetUtils.initBooleanArray(expandColumn);

        for (let j = 0; j < columnCount; j++) {
            for (let i = 0; i < rowCount; i++) {
                let data = this.getData(grid, i, j, rowCount, columnCount, true) as GridData;
                if (data != null) {
                    let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                    if (hSpan === 1) {
                        let w = data.cacheWidth + data.horizontalIndent;
                        widths [j] = Math.max(widths [j], w);
                        if (data.grabExcessHorizontalSpace) {
                            if (!expandColumn [j]) {
                                expandCount++;
                            }
                            expandColumn [j] = true;
                        }
                        if (!data.grabExcessHorizontalSpace || data.minimumWidth !== 0) {
                            w = !data.grabExcessHorizontalSpace
                            || data.minimumWidth === SwcwtDefs.DEFAULT ? data.cacheWidth : data.minimumWidth;
                            w += data.horizontalIndent;
                            minWidths [j] = Math.max(minWidths [j], w);
                        }
                    }
                }
            }
            for (let i = 0; i < rowCount; i++) {
                let data = this.getData(grid, i, j, rowCount, columnCount, false) as GridData;
                if (data != null) {
                    let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                    if (hSpan > 1) {
                        let spanWidth = 0, spanMinWidth = 0, spanExpandCount = 0;
                        for (let k = 0; k < hSpan; k++) {
                            spanWidth += widths [j - k];
                            spanMinWidth += minWidths [j - k];
                            if (expandColumn [j - k]) {
                                spanExpandCount++;
                            }
                        }
                        if (data.grabExcessHorizontalSpace && spanExpandCount === 0) {
                            expandCount++;
                            expandColumn [j] = true;
                        }
                        let w = data.cacheWidth + data.horizontalIndent - spanWidth -
                            (hSpan - 1) * this.horizontalSpacing;
                        if (w > 0) {
                            if (this.makeColumnsEqualWidth) {
                                let equalWidth = (w + spanWidth) / hSpan;
                                let remainder = (w + spanWidth) % hSpan, last = -1;
                                for (let k = 0; k < hSpan; k++) {
                                    widths [last = j - k] = Math.max(equalWidth, widths [j - k]);
                                }
                                if (last > -1) {
                                    widths [last] += remainder;
                                }
                            } else {
                                if (spanExpandCount === 0) {
                                    widths [j] += w;
                                } else {
                                    let delta = w / spanExpandCount;
                                    let remainder = w % spanExpandCount, last = -1;
                                    for (let k = 0; k < hSpan; k++) {
                                        if (expandColumn [j - k]) {
                                            widths [last = j - k] += delta;
                                        }
                                    }
                                    if (last > -1) {
                                        widths [last] += remainder;
                                    }
                                }
                            }
                        }
                        if (!data.grabExcessHorizontalSpace || data.minimumWidth !== 0) {
                            w = !data.grabExcessHorizontalSpace
                            || data.minimumWidth === SwcwtDefs.DEFAULT ? data.cacheWidth : data.minimumWidth;
                            w += data.horizontalIndent - spanMinWidth - (hSpan - 1) * this.horizontalSpacing;
                            if (w > 0) {
                                if (spanExpandCount === 0) {
                                    minWidths [j] += w;
                                } else {
                                    let delta = w / spanExpandCount;
                                    let remainder = w % spanExpandCount, last = -1;
                                    for (let k = 0; k < hSpan; k++) {
                                        if (expandColumn [j - k]) {
                                            minWidths [last = j - k] += delta;
                                        }
                                    }
                                    if (last > -1) {
                                        minWidths [last] += remainder;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.makeColumnsEqualWidth) {
            let minColumnWidth = 0;
            let columnWidth = 0;
            for (let i = 0; i < columnCount; i++) {
                minColumnWidth = Math.max(minColumnWidth, minWidths [i]);
                columnWidth = Math.max(columnWidth, widths [i]);
            }
            columnWidth = width === SwcwtDefs.DEFAULT
            || expandCount === 0 ? columnWidth : Math.max(minColumnWidth, availableWidth / columnCount);
            for (let i = 0; i < columnCount; i++) {
                expandColumn [i] = expandCount > 0;
                widths [i] = columnWidth;
            }
        } else {
            if (width !== SwcwtDefs.DEFAULT && expandCount > 0) {
                let totalWidth = 0;
                for (let i = 0; i < columnCount; i++) {
                    totalWidth += widths [i];
                }
                let c = expandCount;
                let delta = (availableWidth - totalWidth) / c;
                let remainder = (availableWidth - totalWidth) % c;
                let last = -1;
                while (totalWidth !== availableWidth) {
                    for (let j = 0; j < columnCount; j++) {
                        if (expandColumn [j]) {
                            if (widths [j] + delta > minWidths [j]) {
                                widths [last = j] = widths [j] + delta;
                            } else {
                                widths [j] = minWidths [j];
                                expandColumn [j] = false;
                                c--;
                            }
                        }
                    }
                    if (last > -1) {
                        widths [last] += remainder;
                    }

                    for (let j = 0; j < columnCount; j++) {
                        for (let i = 0; i < rowCount; i++) {
                            let data = this.getData(grid, i, j, rowCount, columnCount, false) as GridData;
                            if (data != null) {
                                let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                                if (hSpan > 1) {
                                    if (!data.grabExcessHorizontalSpace || data.minimumWidth !== 0) {
                                        let spanWidth = 0, spanExpandCount = 0;
                                        for (let k = 0; k < hSpan; k++) {
                                            spanWidth += widths [j - k];
                                            if (expandColumn [j - k]) {
                                                spanExpandCount++;
                                            }
                                        }
                                        // tslint:disable-next-line:max-line-length
                                        let w = !data.grabExcessHorizontalSpace || data.minimumWidth === SwcwtDefs.DEFAULT ? data.cacheWidth : data.minimumWidth;
                                        w += data.horizontalIndent - spanWidth - (hSpan - 1) * this.horizontalSpacing;
                                        if (w > 0) {
                                            if (spanExpandCount === 0) {
                                                widths [j] += w;
                                            } else {
                                                let delta2 = w / spanExpandCount;
                                                let remainder2 = w % spanExpandCount, last2 = -1;
                                                for (let k = 0; k < hSpan; k++) {
                                                    if (expandColumn [j - k]) {
                                                        widths [last2 = j - k] += delta2;
                                                    }
                                                }
                                                if (last2 > -1) {
                                                    widths [last2] += remainder2;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (c === 0) {
                        break;
                    }
                    totalWidth = 0;
                    for (let i = 0; i < columnCount; i++) {
                        totalWidth += widths [i];
                    }
                    delta = (availableWidth - totalWidth) / c;
                    remainder = (availableWidth - totalWidth) % c;
                    last = -1;
                }
            }
        }

        /* Wrapping */
        let flush: GridData[] = null;
        let flushLength = 0;
        if (width !== SwcwtDefs.DEFAULT) {
            for (let j = 0; j < columnCount; j++) {
                for (let i = 0; i < rowCount; i++) {
                    let data = this.getData(grid, i, j, rowCount, columnCount, false) as GridData;
                    if (data != null) {
                        if (data.heightHint === SwcwtDefs.DEFAULT) {
                            let child = grid [i][j];
                            // TEMPORARY CODE
                            let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                            let currentWidth = 0;
                            for (let k = 0; k < hSpan; k++) {
                                currentWidth += widths [j - k];
                            }
                            currentWidth += (hSpan - 1) * this.horizontalSpacing - data.horizontalIndent;
                            // tslint:disable-next-line:max-line-length
                            if ((currentWidth !== data.cacheWidth && data.horizontalAlignment === SwcwtDefs.FILL) || (data.cacheWidth > currentWidth)) {
                                let trim = 0;
                                if (child instanceof Scrollable) {
                                    let rect = child.computeTrim(0, 0, 0, 0);
                                    trim = rect.width;
                                } else {
                                    trim = child.getBorderWidth() * 2;
                                }
                                data.cacheWidth = data.cacheHeight = SwcwtDefs.DEFAULT;
                                data.computeSize(child, Math.max(0, currentWidth - trim), data.heightHint, false);
                                if (data.grabExcessVerticalSpace && data.minimumHeight > 0) {
                                    data.cacheHeight = Math.max(data.cacheHeight, data.minimumHeight);
                                }
                                if (flush == null) {
                                    flush = new Array(count);
                                }
                                flush [flushLength++] = data;
                            }
                        }
                    }
                }
            }
        }

        /* Row heights */
        // tslint:disable-next-line:max-line-length
        let availableHeight = height - this.verticalSpacing * (rowCount - 1) - (this.margin.getHeight() + this.marginHeight * 2);
        expandCount = 0;
        let heights: number[] = new Array(rowCount);
        heights = WidgetUtils.initIntArray(heights);
        let minHeights: number[] = new Array(rowCount);
        minHeights = WidgetUtils.initIntArray(minHeights);
        let expandRow: boolean[] = new Array(rowCount);
        expandRow = WidgetUtils.initBooleanArray(expandRow);

        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                let data = this.getData(grid, i, j, rowCount, columnCount, true) as GridData;
                if (data != null) {
                    let vSpan = Math.max(1, Math.min(data.verticalSpan, rowCount));
                    if (vSpan === 1) {
                        let h = data.cacheHeight + data.verticalIndent;
                        heights [i] = Math.max(heights [i], h);
                        if (data.grabExcessVerticalSpace) {
                            if (!expandRow [i]) {
                                expandCount++;
                            }
                            expandRow [i] = true;
                        }
                        if (!data.grabExcessVerticalSpace || data.minimumHeight !== 0) {
                            // tslint:disable-next-line:max-line-length
                            h = !data.grabExcessVerticalSpace || data.minimumHeight === SwcwtDefs.DEFAULT ? data.cacheHeight : data.minimumHeight;
                            h += data.verticalIndent;
                            minHeights [i] = Math.max(minHeights [i], h);
                        }
                    }
                }
            }
            for (let j = 0; j < columnCount; j++) {
                let data = this.getData(grid, i, j, rowCount, columnCount, false) as GridData;
                if (data != null) {
                    let vSpan = Math.max(1, Math.min(data.verticalSpan, rowCount));
                    if (vSpan > 1) {
                        let spanHeight = 0, spanMinHeight = 0, spanExpandCount = 0;
                        for (let k = 0; k < vSpan; k++) {
                            spanHeight += heights [i - k];
                            spanMinHeight += minHeights [i - k];
                            if (expandRow [i - k]) {
                                spanExpandCount++;
                            }
                        }
                        if (data.grabExcessVerticalSpace && spanExpandCount === 0) {
                            expandCount++;
                            expandRow [i] = true;
                        }
                        // tslint:disable-next-line:max-line-length
                        let h = data.cacheHeight + data.verticalIndent - spanHeight - (vSpan - 1) * this.verticalSpacing;
                        if (h > 0) {
                            if (spanExpandCount === 0) {
                                heights [i] += h;
                            } else {
                                let delta = h / spanExpandCount;
                                let remainder = h % spanExpandCount, last = -1;
                                for (let k = 0; k < vSpan; k++) {
                                    if (expandRow [i - k]) {
                                        heights [last = i - k] += delta;
                                    }
                                }
                                if (last > -1) {
                                    heights [last] += remainder;
                                }
                            }
                        }
                        if (!data.grabExcessVerticalSpace || data.minimumHeight !== 0) {
                            // tslint:disable-next-line:max-line-length
                            h = !data.grabExcessVerticalSpace || data.minimumHeight === SwcwtDefs.DEFAULT ? data.cacheHeight : data.minimumHeight;
                            h += data.verticalIndent - spanMinHeight - (vSpan - 1) * this.verticalSpacing;
                            if (h > 0) {
                                if (spanExpandCount === 0) {
                                    minHeights [i] += h;
                                } else {
                                    let delta = h / spanExpandCount;
                                    let remainder = h % spanExpandCount, last = -1;
                                    for (let k = 0; k < vSpan; k++) {
                                        if (expandRow [i - k]) {
                                            minHeights [last = i - k] += delta;
                                        }
                                    }
                                    if (last > -1) {
                                        minHeights [last] += remainder;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (height !== SwcwtDefs.DEFAULT && expandCount > 0) {
            let totalHeight = 0;
            for (let i = 0; i < rowCount; i++) {
                totalHeight += heights [i];
            }
            let c = expandCount;
            let delta = (availableHeight - totalHeight) / c;
            let remainder = (availableHeight - totalHeight) % c;
            let last = -1;
            while (totalHeight !== availableHeight) {
                for (let i = 0; i < rowCount; i++) {
                    if (expandRow [i]) {
                        if (heights [i] + delta > minHeights [i]) {
                            heights [last = i] = heights [i] + delta;
                        } else {
                            heights [i] = minHeights [i];
                            expandRow [i] = false;
                            c--;
                        }
                    }
                }
                if (last > -1) {
                    heights [last] += remainder;
                }

                for (let i = 0; i < rowCount; i++) {
                    for (let j = 0; j < columnCount; j++) {
                        let data = this.getData(grid, i, j, rowCount, columnCount, false) as GridData;
                        if (data != null) {
                            let vSpan = Math.max(1, Math.min(data.verticalSpan, rowCount));
                            if (vSpan > 1) {
                                if (!data.grabExcessVerticalSpace || data.minimumHeight !== 0) {
                                    let spanHeight = 0, spanExpandCount = 0;
                                    for (let k = 0; k < vSpan; k++) {
                                        spanHeight += heights [i - k];
                                        if (expandRow [i - k]) {
                                            spanExpandCount++;
                                        }
                                    }
                                    // tslint:disable-next-line:max-line-length
                                    let h = !data.grabExcessVerticalSpace || data.minimumHeight === SwcwtDefs.DEFAULT ? data.cacheHeight : data.minimumHeight;
                                    h += data.verticalIndent - spanHeight - (vSpan - 1) * this.verticalSpacing;
                                    if (h > 0) {
                                        if (spanExpandCount === 0) {
                                            heights [i] += h;
                                        } else {
                                            let delta2 = h / spanExpandCount;
                                            let remainder2 = h % spanExpandCount, last2 = -1;
                                            for (let k = 0; k < vSpan; k++) {
                                                if (expandRow [i - k]) {
                                                    heights [last2 = i - k] += delta2;
                                                }
                                            }
                                            if (last2 > -1) {
                                                heights [last2] += remainder2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (c === 0) {
                    break;
                }
                totalHeight = 0;
                for (let i = 0; i < rowCount; i++) {
                    totalHeight += heights [i];
                }
                delta = (availableHeight - totalHeight) / c;
                remainder = (availableHeight - totalHeight) % c;
                last = -1;
            }
        }

        /* Position the controls */
        if (move) {
            let gridY = y + this.margin.top + this.marginHeight;
            for (let i = 0; i < rowCount; i++) {
                let gridX = x + this.margin.left + this.marginWidth;
                for (let j = 0; j < columnCount; j++) {
                    let data = this.getData(grid, i, j, rowCount, columnCount, true) as GridData;
                    if (data != null) {
                        let hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                        let vSpan = Math.max(1, data.verticalSpan);
                        let cellWidth = 0, cellHeight = 0;
                        for (let k = 0; k < hSpan; k++) {
                            cellWidth += widths [j + k];
                        }
                        for (let k = 0; k < vSpan; k++) {
                            cellHeight += heights [i + k];
                        }
                        cellWidth += this.horizontalSpacing * (hSpan - 1);
                        let childX = gridX + data.horizontalIndent;
                        let childWidth = Math.min(data.cacheWidth, cellWidth);
                        switch (data.horizontalAlignment) {
                            case SwcwtDefs.CENTER:
                            case GridData.CENTER:
                                childX += Math.max(0, (cellWidth - data.horizontalIndent - childWidth) / 2);
                                break;
                            case SwcwtDefs.RIGHT:
                            case SwcwtDefs.END:
                            case GridData.END:
                                childX += Math.max(0, cellWidth - data.horizontalIndent - childWidth);
                                break;
                            case SwcwtDefs.FILL:
                                childWidth = cellWidth - data.horizontalIndent;
                                break;
                        }
                        cellHeight += this.verticalSpacing * (vSpan - 1);
                        let childY = gridY + data.verticalIndent;
                        let childHeight = Math.min(data.cacheHeight, cellHeight);
                        switch (data.verticalAlignment) {
                            case SwcwtDefs.CENTER:
                            case GridData.CENTER:
                                childY += Math.max(0, (cellHeight - data.verticalIndent - childHeight) / 2);
                                break;
                            case SwcwtDefs.BOTTOM:
                            case SwcwtDefs.END:
                            case GridData.END:
                                childY += Math.max(0, cellHeight - data.verticalIndent - childHeight);
                                break;
                            case SwcwtDefs.FILL:
                                childHeight = cellHeight - data.verticalIndent;
                                break;
                        }
                        let child: Control = grid [i][j];
                        if (child != null) {
                            child.setBounds(childX, childY, childWidth, childHeight);
                        }
                    }
                    gridX += widths [j] + this.horizontalSpacing;
                }
                gridY += heights [i] + this.verticalSpacing;
            }
        }

        // clean up cache
        for (let i = 0; i < flushLength; i++) {
            flush [i].cacheWidth = flush [i].cacheHeight = -1;
        }

        let totalDefaultWidth = 0;
        let totalDefaultHeight = 0;
        for (let i = 0; i < columnCount; i++) {
            totalDefaultWidth += widths [i];
        }
        for (let i = 0; i < rowCount; i++) {
            totalDefaultHeight += heights [i];
        }
        totalDefaultWidth += this.horizontalSpacing * (columnCount - 1) + this.margin.getWidth() + this.marginWidth * 2;
        totalDefaultHeight += this.verticalSpacing * (rowCount - 1) + this.margin.getHeight() + this.marginHeight * 2;
        return new fabric.Point(totalDefaultWidth, totalDefaultHeight);
    }
}
