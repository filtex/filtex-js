import {FieldOption} from "../../src/options";
import {FieldType, Operator} from "../../src/constants";
import {Lookup} from "../../src/models";

describe('fieldOption', () => {
    it('new should return field option', () => {
        // Act
        const opt = FieldOption.new();

        // Assert
        expect(opt).not.toBeNull();
        expect(opt.name).not.toBeNull();
        expect(opt.label).not.toBeNull();
        expect(opt.lookup).not.toBeNull();
        expect(opt._fieldType).not.toBeNull();
        expect(opt._isArray).toEqual(false);
        expect(opt._isNullable).toEqual(false);
    });

    it('string should set field type as string and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.string();

        // Assert
        expect(result).not.toBeNull();
        expect(result._fieldType).toEqual(FieldType.FieldTypeString);
    });

    it('number should set field type as number and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.number();

        // Assert
        expect(result).not.toBeNull();
        expect(result._fieldType).toEqual(FieldType.FieldTypeNumber);
    });

    it('boolean should set field type as boolean and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.boolean();

        // Assert
        expect(result).not.toBeNull();
        expect(result._fieldType).toEqual(FieldType.FieldTypeBoolean);
    });

    it('date should set field type as date and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.date();

        // Assert
        expect(result).not.toBeNull();
        expect(result._fieldType).toEqual(FieldType.FieldTypeDate);
    });

    it('time should set field type as time and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.time();

        // Assert
        expect(result).not.toBeNull();
        expect(result._fieldType).toEqual(FieldType.FieldTypeTime);
    });

    it('datetime should set field type as datetime and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.datetime();

        // Assert
        expect(result).not.toBeNull();
        expect(result._fieldType).toEqual(FieldType.FieldTypeDateTime);
    });

    it('array should set is array as true and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.array();

        // Assert
        expect(result).not.toBeNull();
        expect(result._isArray).toEqual(true);
    });

    it('nullable should set is nullable as true and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.nullable();

        // Assert
        expect(result).not.toBeNull();
        expect(result._isNullable).toEqual(true);
    });

    it('name should set name and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.name("Some Name");

        // Assert
        expect(result).not.toBeNull();
        expect(result._name).not.toBeNull();
        expect(result._name).toEqual("Some Name");
    });

    it('label should set label and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.label("Some Label");

        // Assert
        expect(result).not.toBeNull();
        expect(result._label).not.toBeNull();
        expect(result._label).toEqual("Some Label");
    });

    it('lookup should set lookup and return itself', () => {
        // Arrange
        const opt = FieldOption.new();

        // Act
        const result = opt.lookup("some_key");

        // Assert
        expect(result).not.toBeNull();
        expect(result._lookup).not.toBeNull();
        expect(result._lookup).toEqual("some_key");
    });

    it('build should return error when field type is not defined', () => {
        // Arrange
        const opt = FieldOption.new().name("Some Name").label("Some Label");

        expect(() => {
            // Act
            const result = opt.build(new Map<string, Lookup[]>());
        }).toThrow(Error);
    });

    it('build should return error when name is not defined', () => {
        // Arrange
        const opt = FieldOption.new().string().label("Some Label");

        expect(() => {
            // Act
            const result = opt.build(new Map<string, Lookup[]>());
        }).toThrow(Error);
    });

    it('build should return error when label is not defined', () => {
        // Arrange
        const opt = FieldOption.new().string().name("Some Name");

        expect(() => {
            // Act
            const result = opt.build(new Map<string, Lookup[]>());
        }).toThrow(Error);
    });

    it('build should set field type as string array when type is string and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().string().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeStringArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
    });

    it('build should set field type as number array when type is number and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().number().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeNumberArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
    });

    it('build should set field type as boolean array when type is boolean and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().boolean().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeBooleanArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
    });

    it('build should set field type as date array when type is date and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().date().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeDateArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
    });

    it('build should set field type as time array when type is time and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().time().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeTimeArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
    });

    it('build should set field type as datetime array when type is datetime and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().datetime().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeDateTimeArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
    });

    it('build should set values when values are defined', () => {
        // Arrange
        const opt = FieldOption.new().datetime().array().name("Some Name").label("Some Label").lookup("some_key");
        const lookups = new Map<string, Lookup[]>();
        lookups.set("some_key", [
            new Lookup("Enabled", true),
            new Lookup("Disabled", true),
        ]);

        // Act
        const result = opt.build(lookups);

        // Assert
        expect(result).not.toBeNull();
        expect(result.type).toEqual(FieldType.FieldTypeDateTimeArray.name);
        expect(result.name).toEqual("Some Name");
        expect(result.label).toEqual("Some Label");
        expect(result.values).toHaveLength(2);
    });

    it('build should add default operators when definitions are valid', () => {
        // Arrange
        const opt = FieldOption.new().string().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorEqual.name);
        expect(result.operators).toContain(Operator.OperatorNotEqual.name);
        expect(result.operators).toContain(Operator.OperatorIn.name);
        expect(result.operators).toContain(Operator.OperatorNotIn.name);
    });

    it('build should add blank operators when array is defined', () => {
        // Arrange
        const opt = FieldOption.new().string().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorBlank.name);
        expect(result.operators).toContain(Operator.OperatorNotBlank.name);
    });

    it('build should add blank operators when nullable is defined', () => {
        // Arrange
        const opt = FieldOption.new().string().nullable().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorBlank.name);
        expect(result.operators).toContain(Operator.OperatorNotBlank.name);
    });

    it('build should add contain operators when array is defined', () => {
        // Arrange
        const opt = FieldOption.new().string().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorContain.name);
        expect(result.operators).toContain(Operator.OperatorNotContain.name);
    });

    it('build should add contain operators when type is string', () => {
        // Arrange
        const opt = FieldOption.new().string().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorContain.name);
        expect(result.operators).toContain(Operator.OperatorNotContain.name);
        expect(result.operators).toContain(Operator.OperatorStartWith.name);
        expect(result.operators).toContain(Operator.OperatorNotStartWith.name);
        expect(result.operators).toContain(Operator.OperatorEndWith.name);
        expect(result.operators).toContain(Operator.OperatorNotEndWith.name);
    });

    it('build should add compare operators when type is number', () => {
        // Arrange
        const opt = FieldOption.new().number().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('build should add compare operators when type is number and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().number().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('build should add compare operators when type is date', () => {
        // Arrange
        const opt = FieldOption.new().date().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('should add compare operators when type is date and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().date().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('should add compare operators when type is time', () => {
        // Arrange
        const opt = FieldOption.new().time().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('should add compare operators when type is time and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().time().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('should add compare operators when type is datetime', () => {
        // Arrange
        const opt = FieldOption.new().datetime().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });

    it('should add compare operators when type is datetime and array is defined', () => {
        // Arrange
        const opt = FieldOption.new().datetime().array().name("Some Name").label("Some Label");

        // Act
        const result = opt.build(new Map<string, Lookup[]>());

        // Assert
        expect(result).not.toBeNull();
        expect(result.operators).toContain(Operator.OperatorGreaterThan.name);
        expect(result.operators).toContain(Operator.OperatorGreaterThanOrEqual.name);
        expect(result.operators).toContain(Operator.OperatorLessThan.name);
        expect(result.operators).toContain(Operator.OperatorLessThanOrEqual.name);
    });
});
