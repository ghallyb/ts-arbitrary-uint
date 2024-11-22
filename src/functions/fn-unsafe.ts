// Functions that just assume the
// length and chunkLength are the
// same and do no runtime checks.
// These are inteded to be wrapped
// appropriately elsewhere.

import { None } from "ts-maybe";
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
>(
    f: F,
    newArrFn: NewBinaryArrayFn
): OptionalMutabilitySet<F> {

    return ((x: any, y: any) => f(
        x, 
        y,
        newArrFn(),
    )) as OptionalMutabilitySet<F>;

}

function getMutable<
    F extends OptionalyMutable
>(f: F): OptionalMutabilitySet<F> {

    return ((x: any, y: any) => f(
        x, y, x
    )) as OptionalMutabilitySet<F>;

}

type NewBinaryArrayFn = () => IBinaryArray;

function createUnsafeFns(newArrFn: NewBinaryArrayFn) {

    if(None(newArrFn))
        throw new Error(
            "You need to provide a parameterless function "
            + "that generates new BinaryArray objects.");

    return {

        and: getImmutable(and, newArrFn),
        or: getImmutable(or, newArrFn),
        xor: getImmutable(xor, newArrFn),
        not: getImmutable(not, newArrFn),
        shiftLeft: getImmutable(shiftLeft, newArrFn),
        shiftRight: getImmutable(shiftRight, newArrFn),

        mutAnd: getMutable(and),
        mutOr: getMutable(or),
        mutXor: getMutable(xor),
        mutNot: getMutable(not),
        mutShiftLeft: getMutable(shiftLeft),
        mutShiftRight: getMutable(shiftRight),

        equal,
        allBitsAreZero,
        allBitsAreOne,
        someBitsAreOne,

    }

}

export {
    createUnsafeFns
}