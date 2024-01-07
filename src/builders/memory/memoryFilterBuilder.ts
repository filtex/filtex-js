import {MemoryExpression} from "./types/memoryExpression";
import {Expression} from "../../expressions";
import {newCouldNotBeBuiltError} from "../../errors";

export class MemoryFilterBuilder {
    public build(expression: Expression): MemoryExpression {
        throw newCouldNotBeBuiltError();
    }
}
