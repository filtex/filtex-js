import {NotEqualOperator} from "../../../../src/builders/memory/operators/notEqualOperator";
import {FieldType} from "../../../../src/constants";

describe('notEqualOperator', () => {
    it('should return false when field type is string and null and value is empty', () => {
        // Arrange
        const data = {
            Value: <string | null>null
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is string and empty and value is not empty', () => {
        // Arrange
        const data = {
            Value: <string | null>""
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeString, 'Value', "");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is string and value is same', () => {
        // Arrange
        const data = {
            Value: <string | null>"Filtex"
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeString, 'Value', "Filtex");

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is number and null and value is not null', () => {
        // Arrange
        const data = {
            Value: <number | null>null
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeNumber, 'Value', 100);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is number and value is not same', () => {
        // Arrange
        const data = {
            Value: <number | null>101
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeNumber, 'Value', 100);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is number and value is same', () => {
        // Arrange
        const data = {
            Value: <number | null>100
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeNumber, 'Value', 100);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is boolean and null and value is not null', () => {
        // Arrange
        const data = {
            Value: <boolean | null>null
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeBoolean, 'Value', true);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is boolean and value is not same', () => {
        // Arrange
        const data = {
            Value: <boolean | null>true
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeBoolean, 'Value', false);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is boolean and value is same', () => {
        // Arrange
        const data = {
            Value: <boolean | null>true
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeBoolean, 'Value', true);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is date and null and value is not null', () => {
        // Arrange
        const data = {
            Value: <Date | null>null
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeDate, 'Value', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is date and value is not same', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeDate, 'Value', new Date(now.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is date and value is same', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeDate, 'Value', now);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is time and null and value is not null', () => {
        // Arrange
        const data = {
            Value: <number | null>null
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeTime, 'Value', 60);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is time and value is not same', () => {
        // Arrange
        const data = {
            Value: <number | null>60
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeTime, 'Value', 60 + 1);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is time and value is same', () => {
        // Arrange
        const data = {
            Value: <number | null>60
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeTime, 'Value', 60);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false when field type is datetime and null and value is not null', () => {
        // Arrange
        const data = {
            Value: <Date | null>null
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', new Date());

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true when field type is datetime and value is not same', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', new Date(now.getTime() + 24 * 60 * 60 * 1000));

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when field type is datetime and value is same', () => {
        // Arrange
        const now = new Date();
        const data = {
            Value: <Date | null>now
        };
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', now);

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeStringArray, 'Value', null);

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeNumberArray, 'Value', null);

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null);

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateArray, 'Value', null);

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeTimeArray, 'Value', null);

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
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null);

        // Act
        const result = expression.fn(data);

        // Assert
        expect(result).toBe(false);
    });
});
