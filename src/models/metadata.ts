import {Field} from "./field";
import {FieldType} from "../constants";
import {Lookup} from "./lookup";

export class Metadata {
    constructor(public fields: Field[]) {
    }

    public getFieldType(str: string): FieldType {
        for (let item of this.fields) {
            if (item.label.toLowerCase() === str.toLowerCase() || item.name.toLowerCase() === str.toLowerCase()) {
                return FieldType.parseFieldType(item.type);
            }
        }
        return FieldType.FieldTypeUnknown;
    }

    public getFieldName(str: string): string {
        for (let item of this.fields) {
            if (item.label.toLowerCase() === str.toLowerCase() || item.name.toLowerCase() === str.toLowerCase()) {
                return item.name;
            }
        }
        return str;
    }

    public getFieldValues(str: string): Lookup[] {
        for (let item of this.fields) {
            if (item.label.toLowerCase() === str.toLowerCase() || item.name.toLowerCase() === str.toLowerCase()) {
                return item.values;
            }
        }
        return [];
    }
}
