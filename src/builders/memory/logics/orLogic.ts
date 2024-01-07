import {MemoryExpression} from "../types/memoryExpression";

export class OrLogic {
    static build(expressions: MemoryExpression[]): MemoryExpression {
        return new MemoryExpression(function (data: { [key: string]: any }): boolean {
            for (let v of expressions) {
                if (v.fn(data)) {
                    return true;
                }
            }
            return false;
        });
    }
}
