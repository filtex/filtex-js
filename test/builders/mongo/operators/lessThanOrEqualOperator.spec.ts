import {LessThanOrEqualOperator} from "../../../../src/builders/mongo/operators/lessThanOrEqualOperator";
import {FieldType} from "../../../../src/constants";

describe('lessThanOrEqualOperator', () => {
    it('should return expression when field type is number', () => {
        // Arrange
        const value = 100.0;

        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeNumber, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$lte'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return expression when field type is date', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDate, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$lte'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return expression when field type is time', () => {
        // Arrange
        const value = 60;

        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$lte'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return expression when field type is datetime', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const gt = inner['$lte'];
        expect(gt).not.toBeNull();
        expect(value).toEqual(gt);
    });

    it('should return null when field type is string', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeString, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeBoolean, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = LessThanOrEqualOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
