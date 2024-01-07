import {GreaterThanOperator} from "../../../../src/builders/mongo/operators/greaterThanOperator";
import {FieldType} from "../../../../src/constants";

describe('greaterThanOperator', () => {
    it('should return expression when field type is number', () => {
        // Arrange
        const value = 100.0;

        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeNumber, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$gt'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return expression when field type is date', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeDate, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$gt'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return expression when field type is time', () => {
        // Arrange
        const value = 60;

        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$gt'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return expression when field type is datetime', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeDateTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$gt'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return null when field type is string', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeString, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeBoolean, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = GreaterThanOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
