import {BaseQueryTokenizer, TokenMatch} from "../../src/tokenizers";
import {Metadata, Token, Lookup} from "../../src/models";
import {FieldType, Operator, TokenType} from "../../src/constants";

describe('baseQueryTokenizer', () => {
    it('should return null when the last and new token are both spaces', () => {
        // Arrange
        const tokens: Token[] = [
            {
                type: TokenType.TokenTypeSpace,
                value: ' ',
            },
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeSpace, ' ');

        // Assert
        expect(token).toBeNull();
    });

    it('should return a space token when the new token is a space and the last token is not', () => {
        // Arrange
        const tokens: Token[] = [
            {
                type: TokenType.TokenTypeField,
                value: 'Value',
            },
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeSpace, ' ');

        // Assert
        expect(token).not.toBeNull();
        expect(token?.type).toEqual(TokenType.TokenTypeSpace);
        expect(token?.value).toEqual(' ');
    });

    it('should return a field token when there are no tokens, and the token is a valid literal', () => {
        // Arrange
        const tokens: Token[] = [];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, 'Value');

        // Assert
        expect(token).not.toBeNull();
        expect(token?.type).toEqual(TokenType.TokenTypeField);
        expect(token?.value).toEqual('Value');
    });

    it('should return a field token when there are no tokens, and the token is a valid field', () => {
        // Arrange
        const tokens: Token[] = [];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value');

        // Assert
        expect(token).not.toBeNull();
        expect(token?.type).toEqual(TokenType.TokenTypeField);
        expect(token?.value).toEqual('Value');
    });

    it('should return a none token when there are no tokens, and the token is an invalid field', () => {
        // Arrange
        const tokens: Token[] = [];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value1');

        // Assert
        expect(token).not.toBeNull();
        expect(token?.type).toEqual(TokenType.TokenTypeNone);
        expect(token?.value).toEqual('Value1');
    });

    it('should return a field token when there are no tokens, and the token is in open group tokens', () => {
        // Arrange
        const tokens: Token[] = [];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeOpenBracket, '(');

        // Assert
        expect(token).not.toBeNull();
        expect(token?.type).toEqual(TokenType.TokenTypeOpenBracket);
        expect(token?.value).toEqual('(');
    });

    it('should return a value token when the token is a field, and the last token is not in preField, comparer, and separator tokens and is valid for value', () => {
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ]
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeValue);
            expect(token?.value).toEqual('Value');
        }
    });

    it('should return a none token when the token is a field, and the last token is not in preField, comparer, and separator tokens and is not valid for value', () => {
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeNone,
                    value: "",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ")",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeNumberValue,
                    value: 100,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeBooleanValue,
                    value: false,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeTimeValue,
                    value: 60,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('Value');
        }
    });

    it('should return a none token when the token is a field, and the last token is in preField tokens and not a valid field', () => {
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "And",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "Or",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value1');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('Value1');
        }
    });

    it('should return a field token when the token is a field, and the last token is in preField tokens and is a valid field', () => {
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "And",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "Or",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeField);
            expect(token?.value).toEqual('Value');
        }
    });

    it('should return none token when token is field and last token is in comparer or separator tokens and invalid value', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeNumber.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Test');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('Test');
        });
    });

    it('should return none token when last token is in comparer or separator tokens and valid value and operator is not comparer', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('Value');
        });
    });

    it('should return value token when token is field and last token is in comparer or separator tokens and valid value and operator is comparer', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeField, 'Test');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeValue);
            expect(token?.value).toEqual('Test');
        });
    });

    it('should return value token when token is literal and last token is not in comparer and separator and pre-field tokens and valid for value', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeValue);
            expect(token?.value).toEqual('Value');
        });
    });

    it('should return none token when token is literal and last token is not in comparer, separator, and pre-field tokens and not valid for value', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeNone,
                    value: "",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ")",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeNumberValue,
                    value: 100,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeBooleanValue,
                    value: false,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeTimeValue,
                    value: new Date(0, 0, 0, 0, 0, 1, 0),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('Value');
        });
    });

    it('should return none token when token is literal and last token is in comparer or separator tokens and invalid value', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeDate.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, '100');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('100');
        });
    });

    it('should return none token when token is literal and last token is in comparer, separator, or pre-field tokens and not valid for value', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeNone,
                    value: "",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ")",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeNumberValue,
                    value: 100,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeBooleanValue,
                    value: false,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeTimeValue,
                    value: new Date(0, 0, 0, 0, 0, 1, 0),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, "Test");

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual("Test");
        });
    });

    it('should return value token when token is literal and last token is in comparer or separator tokens and valid value', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];


        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, "Test");

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeValue);
            expect(token?.value).toEqual("Test");
        });
    });

    it('should return none token when token is literal and last token is not in comparer and separator and pre-field tokens and invalid for lookup value', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeBoolean.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [
                    {
                        name: 'Enabled',
                        value: true,
                    },
                    {
                        name: 'Disabled',
                        value: false,
                    },
                ],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, 'Value');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual('Value');
        });
    });

    it('should return value token when token is literal and last token is not in comparer and separator and pre-field tokens and valid for lookup value', () => {
        // Arrange
        const tokensList: Token[][] = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeBoolean.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [
                    {
                        name: 'Enabled',
                        value: true,
                    },
                    {
                        name: 'Disabled',
                        value: false,
                    },
                ],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, 'Enabled');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeValue);
            expect(token?.value).toEqual(true);
        });
    });

    it('should return none token when token is literal and last token is in pre-field tokens and invalid field', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "And",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeOr,
                    value: "Or",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach((tokens) => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, "Value1");

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeNone);
            expect(token?.value).toEqual("Value1");
        });
    });

    it('createToken should return field token when token is literal and last token is in pre-field tokens and valid field', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "And",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeLiteral,
                    value: "Test",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "Or",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeLiteral, "Value");

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toBe(TokenType.TokenTypeField);
            expect(token?.value).toBe("Value");
        });
    });

    it('createToken should return none token when token is Value and last token is not in comparer and separator tokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeNone,
                    value: '',
                },
            ],
            [
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
                    value: 'Test',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
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
                    type: TokenType.TokenTypeValue,
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
                    value: 100,
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
                    type: TokenType.TokenTypeBooleanValue,
                    value: false,
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
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
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
                    type: TokenType.TokenTypeTimeValue,
                    value: 1000, // Adjust this value accordingly
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
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
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
                    type: TokenType.TokenTypeLiteral,
                    value: 'Test',
                },
            ],
        ];

        const valueTokenTypes = [
            TokenType.TokenTypeValue,
            TokenType.TokenTypeStringValue,
            TokenType.TokenTypeNumberValue,
            TokenType.TokenTypeBooleanValue,
            TokenType.TokenTypeDateValue,
            TokenType.TokenTypeTimeValue,
            TokenType.TokenTypeDateTimeValue,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            valueTokenTypes.forEach(valueTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, valueTokenType, 'Test');

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(TokenType.TokenTypeNone);
                expect(token?.value).toBe('Test');
            });
        });
    });

    it('createToken should return none token when token is Value and last token is in comparer or separator tokens and invalid value', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: 'Not Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: 'Greater Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'Greater Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: 'Less Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: 'Less Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: 'Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: 'Not Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: 'Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: 'Not Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: 'End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: 'Not End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: 'In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: 'Not In',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
                },
            ],
        ];

        const valueTokenTypes = [
            TokenType.TokenTypeValue,
            TokenType.TokenTypeStringValue,
            TokenType.TokenTypeNumberValue,
            TokenType.TokenTypeBooleanValue,
            TokenType.TokenTypeDateValue,
            TokenType.TokenTypeTimeValue,
            TokenType.TokenTypeDateTimeValue,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeTime.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            valueTokenTypes.forEach(valueTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, valueTokenType, 'TEST');

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(TokenType.TokenTypeNone);
                expect(token?.value).toBe('TEST');
            });
        });
    });

    it('createToken should return none token when token is Value and last token is in comparer or separator tokens and invalid value', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: 'Not Blank',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
                },
            ],
        ];

        const valueTokenTypes = [
            TokenType.TokenTypeValue,
            TokenType.TokenTypeStringValue,
            TokenType.TokenTypeNumberValue,
            TokenType.TokenTypeBooleanValue,
            TokenType.TokenTypeDateValue,
            TokenType.TokenTypeTimeValue,
            TokenType.TokenTypeDateTimeValue,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeTime.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            valueTokenTypes.forEach(valueTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, valueTokenType, 'TEST');

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(TokenType.TokenTypeNone);
                expect(token?.value).toBe('TEST');
            });
        });
    });

    it('createToken should return value token when token is Value and last token is in comparer or separator tokens and valid value and operator is comparer', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: 'Not Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: 'Greater Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'Greater Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: 'Less Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: 'Less Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: 'Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: 'Not Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: 'Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: 'Not Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: 'End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: 'Not End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: 'In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: 'Not In',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
                },
            ],
        ];

        const valueTokenTypes = [
            TokenType.TokenTypeValue,
            TokenType.TokenTypeStringValue,
            TokenType.TokenTypeNumberValue,
            TokenType.TokenTypeBooleanValue,
            TokenType.TokenTypeDateValue,
            TokenType.TokenTypeTimeValue,
            TokenType.TokenTypeDateTimeValue,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            valueTokenTypes.forEach(valueTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, valueTokenType, 'Test');

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(valueTokenType);
                expect(token?.value).toBe('Test');
            });
        });
    });

    it('createToken should return none token when token is Operator and last token is not FieldToken', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: 'Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: 'Not Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: 'Greater Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'Greater Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: 'Less Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: 'Less Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: 'Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: 'Not Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: 'Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: 'Not Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: 'End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: 'Not End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: 'In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: 'Not In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: 'Not Blank',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
                },
            ],
        ];

        const operatorTokenTypes = [
            TokenType.TokenTypeEqual,
            TokenType.TokenTypeNotEqual,
            TokenType.TokenTypeGreaterThan,
            TokenType.TokenTypeGreaterThanOrEqual,
            TokenType.TokenTypeLessThan,
            TokenType.TokenTypeLessThanOrEqual,
            TokenType.TokenTypeBlank,
            TokenType.TokenTypeNotBlank,
            TokenType.TokenTypeContain,
            TokenType.TokenTypeNotContain,
            TokenType.TokenTypeStartWith,
            TokenType.TokenTypeNotStartWith,
            TokenType.TokenTypeEndWith,
            TokenType.TokenTypeNotEndWith,
            TokenType.TokenTypeIn,
            TokenType.TokenTypeNotIn,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            operatorTokenTypes.forEach(operatorTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, operatorTokenType, operatorTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(TokenType.TokenTypeNone);
                expect(token?.value).toBe(operatorTokenType.toString());
            });
        });
    });

    it('createToken should return none token when token is Operator and last token is FieldToken and invalid operator', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
        ];

        const invalidOperators = [
            '',
            'op',
            TokenType.TokenTypeGreaterThan.name,
            TokenType.TokenTypeGreaterThanOrEqual.name,
            TokenType.TokenTypeLessThan.name,
            TokenType.TokenTypeLessThanOrEqual.name,
            TokenType.TokenTypeBlank.name,
            TokenType.TokenTypeNotBlank.name,
            TokenType.TokenTypeContain.name,
            TokenType.TokenTypeNotContain.name,
            TokenType.TokenTypeStartWith.name,
            TokenType.TokenTypeNotStartWith.name,
            TokenType.TokenTypeEndWith.name,
            TokenType.TokenTypeNotEndWith.name,
            TokenType.TokenTypeIn.name,
            TokenType.TokenTypeNotIn.name,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            invalidOperators.forEach(invalidOperator => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, new TokenType(invalidOperator), invalidOperator);

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(TokenType.TokenTypeNone);
                expect(token?.value).toBe(invalidOperator);
            });
        });
    });

    it('createToken should return OperatorToken when token is Operator and last token is FieldToken and valid operator', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
            ],
        ];

        const operatorTokenTypes = [
            TokenType.TokenTypeEqual,
            TokenType.TokenTypeNotEqual,
            TokenType.TokenTypeGreaterThan,
            TokenType.TokenTypeGreaterThanOrEqual,
            TokenType.TokenTypeLessThan,
            TokenType.TokenTypeLessThanOrEqual,
            TokenType.TokenTypeBlank,
            TokenType.TokenTypeNotBlank,
            TokenType.TokenTypeContain,
            TokenType.TokenTypeNotContain,
            TokenType.TokenTypeStartWith,
            TokenType.TokenTypeNotStartWith,
            TokenType.TokenTypeEndWith,
            TokenType.TokenTypeNotEndWith,
            TokenType.TokenTypeIn,
            TokenType.TokenTypeNotIn,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name,
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            operatorTokenTypes.forEach(operatorTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, operatorTokenType, operatorTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(operatorTokenType);
                expect(token?.value).toBe(operatorTokenType.toString());
            });
        });
    });

    it('createToken should return none token when token is Logic and last token is not in Value or CloseGroup or not comparer tokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: '(',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
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
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: 'Not Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: 'Greater Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'Greater Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: 'Less Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: 'Less Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: 'Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: 'Not Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: 'Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: 'Not Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: 'End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: 'Not End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: 'In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: 'Not In',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: 'And',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeOr,
                    value: 'Or',
                },
            ],
        ];

        const logicTokenTypes = [
            TokenType.TokenTypeAnd,
            TokenType.TokenTypeOr,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            logicTokenTypes.forEach(logicTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, logicTokenType, logicTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(TokenType.TokenTypeNone);
                expect(token?.value).toBe(logicTokenType.toString());
            });
        });
    });

    it('createToken should return LogicToken when token is Logic and last token is in Value or CloseGroup or not comparer tokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: 'Not Blank',
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
                    type: TokenType.TokenTypeValue,
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
                    type: TokenType.TokenTypeNumberValue,
                    value: 100,
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
                    type: TokenType.TokenTypeBooleanValue,
                    value: true,
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
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
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
                    type: TokenType.TokenTypeTimeValue,
                    value: new Date().getTime(),
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
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
                },
            ],
            [
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
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
            ],
        ];

        const logicTokenTypes = [
            TokenType.TokenTypeAnd,
            TokenType.TokenTypeOr,
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            logicTokenTypes.forEach(logicTokenType => {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, logicTokenType, logicTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toBe(logicTokenType);
                expect(token?.value).toBe(logicTokenType.toString());
            });
        });
    });

    it('createToken should return none token when token is in OpenGroupTokenTypes and last token is not in Logic or OpenGroupTokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ')',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
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
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: 'Not Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: 'Greater Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'Greater Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: 'Less Than',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: 'Less Than Or Equal',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: 'Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: 'Not Contain',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: 'Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: 'Not Start With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: 'End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: 'Not End With',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: 'In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: 'Not In',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: 'Blank',
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: 'Value',
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: 'Not Blank',
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
                    type: TokenType.TokenTypeValue,
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ',',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test1',
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: '/',
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeOpenBracket, '(');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toBe(TokenType.TokenTypeNone);
            expect(token?.value).toBe('(');
        });
    });

    it('createToken should return OpenGroupToken when token is in OpenGroupTokens and last token is in Logic or OpenGroupTokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: '(',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test',
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: 'And',
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
                    type: TokenType.TokenTypeValue,
                    value: 'Test',
                },
                {
                    type: TokenType.TokenTypeOr,
                    value: 'Or',
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeOpenBracket, '(');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toBe(TokenType.TokenTypeOpenBracket);
            expect(token?.value).toBe('(');
        });
    });

    it('createToken should return none token when token is in CloseGroupTokenTypes and last token is not in Value and CloseGroup and not ComparerTokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeIn,
                    value: "In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotIn,
                    value: "Not In",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeComma,
                    value: ",",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeSlash,
                    value: "/",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeAnd,
                    value: "And",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test1",
                },
                {
                    type: TokenType.TokenTypeOr,
                    value: "Or",
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeCloseBracket, ")");

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toBe(TokenType.TokenTypeNone);
            expect(token?.value).toBe(")");
        });
    });

    it('createToken should return none token when token is in OpenGroupTokens and last token is in Value or CloseGroup and not ComparerTokens and OpenGroupCount is invalid', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ")",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeNumberValue,
                    value: 100,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeBooleanValue,
                    value: false,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeTimeValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: "Value",
                type: FieldType.FieldTypeString.name,
                label: "Value",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        tokensList.forEach(tokens => {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeCloseBracket, ")");

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toBe(TokenType.TokenTypeNone);
            expect(token?.value).toBe(")");
        });
    });

    it('should return close group token when token is in open group tokens and last token is in value or close group and not comparer tokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeCloseBracket,
                    value: ")",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeStringValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeNumberValue,
                    value: 100,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeBooleanValue,
                    value: false,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateValue,
                    value: new Date(),
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeTimeValue,
                    value: 60,
                },
            ],
            [
                {
                    type: TokenType.TokenTypeOpenBracket,
                    value: "(",
                },
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeDateTimeValue,
                    value: new Date(),
                },
            ],
        ];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name,
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            // Act
            const token = baseQueryTokenizer.createToken(tokens, TokenType.TokenTypeCloseBracket, ')');

            // Assert
            expect(token).not.toBeNull();
            expect(token?.type).toEqual(TokenType.TokenTypeCloseBracket);
            expect(token?.value).toEqual(')');
        }
    });

    it('should return none token when token is separator and operator is not in comparer and multi-allowed tokens', () => {
        // Arrange
        const tokensList = [
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEqual,
                    value: "Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEqual,
                    value: "Not Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThan,
                    value: "Greater Than",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeGreaterThanOrEqual,
                    value: "Greater Than Or Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThan,
                    value: "Less Than",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeLessThanOrEqual,
                    value: "Less Than Or Equal",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeBlank,
                    value: "Blank",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotBlank,
                    value: "Not Blank",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeContain,
                    value: "Contain",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotContain,
                    value: "Not Contain",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeStartWith,
                    value: "Start With",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotStartWith,
                    value: "Not Start With",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeEndWith,
                    value: "End With",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
            [
                {
                    type: TokenType.TokenTypeField,
                    value: "Value",
                },
                {
                    type: TokenType.TokenTypeNotEndWith,
                    value: "Not End With",
                },
                {
                    type: TokenType.TokenTypeValue,
                    value: "Test",
                },
            ],
        ];

        const separatorTokenTypes = [TokenType.TokenTypeComma, TokenType.TokenTypeSlash];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name,
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            for (const separatorTokenType of separatorTokenTypes) {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, separatorTokenType, separatorTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toEqual(TokenType.TokenTypeNone);
                expect(token?.value).toEqual(separatorTokenType.toString());
            }
        }
    });

    it('should return none token when token is separator and operator is valid and last token is not in value tokens', () => {
        // Arrange
        const tokensList = [
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
            ],
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
                {type: TokenType.TokenTypeIn, value: 'In'},
            ],
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
                {type: TokenType.TokenTypeNotIn, value: 'Not In'},
                {type: TokenType.TokenTypeNone, value: 100},
            ],
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
                {type: TokenType.TokenTypeNotIn, value: 'Not In'},
                {type: TokenType.TokenTypeNumberValue, value: 100},
                {type: TokenType.TokenTypeComma, value: ','},
            ],
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
                {type: TokenType.TokenTypeNotIn, value: 'Not In'},
                {type: TokenType.TokenTypeNumberValue, value: 100},
                {type: TokenType.TokenTypeAnd, value: 'And'},
            ],
        ];

        const separatorTokenTypes = [TokenType.TokenTypeComma, TokenType.TokenTypeSlash];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name,
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            for (const separatorTokenType of separatorTokenTypes) {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, separatorTokenType, separatorTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toEqual(TokenType.TokenTypeNone);
                expect(token?.value).toEqual(separatorTokenType.toString());
            }
        }
    });

    it('should return separator token when token is separator and operator is valid and last token is in value tokens', () => {
        // Arrange
        const tokensList = [
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
                {type: TokenType.TokenTypeIn, value: 'In'},
                {type: TokenType.TokenTypeStringValue, value: 'Test'},
            ],
            [
                {type: TokenType.TokenTypeField, value: 'Value'},
                {type: TokenType.TokenTypeNotIn, value: 'Not In'},
                {type: TokenType.TokenTypeStringValue, value: 'Test'},
            ],
        ];

        const separatorTokenTypes = [TokenType.TokenTypeComma, TokenType.TokenTypeSlash];

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                    Operator.OperatorGreaterThan.name,
                    Operator.OperatorGreaterThanOrEqual.name,
                    Operator.OperatorLessThan.name,
                    Operator.OperatorLessThanOrEqual.name,
                    Operator.OperatorBlank.name,
                    Operator.OperatorNotBlank.name,
                    Operator.OperatorContain.name,
                    Operator.OperatorNotContain.name,
                    Operator.OperatorStartWith.name,
                    Operator.OperatorNotStartWith.name,
                    Operator.OperatorEndWith.name,
                    Operator.OperatorNotEndWith.name,
                    Operator.OperatorIn.name,
                    Operator.OperatorNotIn.name,
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const tokens of tokensList) {
            for (const separatorTokenType of separatorTokenTypes) {
                // Act
                const token = baseQueryTokenizer.createToken(tokens, separatorTokenType, separatorTokenType.toString());

                // Assert
                expect(token).not.toBeNull();
                expect(token?.type).toEqual(separatorTokenType);
                expect(token?.value).toEqual(separatorTokenType.toString());
            }
        }
    });

    it('should return nil when not matched', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        // Act
        const match = baseQueryTokenizer.findMatch('%');

        // Assert
        expect(match).toBeNull();
    });

    it('should return token match when matched exactly', () => {
        // Arrange
        const matchMap = new Map<string, TokenMatch>([
            [
                '(',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeOpenBracket,
                    value: '('
                }
            ],
            [
                ')',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeCloseBracket,
                    value: ')'
                }
            ],
            [
                ',',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeComma,
                    value: ','
                }
            ],
            [
                '/',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeSlash,
                    value: '/'
                }
            ],
            [
                'and',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeAnd,
                    value: 'and'
                }
            ],
            [
                '&&',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeAnd,
                    value: '&&'
                }
            ],
            [
                'or',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeOr,
                    value: 'or'
                }
            ],
            [
                '||',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeOr,
                    value: '||'
                }
            ],
            [
                '=',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeEqual,
                    value: '='
                }
            ],
            [
                'equal',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeEqual,
                    value: 'equal'
                }
            ],
            [
                '!=',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotEqual,
                    value: '!='
                }
            ],
            [
                'not equal',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotEqual,
                    value: 'not equal'
                }
            ],
            [
                'greater than or equal',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'greater than or equal'
                }
            ],
            [
                '>=',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeGreaterThanOrEqual,
                    value: '>='
                }
            ],
            [
                'greater than',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeGreaterThan,
                    value: 'greater than'
                }
            ],
            [
                '>',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeGreaterThan,
                    value: '>'
                }
            ],
            [
                'less than or equal',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeLessThanOrEqual,
                    value: 'less than or equal'
                }
            ],
            [
                '<=',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeLessThanOrEqual,
                    value: '<='
                }
            ],
            [
                'less than',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeLessThan,
                    value: 'less than'
                }
            ],
            [
                '<',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeLessThan,
                    value: '<'
                }
            ],
            [
                '[]',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeBlank,
                    value: '[]'
                }
            ],
            [
                'blank',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeBlank,
                    value: 'blank'
                }
            ],
            [
                '![]',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotBlank,
                    value: '![]'
                }
            ],
            [
                'not blank',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotBlank,
                    value: 'not blank'
                }
            ],
            [
                '~',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeContain,
                    value: '~'
                }
            ],
            [
                'contain',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeContain,
                    value: 'contain'
                }
            ],
            [
                '!~',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotContain,
                    value: '!~'
                }
            ],
            [
                'not contain',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotContain,
                    value: 'not contain'
                }
            ],
            [
                '~*',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeStartWith,
                    value: '~*'
                }
            ],
            [
                'start with',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeStartWith,
                    value: 'start with'
                }
            ],
            [
                '!~*',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotStartWith,
                    value: '!~*'
                }
            ],
            [
                'not start with',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotStartWith,
                    value: 'not start with'
                }
            ],
            [
                '*~',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeEndWith,
                    value: '*~'
                }
            ],
            [
                'end with',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeEndWith,
                    value: 'end with'
                }
            ],
            [
                '!*~',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotEndWith,
                    value: '!*~'
                }
            ],
            [
                'not end with',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotEndWith,
                    value: 'not end with'
                }
            ],
            [
                'in',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeIn,
                    value: 'in'
                }
            ],
            [
                'not in',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotIn,
                    value: 'not in'
                }
            ],
        ]);

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const [query, expected] of matchMap) {
            // Act
            const match = baseQueryTokenizer.findMatch(query);

            // Assert
            expect(match).not.toBeNull();
            if (match) {
                expect(match.tokenType).toEqual(expected.tokenType);
                expect(match.value).toEqual(expected.value);
                expect(match.remainingText).toEqual(expected.remainingText);
            }
        }
    });

    it('should return token match when matched case-insensitively', () => {
        // Arrange
        const matchMap = new Map<string, TokenMatch>([
            [
                'AnD',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeAnd,
                    value: 'AnD'
                }
            ],
            [
                'OR',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeOr,
                    value: 'OR'
                }
            ],
            [
                'EquAL',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeEqual,
                    value: 'EquAL'
                }
            ],
            [
                'not EQUAL',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotEqual,
                    value: 'not EQUAL'
                }
            ],
            [
                'greater than or EQUAL',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeGreaterThanOrEqual,
                    value: 'greater than or EQUAL'
                }
            ],
            [
                'GREATER than',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeGreaterThan,
                    value: 'GREATER than'
                }
            ],
            [
                'less THAN OR equal',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeLessThanOrEqual,
                    value: 'less THAN OR equal'
                }
            ],
            [
                'less Than',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeLessThan,
                    value: 'less Than'
                }
            ],
            [
                'BlAnk',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeBlank,
                    value: 'BlAnk'
                }
            ],
            [
                'not BlAnk',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotBlank,
                    value: 'not BlAnk'
                }
            ],
            [
                'Contain',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeContain,
                    value: 'Contain'
                }
            ],
            [
                'not Contain',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotContain,
                    value: 'not Contain'
                }
            ],
            [
                'Start with',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeStartWith,
                    value: 'Start with'
                }
            ],
            [
                'Not Start With',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotStartWith,
                    value: 'Not Start With'
                }
            ],
            [
                'end WiTh',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeEndWith,
                    value: 'end WiTh'
                }
            ],
            [
                'not END with',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotEndWith,
                    value: 'not END with'
                }
            ],
            [
                'IN',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeIn,
                    value: 'IN'
                }
            ],
            [
                'nOt iN',
                {
                    remainingText: '',
                    tokenType: TokenType.TokenTypeNotIn,
                    value: 'nOt iN'
                }
            ],
        ]);

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const [query, expected] of matchMap) {
            // Act
            const match = baseQueryTokenizer.findMatch(query);

            // Assert
            expect(match).not.toBeNull();
            if (match) {
                expect(match.tokenType).toEqual(expected.tokenType);
                expect(match.value).toEqual(expected.value);
                expect(match.remainingText).toEqual(expected.remainingText);
            }
        }
    });

    it('should return token match when matched and there is remaining text', () => {
        // Arrange
        const matchMap = new Map<string, TokenMatch>([
            [
                "Equal Test",
                {
                    remainingText: " Test",
                    tokenType: TokenType.TokenTypeEqual,
                    value: "Equal"
                }
            ],
            [
                "Equal Test AND",
                {
                    remainingText: " Test AND",
                    tokenType: TokenType.TokenTypeEqual,
                    value: "Equal"
                }
            ],
        ]);

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const [query, expected] of matchMap) {
            // Act
            const match = baseQueryTokenizer.findMatch(query);

            // Assert
            expect(match).not.toBeNull();
            if (match) {
                expect(match.tokenType).toEqual(expected.tokenType);
                expect(match.value).toEqual(expected.value);
                expect(match.remainingText).toEqual(expected.remainingText);
            }
        }
    });

    it('should return token match when matched defined fields', () => {
        // Arrange
        const matchMap = new Map<string, TokenMatch>([
            [
                "Value",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeField,
                    value: "Value"
                }
            ],
            [
                "VaLue",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeField,
                    value: "VaLue"
                }
            ],
        ]);

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const [query, expected] of matchMap) {
            // Act
            const match = baseQueryTokenizer.findMatch(query);

            // Assert
            expect(match).not.toBeNull();
            if (match) {
                expect(match.tokenType).toEqual(expected.tokenType);
                expect(match.value).toEqual(expected.value);
                expect(match.remainingText).toEqual(expected.remainingText);
            }
        }
    });

    it('should return token match when matched value', () => {
        // Arrange
        const matchMap = new Map<string, TokenMatch>([
            [
                "Test",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeLiteral,
                    value: "Test"
                }
            ],
            [
                "'Test'",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeStringValue,
                    value: "'Test'"
                }
            ],
            [
                "123",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeNumberValue,
                    value: "123"
                }
            ],
            [
                "True",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeBooleanValue,
                    value: "True"
                }
            ],
            [
                "2020-01-01",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeDateValue,
                    value: "2020-01-01"
                }
            ],
            [
                "14:12:10",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeTimeValue,
                    value: "14:12:10"
                }
            ],
            [
                "2020-01-01 00:00:00",
                {
                    remainingText: "",
                    tokenType: TokenType.TokenTypeDateTimeValue,
                    value: "2020-01-01 00:00:00"
                }
            ],
        ]);

        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        for (const [query, expected] of matchMap) {
            // Act
            const match = baseQueryTokenizer.findMatch(query);

            // Assert
            expect(match).not.toBeNull();
            if (match) {
                expect(match.tokenType).toEqual(expected.tokenType);
                expect(match.value).toEqual(expected.value);
                expect(match.remainingText).toEqual(expected.remainingText);
            }
        }
    });

    it('should return false when there is no defined field', () => {
        // Arrange
        const metadata = new Metadata([]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = ["", "Value", "Value1", "Value2"];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateField(sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return false when field is not valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = ["", "Value1", "Value2"];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateField(sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return true when field is valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = ["Value", "value", "VaLuE"];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateField(sample);

            // Assert
            expect(result).toBe(true);
        }
    });

    it('should return false when there is no defined field', () => {
        // Arrange
        const metadata = new Metadata([]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "equal",
            "Equal",
            "not-equal",
            "Not-Equal",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateOperator("Value", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return false when field is not valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "equal",
            "Equal",
            "not-equal",
            "Not-Equal",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateOperator("Value1", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return false when field is valid and there is no defined operator', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: "Value",
                type: "string",
                label: "Value",
                operators: [],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "equal",
            "Equal",
            "not-equal",
            "Not-Equal",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateOperator("Value", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return false when field is valid and operator is not valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "In",
            "Not-In",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateOperator("Value", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return true when field is valid and operator is valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "equal",
            "Equal",
            "not-equal",
            "Not-Equal",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateOperator("Value", sample);

            // Assert
            expect(result).toBe(true);
        }
    });

    it('should return false when there are no defined fields', () => {
        // Arrange
        const metadata = new Metadata([]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "Test1",
            "Test2",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateValue("Value", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return false when field is not valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "Test1",
            "Test2",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateValue("Value1", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return false when field is valid, has values:, and not matched', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [
                    new Lookup("Enabled", true),
                    new Lookup("Disabled", false)
                ],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "Active",
            "Passive",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateValue("Value", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return true when field is valid and has values: and matched', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [
                    new Lookup("Enabled", true),
                    new Lookup("Disabled", false)
                ],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "Enabled",
            "Disabled",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateValue("Value", sample);

            // Assert
            expect(result).toBe(true);
        }
    });

    it('should return false when field is valid and does not have values and type is not valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeTime.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "True",
            "2020-01-01 11:12:13",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateValue("Value", sample);

            // Assert
            expect(result).toBe(false);
        }
    });

    it('should return true when field is valid, does not have values:, and type is valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "Test1",
            "Test2",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.validateValue("Value", sample);

            // Assert
            expect(result).toBe(true);
        }
    });

    it('should return the same value when there are no defined fields', () => {
        // Arrange
        const metadata = new Metadata([]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "100",
            "200",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.castValue("Value", sample);

            // Assert
            expect(result).toBe(sample);
        }
    });

    it('should return the same value when field is not valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: 'Value',
                type: FieldType.FieldTypeString.name,
                label: 'Value',
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples = [
            "100",
            "200",
        ];

        for (const sample of samples) {
            // Act
            const result = baseQueryTokenizer.castValue("Value1", sample);

            // Assert
            expect(result).toBe(sample);
        }
    });

    it('should return the casted value when field is valid', () => {
        // Arrange
        const metadata = new Metadata([
            {
                name: "StringValue",
                type: FieldType.FieldTypeString.name,
                label: "StringValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "StringArrayValue",
                type: "string-array",
                label: "StringArrayValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                ],
                values: [],
            },
            {
                name: "NumberValue",
                type: "number",
                label: "NumberValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                ],
                values: [],
            },
            {
                name: "NumberArrayValue",
                type: "number-array",
                label: "NumberArrayValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "BooleanValue",
                type: "boolean",
                label: "BooleanValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "BooleanArrayValue",
                type: "boolean-array",
                label: "BooleanArrayValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "DateValue",
                type: "date",
                label: "DateValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name,
                ],
                values: [],
            },
            {
                name: "DateArrayValue",
                type: "date-array",
                label: "DateArrayValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "TimeValue",
                type: "time",
                label: "TimeValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "TimeArrayValue",
                type: "time-array",
                label: "TimeArrayValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "DateTimeValue",
                type: "datetime",
                label: "DateTimeValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
            {
                name: "DateTimeArrayValue",
                type: "datetime-array",
                label: "DateTimeArrayValue",
                operators: [
                    Operator.OperatorEqual.name,
                    Operator.OperatorNotEqual.name
                ],
                values: [],
            },
        ]);

        const baseQueryTokenizer = new BaseQueryTokenizer(metadata);

        const samples: any = {
            "StringValue": [100, "100"],
            "StringArrayValue": [100, "100"],
            "NumberValue": ["100", 100],
            "NumberArrayValue": ["100", 100],
            "BooleanValue": ["True", true],
            "BooleanArrayValue": ["False", false],
            "DateValue": ["2020-01-01", new Date(Date.UTC(2020, 0, 1))],
            "DateArrayValue": ["2020-01-01", new Date(Date.UTC(2020, 0, 1))],
            "TimeValue": ["1h15m", 60 * 60 + 15 * 60],
            "TimeArrayValue": ["1h15m", 60 * 60 + 15 * 60],
            "DateTimeValue": ["2020-01-01 11:12:13", new Date(Date.UTC(2020, 0, 1, 11, 12, 13))],
            "DateTimeArrayValue": ["2020-01-01 11:12:13", new Date(Date.UTC(2020, 0, 1, 11, 12, 13))],
        };

        for (const field of Object.keys(samples)) {
            // Act
            const result = baseQueryTokenizer.castValue(field, samples[field][0]);

            // Assert
            expect(result).toEqual(samples[field][1]);
        }
    });

});
