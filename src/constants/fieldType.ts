export class FieldType {
    public static readonly FieldTypeUnknown = new FieldType('unknown');
    public static readonly FieldTypeString = new FieldType('string');
    public static readonly FieldTypeNumber = new FieldType('number');
    public static readonly FieldTypeBoolean = new FieldType('boolean');
    public static readonly FieldTypeDate = new FieldType('date');
    public static readonly FieldTypeTime = new FieldType('time');
    public static readonly FieldTypeDateTime = new FieldType('datetime');
    public static readonly FieldTypeStringArray = new FieldType('string-array');
    public static readonly FieldTypeNumberArray = new FieldType('number-array');
    public static readonly FieldTypeBooleanArray = new FieldType('boolean-array');
    public static readonly FieldTypeDateArray = new FieldType('date-array');
    public static readonly FieldTypeTimeArray = new FieldType('time-array');
    public static readonly FieldTypeDateTimeArray = new FieldType('datetime-array');

    constructor(public name: string) {
    }

    public static parseFieldType(type: string): FieldType {
        const map = {
            [this.FieldTypeString.name]: this.FieldTypeString,
            [this.FieldTypeNumber.name]: this.FieldTypeNumber,
            [this.FieldTypeBoolean.name]: this.FieldTypeBoolean,
            [this.FieldTypeDate.name]: this.FieldTypeDate,
            [this.FieldTypeTime.name]: this.FieldTypeTime,
            [this.FieldTypeDateTime.name]: this.FieldTypeDateTime,
            [this.FieldTypeStringArray.name]: this.FieldTypeStringArray,
            [this.FieldTypeNumberArray.name]: this.FieldTypeNumberArray,
            [this.FieldTypeBooleanArray.name]: this.FieldTypeBooleanArray,
            [this.FieldTypeDateArray.name]: this.FieldTypeDateArray,
            [this.FieldTypeTimeArray.name]: this.FieldTypeTimeArray,
            [this.FieldTypeDateTimeArray.name]: this.FieldTypeDateTimeArray
        };

        return map[type] ?? this.FieldTypeUnknown;
    }

    public isArray(): boolean {
        return this.name === FieldType.FieldTypeStringArray.name ||
            this.name === FieldType.FieldTypeNumberArray.name ||
            this.name === FieldType.FieldTypeBooleanArray.name ||
            this.name === FieldType.FieldTypeDateArray.name ||
            this.name === FieldType.FieldTypeTimeArray.name ||
            this.name === FieldType.FieldTypeDateTimeArray.name;
    }
}
