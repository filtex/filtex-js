import {BlankOperator} from "../../../../src/builders/postgres/operators/blankOperator";
import {FieldType} from "../../../../src/constants";

describe('blankOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeString, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value IS NULL OR Value = ''");
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return expression when field type is string array', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeStringArray, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('ARRAY_LENGTH(Value, 1) = 0');
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return expression when field type is number array', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeNumberArray, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('ARRAY_LENGTH(Value, 1) = 0');
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return expression when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('ARRAY_LENGTH(Value, 1) = 0');
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return expression when field type is date array', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeDateArray, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('ARRAY_LENGTH(Value, 1) = 0');
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return expression when field type is time array', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('ARRAY_LENGTH(Value, 1) = 0');
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return expression when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('ARRAY_LENGTH(Value, 1) = 0');
            expect(expression.args).toHaveLength(0);
        }
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeNumber, "Value", null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeBoolean, "Value", null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeDate, "Value", null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeTime, "Value", null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = BlankOperator.build(FieldType.FieldTypeDateTime, "Value", null, 0);

        // Assert
        expect(expression).toBeNull();
    });
});
