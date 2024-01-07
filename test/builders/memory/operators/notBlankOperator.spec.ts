import {NotBlankOperator} from "../../../../src/builders/memory/operators/notBlankOperator";
import {FieldType} from "../../../../src/constants";

describe('notBlankOperator', () => {
    it('should return false when field type is string and null', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeString, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string and empty', () => {
        // Arrange
        const data = {
            Value: <string | null>''
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeString, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string array and empty', () => {
        // Arrange
        const data = {
            Value: <string[] | null>[]
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeStringArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string array and null', () => {
        // Arrange
        const data = {
            Value: <string[] | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeStringArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number array and empty', () => {
        // Arrange
        const data = {
            Values: <number[] | null>[]
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeNumberArray, 'Values', null);

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
        const expression = NotBlankOperator.build(FieldType.FieldTypeNumberArray, 'Values', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean array and empty', () => {
        // Arrange
        const data = {
            Values: <boolean[] | null>[]
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeBooleanArray, 'Values', null);

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
        const expression = NotBlankOperator.build(FieldType.FieldTypeBooleanArray, 'Values', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array and empty', () => {
        // Arrange
        const data = {
            Values: <Date[] | null>[]
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateArray, 'Values', null);

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
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateArray, 'Values', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time array and empty', () => {
        // Arrange
        const data = {
            Values: <object[] | null>[]
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeTimeArray, 'Values', null);

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
        const expression = NotBlankOperator.build(FieldType.FieldTypeTimeArray, 'Values', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime array and empty', () => {
        // Arrange
        const data = {
            Values: <Date[] | null>[]
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateTimeArray, 'Values', null);

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
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateTimeArray, 'Values', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number', () => {
        // Arrange
        const data = {
            Value: <number | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeNumber, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean', () => {
        // Arrange
        const data = {
            Value: <boolean | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeBoolean, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date', () => {
        // Arrange
        const data = {
            Value: <Date | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeDate, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time', () => {
        // Arrange
        const data = {
            Value: <object | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime', () => {
        // Arrange
        const data = {
            Value: <Date | null>null
        };
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
