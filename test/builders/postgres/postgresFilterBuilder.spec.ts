import {PostgresFilterBuilder} from "../../../src/builders/postgres/postgresFilterBuilder";
import {FieldType, Logic, Operator} from "../../../src/constants";
import {OperatorExpression} from "../../../src/expressions/operatorExpression";
import {LogicExpression} from "../../../src/expressions/logicExpression";
import {PostgresExpression} from "../../../src/builders/postgres/types/postgresExpression";

describe('PostgresFilterBuilderTests', () => {
    it('Build should return error when expression is nil', () => {
        // Arrange
        const builder = new PostgresFilterBuilder();

        // Assert
        expect(() => {
            // Act
            const expression = builder.build({});

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('Build should return error when expression is LogicExpression and not a valid logic', () => {
        // Arrange
        const builder = new PostgresFilterBuilder();
        const logicExpression: LogicExpression = {
            logic: Logic.LogicUnknown,
            expressions: [],
        };

        // Assert
        expect(() => {
            // Act
            const expression = builder.build(logicExpression);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('Build should return expression when expression is LogicExpression and valid', () => {
        // Arrange
        const builder = new PostgresFilterBuilder();
        const logicExpression: LogicExpression = {
            logic: Logic.LogicAnd,
            expressions: [
                {
                    type: FieldType.FieldTypeString,
                    field: 'Value',
                    operator: Operator.OperatorEqual,
                    value: 'Filtex',
                },
            ],
        };

        // Act
        const expression = builder.build(logicExpression);

        // Assert
        expect(expression).not.toBeNull();
        expect(expression).toBeInstanceOf(PostgresExpression);
    });

    it('Build should return error when expression is OperatorExpression and not a valid operator', () => {
        // Arrange
        const builder = new PostgresFilterBuilder();
        const operatorExpression: OperatorExpression = {
            type: FieldType.FieldTypeString,
            field: 'Value',
            operator: Operator.OperatorUnknown,
            value: 'Filtex',
        };

        // Assert
        expect(() => {
            // Act
            const expression = builder.build(operatorExpression);

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('Build should return expression when expression is OperatorExpression and valid', () => {
        // Arrange
        const builder = new PostgresFilterBuilder();
        const operatorExpression: OperatorExpression = {
            type: FieldType.FieldTypeString,
            field: 'Value',
            operator: Operator.OperatorEqual,
            value: 'Filtex',
        };

        // Act
        const expression = builder.build(operatorExpression);

        // Assert
        expect(expression).not.toBeNull();
        expect(expression).toBeInstanceOf(PostgresExpression);
    });
});
