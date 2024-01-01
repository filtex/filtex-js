import {Operator, TokenType} from "../../src/constants";
import {Token, Metadata} from "../../src/models";
import {TextQueryTokenizer} from "../../src/tokenizers";

describe('textQueryTokenizer', () => {
    it('should return tokens', () => {
        // Arrange
        const queryMap: Record<string, Token[]> = {
            '': [],
            'Value': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
            'Value Equal Test': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: 'Test',
                },
            ],
            'Value Equal Test1 Or Value Equal Test2': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeOr,
                    value: 'Or',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeSpace,
                    value: ' ',
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: 'Test2',
                },
            ],
        };

        const metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                ],
                values: [],
            },
        ]);

        const textQueryTokenizer = new TextQueryTokenizer(metadata);

        for (const query in queryMap) {
            if (Object.prototype.hasOwnProperty.call(queryMap, query)) {
                // Act
                const result = textQueryTokenizer.tokenize(query);

                // Assert
                expect(result).not.toBeNull();
                expect(result.length).toEqual(queryMap[query].length);

                for (let i = 0; i < result.length; i++) {
                    const value = result[i];
                    expect(value.type).toEqual(queryMap[query][i].type);
                    expect(value.value).toEqual(queryMap[query][i].value);
                }
            }
        }
    });
});
