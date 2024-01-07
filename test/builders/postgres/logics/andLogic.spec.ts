import {AndLogic} from "../../../../src/builders/postgres/logics/andLogic";
import {EqualOperator} from "../../../../src/builders/postgres/operators/equalOperator";
import {FieldType} from "../../../../src/constants";
import {PostgresExpression} from "../../../../src/builders/postgres/types/postgresExpression";

describe('andLogic', () => {
    it('should return expression when there are expressions', () => {
        // Arrange
        const value = 'Filtex';

        // Act
        const expression = AndLogic.build([
            EqualOperator.build(FieldType.FieldTypeString, 'Value', value, 0) || new PostgresExpression('', []),
        ]);

        // Assert
        expect(expression).not.toBeNull();
        if (expression) {
            expect(expression.condition).not.toBeNull();
            expect(expression.args.length).toBe(1);
            expect(expression.args[0]).toBe(value);
        }
    });
});
