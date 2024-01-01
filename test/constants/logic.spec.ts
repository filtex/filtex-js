import {Logic, TokenType} from "../../src/constants";

describe('logic', () => {
    it('toTokenType should return none token when value is not valid', () => {
        // Arrange
        const samples = [Logic.LogicUnknown];

        for (const sample of samples) {
            // Act
            const result = sample.toTokenType();

            // Assert
            expect(result).toEqual(TokenType.TokenTypeNone);
        }
    });

    it('toTokenType should return token when value is valid', () => {
        // Arrange
        const samples = new Map<Logic, TokenType>([
            [Logic.LogicAnd, TokenType.TokenTypeAnd],
            [Logic.LogicOr, TokenType.TokenTypeOr],
        ]);

        for (const [sample, expected] of samples) {
            // Act
            const result = sample.toTokenType();

            // Assert
            expect(result).toEqual(expected);
        }
    });

    it('parseLogic should return unknown when value is not valid', () => {
        // Arrange
        const samples = ["", "test"];

        for (const sample of samples) {
            // Act
            const result = Logic.parseLogic(sample);

            // Assert
            expect(result).toEqual(Logic.LogicUnknown);
        }
    });

    it('parseLogic should return logic when value is valid', () => {
        // Arrange
        const samples = new Map<string, Logic>([
            ["and", Logic.LogicAnd],
            ["And", Logic.LogicAnd],
            ["AND", Logic.LogicAnd],
            ["or", Logic.LogicOr],
            ["Or", Logic.LogicOr],
            ["OR", Logic.LogicOr],
        ]);

        for (const [sample, expected] of samples) {
            // Act
            const result = Logic.parseLogic(sample);

            // Assert
            expect(result).toEqual(expected);
        }
    });
});
