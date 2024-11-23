import { describe, expect, it } from "@jest/globals";
import { createUnsafeFns } from "./fn-unsafe";
import { FlexBinaryArray } from "../classes/FlexBinaryArray";
import { FixedBinaryArray } from "../classes/FixedBinaryArray";

describe('createUnsafeFns', () => {
    it('returns object', () => {
        expect(createUnsafeFns).toBeDefined();
    });

    it('throws if not passed a paramaterless BinaryArray creator fn', () => {
        expect((createUnsafeFns as Function)).toThrow();
    });

    it('returns correct fn signatures', () => {

        const createBinaryArr = () => new FlexBinaryArray();
        const result = createUnsafeFns(createBinaryArr);

        expect(result).toEqual(
            expect.objectContaining({

                // Immutable
                and: expect.any(Function),
                or: expect.any(Function),
                xor: expect.any(Function),
                not: expect.any(Function),
                shiftLeft: expect.any(Function),
                shiftRight: expect.any(Function),

                // Mutable
                mutAnd: expect.any(Function),
                mutOr: expect.any(Function),
                mutXor: expect.any(Function),
                mutNot: expect.any(Function),
                mutShiftLeft: expect.any(Function),
                mutShiftRight: expect.any(Function),

                // Other
                equal: expect.any(Function),
                allBitsAreZero: expect.any(Function),
                allBitsAreOne: expect.any(Function),
                someBitsAreOne: expect.any(Function),
            })
        )
    });

    it('has immutable fns that return a new object', () => {
        const createBinaryArr = () => new FlexBinaryArray();
        const fns = createUnsafeFns(createBinaryArr);

        const x = new FlexBinaryArray();
        const y = new FlexBinaryArray();

        expect(fns.and(x, y)).not.toBe(x);
        expect(fns.or(x, y)).not.toBe(x);
        expect(fns.xor(x, y)).not.toBe(x);
        expect(fns.not(x)).not.toBe(x);
        //expect(fns.shiftLeft(x, 8)).not.toBe(x);
        //expect(fns.shiftRight(x, 8)).not.toBe(x);
    });

    it('has mutable fns that return the original "x" operand', () => {
        const createBinaryArr = () => new FlexBinaryArray();
        const fns = createUnsafeFns(createBinaryArr);

        const x = new FlexBinaryArray();
        const y = new FlexBinaryArray();

        expect(fns.mutAnd(x, y)).toBe(x);
        expect(fns.mutOr(x, y)).toBe(x);
        expect(fns.mutXor(x, y)).toBe(x);
        expect(fns.mutNot(x)).toBe(x);
        //expect(fns.mutShiftLeft(x, 8)).not.toBe(x);
        //expect(fns.mutShiftRight(x, 8)).not.toBe(x);
    });
});