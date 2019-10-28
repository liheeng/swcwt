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
import LayoutData from "../interface/LayoutData";
import SwcwtDefs from "../SwcwtDefs";

export default abstract class AbstractLayoutData implements LayoutData {
    horizontalAlignment: number = SwcwtDefs.CENTER;

    verticalAlignment: number = SwcwtDefs.BEGINNING;

    hOffset: number = 0;

    vOffset: number = 0;

    getHorizontalAlign(): number {
        return this.horizontalAlignment;
    }

    getHorizontalOffset(): number {
        return this.hOffset;
    }

    getVerticalAlign(): number {
        return this.verticalAlignment;
    }

    getVerticalOffset(): number {
        return this.vOffset;
    }
}

