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
import Widget from "../interface/Widget";
import Control from "../widget/Control";
import SwcwtDefs from "../SwcwtDefs";

export default class FormAttachment {
    control?: Control;
    alignment: number = SwcwtDefs.DEFAULT;
    numerator?: number;
    denominator: number = SwcwtDefs.DEFAULT_DENOMINATOR;
    offset: number = 0;

    public static newAttchmentToWidget(control: Control, offset?: number, alignment?: number): FormAttachment {
        let f = new FormAttachment();
        f.control = control;
        f.offset = offset ? offset : 0;
        f.alignment = alignment ? alignment : SwcwtDefs.DEFAULT;
        return f;
    }

    public static newAttachmentToOffset(numerator?: number, denominator?: number, offset?: number): FormAttachment {
        let f = new FormAttachment();
        f.numerator = numerator ? numerator : 0;
        f.denominator = denominator ? denominator : SwcwtDefs.DEFAULT_DENOMINATOR;
        f.offset = offset ? offset : 0;
        return f;
    }

    protected gcd(m: number, n: number): number {
        m = Math.abs(m);
        n = Math.abs(n);
        if (m < n) {
            let temp = m;
            m = n;
            n = temp;
        }
        while (n !== 0) {
            let temp = m;
            m = n;
            n = temp % n;
        }
        return m;
    }

    public minus(attachment: FormAttachment): FormAttachment {
        let solution = new FormAttachment();
        solution.numerator = (this.numerator * attachment.denominator - (this.denominator * attachment.numerator));
        solution.denominator = (this.denominator * attachment.denominator);
        let gcd = this.gcd(solution.denominator, solution.numerator);
        solution.numerator /= gcd;
        solution.denominator /= gcd;
        solution.offset = (this.offset - attachment.offset);
        return solution;
    }

    public minusOffset(value: number): FormAttachment {
        return FormAttachment.newAttachmentToOffset(this.numerator, this.denominator, this.offset - value);
    }

    public plus(attachment: FormAttachment): FormAttachment {
        let solution = new FormAttachment();
        solution.numerator = (this.numerator * attachment.denominator + this.denominator * attachment.numerator);
        solution.denominator = (this.denominator * attachment.denominator);
        let gcd = this.gcd(solution.denominator, solution.numerator);
        solution.numerator /= gcd;
        solution.denominator /= gcd;
        solution.offset = (this.offset + attachment.offset);
        return solution;
    }

    public plusOffset(value: number): FormAttachment {
        return FormAttachment.newAttachmentToOffset(this.numerator, this.denominator, this.offset + value);
    }

    public divide(value: number): FormAttachment {
        return FormAttachment.newAttachmentToOffset(this.numerator, this.denominator * value, this.offset / value);
    }

    public solveX(value: number): number {
        if (this.denominator === 0) {
            SwcwtDefs.error(7);
        }
        return (this.numerator * value / this.denominator + this.offset);
    }

    public solveY(value: number): number {
        if (this.numerator === 0) {
            SwcwtDefs.error(7);
        }
        return ((value - this.offset) * this.denominator / this.numerator);
    }

    public toString(): string {
        let str = this.numerator + "/" + this.denominator;
        return "{y = (" + str + ((this.offset >= 0) ? ")x + " + this.offset : ")x - " + -1 * this.offset) + "}";
    }
}
