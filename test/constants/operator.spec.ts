import {Operator} from "../../src/constants";

describe('operator', () => {
    it('string should return correct value', () => {
        // Arrange
        const samples = new Map<Operator, string>([
            [Operator.OperatorEqual, "equal"],
            [Operator.OperatorNotEqual, "not-equal"],
            [Operator.OperatorContain, "contain"],
            [Operator.OperatorNotContain, "not-contain"],
            [Operator.OperatorStartWith, "start-with"],
            [Operator.OperatorNotStartWith, "not-start-with"],
            [Operator.OperatorEndWith, "end-with"],
            [Operator.OperatorNotEndWith, "not-end-with"],
            [Operator.OperatorBlank, "blank"],
            [Operator.OperatorNotBlank, "not-blank"],
            [Operator.OperatorGreaterThan, "greater-than"],
            [Operator.OperatorGreaterThanOrEqual, "greater-than-or-equal"],
            [Operator.OperatorLessThan, "less-than"],
            [Operator.OperatorLessThanOrEqual, "less-than-or-equal"],
            [Operator.OperatorIn, "in"],
            [Operator.OperatorNotIn, "not-in"],
        ]);

        for (const [sample, expected] of samples) {
            // Act
            const result = sample.toString();

            // Assert
            expect(result).toEqual(expected);
        }
    });

    it('equals should return false when value is not matched', () => {
        // Arrange
        const samples = new Map<Operator, string>([
            [Operator.OperatorEqual, "equals"],
            [Operator.OperatorNotEqual, "Not-Equals"],
            [Operator.OperatorContain, "contains"],
            [Operator.OperatorNotContain, "Contain"],
        ]);

        for (const [sample, value] of samples) {
            // Act
            const result = sample.equals(value);

            // Assert
            expect(result).toEqual(false);
        }
    });

    it('equals should return true when value is matched', () => {
        // Arrange
        const samples = new Map<Operator, string>([
            [Operator.OperatorEqual, "equal"],
            [Operator.OperatorNotEqual, "Not-Equal"],
            [Operator.OperatorContain, "contain"],
            [Operator.OperatorNotContain, "not Contain"],
            [Operator.OperatorStartWith, "start-with"],
            [Operator.OperatorNotStartWith, "not-start-with"],
            [Operator.OperatorEndWith, "end-with"],
            [Operator.OperatorNotEndWith, "not End With"],
            [Operator.OperatorBlank, "BLANK"],
            [Operator.OperatorNotBlank, "not-blank"],
            [Operator.OperatorGreaterThan, "greater-than"],
            [Operator.OperatorGreaterThanOrEqual, "greater-than-or-equal"],
            [Operator.OperatorLessThan, "less-than"],
            [Operator.OperatorLessThanOrEqual, "less-than-or-equal"],
            [Operator.OperatorIn, "IN"],
            [Operator.OperatorNotIn, "NOT-IN"],
        ]);

        for (const [sample, value] of samples) {
            // Act
            const result = sample.equals(value);

            // Assert
            expect(result).toEqual(true);
        }
    });

    it('parseOperator should return unknown when value is not matched', () => {
        // Arrange
        const samples = ["Equals", "Contained", "NotEqual"];

        for (const sample of samples) {
            // Act
            const result = Operator.parseOperator(sample);

            // Assert
            expect(result).toEqual(Operator.OperatorUnknown);
        }
    });

    it('parseOperator should return correct value when value is matched', () => {
        // Arrange
        const samples = new Map<string, Operator>([
            ["equal", Operator.OperatorEqual],
            ["Not-Equal", Operator.OperatorNotEqual],
            ["contain", Operator.OperatorContain],
            ["not Contain", Operator.OperatorNotContain],
            ["start-with", Operator.OperatorStartWith],
            ["not-start-with", Operator.OperatorNotStartWith],
            ["end-with", Operator.OperatorEndWith],
            ["not End With", Operator.OperatorNotEndWith],
            ["BLANK", Operator.OperatorBlank],
            ["not-blank", Operator.OperatorNotBlank],
            ["greater-than", Operator.OperatorGreaterThan],
            ["greater-than-or-equal", Operator.OperatorGreaterThanOrEqual],
            ["less-than", Operator.OperatorLessThan],
            ["less-than-or-equal", Operator.OperatorLessThanOrEqual],
            ["IN", Operator.OperatorIn],
            ["NOT-IN", Operator.OperatorNotIn],
        ]);

        for (const [sample, expected] of samples) {
            // Act
            const result = Operator.parseOperator(sample);

            // Assert
            expect(result).toEqual(expected);
        }
    });
});
