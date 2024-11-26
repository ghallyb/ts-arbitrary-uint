import { Maybe } from "ts-maybe";
import { ChunkLength } from "./ChunkLength";
import { ChunkContainer } from "./ChunkContainer";
import { Bit } from "./Bit";

export interface IBinaryArray {

    // Numeric Index Access only
    [key: number]: Maybe<Bit>;

    // Length of the Array in bits
    length: number;
    
    // Desired default View element size
    chunkLength: ChunkLength;

    // Underlying data buffer
    buffer: ArrayBuffer;

    // Default view of the buffer.
    view: ChunkContainer;

}