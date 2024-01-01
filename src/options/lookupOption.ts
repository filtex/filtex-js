import {Option} from "./option";
import {Lookup} from "../models";
import {newInvalidLookupKeyError, newInvalidLookupValuesError} from "../errors";

export class LookupOption implements Option {
    _key: string | undefined;
    _values: Lookup[] | undefined;

    private constructor() {
    }

    public static new(): LookupOption {
        return new LookupOption();
    }

    public key(key: string): LookupOption {
        this._key = key;
        return this;
    }

    public values(values: Lookup[]): LookupOption {
        this._values = values;
        return this;
    }

    public build(): Map<string, Lookup[]> {
        if (!this._key) {
            throw newInvalidLookupKeyError();
        }

        if (!this._values || this._values.length === 0) {
            throw newInvalidLookupValuesError();
        }

        const result = new Map<string, Lookup[]>();
        result.set(this._key, this._values);
        return result;
    }
}
