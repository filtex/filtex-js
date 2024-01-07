import {EndWithOperator} from "../../../../src/builders/memory/operators/endWithOperator";
import {FieldType} from "../../../../src/constants";

describe('endWithOperator', () => {
    it('should return false when field type is string and null and value is empty', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', "");

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
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

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
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

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
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is string and does not end with value', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', "Fil");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is string and ends with value', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', "ex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is number', () => {
        // Arrange
        const data = {
            Value: <number | null>null
        };
        const expression = EndWithOperator.build(FieldType.FieldTypeNumber, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeNumberArray, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeBoolean, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeDate, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeDateArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date', () => {
        // Arrange
        const data = {
            Value: <object | null>null
        };
        const expression = EndWithOperator.build(FieldType.FieldTypeTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array', () => {
        // Arrange
        const data = {
            Value: <object[] | null>[]
        };
        const expression = EndWithOperator.build(FieldType.FieldTypeTimeArray, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeDateTime, 'Value', null);

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
        const expression = EndWithOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
