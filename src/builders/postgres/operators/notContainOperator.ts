import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class NotContainOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType.isArray()) {
            if (fieldType === FieldType.FieldTypeStringArray) {
                return new PostgresExpression(`NOT (LOWER($${index}) = ANY (LOWER(${field}::TEXT)::TEXT[]))`, [value]);
            }

            return new PostgresExpression(`NOT ($${index} = ANY (${field}))`, [value]);
        }

        if (fieldType == FieldType.FieldTypeString) {
            return new PostgresExpression(`${field} NOT ILIKE '%' || $${index} || '%'`, [value]);
        }

        return null;
    }
}
