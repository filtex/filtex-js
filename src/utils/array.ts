export function isInAny(item: any, ...sources: any[][]): boolean {
    if (!item) {
        return false;
    }

    for (const source of sources) {
        if (source.indexOf(item) !== -1) {
            return true;
        }
    }

    return false;
}
