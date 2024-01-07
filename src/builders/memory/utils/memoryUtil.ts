import {FieldType} from "../../../constants";
import {boolean, date, dateTime, number, string, time} from "../../../utils";

const checkEquality = (fieldType: FieldType, fieldValue: any, value: any): boolean => {
    switch (fieldType) {
        case FieldType.FieldTypeString:
        case FieldType.FieldTypeStringArray:
            if (string(fieldValue).toLowerCase() === string(value).toLowerCase()) {
                return true;
            }
            break;
        case FieldType.FieldTypeNumber:
        case FieldType.FieldTypeNumberArray:
            if (number(fieldValue) === number(value)) {
                return true;
            }
            break;
        case FieldType.FieldTypeBoolean:
        case FieldType.FieldTypeBooleanArray:
            if (boolean(fieldValue) === boolean(value)) {
                return true;
            }
            break;
        case FieldType.FieldTypeDate:
        case FieldType.FieldTypeDateArray:
            if (date(fieldValue).getTime() === date(value).getTime()) {
                return true;
            }
            break;
        case FieldType.FieldTypeTime:
        case FieldType.FieldTypeTimeArray:
            if (time(fieldValue) === time(value)) {
                return true;
            }
            break;
        case FieldType.FieldTypeDateTime:
        case FieldType.FieldTypeDateTimeArray:
            if (dateTime(fieldValue).getTime() === dateTime(value).getTime()) {
                return true;
            }
    }

    return false;
}


export {
    checkEquality,
};
