const errCouldNotBeBuilt = "could not be built";

const newCouldNotBeBuiltError = (): Error => {
    return new Error(errCouldNotBeBuilt);
}

export {
    newCouldNotBeBuiltError,
}
