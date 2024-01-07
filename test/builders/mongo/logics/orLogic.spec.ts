import {OrLogic} from "../../../../src/builders/mongo/logics/orLogic";
import {EqualOperator} from "../../../../src/builders/mongo/operators/equalOperator";
import {FieldType} from "../../../../src/constants";
import {MongoExpression} from "../../../../src/builders/mongo/types/mongoExpression";

describe('orLogic', () => {
    it('should return expression when there are expressions', () => {
        // Arrange
        // Act
        const exp = OrLogic.build([
            EqualOperator.build(FieldType.FieldTypeString, "Value", "Filtex") || new MongoExpression({}),
        ]);

        // Assert
        expect(exp).not.toBeNull();

        const value = exp?.condition["$or"];
        expect(value).not.toBeNull();
        expect(value).toHaveLength(1);
    });
});
