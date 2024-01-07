import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class EqualOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType.isArray()) {
            return null;
        }

        if (fieldType === FieldType.FieldTypeString) {
            return new MongoExpression({
                [field]: {
                    "$regex": `^${value}$`,
                    "$options": "i",
                }
            });
        }

        return new MongoExpression({
            [field]: {
                "$eq": value,
            }
        });
    }
}
