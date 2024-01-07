import {NotContainOperator} from "../../../../src/builders/mongo/operators/notContainOperator";
import {FieldType} from "../../../../src/constants";

describe('notContainOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeString, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const regex = inner['$regex'];
        expect(regex).not.toBeNull();
        expect(regex).toEqual("^((?!" + value + ").)*$");

        const options = inner['$options'];
        expect(options).not.toBeNull();
        expect(options).toEqual('i');
    });

    it('should return expression when field type is string array', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeStringArray, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const inn = inner['$nin'];
        expect(inn).not.toBeNull();

        const values = inn;
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual(value);
    });

    it('should return expression when field type is number array', () => {
        // Arrange
        const value = 100;

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeNumberArray, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const inn = inner['$nin'];
        expect(inn).not.toBeNull();

        const values = inn;
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual(value);
    });

    it('should return expression when field type is boolean array', () => {
        // Arrange
        const value = true;

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeBooleanArray, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const inn = inner['$nin'];
        expect(inn).not.toBeNull();

        const values = inn;
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual(value);
    });

    it('should return expression when field type is date array', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDateArray, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const inn = inner['$nin'];
        expect(inn).not.toBeNull();

        const values = inn;
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual(value);
    });

    it('should return expression when field type is time array', () => {
        // Arrange
        const value = 60;

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeTimeArray, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const inn = inner['$nin'];
        expect(inn).not.toBeNull();

        const values = inn;
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual(value);
    });

    it('should return expression when field type is datetime array', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const field = expression?.condition["Value"];
        expect(field).not.toBeNull();

        const inner = field;
        expect(inner).not.toBeNull();

        const inn = inner['$nin'];
        expect(inn).not.toBeNull();

        const values = inn;
        expect(values).toHaveLength(1);
        expect(values[0]).toEqual(value);
    });

    it('should return null when field type is number', () => {
        // Arrange
        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeNumber, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange
        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeBoolean, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange
        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDate, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange
        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange
        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDateTime, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
