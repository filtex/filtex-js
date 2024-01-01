import {Lookup} from "./lookup";

export class Field {
    constructor(
        public name: string,
        public type: string,
        public label: string,
        public operators: string[],
        public values: Lookup[]) {
    }
}
