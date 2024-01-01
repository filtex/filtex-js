export class Operator {
    public static readonly OperatorUnknown = new Operator('', '');
    public static readonly OperatorEqual = new Operator('equal', 'Equal');
    public static readonly OperatorNotEqual = new Operator('not-equal', 'Not Equal');
    public static readonly OperatorContain = new Operator('contain', 'Contain');
    public static readonly OperatorNotContain = new Operator('not-contain', 'Not Contain');
    public static readonly OperatorStartWith = new Operator('start-with', 'Start With');
    public static readonly OperatorNotStartWith = new Operator('not-start-with', 'Not Start With');
    public static readonly OperatorEndWith = new Operator('end-with', 'End With');
    public static readonly OperatorNotEndWith = new Operator('not-end-with', 'Not End With');
    public static readonly OperatorBlank = new Operator('blank', 'Blank');
    public static readonly OperatorNotBlank = new Operator('not-blank', 'Not Blank');
    public static readonly OperatorGreaterThan = new Operator('greater-than', 'Greater Than');
    public static readonly OperatorGreaterThanOrEqual = new Operator('greater-than-or-equal', 'Greater Than Or Equal');
    public static readonly OperatorLessThan = new Operator('less-than', 'Less Than');
    public static readonly OperatorLessThanOrEqual = new Operator('less-than-or-equal', 'Less Than Or Equal');
    public static readonly OperatorIn = new Operator('in', 'In');
    public static readonly OperatorNotIn = new Operator('not-in', 'Not In');

    constructor(
        public name: string,
        public label: string) {
    }

    public static parseOperator(str: string): Operator {
        const list = [
            this.OperatorEqual,
            this.OperatorNotEqual,
            this.OperatorContain,
            this.OperatorNotContain,
            this.OperatorStartWith,
            this.OperatorNotStartWith,
            this.OperatorEndWith,
            this.OperatorNotEndWith,
            this.OperatorBlank,
            this.OperatorNotBlank,
            this.OperatorGreaterThan,
            this.OperatorGreaterThanOrEqual,
            this.OperatorLessThan,
            this.OperatorLessThanOrEqual,
            this.OperatorIn,
            this.OperatorNotIn
        ];

        for (let item of list) {
            if (item.equals(str)) {
                return item;
            }
        }

        return this.OperatorUnknown;
    }

    public toString(): string {
        return this.name;
    }

    public equals(str: string): boolean {
        if (!str) {
            return false;
        }

        return str.toLowerCase() === this.name.toLowerCase() ||
            str.toLowerCase() === this.label.toLowerCase();
    }
}
