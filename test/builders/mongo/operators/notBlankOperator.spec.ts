import {NotBlankOperator} from "../../../../src/builders/mongo/operators/notBlankOperator";
import {FieldType} from "../../../../src/constants";

describe('notBlankOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeString, 'Value', null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner['$exists'];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);

        const eq = inner['$ne'];
        expect(eq).not.toBeNull();
        expect(eq).toBe('');
    });

    it('should return expression when field type is string array', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value.0"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner["$exists"];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);
    });

    it('should return expression when field type is number array', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value.0"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner["$exists"];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);
    });

    it('should return expression when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value.0"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner["$exists"];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);
    });

    it('should return expression when field type is date array', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value.0"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner["$exists"];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);
    });

    it('should return expression when field type is time array', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value.0"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner["$exists"];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);
    });

    it('should return expression when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).not.toBeNull();

        const value = expression?.condition["Value.0"];
        expect(value).not.toBeNull();

        const inner = value;
        expect(inner).not.toBeNull();

        const exists = inner["$exists"];
        expect(exists).not.toBeNull();
        expect(exists).toBe(true);
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeNumber, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeBoolean, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeDate, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = NotBlankOperator.build(FieldType.FieldTypeDateTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
