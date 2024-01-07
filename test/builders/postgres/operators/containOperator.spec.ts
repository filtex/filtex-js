import {ContainOperator} from "../../../../src/builders/postgres/operators/containOperator";
import {FieldType} from "../../../../src/constants";

describe('containOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeString, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value ILIKE '%' || $1 || '%'");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is string array', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeStringArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('LOWER($1) = ANY (LOWER(Value::TEXT)::TEXT[])');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is number array', () => {
        // Arrange
        const value = 100.0;

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeNumberArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('$1 = ANY (Value)');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is boolean array', () => {
        // Arrange
        const value = true;

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeBooleanArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('$1 = ANY (Value)');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is date array', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeDateArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('$1 = ANY (Value)');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is time array', () => {
        // Arrange
        const value = 1000;

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeTimeArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('$1 = ANY (Value)');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is datetime array', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('$1 = ANY (Value)');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return null when field type is number', () => {
        // Arrange

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeNumber, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeBoolean, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeDate, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange

        // Act
        const expression = ContainOperator.build(FieldType.FieldTypeDateTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });
});
