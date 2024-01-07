import {MongoExpression} from "./types/mongoExpression";
import {Expression} from "../../expressions";
import {newCouldNotBeBuiltError} from "../../errors";

export class MongoFilterBuilder {
    public build(expression: Expression): MongoExpression {
        throw newCouldNotBeBuiltError();
    }
}
