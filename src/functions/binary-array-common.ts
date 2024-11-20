import { Bit } from "../types/Bit"
import { ChunkContainer } from "../types/ChunkContainer"
import { ChunkContainerMap } from "../types/ChunkContainerMap"
import { ChunkLength } from "../types/ChunkLength"

function getViewFromChunkLength<C extends ChunkLength>(
    chunkLength: ChunkLength, 
    buffer: ArrayBuffer
): ChunkContainerMap[C] {

    switch (chunkLength) {
        case 8:
            return new Uint8Array(buffer) as ChunkContainerMap[C]
        case 16:
            return new Uint8Array(buffer) as ChunkContainerMap[C]
        case 32:
            return new Uint8Array(buffer) as ChunkContainerMap[C]
    }

}

function getViewBit(
    view: ChunkContainer,
    chunkLength: ChunkLength,
    index: number,
) {
    const chunkIndex = Math.floor(index / chunkLength);
    const bitIndex = index % chunkLength;

    // Reverse the index so it goes from left to right.
    const reversedBitIndex = (chunkLength - 1) - bitIndex;

    // Get the bit by:
    // 1. Shifting all bits to the right so the bit
    //    we want is in the last position.
    // 2. Bitwise AND with 1 (0001) which will return
    //    1 if the last bit is 1 and 0 if it is not.
    return (view[chunkIndex] >> reversedBitIndex) & 1;
}

function setViewBit(
    view: ChunkContainer,
    chunkLength: ChunkLength,
    index: number,
    value: Bit,
) {
    // Calculate the byte index and the bit position within that byte
    const byteIndex = Math.floor(index / chunkLength);
    const bitIndex = index % chunkLength;
    // Reverse the index so it goes from left to right.
    const reversedBitIndex = (chunkLength - 1) - bitIndex; 

    if (value === 1) {
        // Set the bit to 1
        view[byteIndex] |= (1 << reversedBitIndex);
    } else {
        // Set the bit to 0
        view[byteIndex] &= ~(1 << reversedBitIndex);
    }
}

export {
    getViewFromChunkLength,
    getViewBit,
    setViewBit
}