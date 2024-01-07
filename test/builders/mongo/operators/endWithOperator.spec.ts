import {EndWithOperator} from "../../../../src/builders/mongo/operators/endWithOperator";
import {FieldType} from "../../../../src/constants";

describe('endWithOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeString, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const regex = inner['$regex'];
        expect(regex).not.toBeNull();
        expect(regex).toEqual(value + "$");

        const options = inner['$options'];
        expect(options).not.toBeNull();
        expect(options).toEqual('i');
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeNumber, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeBoolean, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDate, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDateTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = EndWithOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
