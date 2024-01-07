import {Expression} from "../../expressions";
import {PostgresExpression} from "./types/postgresExpression";
import {newCouldNotBeBuiltError} from "../../errors";

export class PostgresFilterBuilder {
    public build(expression: Expression): PostgresExpression {
        throw newCouldNotBeBuiltError();
    }
}
