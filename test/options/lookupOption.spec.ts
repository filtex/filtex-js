import {LookupOption} from "../../src/options";
import {Lookup} from "../../src/models";

describe('lookupOption', () => {
    it('new should return LookupOption', () => {
        // Act
        const opt = LookupOption.new();

        // Assert
        expect(opt).toBeDefined();
    });

    it('key should set key and return itself', () => {
        // Arrange
        const opt = LookupOption.new();

        // Act
        const result = opt.key('some_key');

        // Assert
        expect(result).toBeDefined();
        expect(result._key).toEqual('some_key');
        expect(result._values).toEqual(opt._values);
    });

    it('values should set values and return itself', () => {
        // Arrange
        const opt = LookupOption.new();

        const lookups: Lookup[] = [
            new Lookup('Enabled', true),
            new Lookup('Disabled', true),
        ];

        // Act
        const result = opt.values(lookups);

        // Assert
        expect(result).toBeDefined();
        expect(result._key).toEqual(opt._key);
        expect(result._values).toEqual(lookups);
    });

    it('build should return error when key is not defined', () => {
        // Arrange
        const opt = LookupOption.new().values([
            new Lookup('Enabled', true),
            new Lookup('Disabled', true),
        ]);

        // Act and Assert
        expect(() => {
            opt.build();
        }).toThrow(Error);
    });

    it('build should return error when values are not defined', () => {
        // Arrange
        const opt = LookupOption.new().key('some_key');

        // Act and Assert
        expect(() => {
            opt.build();
        }).toThrow(Error);
    });

    it('build should return lookup map when key and values are defined', () => {
        // Arrange
        const opt = LookupOption.new().key('some_key').values([
            new Lookup('Enabled', true),
            new Lookup('Disabled', true),
        ]);

        // Act
        const result = opt.build();

        // Assert
        expect(result).toBeDefined();
        expect(result.get("some_key")).toBeDefined();
        expect(result.get("some_key")).toHaveLength(2);
    });
});
