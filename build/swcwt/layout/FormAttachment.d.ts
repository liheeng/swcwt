import Control from "../widget/Control";
export default class FormAttachment {
    control?: Control;
    alignment: number;
    numerator?: number;
    denominator: number;
    offset: number;
    static newAttchmentToWidget(control: Control, offset?: number, alignment?: number): FormAttachment;
    static newAttachmentToOffset(numerator?: number, denominator?: number, offset?: number): FormAttachment;
    protected gcd(m: number, n: number): number;
    minus(attachment: FormAttachment): FormAttachment;
    minusOffset(value: number): FormAttachment;
    plus(attachment: FormAttachment): FormAttachment;
    plusOffset(value: number): FormAttachment;
    divide(value: number): FormAttachment;
    solveX(value: number): number;
    solveY(value: number): number;
    toString(): string;
}
