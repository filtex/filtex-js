const errInvalidLookupKey = "invalid field key";
const errInvalidLookupValues = "invalid field values";

const newInvalidLookupKeyError = (): Error => {
    return new Error(errInvalidLookupKey);
}

const newInvalidLookupValuesError = (): Error => {
    return new Error(errInvalidLookupValues);
}

export {
    newInvalidLookupKeyError,
    newInvalidLookupValuesError,
}
