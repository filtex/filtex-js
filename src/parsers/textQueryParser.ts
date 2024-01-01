import {Logic, Operator, TokenType} from "../constants";
import {Expression, LogicExpression, OperatorExpression} from "../expressions";
import {Metadata, Token} from "../models";
import {TextQueryTokenizer} from "../tokenizers";
import {newCouldNotBeParsedError, newLogicCouldNotBeParsedError, newOperatorCouldNotBeParsedError} from "../errors";
import {isArray} from "../utils";

export class TextQueryParser {
    constructor(
        public metadata: Metadata,
        public queryTokenizer: TextQueryTokenizer) {
    }

    public parse(query: string): Expression {
        const tokens = this.queryTokenizer.tokenize(query);

        const ref = {result: []};
        const parsed = this.parseTokens(tokens, ref);
        return this.parseExpression(parsed);
    }

    private parseTokens(queue: Token[], ref: { result: any[] }, isValueExpected: boolean = false): any[] {
        while (queue.length > 0) {
            const token = queue.shift();

            if (!token || token.type === TokenType.TokenTypeSpace) {
                continue;
            }

            if (token.type.isFieldTokenType()) {
                ref.result.push(token);
            } else if (token.type.isComparerTokenType()) {
                ref.result.push(token);
            } else if (token.type.isNotComparerTokenType()) {
                ref.result.push(token);
                ref.result.push(new Token(TokenType.TokenTypeValue, ''));

                if (isValueExpected) {
                    return ref.result;
                }
            } else if (token.type.isValueTokenType()) {
                if (ref.result.length > 2 && isArray(ref.result[2])) {
                    ref.result[2].push(token);
                } else {
                    ref.result.push(token);
                }

                if (isValueExpected) {
                    return ref.result;
                }
            } else if (token.type.isLogicTokenType()) {
                const logicInner = {result: []};
                const logicResult = this.parseTokens(queue, logicInner, true);
                if (isArray(ref.result) && ref.result.length > 0 && ref.result[0].type === token.type) {
                    ref.result = [token, [...ref.result[1], logicResult]];
                } else {
                    ref.result = [token, [ref.result, logicResult]];
                }
            } else if (token.type.isSeparatorTokenType()) {
                if (isArray(ref.result[2])) {
                    ref.result[2] = [...ref.result[2]];
                } else {
                    ref.result[2] = [ref.result[2]];
                }
            } else if (token.type.isOpenGroupTokenType()) {
                const bracketInner = {result: []};
                ref.result = this.parseTokens(queue, bracketInner);
            } else if (token.type.isCloseGroupTokenType()) {
                return ref.result;
            }
        }

        return ref.result;
    }

    private parseExpression(data: any[]): Expression {
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

            const logic = Logic.parseLogic(logicToken.value.toString());
            if (logic.name === "") {
                throw newLogicCouldNotBeParsedError();
            }

            const expressionList: any[] = [];

            for (let item of data[1]) {
                const ex = this.parseExpression(item);
                expressionList.push(ex);
            }

            return new LogicExpression(logic, expressionList);
        }

        throw newCouldNotBeParsedError();
    }
}
