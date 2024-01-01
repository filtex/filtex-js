import { newCouldNotBeCastedError } from "../errors";

const isArray = (value: any): boolean => {
    return Array.isArray(value);
};

const array = (value: any): any[] => {
    if (value === null || value === undefined) {
        return [];
    }

    if (Array.isArray(value)) {
        return Array.from(value);
    }

    throw newCouldNotBeCastedError();
};

const isString = (value: any): boolean => {
    try {
        string(value);
    } catch {
        return false;
    }

    return true;
};

const string = (value: any): string => {
    if (!value) {
        return '';
    }

    const type = value?.constructor;

    if (type !== String &&
        type !== Number &&
        type !== Boolean &&
        type !== Date
    ) {
        throw newCouldNotBeCastedError();
    }

    try {
        return String(value);
    } catch {
        throw newCouldNotBeCastedError();
    }
};

const isNumber = (value: any): boolean => {
    try {
        number(value);
    } catch {
        return false;
    }

    return true;
};

const number = (value: any): number => {
    try {
        const str = String(value).toLowerCase();

        if (str === 'true') {
            return 1;
        }

        if (str === 'false') {
            return 0;
        }

        const result = Number(str);
        if (!isNaN(result)) {
            return result;
        }

        throw newCouldNotBeCastedError();
    } catch {
        throw newCouldNotBeCastedError();
    }
};

const isBoolean = (value: any): boolean => {
    try {
        boolean(value);
    } catch {
        return false;
    }

    return true;
};

const boolean = (value: any): boolean => {
    try {
        const str = String(value).toLowerCase();
        switch (str) {
            case '0':
            case 'false':
                return false;
            case '1':
            case 'true':
                return true;
        }

        throw newCouldNotBeCastedError();
    } catch {
        throw newCouldNotBeCastedError();
    }
};

const isDate = (value: any): boolean => {
    try {
        date(value);
    } catch {
        return false;
    }

    return true;
};

const date = (value: any): Date => {
    try {
        if (value instanceof Date) {
            return new Date(value.getTime() - value.getMilliseconds());
        }

        const str = string(value);
        const regex = new RegExp("^(\\d{4})-(\\d{2})-(\\d{2})");
        const match = regex.exec(str);

        if (!match) {
            throw newCouldNotBeCastedError();
        }

        const year = parseInt(match[1]);
        const month = parseInt(match[2]);
        const day = parseInt(match[3]);

        return new Date(Date.UTC(year, month - 1, day));
    } catch {
        throw newCouldNotBeCastedError();
    }
};

const isTime = (value: any): boolean => {
    try {
        time(value);
    } catch {
        return false;
    }

    return true;
};

const time = (value: any): number => {
    try {
        const str = String(value);

        const match = str.match(
            /^(?:(?<hours>\d+)h)?(?:(?<minutes>\d+)m)?(?:(?<seconds>\d+)s)?$/
        );

        if (match) {
            const hours = match.groups?.hours ? parseInt(match.groups.hours) : 0;
            const minutes = match.groups?.minutes ? parseInt(match.groups.minutes) : 0;
            const seconds = match.groups?.seconds ? parseInt(match.groups.seconds) : 0;

            return hours * 60 * 60 + minutes * 60 + seconds;
        }

        if (
            str.match(/^([0-1]?\d|2[0-3])(:([0-5]?\d))(?::([0-5]?\d))?$/) &&
            !isNaN(Date.parse(`2000-01-01T${str}`))
        ) {
            return Math.floor(Date.parse(`2000-01-01T${str}`) / 1000);
        }

        const secs = Number(str);
        if (!isNaN(secs)) {
            return secs;
        }

        throw newCouldNotBeCastedError();
    } catch {
        throw newCouldNotBeCastedError();
    }
};

const isDateTime = (value: any): boolean => {
    try {
        dateTime(value);
    } catch {
        return false;
    }

    return true;
};

const dateTime = (value: any): Date => {
    try {
        if (value instanceof Date) {
            return new Date(value.getTime() - value.getMilliseconds());
        }

        const str = string(value);
        const regex = new RegExp("^(\\d{4})-(\\d{2})-(\\d{2})( (\\d{2}):(\\d{2}):(\\d{2}))?");
        const match = regex.exec(str);

        if (!match) {
            throw newCouldNotBeCastedError();
        }

        const year = parseInt(match[1]);
        const month = parseInt(match[2]);
        const day = parseInt(match[3]);
        if (!match[4]) {
            return new Date(Date.UTC(year, month - 1, day));
        }

        const hour = parseInt(match[5]);
        const minute = parseInt(match[6]);
        const second = parseInt(match[7]);

        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    } catch {
        throw newCouldNotBeCastedError();
    }
};

export {
    isArray,
    array,
    isString,
    string,
    isNumber,
    number,
    isBoolean,
    boolean,
    isDate,
    date,
    isTime,
    time,
    isDateTime,
    dateTime,
};
