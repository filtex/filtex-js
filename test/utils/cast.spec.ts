import {
    array,
    boolean,
    dateTime,
    isArray,
    isBoolean,
    isDateTime,
    isNumber,
    isString,
    isTime,
    number,
    string,
    time
} from "../../src/utils";

describe('cast', () => {
    it('isArray should return false when input is not an array', () => {
        expect(isArray("test")).toBeFalsy();
        expect(isArray(100)).toBeFalsy();
        expect(isArray(true)).toBeFalsy();
        expect(isArray(new Date())).toBeFalsy();
        expect(isArray(new Date(1000))).toBeFalsy();
        expect(isArray({})).toBeFalsy();
        expect(isArray(new Map<string, any>())).toBeFalsy();
    });

    it('isArray should return true when input is an array', () => {
        expect(isArray([])).toBeTruthy();
        expect(isArray([1, 2, 3])).toBeTruthy();
        expect(isArray([true, false])).toBeTruthy();
        expect(isArray([new Date(), new Date()])).toBeTruthy();
        expect(isArray([new Date(1000), new Date(2000)])).toBeTruthy();
    });

    it('array should return an error when input is not valid', () => {
        expect(() => {
            array("test");
        }).toThrow();
    });

    it('array should return an array when input is valid', () => {
        const data = ["test1", "test2"];
        const result = array(data);
        expect(result).not.toBeNull();
        expect(result.length).toEqual(2);
        expect(result[0]).toEqual("test1");
        expect(result[1]).toEqual("test2");
    });

    it('isString should return false when input type is not supported', () => {
        const sampleMap = [
            {},
        ];

        for (const input of sampleMap) {
            const result = isString(input);
            expect(result).toBeFalsy();
        }
    });

    it('isString should return true when input type is supported', () => {
        const sampleMap: any[] = [
            Number(100),
            Number(100),
            Number(100),
            Number(100),
            Number(100),
            Number(100),
            Number(100),
            Number(100),
            true,
            "test",
            new Date(),
            new Date(1000),
            null,
        ];

        for (const input of sampleMap) {
            const result = isString(input);
            expect(result).toBeTruthy();
        }
    });

    it('string should return an error when input type is not supported', () => {
        const sampleMap = [
            {},
        ];

        for (const input of sampleMap) {
            expect(() => {
                string(input);
            }).toThrow();
        }
    });

    it('string should return value as a string when input type is supported', () => {
        const now = new Date();
        const sampleMap: { input: any, output: string }[] = [
            {input: 100, output: "100"},
            {input: 10, output: "10"},
            {input: true, output: "true"},
            {input: "test", output: "test"},
            {input: now, output: now.toString()},
            {input: new Date(1000), output: new Date(1000).toString()},
            {input: null, output: ""},
        ];

        for (const {input, output} of sampleMap) {
            const result = string(input);
            expect(result).not.toBeNull();
            expect(result).toEqual(output);
        }
    });

    it('isNumber should return false when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            new Date(),
            "10:12:11",
            "1H",
            "1H30M",
        ];

        for (const input of sampleMap) {
            const result = isNumber(input);
            expect(result).toBeFalsy();
        }
    });

    it('isNumber should return true when input type is supported', () => {
        const sampleMap: any[] = [
            100,
            true,
            false,
            "123"
        ];

        for (const input of sampleMap) {
            const result = isNumber(input);
            expect(result).toBeTruthy();
        }
    });

    it('number should return an error when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            new Date(),
            "10:12:11",
            "1H",
            "1H30M",
        ];

        for (const input of sampleMap) {
            expect(() => {
                number(input);
            }).toThrow();
        }
    });

    it('number should return value as a number when input type is supported', () => {
        const sampleMap: { input: any, output: number }[] = [
            {input: Number(100), output: 100},
            {input: Number(10), output: 10},
            {input: Number(100), output: 100},
            {input: Number(100), output: 100},
            {input: Number(100), output: 100},
            {input: Number(10), output: 10},
            {input: Number(100), output: 100},
            {input: true, output: 1},
            {input: false, output: 0},
            {input: "123", output: 123},
        ];

        for (const {input, output} of sampleMap) {
            const result = number(input);
            expect(result).not.toBeNull();
            expect(result).toEqual(output);
        }
    });

    it('isBoolean should return false when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            new Date(),
            "10:12:11",
            "1H",
            "1H30M",
        ];

        for (const input of sampleMap) {
            const result = isBoolean(input);
            expect(result).toBeFalsy();
        }
    });

    it('isBoolean should return true when input type is supported', () => {
        const sampleMap: any[] = [
            true,
            false,
            "true",
            "false",
            "True",
            "False",
            "TRUE",
            "FALSE",
            1,
            0,
        ];

        for (const input of sampleMap) {
            const result = isBoolean(input);
            expect(result).toBeTruthy();
        }
    });

    it('should return an error when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            new Date(),
            "10:12:11",
            "1H",
            "1H30M",
        ];

        for (const input of sampleMap) {
            expect(() => {
                boolean(input);
            }).toThrow();
        }
    });

    it('boolean should return value as a boolean when input type is supported', () => {
        const sampleMap: { input: any, output: boolean }[] = [
            {input: true, output: true},
            {input: false, output: false},
            {input: "true", output: true},
            {input: "false", output: false},
            {input: "True", output: true},
            {input: "False", output: false},
            {input: "TRUE", output: true},
            {input: "FALSE", output: false},
            {input: 1, output: true},
            {input: 0, output: false},
        ];

        for (const {input, output} of sampleMap) {
            const result = boolean(input);
            expect(result).not.toBeNull();
            expect(result).toEqual(output);
        }
    });

    it('isDateTime should return false when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            "10:12:11",
            "1H",
            "1H30M",
            123,
            true,
            false,
        ];

        for (const input of sampleMap) {
            const result = isDateTime(input);
            expect(result).toBeFalsy();
        }
    });

    it('isDateTime should return true when input type is supported', () => {
        const sampleMap: any[] = [
            new Date(),
            new Date(),
            "2020-01-01",
            "2020-01-01 10:12:14",
            "2020-01-01 10:12:14.899",
            "2020-01-01T00:00:00Z",
        ];

        for (const input of sampleMap) {
            const result = isDateTime(input);
            expect(result).toBeTruthy();
        }
    });

    it('dateTime should return an error when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            "10:12:11",
            "1H",
            "1H30M",
            123,
            true,
            false,
        ];

        for (const input of sampleMap) {
            expect(() => {
                dateTime(input);
            }).toThrow();
        }
    });

    it('dateTime should return value as a DateTime when input type is supported', () => {
        const sampleMap: { input: any, output: Date }[] = [
            {input: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0)), output: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0))},
            {
                input: new Date(Date.UTC(2020, 0, 1, 10, 12, 32, 800)),
                output: new Date(Date.UTC(2020, 0, 1, 10, 12, 32, 0))
            },
            {input: "2020-01-01", output: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0))},
            {input: "2020-01-01 10:12:14", output: new Date(Date.UTC(2020, 0, 1, 10, 12, 14, 0))},
            {input: "2020-01-01 10:12:14.899", output: new Date(Date.UTC(2020, 0, 1, 10, 12, 14, 0))},
            {input: "2020-01-01T00:00:00Z", output: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0))},
        ];

        for (const {input, output} of sampleMap) {
            const result = dateTime(input);
            expect(result).not.toBeNull();
            expect(result).toEqual(output);
        }
    });

    it('isTime should return false when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            new Date(),
            true,
            false,
        ];

        for (const input of sampleMap) {
            const result = isTime(input);
            expect(result).toBeFalsy();
        }
    });

    it('isTime should return true when input type is supported', () => {
        const sampleMap: any[] = [
            "1h30m",
        ];

        for (const input of sampleMap) {
            const result = isTime(input);
            expect(result).toBeTruthy();
        }
    });

    it('time should return an error when input type is not supported', () => {
        const sampleMap = [
            {},
            "TEST",
            new Date(),
            true,
            false,
        ];

        for (const input of sampleMap) {
            expect(() => {
                time(input);
            }).toThrow();
        }
    });

    it('time should return value as a time span when input type is supported', () => {
        const sampleMap: { input: any, output: number }[] = [
            {input: "1h30m", output: 60 * 60 + 30 * 60},
        ];

        for (const {input, output} of sampleMap) {
            const result = time(input);
            expect(result).not.toBeNull();
            expect(result).toEqual(output);
        }
    });
});
