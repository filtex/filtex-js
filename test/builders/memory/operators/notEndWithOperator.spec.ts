import {NotEndWithOperator} from "../../../../src/builders/memory/operators/notEndWithOperator";
import {FieldType} from "../../../../src/constants";

describe('notEndWithOperator', () => {
    it('should return true when field type is string and null and value is empty', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when field type is string and null and value is not empty', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when field type is string and empty and value is not empty', () => {
        // Arrange
        const data = {
            Value: <string | null>""
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is string and empty and value is empty', () => {
        // Arrange
        const data = {
            Value: <string | null>""
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is string and does not end with value', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', "Fil");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is string and ends with value', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', "ex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number', () => {
        // Arrange
        const data = {
            Value: <number | null>100
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeNumber, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number array', () => {
        // Arrange
        const data = {
            Value: <number[] | null>[100]
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeNumberArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean', () => {
        // Arrange
        const data = {
            Value: <boolean | null>true
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeBoolean, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean array', () => {
        // Arrange
        const data = {
            Value: <boolean[] | null>[true]
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date', () => {
        // Arrange
        const data = {
            Value: <Date | null>new Date()
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDate, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array', () => {
        // Arrange
        const data = {
            Value: <Date[] | null>[new Date()]
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time', () => {
        // Arrange
        const data = {
            Value: <number | null>60
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time array', () => {
        // Arrange
        const data = {
            Value: <number[] | null>[60]
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime', () => {
        // Arrange
        const data = {
            Value: <Date | null>new Date()
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime array', () => {
        // Arrange
        const data = {
            Value: <Date[] | null>[new Date()]
        };
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
