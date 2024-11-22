import { ChunkLength } from "../types/ChunkLength";
import { FlexBinaryArray } from "../types/FlexBinaryArray";
import { createUnsafeFns } from "./fn-unsafe";

function getFlexFns(
    length: number = 8,
    chunkLength: ChunkLength = 32
) {

    // For the Immutable fns we need to provide a function
    // that creates a new object to use as the result.
    const newArrFn = () => new FlexBinaryArray(length, chunkLength);
    const unsafe = createUnsafeFns(newArrFn);

    // need to create some sort of checkAndGrow(unsafeVersion)
    // - Checks sizes against each other (len + chunkSize)
    // - Grows if need be
    // - Convert View 
}

export {
    getFlexFns
}