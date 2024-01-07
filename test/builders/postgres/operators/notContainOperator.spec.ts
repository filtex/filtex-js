import {NotContainOperator} from "../../../../src/builders/postgres/operators/notContainOperator";
import {FieldType} from "../../../../src/constants";

describe('notContainOperator', () => {
    it('should return expression when field type is string', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeString, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual("Value NOT ILIKE '%' || $1 || '%'");
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is string array', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeStringArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('NOT (LOWER($1) = ANY (LOWER(Value::TEXT)::TEXT[]))');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is number array', () => {
        // Arrange
        const value = 100.0;

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeNumberArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('NOT ($1 = ANY (Value))');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is boolean array', () => {
        // Arrange
        const value = true;

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeBooleanArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('NOT ($1 = ANY (Value))');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is date array', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDateArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('NOT ($1 = ANY (Value))');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is time array', () => {
        // Arrange
        const value = 1000;

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeTimeArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('NOT ($1 = ANY (Value))');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return expression when field type is datetime array', () => {
        // Arrange
        const value = new Date();

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDateTimeArray, 'Value', value, 1);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).toEqual('NOT ($1 = ANY (Value))');
            expect(expression.args).toHaveLength(1);
            expect(expression.args[0]).toEqual(value);
        }
    });

    it('should return null when field type is number', () => {
        // Arrange

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeNumber, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is boolean', () => {
        // Arrange

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeBoolean, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is date', () => {
        // Arrange

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDate, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is time', () => {
        // Arrange

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });

    it('should return null when field type is datetime', () => {
        // Arrange

        // Act
        const expression = NotContainOperator.build(FieldType.FieldTypeDateTime, 'Value', null, 0);

        // Assert
        expect(expression).toBeNull();
    });
});
