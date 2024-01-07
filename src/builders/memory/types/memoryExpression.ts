export class MemoryExpression {
    constructor(
        public fn: (data: { [key: string]: any }) => boolean
    ) { }
}
