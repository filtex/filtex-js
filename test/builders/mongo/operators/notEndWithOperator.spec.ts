import {NotEndWithOperator} from "../../../../src/builders/mongo/operators/notEndWithOperator";
import {FieldType} from "../../../../src/constants";

describe('notEndWithOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeString, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const not = inner["$not"];
        expect(not).not.toBeNull();

        const notInner = not;
        expect(notInner).not.toBeNull();

        const regex = notInner['$regex'];
        expect(regex).not.toBeNull();
        expect(regex).toEqual(value + "$");

        const options = notInner['$options'];
        expect(options).not.toBeNull();
        expect(options).toEqual('i');
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeNumber, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeBoolean, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDate, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = NotEndWithOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
