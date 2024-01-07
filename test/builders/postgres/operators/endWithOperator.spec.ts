import {EndWithOperator} from "../../../../src/builders/postgres/operators/endWithOperator";
import {FieldType} from "../../../../src/constants";

describe('endWithOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value ILIKE '%' || $1");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeStringArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeNumber, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeNumberArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeBoolean, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeBooleanArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDate, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDateArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDateTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });
});
