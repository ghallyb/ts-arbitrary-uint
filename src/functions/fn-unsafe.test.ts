import { describe, expect, it } from "@jest/globals";
import { createUnsafeFns } from "./fn-unsafe";

describe('createUnsafeFns', () => {
    it('returns object', () => {
        expect(createUnsafeFns).toBeDefined();
    });

    it('returns correct fn signatures', () => {
        // and, or, etc
        throw new Error("not implemented");
    });

    it('has immutable fns that return a new object', () => {
        throw new Error("not implemented");
    });

    it('has mutable fns that return the original "x" operand', () => {
        throw new Error("not implemented");
    });
});