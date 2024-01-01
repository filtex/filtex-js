import {Metadata, Lookup} from "../../src/models";
import {Operator, TokenType} from "../../src/constants";
import {JsonQueryParser} from "../../src/parsers";
import {LogicExpression, OperatorExpression} from "../../src/expressions";

describe('jsonQueryParser', () => {
    it('should return an error when query tokenizer returned an error', () => {
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

        // Mock the JsonQueryTokenizer
        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                throw new Error('An error occurred in the tokenizer');
            },
        };

        // Create an instance of JsonQueryParser
        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrowError(Error);
    });

    it('should return an error when queryToken length is not valid', () => {
        // Arrange
        const queryMap: Record<string, any[]> = {
            '[]': [],
            '["Value"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
            '["Value", "Equal", "Test", "Test"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: 'Test',
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: 'Test',
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
                values: Array<Lookup>(),
            },
        ]);

        for (const query in queryMap) {
            // Mock the JsonQueryTokenizer
            const jsonQueryTokenizerMock: any = {
                tokenize: () => {
                    return queryMap[query];
                },
            };

            // Create an instance of JsonQueryParser
            const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                const expression = jsonQueryParser.parse(query);

                // Assert
                expect(expression).toBeNull();
            }).toThrowError(Error);
        }
    });

    it('should return an error when query length is two and logic is not a token', () => {
        // Arrange
        const queryMap: Record<string, any[]> = {
            '["Test", [["Value", "Equal", "Test"], ["Value", "Equal", "Test"]]]': [
                'Test',
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
                            type: TokenType.TokenTypeStringValue,
                            value: 'Test',
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
                            type: TokenType.TokenTypeStringValue,
                            value: 'Test',
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
                values: Array<Lookup>(),
            },
        ]);

        for (const query in queryMap) {
            // Mock the JsonQueryTokenizer
            const jsonQueryTokenizerMock: any = {
                tokenize: () => {
                    return queryMap[query];
                },
            };

            // Create an instance of JsonQueryParser
            const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                const expression = jsonQueryParser.parse(query);

                // Assert
                expect(expression).toBeNull();
            }).toThrowError(Error);
        }
    });

    it('should return an error when query length is two and logic is not valid', () => {
        const query = '[\'Test\', [[\'Value\', \'Equal\', \'Test\'], [\'Value\', \'Equal\', \'Test\']]]';
        const tokens = [
            {
                type: TokenType.TokenTypeLiteral,
                value: 'Test',
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
                        type: TokenType.TokenTypeStringValue,
                        value: 'Test',
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
                        type: TokenType.TokenTypeStringValue,
                        value: 'Test',
                    },
                ],
            ],
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when query length is two and the second item is not an array', () => {
        const query = '[\'Test\', \'Test\']';
        const tokens = [
            {
                type: TokenType.TokenTypeAnd,
                value: 'And',
            },
            {
                type: TokenType.TokenTypeLiteral,
                value: 'Test',
            },
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return a logic expression when query length is two', () => {
        const query = '[\'And\', [[\'Value1\', \'Equal\', \'Test1\'], [\'Value2\', \'Equal\', \'Test2\']]]';
        const tokens = [
            {
                type: TokenType.TokenTypeAnd,
                value: 'And',
            },
            [
                [
                    {
                        type: TokenType.TokenTypeField,
                        value: 'Value1',
                    },
                    {
                        type: TokenType.TokenTypeEqual,
                        value: 'Equal',
                    },
                    {
                        type: TokenType.TokenTypeStringValue,
                        value: 'Test1',
                    },
                ],
                [
                    {
                        type: TokenType.TokenTypeField,
                        value: 'Value2',
                    },
                    {
                        type: TokenType.TokenTypeNotEqual,
                        value: 'Not Equal',
                    },
                    {
                        type: TokenType.TokenTypeStringValue,
                        value: 'Test2',
                    },
                ],
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value1',
                type: 'string',
                label: 'Value1',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                ],
                values: [],
            },
            {
                name: 'Value2',
                type: 'string',
                label: 'Value2',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                ],
                values: [],
            },
        ]);

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        const expression = jsonQueryParser.parse(query);

        expect(expression).toBeInstanceOf(LogicExpression);
        const logicExpression = expression as LogicExpression;

        expect(logicExpression.logic.name).toBe('and');
        expect(logicExpression.expressions).toHaveLength(2);

        const firstExpression = logicExpression.expressions[0] as OperatorExpression;

        expect(firstExpression).toBeDefined();
        expect(firstExpression.field).toBe('Value1');
        expect(firstExpression.operator).toEqual(Operator.OperatorEqual);
        expect(firstExpression.value).toBe('Test1');

        const secondExpression = logicExpression.expressions[1] as OperatorExpression;

        expect(secondExpression).toBeDefined();
        expect(secondExpression.field).toBe('Value2');
        expect(secondExpression.operator).toEqual(Operator.OperatorNotEqual);
        expect(secondExpression.value).toBe('Test2');
    });

    it('should return an error when query length is three and the field is not a token', () => {
        const query = '[\'Value\', \'Equal\', \'Test\']';
        const tokens = [
            {
                type: TokenType.TokenTypeField,
                value: 'Value',
            },
            {
                type: TokenType.TokenTypeEqual,
                value: 'Equal',
            },
            {
                type: TokenType.TokenTypeStringValue,
                value: 'Test',
            },
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when query length is three and the operator is not a token', () => {
        const query = '[\'Value\', \'Equal\', \'Test\']';
        const tokens = [
            {
                type: TokenType.TokenTypeField,
                value: 'Value',
            },
            'Equal',
            {
                type: TokenType.TokenTypeStringValue,
                value: 'Test',
            },
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when query length is three and the value is not a token', () => {
        const query = '[\'Value\', \'Equal\', \'Test\']';
        const tokens = [
            {
                type: TokenType.TokenTypeField,
                value: 'Value',
            },
            {
                type: TokenType.TokenTypeEqual,
                value: 'Equal',
            },
            'Test',
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when query length is three and the operator is not valid', () => {
        const query = '[\'Value\', \'Op\', \'Test\']';
        const tokens = [
            {
                type: TokenType.TokenTypeField,
                value: 'Value',
            },
            {
                type: TokenType.TokenTypeNone,
                value: 'Op',
            },
            {
                type: TokenType.TokenTypeStringValue,
                value: 'Test',
            },
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = jsonQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an operator expression when query length is three', () => {
        const query = '[\'Value\', \'Equal\', \'Test\']';
        const tokens = [
            {
                type: TokenType.TokenTypeField,
                value: 'Value',
            },
            {
                type: TokenType.TokenTypeEqual,
                value: 'Equal',
            },
            {
                type: TokenType.TokenTypeStringValue,
                value: 'Test',
            },
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

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                return tokens;
            },
        };

        const jsonQueryParser = new JsonQueryParser(metadata, jsonQueryTokenizerMock);

        const expression = jsonQueryParser.parse(query);

        expect(expression).toBeInstanceOf(OperatorExpression);
        const operatorExpression = expression as OperatorExpression;

        expect(operatorExpression.field).toBe('Value');
        expect(operatorExpression.operator).toEqual(Operator.OperatorEqual);
        expect(operatorExpression.value).toBe('Test');
    });
});
