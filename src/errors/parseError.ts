const errOperatorCouldNotBeParsed = "invalid operator";
const errLogicCouldNotBeParsed = "invalid logic";
const errCouldNotBeParsed = "could not be parsed";

const newOperatorCouldNotBeParsedError = (): Error => {
    return new Error(errOperatorCouldNotBeParsed);
}

const newLogicCouldNotBeParsedError = (): Error => {
    return new Error(errLogicCouldNotBeParsed);
}

const newCouldNotBeParsedError = (): Error => {
    return new Error(errCouldNotBeParsed);
}

export {
    newOperatorCouldNotBeParsedError,
    newLogicCouldNotBeParsedError,
    newCouldNotBeParsedError,
}
