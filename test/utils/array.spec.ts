import {isInAny} from "../../src/utils";

describe('array', () => {
    it('should return false when sources do not contain the item', () => {
        // Act & Assert
        expect(isInAny('test', ['test1'], ['test2'])).toBe(false);
        expect(isInAny(100, [90], [110])).toBe(false);
        expect(isInAny(true, [false])).toBe(false);
    });

    it('should return true when sources contain the item', () => {
        // Act & Assert
        expect(isInAny('test', ['test'], ['test2'], ['test3'])).toBe(true);
        expect(isInAny(100, [90], [100, 110])).toBe(true);
        expect(isInAny(true, [false], [true, false])).toBe(true);
    });
});
