import {Logic} from "../constants"
import {Expression} from "./expression"

export class LogicExpression implements Expression {
    constructor(
        public logic: Logic,
        public expressions: Expression[]) {
    }
}
