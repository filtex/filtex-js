import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class GreaterThanOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType != FieldType.FieldTypeNumber &&
            fieldType != FieldType.FieldTypeDate &&
            fieldType != FieldType.FieldTypeTime &&
            fieldType != FieldType.FieldTypeDateTime) {
            return null;
        }

        return new PostgresExpression(`${field} > $${index}`, [value]);
    }
}
