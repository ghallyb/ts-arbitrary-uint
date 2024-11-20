// Functions that just assume the
// length and chunkLength are the
// same and do no runtime checks.
// These are inteded to be wrapped
// appropriately elsewhere.

import { IBinaryArray } from "../types/BinaryArray";
import { FlexBinaryArray } from "../types/FlexBinaryArray";
import { OptionalyMutable, OptionalMutabilitySet } from "../types/PossiblyMutableFn";

function and(
    x: IBinaryArray, 
    y: IBinaryArray,
    result: IBinaryArray,
): IBinaryArray {
    const length = x.view.length;

    for(let i = 0; i < length; i++) {
        result.view[i] = x.view[i] & y.view[i];
    }

    return result;
}

function or(
    x: IBinaryArray, 
    y: IBinaryArray,
    result: IBinaryArray,
): IBinaryArray {
    const length = x.view.length;

    for(let i = 0; i < length; i++) {
        result.view[i] = x.view[i] | y.view[i];
    }

    return result;
}

function xor(    
    x: IBinaryArray, 
    y: IBinaryArray,
    result: IBinaryArray,
): IBinaryArray {
    const length = x.view.length;

    for(let i = 0; i < length; i++) {
        result.view[i] = x.view[i] ^ y.view[i];
    }

    return result;
}

function not(    
    x: IBinaryArray,
    result: IBinaryArray,
): IBinaryArray {
    const length = x.view.length;

    for(let i = 0; i < length; i++) {
        result.view[i] = ~ x.view[i];
    }

    return result;
}

function shiftLeft(
    x: IBinaryArray,
    no: number,
    result: IBinaryArray,
): IBinaryArray {
    throw Error("shiftLeft Not Implemented.");
}

function shiftRight(
    x: IBinaryArray,
    no: number,
    result: IBinaryArray,
): IBinaryArray {
    throw Error("shiftRight Not Implemented.");
}

// Compare

function equal(
    x: IBinaryArray, 
    y: IBinaryArray,
): boolean {
    const length = x.view.length;

    for(let i = 0; i < length; i++) {
        if(x.view[i] != y.view[i])
            return false;
    }

    return true;
}

function allBitsAreZero(
    x : IBinaryArray,
): boolean {
    const length = x.view.length;

    for(let i = 0; i < length; i++) {
        if(x.view[i] != 0)
            return false;
    }

    return true;
}

function allBitsAreOne(
    x: IBinaryArray
): boolean {

    // BA to hold the result of the not()
    const r = new FlexBinaryArray(
        x.length, 
        x.chunkLength,
    );

    // 1. Invert all the bits (1111 would become 0000)
    // 2. Check if all bits are 0
    return allBitsAreZero(not(x, r));
}

function someBitsAreOne(
    x: IBinaryArray
): boolean {
    return !allBitsAreZero(x);
}

function getImmutable<
    F extends OptionalyMutable
>(f: F): OptionalMutabilitySet<F> {

    return ((x: any, y: any) => f(
        x, y,
        new FlexBinaryArray(
            x.length, 
            x.chunkLength,
        )
    )) as OptionalMutabilitySet<F>;

}

function getMutable<
    F extends OptionalyMutable
>(f: F): OptionalMutabilitySet<F> {

    return ((x: any, y: any) => f(
        x, y, x
    )) as OptionalMutabilitySet<F>;

}

function createUnsafeFunctions(mut: boolean = false) {

    const transform = mut ?
        getMutable
        : getImmutable

    return {
        and: transform(and),
        or: transform(or),
        xor: transform(xor),
        not: transform(not),
        shiftLeft: transform(shiftLeft),
        shiftRight: transform(shiftRight),

        // This doesn't need transformed
        equal,

        // Technically these 3 aren't unsafe
        allBitsAreZero,
        allBitsAreOne,
        someBitsAreOne,
    }

}

export {
    createUnsafeFunctions
}