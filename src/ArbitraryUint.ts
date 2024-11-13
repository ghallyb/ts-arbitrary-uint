import { Maybe } from "ts-maybe";

type ChunkSize = 8 | 16 | 32 | 64;
type ChunkContainerType =
    Uint8Array
    | Uint16Array
    | Uint32Array
    | BigUint64Array

type ArbitraryUint = {
    size: number;
    chunkSize: ChunkSize;
    chunkCount: number;
    chunks: ChunkContainerType;
}

type ArbitraryUint8 = ArbitraryUint & {
    chunks: Uint8Array;
}

type ArbitraryUint16 = ArbitraryUint & {
    chunks: Uint16Array;
}

function getArbitraryUintFixedSizeFunctions(
    size: number,
    chunkSize: ChunkSize,
    indexFrom: "Left" | "Right"
) {
    
}

export function create(
    size: number, 
    chunkSize: ChunkSize) 
{

    

}

function equal(target: ArbitraryUint, compareTo: ArbitraryUint) {
    for(var i = 0; i < target.chunks.length; i++) {
        if(target.chunks[i] != compareTo.chunks[i])
            return false;
    }

    return true;
}