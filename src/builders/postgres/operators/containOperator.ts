import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class ContainOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType.isArray()) {
            if (fieldType === FieldType.FieldTypeStringArray) {
                return new PostgresExpression(`LOWER($${index}) = ANY (LOWER(${field}::TEXT)::TEXT[])`, [value]);
            }

            return new PostgresExpression(`$${index} = ANY (${field})`, [value]);
        }

        if (fieldType == FieldType.FieldTypeString) {
            return new PostgresExpression(`${field} ILIKE '%' || $${index} || '%'`, [value]);
        }

        return null;
    }
}
