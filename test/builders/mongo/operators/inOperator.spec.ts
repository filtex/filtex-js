import {InOperator} from "../../../../src/builders/mongo/operators/inOperator";
import {FieldType} from "../../../../src/constants";

describe('inOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const item = 'Filtex';
        const value = [
            item
        ];

        // Act
        const expression = InOperator.build(FieldType.FieldTypeString, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const inn = inner['$in'];
        expect(inn).not.toBeNull();

        const items = inn;
        expect(items).not.toBeNull();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    it('should return expression when field type is number', () => {
        // Arrange
        const item = 100;
        const value = [
            item
        ];

        // Act
        const expression = InOperator.build(FieldType.FieldTypeNumber, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const inn = inner['$in'];
        expect(inn).not.toBeNull();

        const items = inn;
        expect(items).not.toBeNull();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    it('should return expression when field type is boolean', () => {
        // Arrange
        const item = true;
        const value = [
            item
        ];

        // Act
        const expression = InOperator.build(FieldType.FieldTypeBoolean, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const inn = inner['$in'];
        expect(inn).not.toBeNull();

        const items = inn;
        expect(items).not.toBeNull();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    it('should return expression when field type is date', () => {
        // Arrange
        const item = new Date();
        const value = [
            item
        ];

        // Act
        const expression = InOperator.build(FieldType.FieldTypeDate, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const inn = inner['$in'];
        expect(inn).not.toBeNull();

        const items = inn;
        expect(items).not.toBeNull();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    it('should return expression when field type is time', () => {
        // Arrange
        const item = 60;
        const value = [
            item
        ];

        // Act
        const expression = InOperator.build(FieldType.FieldTypeTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const inn = inner['$in'];
        expect(inn).not.toBeNull();

        const items = inn;
        expect(items).not.toBeNull();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    it('should return expression when field type is datetime', () => {
        // Arrange
        const item = new Date();
        const value = [
            item
        ];

        // Act
        const expression = InOperator.build(FieldType.FieldTypeDateTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const inn = inner['$in'];
        expect(inn).not.toBeNull();

        const items = inn;
        expect(items).not.toBeNull();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = InOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = InOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = InOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = InOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = InOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = InOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
