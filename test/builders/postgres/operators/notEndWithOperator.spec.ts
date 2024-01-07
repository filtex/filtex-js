import {NotEndWithOperator} from "../../../../src/builders/postgres/operators/notEndWithOperator";
import {FieldType} from "../../../../src/constants";

describe('notEndWithOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value NOT ILIKE '%' || $1");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeStringArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeNumber, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeNumberArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeBoolean, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDate, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });
});
