import {Metadata, Token} from "../../src/models";
import {Operator, TokenType} from "../../src/constants";
import {TextQueryValidator} from "../../src/validators";

describe('textQueryValidator', () => {
    it('should return null when there are no tokens', () => {
        // Arrange
        const queryMap: Record<string, Token[]> = {
            '': [],
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

        for (const [query, tokens] of Object.entries(queryMap)) {
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string) => tokens
            };

            const textQueryValidator = new TextQueryValidator(metadata, textQueryTokenizerMock);

            // Act
            // Assert
            expect(() => {
                textQueryValidator.validate(query);
            }).not.toThrow(Error);
        }
    });

    it('should return an error when there is a None token', () => {
        // Arrange
        const queryMap: Record<string, Token[]> = {
            'Value': [
                {
                    type: TokenType.TokenTypeNone,
                    value: 'Value',
                },
            ],
            'Value Equals': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNone,
                    value: 'Equals',
                },
            ],
            'Value Equal 123': [
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
                    value: '123',
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

        for (const [query, tokens] of Object.entries(queryMap)) {
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string) => tokens
            };

            const textQueryValidator = new TextQueryValidator(metadata, textQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                textQueryValidator.validate(query);
            }).toThrow(Error);
        }
    });

    it('should return an error when the bracket count is mismatched', () => {
        // Arrange
        const queryMap: Record<string, Token[]> = {
            '(Value': [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: '(',
                },
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
            '(Value))': [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: '(',
                },
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
            ],
            'Value))': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
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

        for (const [query, tokens] of Object.entries(queryMap)) {
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string) => tokens
            };

            const textQueryValidator = new TextQueryValidator(metadata, textQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                textQueryValidator.validate(query);
            }).toThrow(Error);
        }
    });

    it('should return an error when the last token is not valid', () => {
        // Arrange
        const queryMap: Record<string, Token[]> = {
            'Value': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
            'Value Equal': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
            ],
            'Value Equal Filtex And': [
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
                    value: 'Filtex',
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: 'And',
                },
            ],
            'Value Equal Filtex And (': [
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
                    value: 'Filtex',
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: 'And',
                },
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: '(',
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

        for (const [query, tokens] of Object.entries(queryMap)) {
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string) => tokens
            };

            const textQueryValidator = new TextQueryValidator(metadata, textQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                textQueryValidator.validate(query);
            }).toThrow(Error);
        }
    });

    it('should return null when the last token is valid', () => {
        // Arrange
        const queryMap: Record<string, Token[]> = {
            'Value Equal Filtex': [
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
                    value: 'Filtex',
                },
            ],
            '(Value Equal Filtex)': [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: '(',
                },
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
                    value: 'Filtex',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
            ],
            'Value Blank': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
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

        for (const [query, tokens] of Object.entries(queryMap)) {
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string) => tokens
            };

            const textQueryValidator = new TextQueryValidator(metadata, textQueryTokenizerMock);

            // Act
            // Assert
            expect(() => {
                textQueryValidator.validate(query);
            }).not.toThrow(Error);
        }
    });
});
