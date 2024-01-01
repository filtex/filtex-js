import {FieldType, TokenType} from "../constants";
import {Metadata, Token} from "../models";
import {
    boolean,
    date,
    dateTime,
    isBoolean,
    isDate,
    isDateTime,
    isNumber,
    isString,
    isTime,
    number,
    string,
    time
} from "../utils";

class TokenPattern {
    constructor(
        public pattern: string,
        public type: TokenType) {
    }
}

export class TokenMatch {
    constructor(
        public remainingText: string,
        public tokenType: TokenType,
        public value: string) {
    }
}

export class BaseQueryTokenizer {
    private readonly tokenPatterns: TokenPattern[];

    constructor(public metadata: Metadata) {
        this.tokenPatterns = [
            new TokenPattern('^\\(', TokenType.TokenTypeOpenBracket),
            new TokenPattern('^\\)', TokenType.TokenTypeCloseBracket),

            new TokenPattern('^,', TokenType.TokenTypeComma),
            new TokenPattern('^/', TokenType.TokenTypeSlash),

            new TokenPattern('^and\\b', TokenType.TokenTypeAnd),
            new TokenPattern('^&&', TokenType.TokenTypeAnd),
            new TokenPattern('^or\\b', TokenType.TokenTypeOr),
            new TokenPattern('^\\|\\|', TokenType.TokenTypeOr),

            new TokenPattern('^=', TokenType.TokenTypeEqual),
            new TokenPattern('^equal\\b', TokenType.TokenTypeEqual),
            new TokenPattern('^!=', TokenType.TokenTypeNotEqual),
            new TokenPattern('^not equal', TokenType.TokenTypeNotEqual),

            new TokenPattern('^>=', TokenType.TokenTypeGreaterThanOrEqual),
            new TokenPattern('^greater than or equal\\b', TokenType.TokenTypeGreaterThanOrEqual),
            new TokenPattern('^>', TokenType.TokenTypeGreaterThan),
            new TokenPattern('^greater than\\b', TokenType.TokenTypeGreaterThan),

            new TokenPattern('^<=', TokenType.TokenTypeLessThanOrEqual),
            new TokenPattern('^less than or equal\\b', TokenType.TokenTypeLessThanOrEqual),
            new TokenPattern('^<', TokenType.TokenTypeLessThan),
            new TokenPattern('^less than\\b', TokenType.TokenTypeLessThan),

            new TokenPattern('^\\[\\]', TokenType.TokenTypeBlank),
            new TokenPattern('^blank\\b', TokenType.TokenTypeBlank),
            new TokenPattern('^!\\[\\]', TokenType.TokenTypeNotBlank),
            new TokenPattern('^not blank\\b', TokenType.TokenTypeNotBlank),

            new TokenPattern('^~\\*', TokenType.TokenTypeStartWith),
            new TokenPattern('^start with\\b', TokenType.TokenTypeStartWith),
            new TokenPattern('^!~\\*', TokenType.TokenTypeNotStartWith),
            new TokenPattern('^not start with\\b', TokenType.TokenTypeNotStartWith),

            new TokenPattern('^\\*~', TokenType.TokenTypeEndWith),
            new TokenPattern('^end with\\b', TokenType.TokenTypeEndWith),
            new TokenPattern('^!\\*~', TokenType.TokenTypeNotEndWith),
            new TokenPattern('^not end with\\b', TokenType.TokenTypeNotEndWith),

            new TokenPattern('^~', TokenType.TokenTypeContain),
            new TokenPattern('^contain\\b', TokenType.TokenTypeContain),
            new TokenPattern('^!~', TokenType.TokenTypeNotContain),
            new TokenPattern('^not contain\\b', TokenType.TokenTypeNotContain),

            new TokenPattern('^in\\b', TokenType.TokenTypeIn),
            new TokenPattern('^not in\\b', TokenType.TokenTypeNotIn),

            ...this.metadata.fields.map(field => new TokenPattern('^' + field.label + '\\b', TokenType.TokenTypeField)),
            ...this.metadata.fields.map(field => new TokenPattern('^' + field.name + '\\b', TokenType.TokenTypeField)),

            new TokenPattern('^"[^"]*"', TokenType.TokenTypeStringValue),
            new TokenPattern('^\'[^\']*\'', TokenType.TokenTypeStringValue),
            new TokenPattern('^\\d\\d\\d\\d-\\d\\d-\\d\\d \\d\\d:\\d\\d(:\\d\\d)?', TokenType.TokenTypeDateTimeValue),
            new TokenPattern('^\\d\\d\\d\\d-\\d\\d-\\d\\d', TokenType.TokenTypeDateValue),
            new TokenPattern('^\\d\\d:\\d\\d(:\\d\\d)?', TokenType.TokenTypeTimeValue),
            new TokenPattern('^[0-9]+([.][0-9]+)?', TokenType.TokenTypeNumberValue),
            new TokenPattern('^(true|false)', TokenType.TokenTypeBooleanValue),
            new TokenPattern('^[a-zA-Z0-9-_]+', TokenType.TokenTypeLiteral)
        ];
    }

    public findMatch(text: string): TokenMatch | null {
        for (const tokenPattern of this.tokenPatterns) {
            const match = new RegExp(tokenPattern.pattern, 'i').exec(text);
            if (match && match.length > 0) {
                let remainingText = '';
                if (match[0].length !== text.length) {
                    remainingText = text.substring(match[0].length);
                }

                return new TokenMatch(
                    remainingText,
                    tokenPattern.type,
                    match[0]);
            }
        }

        return null;
    }

    public createToken(tokens: Token[], tokenType: TokenType, value: string): Token | null {
        if (tokenType === TokenType.TokenTypeSpace) {
            if (tokens.length > 0 && tokens[tokens.length - 1].type === TokenType.TokenTypeSpace) {
                return null;
            }
            return new Token(tokenType, value);
        }

        const allTokens = tokens.filter(x => x.type !== TokenType.TokenTypeSpace);
        const fieldTokens = tokens.filter(x => x.type.isFieldTokenType());
        const operatorTokens = tokens.filter(x => x.type.isOperatorTokenType());
        const lastToken = allTokens.length > 0 ? allTokens[allTokens.length - 1] : null;
        const lastTokenType = allTokens.length > 0 ? allTokens[allTokens.length - 1].type : null;
        const lastFieldToken = fieldTokens.length > 0 ? fieldTokens[fieldTokens.length - 1] : null;
        const lastOperatorToken = operatorTokens.length > 0 ? operatorTokens[operatorTokens.length - 1] : null;

        if (lastTokenType === null) {
            if (tokenType === TokenType.TokenTypeField || tokenType === TokenType.TokenTypeLiteral) {
                if (this.validateField(value)) {
                    return new Token(TokenType.TokenTypeField, value);
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            } else if (tokenType.isOpenGroupTokenType()) {
                return new Token(tokenType, value);
            }
        } else if (tokenType.isFieldTokenType()) {
            if (lastTokenType.isPreFieldTokenType()) {
                if (this.validateField(value)) {
                    return new Token(TokenType.TokenTypeField, value);
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            } else if (lastTokenType.isComparerTokenType() || lastTokenType.isSeparatorTokenType()) {
                let lookupValue = value;

                for (let v of this.metadata.getFieldValues(lastFieldToken?.value)) {
                    if (v.name.toLowerCase() === value?.toLowerCase()) {
                        lookupValue = v.value;
                        break;
                    }
                }

                if (this.validateValue(lastFieldToken?.value, lookupValue)) {
                    if (lastOperatorToken && lastOperatorToken.type.isComparerTokenType()) {
                        return new Token(TokenType.TokenTypeValue, this.castValue(lastFieldToken?.value, lookupValue));
                    } else {
                        return new Token(TokenType.TokenTypeNone, value);
                    }
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            }
        } else if (tokenType === TokenType.TokenTypeLiteral) {
            if (lastTokenType.isComparerTokenType() || lastTokenType.isSeparatorTokenType()) {
                let lookupValue = value;

                for (let v of this.metadata.getFieldValues(lastFieldToken?.value)) {
                    if (v.name.toLowerCase() === value?.toLowerCase()) {
                        lookupValue = v.value;
                        break;
                    }
                }

                if (this.validateValue(lastFieldToken?.value, lookupValue)) {
                    if (lastOperatorToken && lastOperatorToken.type.isComparerTokenType()) {
                        return new Token(TokenType.TokenTypeValue, this.castValue(lastFieldToken?.value, lookupValue));
                    } else {
                        return new Token(TokenType.TokenTypeNone, value);
                    }
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            } else if (lastTokenType.isPreFieldTokenType()) {
                if (this.validateField(value)) {
                    return new Token(TokenType.TokenTypeField, value);
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            }
        } else if (tokenType.isValueTokenType()) {
            if (lastTokenType.isComparerTokenType() || lastTokenType.isSeparatorTokenType()) {
                if (this.validateValue(lastFieldToken?.value, value)) {
                    if (lastOperatorToken && lastOperatorToken.type.isComparerTokenType()) {
                        return new Token(tokenType, this.castValue(lastFieldToken?.value, value));
                    } else {
                        return new Token(TokenType.TokenTypeNone, value);
                    }
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            }
        } else if (tokenType.isOperatorTokenType()) {
            if (lastTokenType === TokenType.TokenTypeField) {
                const operatorValue = tokenType.toOperator().name;
                if (this.validateOperator(lastToken?.value, operatorValue)) {
                    return new Token(tokenType, value);
                } else {
                    return new Token(TokenType.TokenTypeNone, value);
                }
            }
        } else if (tokenType.isLogicTokenType()) {
            if (lastTokenType.isValueTokenType() || lastTokenType.isCloseGroupTokenType() || lastTokenType.isNotComparerTokenType()) {
                return new Token(tokenType, value);
            }
        } else if (tokenType.isOpenGroupTokenType()) {
            if (lastTokenType.isLogicTokenType() || lastTokenType.isOpenGroupTokenType()) {
                return new Token(tokenType, value);
            }
        } else if (tokenType.isCloseGroupTokenType()) {
            const openGroupTokenCount = allTokens.filter(x => x.type.isOpenGroupTokenType()).length;
            const closeGroupTokenCount = allTokens.filter(x => x.type.isCloseGroupTokenType()).length;

            if (openGroupTokenCount > closeGroupTokenCount && (lastTokenType.isValueTokenType() || lastTokenType.isCloseGroupTokenType() || lastTokenType.isNotComparerTokenType())) {
                return new Token(tokenType, value);
            }
        } else if (tokenType.isSeparatorTokenType()) {
            if (lastOperatorToken && lastOperatorToken.type.isComparerTokenType() && lastOperatorToken.type.isMultiAllowedTokenType()) {
                if (lastTokenType.isValueTokenType()) {
                    return new Token(tokenType, value);
                }
            }
        }

        return new Token(TokenType.TokenTypeNone, value);
    }

    public validateField(field: string): boolean {
        return this.metadata.fields.some(x => x.name.toLowerCase() === field.toLowerCase() || x.label.toLowerCase() === field.toLowerCase());
    }

    public validateOperator(field: any, value: any): boolean {
        const fieldValue = this.metadata.fields.find(x => x.name.toLowerCase() === field.toLowerCase() || x.label.toLowerCase() === field.toLowerCase());

        if (!fieldValue) {
            return false;
        }

        return fieldValue.operators.some(x => x.toLowerCase() === value.toString().toLowerCase());
    }

    public validateValue(field: any, value: any): boolean {
        const fieldValue = this.metadata.fields.find(x => x.name.toLowerCase() === field.toLowerCase() || x.label.toLowerCase() === field.toLowerCase());

        if (!fieldValue) {
            return false;
        }

        if (fieldValue.values.length === 0) {
            if (fieldValue.type === FieldType.FieldTypeString.name ||
                fieldValue.type === FieldType.FieldTypeStringArray.name) {
                return isString(value);
            }

            if (fieldValue.type === FieldType.FieldTypeNumber.name ||
                fieldValue.type === FieldType.FieldTypeNumberArray.name) {
                return isNumber(value);
            }

            if (fieldValue.type === FieldType.FieldTypeBoolean.name ||
                fieldValue.type === FieldType.FieldTypeBooleanArray.name) {
                return isBoolean(value);
            }

            if (fieldValue.type === FieldType.FieldTypeDate.name ||
                fieldValue.type === FieldType.FieldTypeDateArray.name) {
                return isDate(value);
            }

            if (fieldValue.type === FieldType.FieldTypeTime.name ||
                fieldValue.type === FieldType.FieldTypeTimeArray.name) {
                return isTime(value);
            }

            if (fieldValue.type === FieldType.FieldTypeDateTime.name ||
                fieldValue.type === FieldType.FieldTypeDateTimeArray.name) {
                return isDateTime(value);
            }

            return false;
        }

        return fieldValue.values.some(x => x.name.toString().toLowerCase() === value.toString().toLowerCase() || x.value.toString().toLowerCase() === value.toString().toLowerCase());
    }

    public castValue(field: any, value: any): any {
        const fieldValue = this.metadata.fields.find(x => x.label.toLowerCase() === field.toLowerCase());

        if (!fieldValue) {
            return value;
        }

        if (fieldValue.type === FieldType.FieldTypeString.name ||
            fieldValue.type === FieldType.FieldTypeStringArray.name) {
            return string(value).replace(/['"]+/g, '');
        }

        if (fieldValue.type === FieldType.FieldTypeNumber.name ||
            fieldValue.type === FieldType.FieldTypeNumberArray.name) {
            return number(value);
        }

        if (fieldValue.type === FieldType.FieldTypeBoolean.name ||
            fieldValue.type === FieldType.FieldTypeBooleanArray.name) {
            return boolean(value);
        }

        if (fieldValue.type === FieldType.FieldTypeDate.name ||
            fieldValue.type === FieldType.FieldTypeDateArray.name) {
            return date(value);
        }

        if (fieldValue.type === FieldType.FieldTypeTime.name ||
            fieldValue.type === FieldType.FieldTypeTimeArray.name) {
            return time(value);
        }

        if (fieldValue.type === FieldType.FieldTypeDateTime.name ||
            fieldValue.type === FieldType.FieldTypeDateTimeArray.name) {
            return dateTime(value);
        }

        return value;
    }
}
