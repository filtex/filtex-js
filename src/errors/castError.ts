const errCouldNotBeCasted = "could not be casted";

const newCouldNotBeCastedError = (): Error => {
    return new Error(errCouldNotBeCasted);
}

export {
    newCouldNotBeCastedError,
}
