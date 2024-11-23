// Fixed Versions of the ops / cmps
// - Mostly using static checking as safety

import { ChunkLength } from "../types/ChunkLength";
import { FixedBinaryArray } from "../classes/FixedBinaryArray";
import { createUnsafeFns } from "./fn-unsafe";
import { NotZero } from "../types/NotZero";

function getFixedFns<
    L extends number, 
    C extends ChunkLength,
    T extends FixedBinaryArray<L,C>
>(
    length: NotZero<L>,
    chunkLength: C,
) {

    // For the Immutable fns we need to provide a function
    // that creates a new object to use as the result.
    const newArrFn = () => new FixedBinaryArray<L, C>(length, chunkLength);
    const unsafe = createUnsafeFns(newArrFn);

    // using as unknown like this is not ideal. Probs
    // a smarter way to do it.
    // - Pro: No overhead of wrapping in an empty function
    // - Con: Fragile due to manually overriding the typechecker.
    return {
        and: unsafe.and as unknown as ((x: T, y: T) => T),
        or: unsafe.or as unknown as ((x: T, y: T) => T),
        xor: unsafe.xor as unknown as ((x: T, y: T) => T),
        not: unsafe.not as unknown as ((x: T, y: T) => T),
        shiftLeft: unsafe.shiftLeft as unknown as ((x: T, no: number) => T),
        shiftRight: unsafe.shiftRight as unknown as ((x: T, no: number) => T),

        mutAnd: unsafe.mutAnd as unknown as ((x: T, y: T) => T),
        mutOr: unsafe.mutOr as unknown as ((x: T, y: T) => T),
        mutXor: unsafe.mutXor as unknown as ((x: T, y: T) => T),
        mutNot: unsafe.mutNot as unknown as ((x: T, y: T) => T),
        mutShiftLeft: unsafe.mutShiftLeft as unknown as ((x: T, no: number) => T),
        mutShiftRight: unsafe.mutShiftRight as unknown as ((x: T, no: number) => T),

        equal: unsafe.equal as unknown as ((x: T, y: T) => boolean),
        allBitsAreZero: unsafe.allBitsAreZero as unknown as ((x: T, y: T) => boolean),
        allBitsAreOne: unsafe.allBitsAreOne as unknown as ((x: T, y: T) => boolean),
        someBitsAreOne: unsafe.someBitsAreOne as unknown as ((x: T, y: T) => boolean),
    };

}

export {
    getFixedFns
}