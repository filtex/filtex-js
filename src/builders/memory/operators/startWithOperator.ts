import {FieldType} from "../../../constants";
import {MemoryExpression} from "../types/memoryExpression";

export class StartWithOperator {
    static build(fieldType: FieldType, field: string, value: any): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            if (data[field] == null) {
                return false;
            }

            if (fieldType == FieldType.FieldTypeString) {
                return data[field].toString().toLowerCase().startsWith(value.toString().toLowerCase());
            }

            return false;
        });
    }
}
