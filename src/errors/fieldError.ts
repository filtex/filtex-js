const errInvalidFieldType = "invalid type";
const errInvalidFieldName = "invalid name";
const errInvalidFieldLabel = "invalid label";

const newInvalidFieldTypeError = (): Error => {
    return new Error(errInvalidFieldType);
}

const newInvalidFieldNameError = (): Error => {
    return new Error(errInvalidFieldName);
}

const newInvalidFieldLabelError = (): Error => {
    return new Error(errInvalidFieldLabel);
}

export {
    newInvalidFieldTypeError,
    newInvalidFieldNameError,
    newInvalidFieldLabelError,
}
