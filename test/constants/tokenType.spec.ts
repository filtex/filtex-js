import {Operator, TokenType} from "../../src/constants";

describe('tokenType', () => {
    it('toOperator should return unknown when value is not valid', () => {
        // Arrange
        const samples: TokenType[] = [
            TokenType.TokenTypeNone,
            TokenType.TokenTypeComma,
            TokenType.TokenTypeSlash,
            TokenType.TokenTypeField,
            TokenType.TokenTypeValue,
            TokenType.TokenTypeStringValue,
            TokenType.TokenTypeNumberValue,
            TokenType.TokenTypeBooleanValue,
            TokenType.TokenTypeDateValue,
            TokenType.TokenTypeTimeValue,
            TokenType.TokenTypeDateTimeValue,
            TokenType.TokenTypeLiteral,
            TokenType.TokenTypeAnd,
            TokenType.TokenTypeOr,
            TokenType.TokenTypeSpace,
            TokenType.TokenTypeOpenBracket,
            TokenType.TokenTypeCloseBracket,
        ];

        for (const sample of samples) {
            // Act
            const result = sample.toOperator();

            // Assert
            expect(result).toEqual(Operator.OperatorUnknown);
        }
    });

    it('toOperator should return operator when value is valid', () => {
        // Arrange
        const samples: Map<TokenType, Operator> = new Map([
            [TokenType.TokenTypeEqual, Operator.OperatorEqual],
            [TokenType.TokenTypeNotEqual, Operator.OperatorNotEqual],
            [TokenType.TokenTypeGreaterThan, Operator.OperatorGreaterThan],
            [TokenType.TokenTypeGreaterThanOrEqual, Operator.OperatorGreaterThanOrEqual],
            [TokenType.TokenTypeLessThan, Operator.OperatorLessThan],
            [TokenType.TokenTypeLessThanOrEqual, Operator.OperatorLessThanOrEqual],
            [TokenType.TokenTypeBlank, Operator.OperatorBlank],
            [TokenType.TokenTypeNotBlank, Operator.OperatorNotBlank],
            [TokenType.TokenTypeContain, Operator.OperatorContain],
            [TokenType.TokenTypeNotContain, Operator.OperatorNotContain],
            [TokenType.TokenTypeStartWith, Operator.OperatorStartWith],
            [TokenType.TokenTypeNotStartWith, Operator.OperatorNotStartWith],
            [TokenType.TokenTypeEndWith, Operator.OperatorEndWith],
            [TokenType.TokenTypeNotEndWith, Operator.OperatorNotEndWith],
            [TokenType.TokenTypeIn, Operator.OperatorIn],
            [TokenType.TokenTypeNotIn, Operator.OperatorNotIn],
        ]);

        for (const [sample, expected] of samples) {
            // Act
            const result = sample.toOperator();

            // Assert
            expect(result).toEqual(expected);
        }
    });
});
