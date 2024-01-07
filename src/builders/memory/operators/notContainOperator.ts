import {FieldType} from "../../../constants";
import {MemoryExpression} from "../types/memoryExpression";
import {checkEquality} from "../utils/memoryUtil";

export class NotContainOperator {
    static build(fieldType: FieldType, field: string, value: any): MemoryExpression {
        if (fieldType.isArray()) {
            return new MemoryExpression(function (data: { [key: string]: any }): boolean {
                return !data[field]?.some((v: any) => checkEquality(fieldType, v, value)) || false;
            });
        }

        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            if (fieldType == FieldType.FieldTypeString) {
                return !data[field]?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase());
            }
            return false;
        });
    }
}
