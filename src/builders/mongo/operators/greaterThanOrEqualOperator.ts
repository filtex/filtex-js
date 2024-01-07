import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class GreaterThanOrEqualOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType != FieldType.FieldTypeNumber &&
            fieldType != FieldType.FieldTypeDate &&
            fieldType != FieldType.FieldTypeTime &&
            fieldType != FieldType.FieldTypeDateTime) {
            return null;
        }

        return new MongoExpression({
            [field]: {
                "$gte": value,
            }
        });
    }
}
