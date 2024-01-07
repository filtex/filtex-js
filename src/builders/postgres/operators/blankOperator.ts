import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";

export class BlankOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType.isArray()) {
            return new PostgresExpression(`ARRAY_LENGTH(${field}, 1) = 0`, []);
        }

        if (fieldType == FieldType.FieldTypeString) {
            return new PostgresExpression(`${field} IS NULL OR ${field} = ''`, []);
        }

        return null;
    }
}
