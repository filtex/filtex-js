import {FieldType} from "../../../constants";
import {MemoryExpression} from "../types/memoryExpression";
import {date, dateTime, number, time} from "../../../utils";

export class GreaterThanOrEqualOperator {
    static build(fieldType: FieldType, field: string, value: any): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            if (data[field] == null) {
                return false;
            }

            if (fieldType === FieldType.FieldTypeNumber) {
                return number(data[field]) >= number(value);
            }

            if (fieldType === FieldType.FieldTypeDate) {
                return date(data[field]) >= date(value);
            }

            if (fieldType === FieldType.FieldTypeTime) {
                return time(data[field]) >= time(value);
            }

            if (fieldType === FieldType.FieldTypeDateTime) {
                return dateTime(data[field]) >= dateTime(value);
            }

            return false;
        });
    }
}
