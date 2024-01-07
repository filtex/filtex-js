import {FieldType} from "../../../constants";
import {MemoryExpression} from "../types/memoryExpression";
import {checkEquality} from "../utils/memoryUtil";

export class EqualOperator {
    static build(fieldType: FieldType, field: string, value: any): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            if (fieldType.isArray() || data[field] === null || value === null) {
                return false;
            }

            return checkEquality(fieldType, data[field], value);
        });
    }
}
