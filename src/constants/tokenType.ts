import {isInAny} from "../utils";

export class TokenType {
    public static readonly TokenTypeNone = new TokenType('');
    public static readonly TokenTypeOpenBracket = new TokenType('open-bracket');
    public static readonly TokenTypeCloseBracket = new TokenType('close-bracket');
    public static readonly TokenTypeAnd = new TokenType('and');
    public static readonly TokenTypeOr = new TokenType('or');
    public static readonly TokenTypeField = new TokenType('field');
    public static readonly TokenTypeValue = new TokenType('value');
    public static readonly TokenTypeEqual = new TokenType('equal');
    public static readonly TokenTypeNotEqual = new TokenType('not-equal');
    public static readonly TokenTypeGreaterThan = new TokenType('greater-than');
    public static readonly TokenTypeGreaterThanOrEqual = new TokenType('greater-than-or-equal');
    public static readonly TokenTypeLessThan = new TokenType('less-than');
    public static readonly TokenTypeLessThanOrEqual = new TokenType('less-than-or-equal');
    public static readonly TokenTypeBlank = new TokenType('blank');
    public static readonly TokenTypeNotBlank = new TokenType('not-blank');
    public static readonly TokenTypeContain = new TokenType('contain');
    public static readonly TokenTypeNotContain = new TokenType('not-contain');
    public static readonly TokenTypeStartWith = new TokenType('start-with');
    public static readonly TokenTypeNotStartWith = new TokenType('not-start-with');
    public static readonly TokenTypeEndWith = new TokenType('end-with');
    public static readonly TokenTypeNotEndWith = new TokenType('not-end-with');
    public static readonly TokenTypeIn = new TokenType('in');
    public static readonly TokenTypeNotIn = new TokenType('not-in');
    public static readonly TokenTypeComma = new TokenType('comma');
    public static readonly TokenTypeSlash = new TokenType('slash');
    public static readonly TokenTypeStringValue = new TokenType('string-value');
    public static readonly TokenTypeNumberValue = new TokenType('number-value');
    public static readonly TokenTypeBooleanValue = new TokenType('boolean-value');
    public static readonly TokenTypeDateValue = new TokenType('date-value');
    public static readonly TokenTypeTimeValue = new TokenType('time-value');
    public static readonly TokenTypeDateTimeValue = new TokenType('datetime-value');
    public static readonly TokenTypeLiteral = new TokenType('literal');
    public static readonly TokenTypeSpace = new TokenType('space');

    constructor(public name: string) {
    }

    public isFieldTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeField
        ]);
    }

    public isOperatorTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeEqual,
            TokenType.TokenTypeNotEqual,
            TokenType.TokenTypeBlank,
            TokenType.TokenTypeNotBlank,
            TokenType.TokenTypeLessThan,
            TokenType.TokenTypeLessThanOrEqual,
            TokenType.TokenTypeGreaterThan,
            TokenType.TokenTypeGreaterThanOrEqual,
            TokenType.TokenTypeContain,
            TokenType.TokenTypeNotContain,
            TokenType.TokenTypeStartWith,
            TokenType.TokenTypeNotStartWith,
            TokenType.TokenTypeEndWith,
            TokenType.TokenTypeNotEndWith,
            TokenType.TokenTypeIn,
            TokenType.TokenTypeNotIn
        ])
    }

    public isComparerTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeEqual,
            TokenType.TokenTypeNotEqual,
            TokenType.TokenTypeLessThan,
            TokenType.TokenTypeLessThanOrEqual,
            TokenType.TokenTypeGreaterThan,
            TokenType.TokenTypeGreaterThanOrEqual,
            TokenType.TokenTypeContain,
            TokenType.TokenTypeNotContain,
            TokenType.TokenTypeStartWith,
            TokenType.TokenTypeNotStartWith,
            TokenType.TokenTypeEndWith,
            TokenType.TokenTypeNotEndWith,
            TokenType.TokenTypeIn,
            TokenType.TokenTypeNotIn
        ])
    }

    public isNotComparerTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeBlank,
            TokenType.TokenTypeNotBlank
        ])
    }

    public isSeparatorTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeComma,
            TokenType.TokenTypeSlash
        ])
    }

    public isPreFieldTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeOpenBracket,
            TokenType.TokenTypeAnd,
            TokenType.TokenTypeOr
        ])
    }

    public isValueTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeValue,
            TokenType.TokenTypeStringValue,
            TokenType.TokenTypeNumberValue,
            TokenType.TokenTypeBooleanValue,
            TokenType.TokenTypeDateValue,
            TokenType.TokenTypeTimeValue,
            TokenType.TokenTypeDateTimeValue
        ])
    }

    public isLogicTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeAnd,
            TokenType.TokenTypeOr
        ])
    }

    public isOpenGroupTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeOpenBracket
        ])
    }

    public isCloseGroupTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeCloseBracket
        ])
    }

    public isMultiAllowedTokenType(): boolean {
        return isInAny(this, [
            TokenType.TokenTypeIn,
            TokenType.TokenTypeNotIn,
        ]);
    }
}
