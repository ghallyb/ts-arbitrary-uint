// Fixed Versions of the ops / cmps
// - Mostly using static checking as safety

import { ChunkLength } from "../types/ChunkLength";
import { FixedBinaryArray } from "../classes/FixedBinaryArray";
import { createUnsafeFns } from "./fn-unsafe";
import { NotZero } from "../types/NotZero";
import { FixedFns } from "../types/BinaryArrayFns";

function getFixedFns<
    L extends number, 
    C extends ChunkLength,
    T extends FixedBinaryArray<L,C>
>(
    length: NotZero<L>,
    chunkLength: C,
): FixedFns<L, C, T> {

    // For the Immutable fns we need to provide a function
    // that creates a new object to use as the result.
    const newArrFn = () => new FixedBinaryArray<L, C>(length, chunkLength);
    const unsafe = createUnsafeFns(newArrFn);

    // using as unknown like this is not ideal. Probs
    // a smarter way to do it.
    // - Pro: No overhead of wrapping in an empty function
    // - Con: Fragile due to manually overriding the typechecker.

    return unsafe as unknown as FixedFns<L, C, T>;

    // return {
    //     and: unsafe.and,
    //     or: unsafe.or,
    //     xor: unsafe.xor,
    //     not: unsafe.not,
    //     shiftLeft: unsafe.shiftLeft,
    //     shiftRight: unsafe.shiftRight,

    //     mutAnd: unsafe.mutAnd,
    //     mutOr: unsafe.mutOr,
    //     mutXor: unsafe.mutXor,
    //     mutNot: unsafe.mutNot,
    //     mutShiftLeft: unsafe.mutShiftLeft as unknown as ((x: T, no: number) => T),
    //     mutShiftRight: unsafe.mutShiftRight as unknown as ((x: T, no: number) => T),

    //     equal: unsafe.equal as unknown as ((x: T, y: T) => boolean),
    //     allBitsAreZero: unsafe.allBitsAreZero as unknown as ((x: T, y: T) => boolean),
    //     allBitsAreOne: unsafe.allBitsAreOne as unknown as ((x: T, y: T) => boolean),
    //     someBitsAreOne: unsafe.someBitsAreOne as unknown as ((x: T, y: T) => boolean),
    // } as unknown as FixedFns<L, C, T>;

}

export {
    getFixedFns
}