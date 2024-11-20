import { Maybe } from "ts-maybe";
import { ChunkLength } from "./ChunkLength";
import { FlexBinaryArray } from "./FlexBinaryArray";
import { ChunkContainer } from "./ChunkContainer";

type Bit = 0 | 1;
type BitDefinitions = {[index: number]: Bit}

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

class BinaryArray {

    static createFlex(
        length: Maybe<number> = 32,
        chunkLength: Maybe<ChunkLength> = 32
    ) {
        return new FlexBinaryArray(
            length,
            chunkLength,
        );
    }

    static createFixed<
        T extends number, 
        C extends ChunkLength
    >(lengthInBits: T): BinaryArray2 {
        return new BinaryArray2
    }

    // Give both FromBuffer and FromView varients?

}

class BinaryArray2 {

    [key: number]: any;

    constructor() {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                return Reflect.get(target, prop, receiver);
            }
        })
    }

    public getBitAtIndex(index: number): Maybe<Bit> {
        return undefined;
    }

    public setBitAtIndex(index: number, value: Bit) {

    }

    public setBitsInRange(start: number, length: number, value: Bit) {

    }

    public setBitsAtIndexes(defs: BitDefinitions) {
        // 1. Group into chunks
        // 2. Lookup / Calc Bitmasks
        // 3. Xor with value
    }

    // Set Chunk methods?

}

var atest = new BinaryArray2();

atest.setBitsAtIndexes({
    0: 1,
    1: 0,
    2: 0,
    3: 1,
});

// var k = atest[1];
// var y = atest["hello"];
// atest[1] = 3;
// atest["gello"] = 4;