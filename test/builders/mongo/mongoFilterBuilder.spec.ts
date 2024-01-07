import {MongoFilterBuilder} from "../../../src/builders/mongo/mongoFilterBuilder";
import {FieldType, Logic, Operator} from "../../../src/constants";
import {OperatorExpression} from "../../../src/expressions/operatorExpression";
import {LogicExpression} from "../../../src/expressions/logicExpression";

describe('mongoFilterBuilder', () => {
    it('should return error when expression is null', () => {
        // Arrange
        const builder = new MongoFilterBuilder();

        // Assert
        expect(() => {
            // Act
            const expression = builder.build({});

            // Assert
            expect(expression).toBeNull();
        }).toThrow(Error);
    });

    it('should return error when expression is logic expression and not a valid logic', () => {
        // Arrange
        const builder = new MongoFilterBuilder();
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

    it('should return expression when expression is logic expression and valid', () => {
        // Arrange
        const builder = new MongoFilterBuilder();
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
    });

    it('should return error when expression is operator expression and not a valid operator', () => {
        // Arrange
        const builder = new MongoFilterBuilder();
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

    it('should return expression when expression is operator expression and valid', () => {
        // Arrange
        const builder = new MongoFilterBuilder();
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
    });
});
