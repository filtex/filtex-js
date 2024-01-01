import {Option} from "./option";
import {Operator, FieldType} from "../constants";
import {Field, Lookup} from "../models";
import {newInvalidFieldLabelError, newInvalidFieldNameError, newInvalidFieldTypeError} from "../errors";

export class FieldOption implements Option {
    _name: string | undefined;
    _label: string | undefined;
    _lookup: string | undefined;
    _fieldType: FieldType = FieldType.FieldTypeUnknown;
    _isArray: boolean = false;
    _isNullable: boolean = false;

    private constructor() {
    }

    public static new(): FieldOption {
        return new FieldOption();
    }

    public string(): FieldOption {
        this._fieldType = FieldType.FieldTypeString;
        return this;
    }

    public number(): FieldOption {
        this._fieldType = FieldType.FieldTypeNumber;
        return this;
    }

    public boolean(): FieldOption {
        this._fieldType = FieldType.FieldTypeBoolean;
        return this;
    }

    public date(): FieldOption {
        this._fieldType = FieldType.FieldTypeDate;
        return this;
    }

    public time(): FieldOption {
        this._fieldType = FieldType.FieldTypeTime;
        return this;
    }

    public datetime(): FieldOption {
        this._fieldType = FieldType.FieldTypeDateTime;
        return this;
    }

    public array(): FieldOption {
        this._isArray = true;
        return this;
    }

    public nullable(): FieldOption {
        this._isNullable = true;
        return this;
    }

    public name(name: string): FieldOption {
        this._name = name;
        return this;
    }

    public label(label: string): FieldOption {
        this._label = label;
        return this;
    }

    public lookup(lookup: string): FieldOption {
        this._lookup = lookup;
        return this;
    }

    public build(lookups: Map<string, Lookup[]>): Field {
        if (this._fieldType === FieldType.FieldTypeUnknown) {
            throw newInvalidFieldTypeError();
        }

        if (!this._name) {
            throw newInvalidFieldNameError();
        }

        if (!this._label) {
            throw newInvalidFieldLabelError();
        }

        let fieldType = this._fieldType;

        if (this._isArray) {
            if (fieldType == FieldType.FieldTypeString) {
                fieldType = FieldType.FieldTypeStringArray;
            } else if (fieldType == FieldType.FieldTypeNumber) {
                fieldType = FieldType.FieldTypeNumberArray;
            } else if (fieldType == FieldType.FieldTypeBoolean) {
                fieldType = FieldType.FieldTypeBooleanArray;
            } else if (fieldType == FieldType.FieldTypeDate) {
                fieldType = FieldType.FieldTypeDateArray;
            } else if (fieldType == FieldType.FieldTypeTime) {
                fieldType = FieldType.FieldTypeTimeArray;
            } else if (fieldType == FieldType.FieldTypeDateTime) {
                fieldType = FieldType.FieldTypeDateTimeArray;
            }
        }

        let fieldValues: Lookup[] = [];
        if (this._lookup) {
            fieldValues = lookups.get(this._lookup) || [];
        }

        const operators: Operator[] = [];

        if (!this._isArray) {
            operators.push(Operator.OperatorEqual);
            operators.push(Operator.OperatorNotEqual);
        }

        if ((fieldType === FieldType.FieldTypeNumber ||
            fieldType === FieldType.FieldTypeNumberArray ||
            fieldType === FieldType.FieldTypeDate ||
            fieldType === FieldType.FieldTypeDateArray ||
            fieldType === FieldType.FieldTypeTime ||
            fieldType === FieldType.FieldTypeTimeArray ||
            fieldType === FieldType.FieldTypeDateTime ||
            fieldType === FieldType.FieldTypeDateTimeArray) && fieldValues.length === 0) {
            operators.push(Operator.OperatorGreaterThan);
            operators.push(Operator.OperatorGreaterThanOrEqual);
            operators.push(Operator.OperatorLessThan);
            operators.push(Operator.OperatorLessThanOrEqual);
        }

        if (this._isArray || this._isNullable) {
            operators.push(Operator.OperatorBlank);
            operators.push(Operator.OperatorNotBlank);
        }

        if (this._isArray) {
            operators.push(Operator.OperatorContain);
            operators.push(Operator.OperatorNotContain);
        } else if (fieldType === FieldType.FieldTypeString && fieldValues.length === 0) {
            operators.push(Operator.OperatorContain);
            operators.push(Operator.OperatorNotContain);
            operators.push(Operator.OperatorStartWith);
            operators.push(Operator.OperatorNotStartWith);
            operators.push(Operator.OperatorEndWith);
            operators.push(Operator.OperatorNotEndWith);
        }

        if (!this._isArray) {
            operators.push(Operator.OperatorIn);
            operators.push(Operator.OperatorNotIn);
        }

        return new Field(this._name, fieldType.name, this._label, operators.map(x => x.name), fieldValues);
    }
}
