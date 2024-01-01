import {Operator, FieldType} from "../constants"
import {Expression} from "./expression";

export class OperatorExpression implements Expression {
    constructor(
        public type: FieldType,
        public field: string,
        public operator: Operator,
        public value: any) {
    }
}
