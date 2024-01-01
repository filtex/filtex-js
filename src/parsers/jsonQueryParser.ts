import {Logic, Operator} from "../constants";
import {Expression, LogicExpression, OperatorExpression} from "../expressions";
import {Metadata, Token} from "../models";
import {JsonQueryTokenizer} from "../tokenizers";
import {newCouldNotBeParsedError, newLogicCouldNotBeParsedError, newOperatorCouldNotBeParsedError} from "../errors";
import {isArray} from "../utils";

export class JsonQueryParser {
    constructor(
        public metadata: Metadata,
        public queryTokenizer: JsonQueryTokenizer) {
    }

    public parse(query: string): Expression {
        const tokens = this.queryTokenizer.tokenize(query);
        return this.parseInternal(tokens);
    }

    private parseInternal(data: any[]): Expression {
        if (data.length === 3) {
            const fieldToken = data[0] as Token;
            const operatorToken = data[1] as Token;

            let value;

            if (isArray(data[2])) {
                value = data[2].map((v: any) => v.value);
            } else {
                const valueToken = data[2] as Token;
                value = valueToken.value;
            }

            const op = Operator.parseOperator(operatorToken.type.name);
            if (op.name === "") {
                throw newOperatorCouldNotBeParsedError();
            }

            return new OperatorExpression(
                this.metadata.getFieldType(fieldToken.value.toString()),
                this.metadata.getFieldName(fieldToken.value.toString()),
                op,
                value);
        }

        if (data.length === 2) {
            const logicToken = data[0] as Token;

            const logic = Logic.parseLogic(logicToken.value?.toString());
            if (logic.name === "") {
                throw newLogicCouldNotBeParsedError();
            }

            const expressionList: any[] = [];

            for (let item of data[1]) {
                const ex = this.parseInternal(item);
                expressionList.push(ex);
            }

            return new LogicExpression(logic, expressionList);
        }

        throw newCouldNotBeParsedError();
    }
}
