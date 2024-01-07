import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class NotContainOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType.isArray()) {
            return new MongoExpression({
                [field]: {
                    "$nin": [value]
                }
            });
        }

        if (fieldType == FieldType.FieldTypeString) {
            return new MongoExpression({
                [field]: {
                    "$regex": `^((?!${value}).)*$`,
                    "$options": "i",
                }
            });
        }

        return null;
    }
}
