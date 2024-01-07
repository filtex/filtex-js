import {LessThanOrEqualOperator} from "../../../../src/builders/memory/operators/lessThanOrEqualOperator";
import {FieldType} from "../../../../src/constants";

describe('lessThanOrEqualOperator', () => {
    it('should return false when field type is number and null', () => {
        // Arrange
        const data = {
            Value: <number | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeNumber, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is number and less', () => {
        // Arrange
        const value = 99;
        const data = {
            Value: <number | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeNumber, 'Value', value + 1);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when field type is number and equal', () => {
        // Arrange
        const value = 100;
        const data = {
            Value: <number | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeNumber, 'Value', value);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is number and greater', () => {
        // Arrange
        const value = 100;
        const data = {
            Value: <number | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeNumber, 'Value', value - 1);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date and null', () => {
        // Arrange
        const data = {
            Value: <Date | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDate, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is date and less', () => {
        // Arrange
        const value = new Date();
        const data = {
            Value: <Date | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDate, 'Value', new Date(value.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when field type is date and equal', () => {
        // Arrange
        const value = new Date();
        const data = {
            Value: <Date | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDate, 'Value', value);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is date and greater', () => {
        // Arrange
        const value = new Date();
        const data = {
            Value: <Date | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDate, 'Value', new Date(value.getTime() - 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time and null', () => {
        // Arrange
        const data = {
            Value: <number | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is time and less', () => {
        // Arrange
        const value = 60;
        const data = {
            Value: <number | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTime, 'Value', value + 1);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when field type is time and equal', () => {
        // Arrange
        const value = 60;
        const data = {
            Value: <number | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTime, 'Value', value);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is time and greater', () => {
        // Arrange
        const value = 60;
        const data = {
            Value: <number | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTime, 'Value', value - 1);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime and null', () => {
        // Arrange
        const data = {
            Value: <Date | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is datetime and less', () => {
        // Arrange
        const value = new Date();
        const data = {
            Value: <Date | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', new Date(value.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when field type is datetime and equal', () => {
        // Arrange
        const value = new Date();
        const data = {
            Value: <Date | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', value);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is datetime and greater', () => {
        // Arrange
        const value = new Date();
        const data = {
            Value: <Date | null>value
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', new Date(value.getTime() - 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeString, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string array', () => {
        // Arrange
        const data = {
            Value: <string[] | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeStringArray, 'Value', null);

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
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeBoolean, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean array', () => {
        // Arrange
        const data = {
            Value: <boolean[] | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date array', () => {
        // Arrange
        const data = {
            Value: <Date[] | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time array', () => {
        // Arrange
        const data = {
            Value: <object[] | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime array', () => {
        // Arrange
        const data = {
            Value: <Date[] | null>null
        };
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
