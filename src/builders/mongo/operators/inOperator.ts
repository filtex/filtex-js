import {FieldType} from "../../../constants";
import {MongoExpression} from "../types/mongoExpression";
import {isArray} from "../../../utils";

export class InOperator {
    static build(fieldType: FieldType, field: string, value: any): MongoExpression | null {
        if (fieldType.isArray() || value === null) {
            return null;
        }

        if (!isArray(value)) {
            return new MongoExpression({
                [field]: {
                    "$in": [value],
                }
            });
        }

        return new MongoExpression({
            [field]: {
                "$in": value,
            }
        });
    }
}
