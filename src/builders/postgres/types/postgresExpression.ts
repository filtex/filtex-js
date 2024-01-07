export class PostgresExpression {
    constructor(
        public condition: string,
        public args: any[]
    ) { }
}
