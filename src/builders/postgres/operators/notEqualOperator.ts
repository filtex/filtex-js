import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class NotEqualOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType.isArray()) {
            return null;
        }

        if (fieldType === FieldType.FieldTypeString) {
            return new PostgresExpression(`${field} NOT ILIKE $${index}`, [value]);
        }

        return new PostgresExpression(`${field} <> $${index}`, [value]);
    }
}
