import {LessThanOperator} from "../../../../src/builders/postgres/operators/lessThanOperator";
import {FieldType} from "../../../../src/constants";

describe('lessThanOperator', () => {
    it('should return expression when field type is number', () => {
        // Arrange
        const value = 100.0;

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeNumber, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value < $1");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is date', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeDate, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value < $1");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is time', () => {
        // Arrange
        const value = 1000;

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeTime, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value < $1");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is datetime', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeDateTime, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value < $1");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return null when field type is string', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeString, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is string array', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeStringArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeNumberArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeBoolean, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeDateArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange

        // Act
        const expression = LessThanOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });
});
