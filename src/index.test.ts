import { describe, it, expect } from "@jest/globals";
import { getFixedFns, getFlexFns } from "./index";

describe('getFixedFns', () => {
    it('returns object', () => {
        expect(getFixedFns(16, 32)).toBeDefined();
    });
});

describe('getFlexFns', () => {
    it('returns object', () => {
        expect(getFlexFns()).toBeDefined();
    });
});