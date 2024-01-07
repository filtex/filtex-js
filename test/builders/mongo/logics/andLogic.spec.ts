import {AndLogic} from "../../../../src/builders/mongo/logics/andLogic";
import {EqualOperator} from "../../../../src/builders/mongo/operators/equalOperator";
import {FieldType} from "../../../../src/constants";
import {MongoExpression} from "../../../../src/builders/mongo/types/mongoExpression";

describe('andLogic', () => {
    it('should return expression when there are expressions', () => {
        // Arrange
        // Act
        const exp = AndLogic.build([
            EqualOperator.build(FieldType.FieldTypeString, "Value", "Filtex") || new MongoExpression({}),
        ]);

        // Assert
        expect(exp).not.toBeNull();

        const value = exp?.condition["$and"];
        expect(value).not.toBeNull();
        expect(value).toHaveLength(1);
    });
});
