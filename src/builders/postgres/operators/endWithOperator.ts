import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class EndWithOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType != FieldType.FieldTypeString) {
            return null;
        }

        return new PostgresExpression(`${field} ILIKE '%' || $${index}`, [value]);
    }
}
