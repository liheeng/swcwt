import SwcwtDefs from "../SwcwtDefs";
var FormAttachment = /** @class */ (function () {
    function FormAttachment() {
        this.alignment = SwcwtDefs.DEFAULT;
        this.denominator = SwcwtDefs.DEFAULT_DENOMINATOR;
        this.offset = 0;
    }
    FormAttachment.newAttchmentToWidget = function (control, offset, alignment) {
        var f = new FormAttachment();
        f.control = control;
        f.offset = offset ? offset : 0;
        f.alignment = alignment ? alignment : SwcwtDefs.DEFAULT;
        return f;
    };
    FormAttachment.newAttachmentToOffset = function (numerator, denominator, offset) {
        var f = new FormAttachment();
        f.numerator = numerator ? numerator : 0;
        f.denominator = denominator ? denominator : SwcwtDefs.DEFAULT_DENOMINATOR;
        f.offset = offset ? offset : 0;
        return f;
    };
    FormAttachment.prototype.gcd = function (m, n) {
        m = Math.abs(m);
        n = Math.abs(n);
        if (m < n) {
            var temp = m;
            m = n;
            n = temp;
        }
        while (n !== 0) {
            var temp = m;
            m = n;
            n = temp % n;
        }
        return m;
    };
    FormAttachment.prototype.minus = function (attachment) {
        var solution = new FormAttachment();
        solution.numerator = (this.numerator * attachment.denominator - (this.denominator * attachment.numerator));
        solution.denominator = (this.denominator * attachment.denominator);
        var gcd = this.gcd(solution.denominator, solution.numerator);
        solution.numerator /= gcd;
        solution.denominator /= gcd;
        solution.offset = (this.offset - attachment.offset);
        return solution;
    };
    FormAttachment.prototype.minusOffset = function (value) {
        return FormAttachment.newAttachmentToOffset(this.numerator, this.denominator, this.offset - value);
    };
    FormAttachment.prototype.plus = function (attachment) {
        var solution = new FormAttachment();
        solution.numerator = (this.numerator * attachment.denominator + this.denominator * attachment.numerator);
        solution.denominator = (this.denominator * attachment.denominator);
        var gcd = this.gcd(solution.denominator, solution.numerator);
        solution.numerator /= gcd;
        solution.denominator /= gcd;
        solution.offset = (this.offset + attachment.offset);
        return solution;
    };
    FormAttachment.prototype.plusOffset = function (value) {
        return FormAttachment.newAttachmentToOffset(this.numerator, this.denominator, this.offset + value);
    };
    FormAttachment.prototype.divide = function (value) {
        return FormAttachment.newAttachmentToOffset(this.numerator, this.denominator * value, this.offset / value);
    };
    FormAttachment.prototype.solveX = function (value) {
        if (this.denominator === 0) {
            SwcwtDefs.error(7);
        }
        return (this.numerator * value / this.denominator + this.offset);
    };
    FormAttachment.prototype.solveY = function (value) {
        if (this.numerator === 0) {
            SwcwtDefs.error(7);
        }
        return ((value - this.offset) * this.denominator / this.numerator);
    };
    FormAttachment.prototype.toString = function () {
        var str = this.numerator + "/" + this.denominator;
        return "{y = (" + str + ((this.offset >= 0) ? ")x + " + this.offset : ")x - " + -1 * this.offset) + "}";
    };
    return FormAttachment;
}());
export default FormAttachment;
