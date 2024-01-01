import {TokenType} from "./tokenType";

export class Logic {
    public static readonly LogicUnknown = new Logic('');
    public static readonly LogicAnd = new Logic('and');
    public static readonly LogicOr = new Logic('or');

    constructor(public name: string) {
    }

    public static parseLogic(str: string): Logic {
        str = str?.toLowerCase();

        if (str == this.LogicAnd.name) {
            return this.LogicAnd;
        }

        if (str == this.LogicOr.name) {
            return this.LogicOr;
        }

        return this.LogicUnknown;
    }

    public toTokenType(): TokenType {
        switch (this.name) {
            case Logic.LogicAnd.name:
                return TokenType.TokenTypeAnd;
            case Logic.LogicOr.name:
                return TokenType.TokenTypeOr;
        }
        return TokenType.TokenTypeNone;
    }
}
