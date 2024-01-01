const errCouldNotBeTokenized = "could not be tokenized";

const newCouldNotBeTokenizedError = (): Error => {
    return new Error(errCouldNotBeTokenized);
}

export {
    newCouldNotBeTokenizedError,
}
