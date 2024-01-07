import {PostgresExpression} from "../types/postgresExpression";

export class OrLogic {
    static build(expressions: PostgresExpression[]): PostgresExpression | null {
        const conditions = [];
        const args = [];

        for (let v of expressions) {
            conditions.push(`(${v.condition})`);
            args.push(...v.args);
        }

        return new PostgresExpression(conditions.join(' OR '), args);
    }
}
