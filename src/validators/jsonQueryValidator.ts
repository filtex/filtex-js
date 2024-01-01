import {Metadata, Token} from "../models";
import {JsonQueryTokenizer} from "../tokenizers";
import {TokenType} from "../constants";
import {
    newCouldNotBeValidatedError,
    newInvalidFieldError,
    newInvalidLogicError,
    newInvalidOperatorError,
    newInvalidValueError
} from "../errors";
import {isArray} from "../utils";

export class JsonQueryValidator {
    constructor(
        public metadata: Metadata,
        public queryTokenizer: JsonQueryTokenizer) {
    }

    public validate(query: string) {
        const tokens = this.queryTokenizer.tokenize(query);
        this.validateInternal(tokens);
    }

    private validateInternal(data: any[]) {
        if (data.length === 3) {
            const fieldToken = data[0] as Token;
            const operatorToken = data[1] as Token;

            if (isArray(data[2])) {
                for (let value of data[2] as Token[]) {
                    if (value.type === TokenType.TokenTypeNone) {
                        throw newInvalidValueError();
                    }
                }
            } else {
                const value = data[2] as Token;
                if (value.type === TokenType.TokenTypeNone) {
                    throw newInvalidValueError();
                }
            }

            if (fieldToken.type === TokenType.TokenTypeNone) {
                throw newInvalidFieldError();
            }

            if (operatorToken.type === TokenType.TokenTypeNone) {
                throw newInvalidOperatorError();
            }
        } else if (data.length === 2) {
            const logicToken = data[0] as Token;

            if (logicToken.type === TokenType.TokenTypeNone) {
                throw newInvalidLogicError();
            }

            for (let item of data[1] as any[]) {
                this.validateInternal(item);
            }
        } else {
            throw newCouldNotBeValidatedError();
        }
    }
}
