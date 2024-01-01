import {FieldType} from "../../src/constants";

describe('fieldType', () => {
    it('isArray should return false when value is not array', () => {
        // Arrange
        const samples = [
            FieldType.FieldTypeUnknown,
            FieldType.FieldTypeString,
            FieldType.FieldTypeNumber,
            FieldType.FieldTypeBoolean,
            FieldType.FieldTypeDate,
            FieldType.FieldTypeTime,
            FieldType.FieldTypeDateTime,
        ];

        for (const sample of samples) {
            // Act
            const result = sample.isArray();

            // Assert
            expect(result).toEqual(false);
        }
    });

    it('isArray should return true when value is array', () => {
        // Arrange
        const samples = [
            FieldType.FieldTypeStringArray,
            FieldType.FieldTypeNumberArray,
            FieldType.FieldTypeBooleanArray,
            FieldType.FieldTypeDateArray,
            FieldType.FieldTypeTimeArray,
            FieldType.FieldTypeDateTimeArray,
        ];

        for (const sample of samples) {
            // Act
            const result = sample.isArray();

            // Assert
            expect(result).toEqual(true);
        }
    });
});
