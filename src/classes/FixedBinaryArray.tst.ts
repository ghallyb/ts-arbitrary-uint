import { expect } from "tstyche";
import { FixedBinaryArray } from "./FixedBinaryArray";
import { getFixedFns } from "../functions/fn-fixed";
 
expect(new FixedBinaryArray(32, 32)).type.toBe<FixedBinaryArray<32, 32>>();

const fns = getFixedFns(32, 32);
const x = new FixedBinaryArray(32, 32);
const y = new FixedBinaryArray(32, 32);
const z = new FixedBinaryArray(8, 32);

expect(fns.and(x, y)).type.not.toRaiseError();

// @ts-expect-error
expect(fns.and(x, z)).type.toRaiseError();


