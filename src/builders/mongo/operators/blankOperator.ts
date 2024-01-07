import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";

export class BlankOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType.isArray()) {
            return new MongoExpression({
                [`${field}.0`]: {
                    "$exists": false,
                }
            });
        }

        if (fieldType == FieldType.FieldTypeString) {
            return new MongoExpression({
                [field]: {
                    "$exists": true,
                    "$eq": "",
                }
            });
        }

        return null;
    }
}
