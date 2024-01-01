const errInvalidField = "invalid field";
const errInvalidOperator = "invalid operator";
const errInvalidValue = "invalid value";
const errInvalidLogic = "invalid logic";
const errInvalidToken = "invalid token";
const errInvalidLastToken = "invalid last token";
const errMismatchedBrackets = "mismatched brackets";
const errCouldNotBeValidated = "could not be validated";

const newInvalidFieldError = (): Error => {
    return new Error(errInvalidField);
}

const newInvalidOperatorError = (): Error => {
    return new Error(errInvalidOperator);
}

const newInvalidValueError = (): Error => {
    return new Error(errInvalidValue);
}

const newInvalidLogicError = (): Error => {
    return new Error(errInvalidLogic);
}

const newInvalidTokenError = (): Error => {
    return new Error(errInvalidToken);
}

const newInvalidLastTokenError = (): Error => {
    return new Error(errInvalidLastToken);
}

const newMismatchedBracketsError = (): Error => {
    return new Error(errMismatchedBrackets);
}

const newCouldNotBeValidatedError = (): Error => {
    return new Error(errCouldNotBeValidated);
}

export {
    newInvalidFieldError,
    newInvalidOperatorError,
    newInvalidValueError,
    newInvalidLogicError,
    newInvalidTokenError,
    newInvalidLastTokenError,
    newMismatchedBracketsError,
    newCouldNotBeValidatedError,
}
