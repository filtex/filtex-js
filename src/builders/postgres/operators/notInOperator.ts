import {PostgresExpression} from "../types/postgresExpression";
import {FieldType} from "../../../constants";
import {isArray} from "../../../utils";

export class NotInOperator {
    static build(fieldType: FieldType, field: string, value: any, index: number): PostgresExpression | null {
        if (fieldType.isArray() || value === null) {
            return null;
        }

        if (!isArray(value)) {
            if (fieldType === FieldType.FieldTypeString) {
                return new PostgresExpression(`LOWER(${field}) NOT IN (LOWER($${index}))`, [value]);
            } else {
                return new PostgresExpression(`${field} NOT IN ($${index})`, [value]);
            }
        }

        if (fieldType === FieldType.FieldTypeString) {
            const indexes = [];
            for (let i = index; i < index + value.length; i++) {
                indexes.push(`LOWER($${i})`);
            }
            return new PostgresExpression(`LOWER(${field}) NOT IN (${indexes.join(",")})`, value);
        } else {
            const indexes = [];
            for (let i = index; i < index + value.length; i++) {
                indexes.push(`$${i}`);
            }
            return new PostgresExpression(`${field} NOT IN (${indexes.join(",")})`, value);
        }
    }
}
