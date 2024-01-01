import {Metadata} from "../../src/models";
import {Operator, TokenType} from "../../src/constants";
import {JsonQueryTokenizer} from "../../src/tokenizers";

describe('jsonQueryTokenizer', () => {
    it('should return an error when the query is not JSON', () => {
        // Arrange
        const query = 'some_text';

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

        const jsonQueryTokenizer = new JsonQueryTokenizer(metadata);

        expect(() => {
            // Act
            const result = jsonQueryTokenizer.tokenize(query);

            // Assert
            expect(result).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when the query length is not valid', () => {
        // Arrange
        const queries = [
            '[]',
            '["Value"]',
            '["Value", "Equal", "Filtex", "Fi"]',
        ];

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

        const jsonQueryTokenizer = new JsonQueryTokenizer(metadata);

        queries.forEach((query) => {
            expect(() => {
                // Act
                const result = jsonQueryTokenizer.tokenize(query);

                // Assert
                expect(result).toBeNull();
            }).toThrow(Error);
        });
    });

    it('should return tokens when the query length is three', () => {
        // Arrange
        const queryMap: Record<string, object[]> = {
            '["Value", "Equal", "Test"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: 'Test',
                },
            ],
            '["Value", "Equal", 100]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeNumberValue,
                    value: '100',
                },
            ],
            '["Value", "Equal", true]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeBooleanValue,
                    value: 'true',
                },
            ],
            '["Value", "Equal", "2020-01-01"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeDateValue,
                    value: '2020-01-01',
                },
            ],
            '["Value", "Equal", "10:12:14"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeTimeValue,
                    value: '10:12:14',
                },
            ],
            '["Value", "Equal", "2020-01-01 11:12:13"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeDateTimeValue,
                    value: '2020-01-01 11:12:13',
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

        const jsonQueryTokenizer = new JsonQueryTokenizer(metadata);

        for (const query in queryMap) {
            if (Object.prototype.hasOwnProperty.call(queryMap, query)) {
                // Act
                const result = jsonQueryTokenizer.tokenize(query);

                // Assert
                expect(result).not.toBeNull();
                expect(result[0]).toEqual(queryMap[query][0]);
                expect(result[1]).toEqual(queryMap[query][1]);
                expect(result[2]).toEqual(queryMap[query][2]);
            }
        }
    });

    it('should return tokens when the query length is two', () => {
        // Arrange
        const queryMap: Record<string, object[]> = {
            '["Or", [["Value", "Equal", 100], ["Value", "Equal", 200]]]': [
                {
                    type: TokenType.TokenTypeOr,
                    value: 'Or',
                },
                [
                    [
                        {
                            type: TokenType.TokenTypeField,
                            value: 'Value',
                        },
                        {
                            type: TokenType.TokenTypeEqual,
                            value: 'Equal',
                        },
                        {
                            type: TokenType.TokenTypeNumberValue,
                            value: '100',
                        },
                    ],
                    [
                        {
                            type: TokenType.TokenTypeField,
                            value: 'Value',
                        },
                        {
                            type: TokenType.TokenTypeEqual,
                            value: 'Equal',
                        },
                        {
                            type: TokenType.TokenTypeNumberValue,
                            value: '200',
                        },
                    ],
                ],
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

        const jsonQueryTokenizer = new JsonQueryTokenizer(metadata);

        for (const query in queryMap) {
            if (Object.prototype.hasOwnProperty.call(queryMap, query)) {
                // Act
                const result = jsonQueryTokenizer.tokenize(query);

                // Assert
                expect(result).not.toBeNull();
                expect(result[0]).toEqual(queryMap[query][0]);

                const tokenExpressions = queryMap[query][1] as object[];
                const resultExpressions = result[1] as object[];

                expect(tokenExpressions).not.toBeNull();
                expect(resultExpressions).not.toBeNull();
                expect(resultExpressions[0]).toEqual(tokenExpressions[0]);
                expect(resultExpressions[1]).toEqual(tokenExpressions[1]);
            }
        }
    });
});
