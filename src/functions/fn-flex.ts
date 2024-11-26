import { ChunkLength } from "../types/ChunkLength";
import { FlexBinaryArray } from "../classes/FlexBinaryArray";
import { createUnsafeFns } from "./fn-unsafe";
import { IBinaryArray } from "../types/BinaryArray";

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

    const and = (x: IBinaryArray, y: IBinaryArray) => {
        checkAndGrow(x, y)
    }
}

function checkAndGrow(...args: IBinaryArray[]) {
    let maxLen = 0;
    let maxChunkLen = 8;

    // for(var arg in args) {
    //     if(args[arg] instanceof FlexBinaryArray) {
    //         if(args[arg].length > maxLen)
    //             maxLen = arg.length;

    //         if((arg as FlexBinaryArray).ch)
    //     }
    // }
    // Do we need to check R or
    // 1. Get largest length
    // 2. Get largest chunkSize
    // 3. 
}

export {
    getFlexFns
}