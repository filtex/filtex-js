import {Operator, TokenType} from "../../src/constants";
import {Metadata, Token, Lookup} from "../../src/models";
import {JsonQueryValidator} from "../../src/validators";

describe('jsonQueryValidator', () => {
    it('should return an error when the query tokenizer returned an error', () => {
        // Arrange
        const query = 'some_text';

        const metadata: Metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [Operator.OperatorEqual.name, Operator.OperatorNotEqual.name],
                values: [] as Lookup[],
            },
        ]);

        const jsonQueryTokenizerMock: any = {
            tokenize: () => {
                throw new Error('An error occurred in the tokenizer');
            },
        };

        const jsonQueryValidator = new JsonQueryValidator(metadata, jsonQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            jsonQueryValidator.validate(query);
        }).toThrow(Error);
    });

    it('should return an error when the query token length is not valid', () => {
        // Arrange
        const queryMap: { [query: string]: Token[] } = {
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

        const metadata: Metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [Operator.OperatorEqual.name, Operator.OperatorNotEqual.name],
                values: [] as Lookup[],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query];

            // Arrange
            const jsonQueryTokenizerMock: any = {
                tokenize: (json: string) => tokens
            };

            const jsonQueryValidator = new JsonQueryValidator(metadata, jsonQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                jsonQueryValidator.validate(query);
            }).toThrow(Error);
        }
    });

    it('should return an error when the query token length is three and there is a None token', () => {
        // Arrange
        const queryMap: { [query: string]: object[] } = {
            '["Value1", "Equal", "Test"]': [
                {
                    type: TokenType.TokenTypeNone,
                    value: 'Value1',
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
            '["Value", "Equal", "Test"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNone,
                    value: 'Equal',
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: 'Test',
                },
            ],
            '["Value", "Equal1", "Test"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNone,
                    value: 'Equal1',
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: 'Test',
                },
            ],
            '["Value", "Equal", "Test1"]': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal1',
                },
                {
                    type: TokenType.TokenTypeNone,
                    value: 'Test1',
                },
            ],
        };

        const metadata: Metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [Operator.OperatorEqual.name, Operator.OperatorNotEqual.name],
                values: [] as Lookup[],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query] as Token[];

            // Arrange
            const jsonQueryTokenizerMock: any = {
                tokenize: (json: string) => tokens
            };

            const jsonQueryValidator = new JsonQueryValidator(metadata, jsonQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                jsonQueryValidator.validate(query);
            }).toThrow(Error);
        }
    });

    it('should return nil when the query token length is three and valid', () => {
        // Arrange
        const queryMap: { [query: string]: Token[] } = {
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
                    type: TokenType.TokenTypeStringValue,
                    value: 'Test',
                },
            ],
        };

        const metadata: Metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [Operator.OperatorEqual.name, Operator.OperatorNotEqual.name],
                values: [] as Lookup[],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query];

            // Arrange
            const jsonQueryTokenizerMock: any = {
                tokenize: (json: string) => tokens
            };

            const jsonQueryValidator = new JsonQueryValidator(metadata, jsonQueryTokenizerMock);

            // Act & Assert
            expect(() => {
                jsonQueryValidator.validate(query);
            }).not.toThrow();
        }
    });

    it('should return an error when the query token length is two and there is a None token', () => {
        // Arrange
        const queryMap: { [query: string]: object[] } = {
            '["O", [["Value", "Equal", "Test1"], ["Value", "Equal", "Test2"]]]': [
                {
                    type: TokenType.TokenTypeNone,
                    value: 'O',
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
                            value: 'Test1',
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
                            value: 'Test2',
                        },
                    ],
                ],
            ],
            '["Or", [["Value1", "Equal", "Test1"], ["Value", "Equal", "Test2"]]]': [
                {
                    type: TokenType.TokenTypeOr,
                    value: 'Or',
                },
                [
                    [
                        {
                            type: TokenType.TokenTypeNone,
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
                            value: 'Value',
                        },
                        {
                            type: TokenType.TokenTypeEqual,
                            value: 'Equal',
                        },
                        {
                            type: TokenType.TokenTypeStringValue,
                            value: 'Test2',
                        },
                    ],
                ],
            ],
            '["Or", [["Value", "Equals", "Test1"], ["Value", "Equal", "Test2"]]]': [
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
                            type: TokenType.TokenTypeNone,
                            value: 'Equals',
                        },
                        {
                            type: TokenType.TokenTypeStringValue,
                            value: 'Test1',
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
                            value: 'Test2',
                        },
                    ],
                ],
            ],
            '["Or", [["Value", "Equal", "Test1"], ["Value", "Equal", "Test3"]]]': [
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
                            type: TokenType.TokenTypeStringValue,
                            value: 'Test1',
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
                            type: TokenType.TokenTypeNone,
                            value: 'Test3',
                        },
                    ],
                ],
            ],
        };

        const metadata: Metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [Operator.OperatorEqual.name, Operator.OperatorNotEqual.name],
                values: [] as Lookup[],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query] as Token[];

            // Arrange
            const jsonQueryTokenizerMock: any = {
                tokenize: (json: string) => tokens
            };

            const jsonQueryValidator = new JsonQueryValidator(metadata, jsonQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                jsonQueryValidator.validate(query);
            }).toThrow(Error);
        }
    });

    it('should return nil when the query token length is two and valid', () => {
        // Arrange
        const queryMap: { [query: string]: any[] } = {
            '["Or", [["Value", "Equal", "Test1"], ["Value", "Equal", "Test2"]]]': [
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
                            type: TokenType.TokenTypeStringValue,
                            value: 'Test1',
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
                            value: 'Test2',
                        },
                    ],
                ],
            ],
        };

        const metadata: Metadata = new Metadata([
            {
                name: 'Value',
                type: 'string',
                label: 'Value',
                operators: [Operator.OperatorEqual.name, Operator.OperatorNotEqual.name],
                values: [] as Lookup[],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query] as Token[];

            // Arrange
            const jsonQueryTokenizerMock: any = {
                tokenize: (json: string) => tokens
            };

            const jsonQueryValidator = new JsonQueryValidator(metadata, jsonQueryTokenizerMock);

            // Act & Assert
            expect(() => {
                jsonQueryValidator.validate(query);
            }).not.toThrow();
        }
    });
});
