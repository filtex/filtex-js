import {Metadata, Token} from "../../src/models";
import {Logic, Operator, TokenType} from "../../src/constants";
import {TextQueryParser} from "../../src/parsers";
import {LogicExpression, OperatorExpression} from "../../src/expressions";

describe('textQueryParser', () => {
    it('should return an error when query tokenizer returns an error', () => {
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

        const textQueryTokenizerMock: any = {
            tokenize: (text: string): Token[] => {
                throw new Error("An error occurred in the tokenizer");
            },
        };

        const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = textQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when query tokenizer returns an empty result', () => {
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

        const textQueryTokenizerMock: any = {
            tokenize: (text: string): Token[] => {
                return [];
            },
        };

        const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

        // Assert
        expect(() => {
            // Act
            const expression = textQueryParser.parse(query);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return an error when query token length is not valid', () => {
        const queryMap: { [key: string]: Token[] } = {
            '': [],
            'Value': [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
            'Value Equal Test Test': [
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
                values: [],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query];
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string): Token[] => tokens,
            };

            const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                const expression = textQueryParser.parse(query);

                // Assert
                expect(expression).toBeNull();
            }).toThrow(Error);
        }
    });

    it('should return an error when logic is not valid', () => {
        const queryMap: { [key: string]: Token[] } = {
            'Value Equal Test Xor Value Equal Test': [
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
                    type: TokenType.TokenTypeNone,
                    value: 'Xor',
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
                values: [],
            },
        ]);

        for (const query in queryMap) {
            const tokens = queryMap[query];
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string): Token[] => tokens,
            };

            const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                const expression = textQueryParser.parse(query);

                // Assert
                expect(expression).toBeNull();
            }).toThrow(Error);
        }
    });

    it('should return an error when operator is not valid', () => {
        const queryMap: { [key: string]: Token[] } = {
            'Value Op Test': [
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

        for (const query in queryMap) {
            const tokens = queryMap[query];
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string): Token[] => tokens,
            };

            const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

            // Assert
            expect(() => {
                // Act
                const expression = textQueryParser.parse(query);

                // Assert
                expect(expression).toBeNull();
            }).toThrow(Error);
        }
    });

    it('should return a logic expression when the query has logic', () => {
        const queryMap: { [key: string]: Token[] } = {
            'Value1 Equal Test1 And Value2 Equal Test2': [
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
                {
                    type: TokenType.TokenTypeAnd,
                    value: 'And',
                },
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
        };

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

        for (const query in queryMap) {
            const tokens = queryMap[query];
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string): Token[] => tokens,
            };

            const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

            // Act
            const expression = textQueryParser.parse(query);

            // Assert
            expect(expression).not.toBeNull();
            expect(expression).toBeInstanceOf(LogicExpression);

            const logicExpression = expression as LogicExpression;

            expect(logicExpression.logic).toEqual(Logic.LogicAnd);
            expect(logicExpression.expressions).toHaveLength(2);

            const firstExpression = logicExpression.expressions[0] as OperatorExpression;
            expect(firstExpression).not.toBeNull();
            expect(firstExpression.field).toEqual('Value1');
            expect(firstExpression.operator).toEqual(Operator.OperatorEqual);
            expect(firstExpression.value).toEqual('Test1');

            const secondExpression = logicExpression.expressions[1] as OperatorExpression;
            expect(secondExpression).not.toBeNull();
            expect(secondExpression.field).toEqual('Value2');
            expect(secondExpression.operator).toEqual(Operator.OperatorNotEqual);
            expect(secondExpression.value).toEqual('Test2');
        }
    });

    it('should return an operator expression when the query does not have logic', () => {
        const queryMap: { [key: string]: Token[] } = {
            'Value Equal Test': [
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

        for (const query in queryMap) {
            const tokens = queryMap[query];
            // Arrange
            const textQueryTokenizerMock: any = {
                tokenize: (text: string): Token[] => tokens,
            };

            const textQueryParser = new TextQueryParser(metadata, textQueryTokenizerMock);

            // Act
            const expression = textQueryParser.parse(query);

            // Assert
            expect(expression).not.toBeNull();
            expect(expression).toBeInstanceOf(OperatorExpression);

            const operatorExpression = expression as OperatorExpression;

            expect(operatorExpression.field).toEqual('Value');
            expect(operatorExpression.operator).toEqual(Operator.OperatorEqual);
            expect(operatorExpression.value).toEqual('Test');
        }
    });
});
