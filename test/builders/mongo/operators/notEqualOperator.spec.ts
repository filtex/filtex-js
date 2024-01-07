import {NotEqualOperator} from "../../../../src/builders/mongo/operators/notEqualOperator";
import {FieldType} from "../../../../src/constants";

describe('notEqualOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeString, 'Value', value);

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
        expect(regex).toEqual("^" + value + "$");

        const options = notInner['$options'];
        expect(options).not.toBeNull();
        expect(options).toEqual('i');
    });

    it('should return expression when field type is number', () => {
        // Arrange
        const value = 100;

        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeNumber, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const ne = inner['$ne'];
        expect(ne).not.toBeNull();
        expect(value).toEqual(ne);
    });

    it('should return expression when field type is boolean', () => {
        // Arrange
        const value = true;

        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeBoolean, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const ne = inner['$ne'];
        expect(ne).not.toBeNull();
        expect(value).toEqual(ne);
    });

    it('should return expression when field type is date', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeDate, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const ne = inner['$ne'];
        expect(ne).not.toBeNull();
        expect(value).toEqual(ne);
    });

    it('should return expression when field type is time', () => {
        // Arrange
        const value = 60;

        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const ne = inner['$ne'];
        expect(ne).not.toBeNull();
        expect(value).toEqual(ne);
    });

    it('should return expression when field type is datetime', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateTime, 'Value', value);

        // Assert
        expect(expression).not.toBeNull();

        const valueInner = expression?.condition["Value"];
        expect(valueInner).not.toBeNull();

        const inner = valueInner;
        expect(inner).not.toBeNull();

        const ne = inner['$ne'];
        expect(ne).not.toBeNull();
        expect(value).toEqual(ne);
    });

    it('should return null when field type is string array', () => {
        // Arrange
        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeStringArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is number array', () => {
        // Arrange
        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeNumberArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean array', () => {
        // Arrange
        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeBooleanArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date array', () => {
        // Arrange
        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time array', () => {
        // Arrange
        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime array', () => {
        // Arrange
        // Act
        const expression = NotEqualOperator.build(FieldType.FieldTypeDateTimeArray, "Value", null);

        // Assert
        expect(expression).toBeNull();
    });
});
