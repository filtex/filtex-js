import {OrLogic} from "../../../../src/builders/memory/logics/orLogic";
import {MemoryExpression} from "../../../../src/builders/memory/types/memoryExpression";

describe('orLogic', () => {
    it('should return true when all expressions return true', () => {
        // Arrange
        const firstExpression = new MemoryExpression((data: any) => true);
        const secondExpression = new MemoryExpression((data: any) => true);
        const thirdExpression = new MemoryExpression((data: any) => true);

        const exp = OrLogic.build([
            firstExpression,
            secondExpression,
            thirdExpression,
        ]);

        // Act
        const result = exp.fn({});

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when one expression return true', () => {
        // Arrange
        const firstExpression = new MemoryExpression((data: any) => false);
        const secondExpression = new MemoryExpression((data: any) => false);
        const thirdExpression = new MemoryExpression((data: any) => true);

        const exp = OrLogic.build([
            firstExpression,
            secondExpression,
            thirdExpression,
        ]);

        // Act
        const result = exp.fn({});

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when all expressions return false', () => {
        // Arrange
        const firstExpression = new MemoryExpression((data: any) => false);
        const secondExpression = new MemoryExpression((data: any) => false);
        const thirdExpression = new MemoryExpression((data: any) => false);

        const exp = OrLogic.build([
            firstExpression,
            secondExpression,
            thirdExpression,
        ]);

        // Act
        const result = exp.fn({});

        // Assert
        expect(result).toBe(false);
    });
});
