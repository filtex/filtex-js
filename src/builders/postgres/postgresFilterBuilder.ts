import {Logic, Operator} from "../../constants";
import {Expression, LogicExpression, OperatorExpression} from "../../expressions";
import {PostgresExpression} from "./types/postgresExpression";
import {AndLogic} from "./logics/andLogic";
import {OrLogic} from "./logics/orLogic";
import {EqualOperator} from "./operators/equalOperator";
import {NotEqualOperator} from "./operators/notEqualOperator";
import {ContainOperator} from "./operators/containOperator";
import {NotContainOperator} from "./operators/notContainOperator";
import {StartWithOperator} from "./operators/startWithOperator";
import {NotStartWithOperator} from "./operators/notStartWithOperator";
import {EndWithOperator} from "./operators/endWithOperator";
import {NotEndWithOperator} from "./operators/notEndWithOperator";
import {BlankOperator} from "./operators/blankOperator";
import {NotBlankOperator} from "./operators/notBlankOperator";
import {GreaterThanOperator} from "./operators/greaterThanOperator";
import {GreaterThanOrEqualOperator} from "./operators/greaterThanOrEqualOperator";
import {LessThanOperator} from "./operators/lessThanOperator";
import {LessThanOrEqualOperator} from "./operators/lessThanOrEqualOperator";
import {InOperator} from "./operators/inOperator";
import {NotInOperator} from "./operators/notInOperator";
import {newCouldNotBeBuiltError} from "../../errors";

export class PostgresFilterBuilder {
    logicsMap = {
        [Logic.LogicAnd.name]: AndLogic.build,
        [Logic.LogicOr.name]: OrLogic.build
    };
    operatorsMap = {
        [Operator.OperatorEqual.name]: EqualOperator.build,
        [Operator.OperatorNotEqual.name]: NotEqualOperator.build,
        [Operator.OperatorContain.name]: ContainOperator.build,
        [Operator.OperatorNotContain.name]: NotContainOperator.build,
        [Operator.OperatorStartWith.name]: StartWithOperator.build,
        [Operator.OperatorNotStartWith.name]: NotStartWithOperator.build,
        [Operator.OperatorEndWith.name]: EndWithOperator.build,
        [Operator.OperatorNotEndWith.name]: NotEndWithOperator.build,
        [Operator.OperatorBlank.name]: BlankOperator.build,
        [Operator.OperatorNotBlank.name]: NotBlankOperator.build,
        [Operator.OperatorGreaterThan.name]: GreaterThanOperator.build,
        [Operator.OperatorGreaterThanOrEqual.name]: GreaterThanOrEqualOperator.build,
        [Operator.OperatorLessThan.name]: LessThanOperator.build,
        [Operator.OperatorLessThanOrEqual.name]: LessThanOrEqualOperator.build,
        [Operator.OperatorIn.name]: InOperator.build,
        [Operator.OperatorNotIn.name]: NotInOperator.build
    };

    public build(expression: Expression): PostgresExpression {
        let index = new IndexHolder(1);
        return this.buildInternal(expression, index);
    }

    private buildInternal(expression: Expression, index: IndexHolder): PostgresExpression {
        if ('logic' in expression) {
            const exp = <LogicExpression>expression;

            const expressionList: PostgresExpression[] = [];

            for (let v of exp.expressions) {
                const e = this.buildInternal(v, index);
                expressionList.push(e);
            }

            const fn = this.logicsMap[exp.logic.name];

            if (fn) {
                const result = fn(expressionList);
                if (result) {
                    return result;
                }
            }

            throw newCouldNotBeBuiltError();
        }

        if ('operator' in expression) {
            const exp = <OperatorExpression>expression;
            const fn = this.operatorsMap[exp.operator.name];

            if (fn) {
                const result = fn(exp.type, exp.field, exp.value, index.value);

                if (result) {
                    index.value += result.args.length;
                    return result;
                }
            }

            throw newCouldNotBeBuiltError();
        }

        throw newCouldNotBeBuiltError();
    }
}

class IndexHolder {
    constructor(public value: number) {
    }
}
