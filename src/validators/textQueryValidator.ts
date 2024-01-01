import {Metadata, Token} from "../models";
import {TextQueryTokenizer} from "../tokenizers";
import {TokenType} from "../constants";
import {newInvalidLastTokenError, newInvalidTokenError, newMismatchedBracketsError} from "../errors";

export class TextQueryValidator {
    constructor(
        public metadata: Metadata,
        public queryTokenizer: TextQueryTokenizer) {
    }

    public validate(query: string) {
        const tokens = this.queryTokenizer.tokenize(query);
        return this.validateInternal(tokens);
    }

    private validateInternal(tokens: Token[]) {
        const tokensExceptSpace = [];
        let openGroupTokenCount = 0;
        let closeGroupTokenCount = 0;

        for (let token of tokens) {
            if (token.type === TokenType.TokenTypeNone) {
                throw newInvalidTokenError();
            }

            if (token.type !== TokenType.TokenTypeSpace) {
                tokensExceptSpace.push(token);
            }

            if (token.type.isOpenGroupTokenType()) {
                openGroupTokenCount += 1;
            }

            if (token.type.isCloseGroupTokenType()) {
                closeGroupTokenCount += 1;
            }
        }

        if (tokensExceptSpace.length === 0) {
            return;
        }

        const lastTokenType = tokensExceptSpace[tokensExceptSpace.length - 1].type;
        if (lastTokenType.isFieldTokenType() ||
            lastTokenType.isComparerTokenType() ||
            lastTokenType.isSeparatorTokenType() ||
            lastTokenType.isLogicTokenType() ||
            lastTokenType.isOpenGroupTokenType()) {
            throw newInvalidLastTokenError();
        }

        if (openGroupTokenCount != closeGroupTokenCount) {
            throw newMismatchedBracketsError();
        }
    }
}
