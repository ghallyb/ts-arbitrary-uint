import { FixedBinaryArray } from "./classes/FixedBinaryArray";
import { FlexBinaryArray } from "./classes/FlexBinaryArray";
import { getFixedFns } from "./functions/fn-fixed";
import { getFlexFns } from "./functions/fn-flex";

// What to export from here?

const fns = getFixedFns(32, 32);

const a = new FixedBinaryArray(32, 32);
const b = new FixedBinaryArray(32, 32);
const c = new FixedBinaryArray(32, 32);
const d = new FixedBinaryArray(16, 32);
const arr = [a, b, c];

const test = fns.applyToAll(fns.shiftLeft, 4, arr);
const test2 = fns.applyToAll(fns.and, arr);
const test3 = fns.applyToAll(fns.or, arr);
const test4 = fns.applyToAll(fns.allBitsAreOne, arr);

fns.applyToAll(fns.allBitsAreOne, [a, b, c])


// getFlexFns(defaultLength = 8, defaultChun = 8)

export {
    FixedBinaryArray,
    FlexBinaryArray,
    getFixedFns,
    getFlexFns
}