import {MongoExpression} from "../types/mongoExpression";

export class OrLogic {
    static build(expressions: MongoExpression[]): MongoExpression | null {
        return new MongoExpression({
            "$or": expressions.map(e => e.condition),
        });
    }
}
