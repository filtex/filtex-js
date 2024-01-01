import {Metadata, Lookup, Field} from "./models";
import {Expression} from "./expressions";
import {Option, FieldOption, LookupOption} from "./options";
import {JsonQueryParser, TextQueryParser} from "./parsers";
import {JsonQueryTokenizer, TextQueryTokenizer} from "./tokenizers";
import {JsonQueryValidator, TextQueryValidator} from "./validators";

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

    public expressionFromJson(jsonQuery: string): Expression {
        return new JsonQueryParser(this._metadata, new JsonQueryTokenizer(this._metadata)).parse(jsonQuery);
    }

    public expressionFromText(textQuery: string): Expression {
        return new TextQueryParser(this._metadata, new TextQueryTokenizer(this._metadata)).parse(textQuery);
    }

    public validateFromJson(jsonQuery: string) {
        new JsonQueryValidator(this._metadata, new JsonQueryTokenizer(this._metadata)).validate(jsonQuery);
    }

    public validateFromText(textQuery: string) {
        new TextQueryValidator(this._metadata, new TextQueryTokenizer(this._metadata)).validate(textQuery);
    }
}
