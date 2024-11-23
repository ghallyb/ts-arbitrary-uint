import { expect } from "tstyche";
import { FixedBinaryArray } from "./FixedBinaryArray";
import { getFixedFns } from "../functions/fn-fixed";
import { describe } from "tstyche";
import { it } from "tstyche";
import { ChunkContainerMap } from "../types/ChunkContainerMap";
import { ChunkLength } from "../types/ChunkLength";
 
describe("FixedBinaryArray<L, C> class constructor", () => {

    it("should not accept 0 as it's first argument", () => {
        const len = 0; 
        // @ts-ignore
        expect(new FixedBinaryArray(len, 32)).type.toRaiseError();
    });

    it("the second argument should accept any one of 8 | 16 | 32", () => {
        const len = 12; 
        expect(new FixedBinaryArray(len, 8)).type.toBe<FixedBinaryArray<typeof len, 8>>();
        expect(new FixedBinaryArray(len, 16)).type.toBe<FixedBinaryArray<typeof len, 16>>();
        expect(new FixedBinaryArray(len, 32)).type.toBe<FixedBinaryArray<typeof len, 32>>();
    });

    it("the second argument should reject any value that isn't one of 8 | 16 | 32", () => {
        const len = 12; 
        // @ts-ignore
        expect(new FixedBinaryArray(len, 0)).type.toRaiseError();

        // @ts-ignore
        expect(new FixedBinaryArray(len, 7)).type.toRaiseError();

        // @ts-ignore
        expect(new FixedBinaryArray(len, 320)).type.toRaiseError();
    });

    it("the two generic paramaters (L & C) should match the literal type of the values passed to the constructor", () => {
        const len = 8;
        const chunkLen = 16;
        const result = new FixedBinaryArray(len, chunkLen);
        expect(result).type.toBe<FixedBinaryArray<typeof len, typeof chunkLen>>();
    });

    it("should have length type correctly set after constructor call", () => {
        const len = 8;
        const chunkLen = 16;
        const result = new FixedBinaryArray(len, chunkLen);
        expect(result.length).type.toBe<typeof len>();
    });

    it("should have chunkLength type correctly set after constructor call", () => {
        const len = 8;
        const chunkLen = 16;
        const result = new FixedBinaryArray(len, chunkLen);
        expect(result.chunkLength).type.toBe<typeof chunkLen>();
    });

    it("should have view type correctly set after constructor call", () => {
        const len = 8;
        const chunkLen: ChunkLength = 16;
        const result = new FixedBinaryArray(len, chunkLen);
        type Target = ChunkContainerMap[typeof chunkLen];
        expect(result.view).type.toBe<Target>();
    });

});



