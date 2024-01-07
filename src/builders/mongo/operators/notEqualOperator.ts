import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class NotEqualOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType.isArray()) {
            return null;
        }

        if (fieldType === FieldType.FieldTypeString) {
            return new MongoExpression({
                [field]: {
                    "$not": {
                        "$regex": `^${value}$`,
                        "$options": "i",
                    }
                }
            });
        }

        return new MongoExpression({
            [field]: {
                "$ne": value,
            }
        });
    }
}
