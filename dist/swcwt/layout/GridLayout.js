var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { fabric } from "fabric";
import SwcwtDefs from "../SwcwtDefs";
import GridData from "./GridData";
import Scrollable from "../widget/Scrollable";
import WidgetUtils from "../util/WidgteUtils";
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout(composite, margin, numColumns, makeColumnsEqualWidth) {
        var _this = _super.call(this, composite, margin) || this;
        /**
         * numColumns specifies the number of cell columns in the layout.
         * If numColumns has a value less than 1, the layout will not
         * set the size and position of any controls.
         *
         * The default value is 1.
         */
        _this.numColumns = 1;
        /**
         * makeColumnsEqualWidth specifies whether all columns in the layout
         * will be forced to have the same width.
         *
         * The default value is false.
         */
        _this.makeColumnsEqualWidth = false;
        /**
         * horizontalSpacing specifies the number of points between the right
         * edge of one cell and the left edge of its neighbouring cell to
         * the right.
         *
         * The default value is 5.
         */
        _this.horizontalSpacing = 5;
        /**
         * verticalSpacing specifies the number of points between the bottom
         * edge of one cell and the top edge of its neighbouring cell underneath.
         *
         * The default value is 5.
         */
        _this.verticalSpacing = 5;
        _this.marginWidth = 5;
        _this.marginHeight = 5;
        _this.numColumns = numColumns ? numColumns : 1;
        _this.makeColumnsEqualWidth = makeColumnsEqualWidth ? makeColumnsEqualWidth : false;
        return _this;
    }
    GridLayout.prototype.computeSize = function (wHint, hHint, flushCache) {
        var size = this.layoutInternal(false, 0, 0, wHint, hHint, flushCache);
        if (wHint !== SwcwtDefs.DEFAULT) {
            size.x = wHint;
        }
        if (hHint !== SwcwtDefs.DEFAULT) {
            size.y = hHint;
        }
        return size;
    };
    GridLayout.prototype.flushCache = function (control) {
        var data = control.getLayoutData();
        if (data != null) {
            data.flushCache();
        }
        return true;
    };
    GridLayout.prototype.getData = function (grid, row, column, rowCount, columnCount, first) {
        var control = grid[row][column];
        if (control != null) {
            var data = control.getLayoutData();
            var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
            var vSpan = Math.max(1, data.verticalSpan);
            var i = first ? row + vSpan - 1 : row - vSpan + 1;
            var j = first ? column + hSpan - 1 : column - hSpan + 1;
            if (0 <= i && i < rowCount) {
                if (0 <= j && j < columnCount) {
                    if (control === grid[i][j]) {
                        return data;
                    }
                }
            }
        }
        return null;
    };
    GridLayout.prototype.layout = function (flushCache) {
        var rect = this.getComposite().getClientArea();
        return this.layoutInternal(true, rect.left, rect.top, rect.width, rect.height, flushCache);
    };
    GridLayout.prototype.layoutInternal = function (move, x, y, width, height, flushCache) {
        if (this.numColumns < 1) {
            return new fabric.Point(this.margin.getWidth() + this.marginWidth * 2, this.margin.getHeight() + this.marginHeight * 2);
        }
        var children = this.getComposite().getChildren();
        var count = 0;
        children.map(function (child, index) {
            var data = child.getLayoutData();
            if (data == null || !data.exclude) {
                children[count++] = child;
            }
        });
        if (count === 0) {
            return new fabric.Point(this.margin.getWidth() + this.marginWidth * 2, this.margin.getHeight() + this.marginHeight * 2);
        }
        for (var i = 0; i < count; i++) {
            var child = children[i];
            var data = child.getLayoutData();
            if (data == null) {
                child.setLayoutData(data = new GridData());
            }
            if (flushCache) {
                data.flushCache();
            }
            data.computeSize(child, data.widthHint, data.heightHint, flushCache);
            if (data.grabExcessHorizontalSpace && data.minimumWidth > 0) {
                if (data.cacheWidth < data.minimumWidth) {
                    var trim = 0;
                    // TEMPORARY CODE
                    if (child instanceof Scrollable) {
                        var rect = child.computeTrim(0, 0, 0, 0);
                        trim = rect.width;
                    }
                    else {
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
        var row = 0, column = 0, rowCount = 0, columnCount = this.numColumns;
        var grid = new Array(4);
        for (var i = 0; i < count; i++) {
            var child = children[i];
            var data = child.getLayoutData();
            var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
            var vSpan = Math.max(1, data.verticalSpan);
            while (true) {
                var lastRow = row + vSpan;
                if (lastRow >= grid.length) {
                    var newGrid = new Array(lastRow + 4);
                    for (var ii = 0; ii < grid.length; ii++) {
                        newGrid[ii] = grid[ii];
                    }
                    grid = newGrid;
                }
                if (grid[row] == null) {
                    grid[row] = new Array(columnCount);
                }
                while (column < columnCount && grid[row][column] != null) {
                    column++;
                }
                var endCount = column + hSpan;
                if (endCount <= columnCount) {
                    var index = column;
                    while (index < endCount && grid[row][index] == null) {
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
            for (var j = 0; j < vSpan; j++) {
                if (grid[row + j] == null) {
                    grid[row + j] = new Array(columnCount);
                }
                for (var k = 0; k < hSpan; k++) {
                    grid[row + j][column + k] = child;
                }
            }
            rowCount = Math.max(rowCount, row + vSpan);
            column += hSpan;
        }
        /* Column widths */
        var availableWidth = width - this.horizontalSpacing * (columnCount - 1) - (this.margin.getWidth() + this.marginWidth * 2);
        var expandCount = 0;
        var widths = new Array(columnCount);
        widths = WidgetUtils.initIntArray(widths);
        var minWidths = new Array(columnCount);
        minWidths = WidgetUtils.initIntArray(minWidths);
        var expandColumn = new Array(columnCount);
        expandColumn = WidgetUtils.initBooleanArray(expandColumn);
        for (var j = 0; j < columnCount; j++) {
            for (var i = 0; i < rowCount; i++) {
                var data = this.getData(grid, i, j, rowCount, columnCount, true);
                if (data != null) {
                    var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                    if (hSpan === 1) {
                        var w = data.cacheWidth + data.horizontalIndent;
                        widths[j] = Math.max(widths[j], w);
                        if (data.grabExcessHorizontalSpace) {
                            if (!expandColumn[j]) {
                                expandCount++;
                            }
                            expandColumn[j] = true;
                        }
                        if (!data.grabExcessHorizontalSpace || data.minimumWidth !== 0) {
                            w = !data.grabExcessHorizontalSpace
                                || data.minimumWidth === SwcwtDefs.DEFAULT ? data.cacheWidth : data.minimumWidth;
                            w += data.horizontalIndent;
                            minWidths[j] = Math.max(minWidths[j], w);
                        }
                    }
                }
            }
            for (var i = 0; i < rowCount; i++) {
                var data = this.getData(grid, i, j, rowCount, columnCount, false);
                if (data != null) {
                    var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                    if (hSpan > 1) {
                        var spanWidth = 0, spanMinWidth = 0, spanExpandCount = 0;
                        for (var k = 0; k < hSpan; k++) {
                            spanWidth += widths[j - k];
                            spanMinWidth += minWidths[j - k];
                            if (expandColumn[j - k]) {
                                spanExpandCount++;
                            }
                        }
                        if (data.grabExcessHorizontalSpace && spanExpandCount === 0) {
                            expandCount++;
                            expandColumn[j] = true;
                        }
                        var w = data.cacheWidth + data.horizontalIndent - spanWidth -
                            (hSpan - 1) * this.horizontalSpacing;
                        if (w > 0) {
                            if (this.makeColumnsEqualWidth) {
                                var equalWidth = (w + spanWidth) / hSpan;
                                var remainder = (w + spanWidth) % hSpan, last = -1;
                                for (var k = 0; k < hSpan; k++) {
                                    widths[last = j - k] = Math.max(equalWidth, widths[j - k]);
                                }
                                if (last > -1) {
                                    widths[last] += remainder;
                                }
                            }
                            else {
                                if (spanExpandCount === 0) {
                                    widths[j] += w;
                                }
                                else {
                                    var delta = w / spanExpandCount;
                                    var remainder = w % spanExpandCount, last = -1;
                                    for (var k = 0; k < hSpan; k++) {
                                        if (expandColumn[j - k]) {
                                            widths[last = j - k] += delta;
                                        }
                                    }
                                    if (last > -1) {
                                        widths[last] += remainder;
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
                                    minWidths[j] += w;
                                }
                                else {
                                    var delta = w / spanExpandCount;
                                    var remainder = w % spanExpandCount, last = -1;
                                    for (var k = 0; k < hSpan; k++) {
                                        if (expandColumn[j - k]) {
                                            minWidths[last = j - k] += delta;
                                        }
                                    }
                                    if (last > -1) {
                                        minWidths[last] += remainder;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.makeColumnsEqualWidth) {
            var minColumnWidth = 0;
            var columnWidth = 0;
            for (var i = 0; i < columnCount; i++) {
                minColumnWidth = Math.max(minColumnWidth, minWidths[i]);
                columnWidth = Math.max(columnWidth, widths[i]);
            }
            columnWidth = width === SwcwtDefs.DEFAULT
                || expandCount === 0 ? columnWidth : Math.max(minColumnWidth, availableWidth / columnCount);
            for (var i = 0; i < columnCount; i++) {
                expandColumn[i] = expandCount > 0;
                widths[i] = columnWidth;
            }
        }
        else {
            if (width !== SwcwtDefs.DEFAULT && expandCount > 0) {
                var totalWidth = 0;
                for (var i = 0; i < columnCount; i++) {
                    totalWidth += widths[i];
                }
                var c = expandCount;
                var delta = (availableWidth - totalWidth) / c;
                var remainder = (availableWidth - totalWidth) % c;
                var last = -1;
                while (totalWidth !== availableWidth) {
                    for (var j = 0; j < columnCount; j++) {
                        if (expandColumn[j]) {
                            if (widths[j] + delta > minWidths[j]) {
                                widths[last = j] = widths[j] + delta;
                            }
                            else {
                                widths[j] = minWidths[j];
                                expandColumn[j] = false;
                                c--;
                            }
                        }
                    }
                    if (last > -1) {
                        widths[last] += remainder;
                    }
                    for (var j = 0; j < columnCount; j++) {
                        for (var i = 0; i < rowCount; i++) {
                            var data = this.getData(grid, i, j, rowCount, columnCount, false);
                            if (data != null) {
                                var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                                if (hSpan > 1) {
                                    if (!data.grabExcessHorizontalSpace || data.minimumWidth !== 0) {
                                        var spanWidth = 0, spanExpandCount = 0;
                                        for (var k = 0; k < hSpan; k++) {
                                            spanWidth += widths[j - k];
                                            if (expandColumn[j - k]) {
                                                spanExpandCount++;
                                            }
                                        }
                                        // tslint:disable-next-line:max-line-length
                                        var w = !data.grabExcessHorizontalSpace || data.minimumWidth === SwcwtDefs.DEFAULT ? data.cacheWidth : data.minimumWidth;
                                        w += data.horizontalIndent - spanWidth - (hSpan - 1) * this.horizontalSpacing;
                                        if (w > 0) {
                                            if (spanExpandCount === 0) {
                                                widths[j] += w;
                                            }
                                            else {
                                                var delta2 = w / spanExpandCount;
                                                var remainder2 = w % spanExpandCount, last2 = -1;
                                                for (var k = 0; k < hSpan; k++) {
                                                    if (expandColumn[j - k]) {
                                                        widths[last2 = j - k] += delta2;
                                                    }
                                                }
                                                if (last2 > -1) {
                                                    widths[last2] += remainder2;
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
                    for (var i = 0; i < columnCount; i++) {
                        totalWidth += widths[i];
                    }
                    delta = (availableWidth - totalWidth) / c;
                    remainder = (availableWidth - totalWidth) % c;
                    last = -1;
                }
            }
        }
        /* Wrapping */
        var flush = null;
        var flushLength = 0;
        if (width !== SwcwtDefs.DEFAULT) {
            for (var j = 0; j < columnCount; j++) {
                for (var i = 0; i < rowCount; i++) {
                    var data = this.getData(grid, i, j, rowCount, columnCount, false);
                    if (data != null) {
                        if (data.heightHint === SwcwtDefs.DEFAULT) {
                            var child = grid[i][j];
                            // TEMPORARY CODE
                            var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                            var currentWidth = 0;
                            for (var k = 0; k < hSpan; k++) {
                                currentWidth += widths[j - k];
                            }
                            currentWidth += (hSpan - 1) * this.horizontalSpacing - data.horizontalIndent;
                            // tslint:disable-next-line:max-line-length
                            if ((currentWidth !== data.cacheWidth && data.horizontalAlignment === SwcwtDefs.FILL) || (data.cacheWidth > currentWidth)) {
                                var trim = 0;
                                if (child instanceof Scrollable) {
                                    var rect = child.computeTrim(0, 0, 0, 0);
                                    trim = rect.width;
                                }
                                else {
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
                                flush[flushLength++] = data;
                            }
                        }
                    }
                }
            }
        }
        /* Row heights */
        // tslint:disable-next-line:max-line-length
        var availableHeight = height - this.verticalSpacing * (rowCount - 1) - (this.margin.getHeight() + this.marginHeight * 2);
        expandCount = 0;
        var heights = new Array(rowCount);
        heights = WidgetUtils.initIntArray(heights);
        var minHeights = new Array(rowCount);
        minHeights = WidgetUtils.initIntArray(minHeights);
        var expandRow = new Array(rowCount);
        expandRow = WidgetUtils.initBooleanArray(expandRow);
        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < columnCount; j++) {
                var data = this.getData(grid, i, j, rowCount, columnCount, true);
                if (data != null) {
                    var vSpan = Math.max(1, Math.min(data.verticalSpan, rowCount));
                    if (vSpan === 1) {
                        var h = data.cacheHeight + data.verticalIndent;
                        heights[i] = Math.max(heights[i], h);
                        if (data.grabExcessVerticalSpace) {
                            if (!expandRow[i]) {
                                expandCount++;
                            }
                            expandRow[i] = true;
                        }
                        if (!data.grabExcessVerticalSpace || data.minimumHeight !== 0) {
                            // tslint:disable-next-line:max-line-length
                            h = !data.grabExcessVerticalSpace || data.minimumHeight === SwcwtDefs.DEFAULT ? data.cacheHeight : data.minimumHeight;
                            h += data.verticalIndent;
                            minHeights[i] = Math.max(minHeights[i], h);
                        }
                    }
                }
            }
            for (var j = 0; j < columnCount; j++) {
                var data = this.getData(grid, i, j, rowCount, columnCount, false);
                if (data != null) {
                    var vSpan = Math.max(1, Math.min(data.verticalSpan, rowCount));
                    if (vSpan > 1) {
                        var spanHeight = 0, spanMinHeight = 0, spanExpandCount = 0;
                        for (var k = 0; k < vSpan; k++) {
                            spanHeight += heights[i - k];
                            spanMinHeight += minHeights[i - k];
                            if (expandRow[i - k]) {
                                spanExpandCount++;
                            }
                        }
                        if (data.grabExcessVerticalSpace && spanExpandCount === 0) {
                            expandCount++;
                            expandRow[i] = true;
                        }
                        // tslint:disable-next-line:max-line-length
                        var h = data.cacheHeight + data.verticalIndent - spanHeight - (vSpan - 1) * this.verticalSpacing;
                        if (h > 0) {
                            if (spanExpandCount === 0) {
                                heights[i] += h;
                            }
                            else {
                                var delta = h / spanExpandCount;
                                var remainder = h % spanExpandCount, last = -1;
                                for (var k = 0; k < vSpan; k++) {
                                    if (expandRow[i - k]) {
                                        heights[last = i - k] += delta;
                                    }
                                }
                                if (last > -1) {
                                    heights[last] += remainder;
                                }
                            }
                        }
                        if (!data.grabExcessVerticalSpace || data.minimumHeight !== 0) {
                            // tslint:disable-next-line:max-line-length
                            h = !data.grabExcessVerticalSpace || data.minimumHeight === SwcwtDefs.DEFAULT ? data.cacheHeight : data.minimumHeight;
                            h += data.verticalIndent - spanMinHeight - (vSpan - 1) * this.verticalSpacing;
                            if (h > 0) {
                                if (spanExpandCount === 0) {
                                    minHeights[i] += h;
                                }
                                else {
                                    var delta = h / spanExpandCount;
                                    var remainder = h % spanExpandCount, last = -1;
                                    for (var k = 0; k < vSpan; k++) {
                                        if (expandRow[i - k]) {
                                            minHeights[last = i - k] += delta;
                                        }
                                    }
                                    if (last > -1) {
                                        minHeights[last] += remainder;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (height !== SwcwtDefs.DEFAULT && expandCount > 0) {
            var totalHeight = 0;
            for (var i = 0; i < rowCount; i++) {
                totalHeight += heights[i];
            }
            var c = expandCount;
            var delta = (availableHeight - totalHeight) / c;
            var remainder = (availableHeight - totalHeight) % c;
            var last = -1;
            while (totalHeight !== availableHeight) {
                for (var i = 0; i < rowCount; i++) {
                    if (expandRow[i]) {
                        if (heights[i] + delta > minHeights[i]) {
                            heights[last = i] = heights[i] + delta;
                        }
                        else {
                            heights[i] = minHeights[i];
                            expandRow[i] = false;
                            c--;
                        }
                    }
                }
                if (last > -1) {
                    heights[last] += remainder;
                }
                for (var i = 0; i < rowCount; i++) {
                    for (var j = 0; j < columnCount; j++) {
                        var data = this.getData(grid, i, j, rowCount, columnCount, false);
                        if (data != null) {
                            var vSpan = Math.max(1, Math.min(data.verticalSpan, rowCount));
                            if (vSpan > 1) {
                                if (!data.grabExcessVerticalSpace || data.minimumHeight !== 0) {
                                    var spanHeight = 0, spanExpandCount = 0;
                                    for (var k = 0; k < vSpan; k++) {
                                        spanHeight += heights[i - k];
                                        if (expandRow[i - k]) {
                                            spanExpandCount++;
                                        }
                                    }
                                    // tslint:disable-next-line:max-line-length
                                    var h = !data.grabExcessVerticalSpace || data.minimumHeight === SwcwtDefs.DEFAULT ? data.cacheHeight : data.minimumHeight;
                                    h += data.verticalIndent - spanHeight - (vSpan - 1) * this.verticalSpacing;
                                    if (h > 0) {
                                        if (spanExpandCount === 0) {
                                            heights[i] += h;
                                        }
                                        else {
                                            var delta2 = h / spanExpandCount;
                                            var remainder2 = h % spanExpandCount, last2 = -1;
                                            for (var k = 0; k < vSpan; k++) {
                                                if (expandRow[i - k]) {
                                                    heights[last2 = i - k] += delta2;
                                                }
                                            }
                                            if (last2 > -1) {
                                                heights[last2] += remainder2;
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
                for (var i = 0; i < rowCount; i++) {
                    totalHeight += heights[i];
                }
                delta = (availableHeight - totalHeight) / c;
                remainder = (availableHeight - totalHeight) % c;
                last = -1;
            }
        }
        /* Position the controls */
        if (move) {
            var gridY = y + this.margin.top + this.marginHeight;
            for (var i = 0; i < rowCount; i++) {
                var gridX = x + this.margin.left + this.marginWidth;
                for (var j = 0; j < columnCount; j++) {
                    var data = this.getData(grid, i, j, rowCount, columnCount, true);
                    if (data != null) {
                        var hSpan = Math.max(1, Math.min(data.horizontalSpan, columnCount));
                        var vSpan = Math.max(1, data.verticalSpan);
                        var cellWidth = 0, cellHeight = 0;
                        for (var k = 0; k < hSpan; k++) {
                            cellWidth += widths[j + k];
                        }
                        for (var k = 0; k < vSpan; k++) {
                            cellHeight += heights[i + k];
                        }
                        cellWidth += this.horizontalSpacing * (hSpan - 1);
                        var childX = gridX + data.horizontalIndent;
                        var childWidth = Math.min(data.cacheWidth, cellWidth);
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
                        var childY = gridY + data.verticalIndent;
                        var childHeight = Math.min(data.cacheHeight, cellHeight);
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
                        var child = grid[i][j];
                        if (child != null) {
                            child.setBounds(childX, childY, childWidth, childHeight);
                        }
                    }
                    gridX += widths[j] + this.horizontalSpacing;
                }
                gridY += heights[i] + this.verticalSpacing;
            }
        }
        // clean up cache
        for (var i = 0; i < flushLength; i++) {
            flush[i].cacheWidth = flush[i].cacheHeight = -1;
        }
        var totalDefaultWidth = 0;
        var totalDefaultHeight = 0;
        for (var i = 0; i < columnCount; i++) {
            totalDefaultWidth += widths[i];
        }
        for (var i = 0; i < rowCount; i++) {
            totalDefaultHeight += heights[i];
        }
        totalDefaultWidth += this.horizontalSpacing * (columnCount - 1) + this.margin.getWidth() + this.marginWidth * 2;
        totalDefaultHeight += this.verticalSpacing * (rowCount - 1) + this.margin.getHeight() + this.marginHeight * 2;
        return new fabric.Point(totalDefaultWidth, totalDefaultHeight);
    };
    return GridLayout;
}(AbstractLayout));
export default GridLayout;
//# sourceMappingURL=GridLayout.js.map