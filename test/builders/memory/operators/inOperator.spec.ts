import {InOperator} from "../../../../src/builders/memory/operators/inOperator";
import {FieldType} from "../../../../src/constants";

describe('inOperator', () => {
    it('should return false when field type is string and value is null', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = InOperator.build(FieldType.FieldTypeString, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is string and value is not array and contains', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = InOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is string and value is not array and not contain', () => {
        // Arrange
        const data = {
            Value: <string | null>"Test"
        };
        const expression = InOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is string and value contains', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = InOperator.build(FieldType.FieldTypeString, 'Value', ["Filtex"]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is string and value not contain', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = InOperator.build(FieldType.FieldTypeString, 'Value', ["Filter"]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number and value is null', () => {
        // Arrange
        const data = {
            Value: <number | null>1000
        };
        const expression = InOperator.build(FieldType.FieldTypeNumber, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number and value is not array', () => {
        // Arrange
        const data = {
            Value: <number | null>1000
        };
        const expression = InOperator.build(FieldType.FieldTypeNumber, 'Value', 100);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is number and value contains', () => {
        // Arrange
        const data = {
            Value: <number | null>100
        };
        const expression = InOperator.build(FieldType.FieldTypeNumber, 'Value', [100]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is number and value not contain', () => {
        // Arrange
        const data = {
            Value: <number | null>100
        };
        const expression = InOperator.build(FieldType.FieldTypeNumber, 'Value', [101]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean and value is null', () => {
        // Arrange
        const data = {
            Value: <boolean | null>true
        };
        const expression = InOperator.build(FieldType.FieldTypeBoolean, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean and value is not array', () => {
        // Arrange
        const data = {
            Value: <boolean | null>true
        };
        const expression = InOperator.build(FieldType.FieldTypeBoolean, 'Value', false);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is boolean and value contains', () => {
        // Arrange
        const data = {
            Value: <boolean | null>false
        };
        const expression = InOperator.build(FieldType.FieldTypeBoolean, 'Value', [false]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is boolean and value not contain', () => {
        // Arrange
        const data = {
            Value: <boolean | null>false
        };
        const expression = InOperator.build(FieldType.FieldTypeBoolean, 'Value', [true]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date and value is null', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDate, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is date and value is not array and contains', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDate, 'Value', now);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is date and value is not array and not contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDate, 'Value', new Date(now.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is date and value contains', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDate, 'Value', [now]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is date and value not contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDate, 'Value', [new Date(now.getTime() + 24 * 60 * 60 * 1000)]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time and value is null', () => {
        // Arrange
        const now = 60;
        const data = {
            Value: <number | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is time and value is not array and contains', () => {
        // Arrange
        const now = 60;
        const data = {
            Value: <number | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeTime, 'Value', now);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is time and value is not array and not contain', () => {
        // Arrange
        const now = 60;
        const data = {
            Value: <number | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeTime, 'Value', now + 10);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is time and value contains', () => {
        // Arrange
        const now = 60;
        const data = {
            Value: <number | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeTime, 'Value', [now]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is time and value not contain', () => {
        // Arrange
        const now = 60;
        const data = {
            Value: <number | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeTime, 'Value', [now + 1]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime and value is null', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDateTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is datetime and value is not array and contains', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDateTime, 'Value', now);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is datetime and value is not array and not contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDateTime, 'Value', new Date(now.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is datetime and value contains', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDateTime, 'Value', [now]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is datetime and value not contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = InOperator.build(FieldType.FieldTypeDateTime, 'Value', [new Date(now.getTime() + 24 * 60 * 60 * 1000)]);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string array', () => {
        // Arrange
        const data = {
            Value: <string[] | null>[]
        };
        const expression = InOperator.build(FieldType.FieldTypeStringArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number array', () => {
        // Arrange
        const data = {
            Value: <number[] | null>[]
        };
        const expression = InOperator.build(FieldType.FieldTypeNumberArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean array', () => {
        // Arrange
        const data = {
            Value: <boolean[] | null>[]
        };
        const expression = InOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array', () => {
        // Arrange
        const data = {
            Value: <Date[] | null>[]
        };
        const expression = InOperator.build(FieldType.FieldTypeDateArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time array', () => {
        // Arrange
        const data = {
            Value: <object[] | null>[]
        };
        const expression = InOperator.build(FieldType.FieldTypeTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime array', () => {
        // Arrange
        const data = {
            Value: <Date[] | null>[]
        };
        const expression = InOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
