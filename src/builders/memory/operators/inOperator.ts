import {FieldType} from "../../../constants";
import {MemoryExpression} from "../types/memoryExpression";
import {array, isArray} from "../../../utils";
import {checkEquality} from "../utils/memoryUtil";

export class InOperator {
    static build(fieldType: FieldType, field: string, value: any): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            if (fieldType.isArray() || value === null) {
                return false;
            }

            if (!isArray(value)) {
                return checkEquality(fieldType, data[field], value);
            }

            return array(value).some((v: any) => checkEquality(fieldType, data[field], v));
        });
    }
}
