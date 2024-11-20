type ChunkContainer =
    Uint8Array
    | Uint16Array
    | Uint32Array;

    // BigUint64Array: This causes some issues with bitwise
    // ops because both operands need to be either number 
    // or BigInt. Will leave out for now.

export {
    ChunkContainer
}