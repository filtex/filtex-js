import {ContainOperator} from "../../../../src/builders/memory/operators/containOperator";
import {FieldType} from "../../../../src/constants";

describe('containOperator', () => {
    it('should return false when field type is string and null and value is empty', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string and null and value is not empty', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string and empty and value is not empty', () => {
        // Arrange
        const data = {
            Value: <string | null>""
        };
        const expression = ContainOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });


    it('should return true when field type is string and empty and value is empty', () => {
        // Arrange
        const data = {
            Value: <string | null>""
        };
        const expression = ContainOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is string array and empty', () => {
        // Arrange
        const data = {
            Values: <string[]>[]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeStringArray, 'Values', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string array and null', () => {
        // Arrange
        const data = {
            Values: <string[] | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeStringArray, 'Values', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string array and not empty and not contain', () => {
        // Arrange
        const data = {
            Values: ["Dog"]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeStringArray, 'Values', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is string array and not empty and contain', () => {
        // Arrange
        const data = {
            Values: ["Filtex"]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeStringArray, 'Values', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is number array and empty', () => {
        // Arrange
        const data = {
            Values: <number[]>[]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeNumberArray, 'Values', 1000);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number array and null', () => {
        // Arrange
        const data = {
            Values: <number[] | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeNumberArray, 'Values', 1000);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number array and not empty and not contain', () => {
        // Arrange
        const data = {
            Values: [100]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeNumberArray, 'Values', 200);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is number array and not empty and contain', () => {
        // Arrange
        const data = {
            Values: [100]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeNumberArray, 'Values', 100);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is boolean array and empty', () => {
        // Arrange
        const data = {
            Values: <boolean[]>[]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeBooleanArray, 'Values', false);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean array and null', () => {
        // Arrange
        const data = {
            Values: <boolean[] | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeBooleanArray, 'Values', true);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean array and not empty and not contain', () => {
        // Arrange
        const data = {
            Values: [true]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeBooleanArray, 'Values', false);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is boolean array and not empty and contain', () => {
        // Arrange
        const data = {
            Values: [true]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeBooleanArray, 'Values', true);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is date array and empty', () => {
        // Arrange
        const data = {
            Values: <Date[]>[]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateArray, 'Values', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array and null', () => {
        // Arrange
        const data = {
            Values: <Date[] | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateArray, 'Values', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array and not empty and not contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Values: [now]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateArray, 'Values', new Date(now.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is date array and not empty and contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Values: [now]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateArray, 'Values', now);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is time array and empty', () => {
        // Arrange
        const data = {
            Values: <object[]>[]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeTimeArray, 'Values', false);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time array and null', () => {
        // Arrange
        const data = {
            Values: <object[] | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeTimeArray, 'Values', true);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time array and not empty and not contain', () => {
        // Arrange
        const time = 60;
        const data = {
            Values: [time]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeTimeArray, 'Values', time + 1);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is time array and not empty and contain', () => {
        // Arrange
        const time = 60;
        const data = {
            Values: [time]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeTimeArray, 'Values', time);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is datetime array and empty', () => {
        // Arrange
        const data = {
            Values: <Date[]>[]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Values', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime array and null', () => {
        // Arrange
        const data = {
            Values: <Date[] | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Values', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime array and not empty and not contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Values: [now]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Values', new Date(now.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is datetime array and not empty and contain', () => {
        // Arrange
        const now = new Date();
        const data = {
            Values: [now]
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Values', now);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is number', () => {
        // Arrange
        const data = {
            Values: <number | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeNumber, 'Values', 100);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean', () => {
        // Arrange
        const data = {
            Values: <boolean | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeBoolean, 'Values', true);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date', () => {
        // Arrange
        const data = {
            Values: <Date | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDate, 'Values', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time', () => {
        // Arrange
        const data = {
            Values: <number | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeTime, 'Values', 60);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime', () => {
        // Arrange
        const data = {
            Values: <Date | null>null
        };
        const expression = ContainOperator.build(FieldType.FieldTypeDateTime, 'Values', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
