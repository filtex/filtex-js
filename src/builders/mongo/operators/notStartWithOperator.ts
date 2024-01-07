import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class NotStartWithOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType != FieldType.FieldTypeString) {
            return null;
        }

        return new MongoExpression({
            [field]: {
                "$not": {
                    "$regex": `^${value}`,
                    "$options": "i",
                }
            }
        });
    }
}
