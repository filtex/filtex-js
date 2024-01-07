import {MongoExpression} from "../types/mongoExpression";

export class AndLogic {
    static build(expressions: MongoExpression[]): MongoExpression | null {
        return new MongoExpression({
            "$and": expressions.map(e => e.condition),
        });
    }
}
