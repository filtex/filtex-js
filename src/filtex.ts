import {Metadata, Lookup, Field} from "./models";
import {Option, FieldOption, LookupOption} from "./options";

export class Filtex {
    private constructor(private _metadata: Metadata) {
    }

    public static new(...options: Option[]): Filtex {
        const lookups = new Map<string, Lookup[]>();

        options.filter(x => x instanceof LookupOption).forEach(x => {
            const build = (<LookupOption>x).build();
            build.forEach((value, key) => {
                lookups.set(key, value);
            });
        });

        const fields: Field[] = [];

        options.filter(x => x instanceof FieldOption).forEach(x => {
            const build = (<FieldOption>x).build(lookups);
            fields.push(build);
        });

        return new Filtex(new Metadata(fields));
    }

    public metadata(): Metadata {
        return this._metadata;
    }
}
