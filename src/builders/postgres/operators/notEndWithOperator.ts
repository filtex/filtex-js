import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class NotEndWithOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType != FieldType.FieldTypeString) {
            return null;
        }

        return new PostgresExpression(`${field} NOT ILIKE '%' || $${index}`, [value]);
    }
}
