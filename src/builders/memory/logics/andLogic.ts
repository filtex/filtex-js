import {MemoryExpression} from "../types/memoryExpression";

export class AndLogic {
    static build(expressions: MemoryExpression[]): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            for (let v of expressions) {
                if (!v.fn(data)) {
                    return false;
                }
            }
            return true;
        });
    }
}
