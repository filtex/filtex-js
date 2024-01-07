import {FieldType} from "../../../constants";
import {MemoryExpression} from "../types/memoryExpression";

export class BlankOperator {
    static build(fieldType: FieldType, field: string, value: any): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            if (fieldType.isArray()) {
                return data[field] == null || data[field].length === 0;
            }

            if (fieldType === FieldType.FieldTypeString) {
                return data[field] == null || data[field].toString().length === 0;
            }

            return false;
        });
    }
}
