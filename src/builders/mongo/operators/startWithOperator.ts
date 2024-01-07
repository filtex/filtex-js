import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class StartWithOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType != FieldType.FieldTypeString) {
            return null;
        }

        return new MongoExpression({
            [field]: {
                "$regex": `^${value}`,
                "$options": "i",
            }
        });
    }
}
