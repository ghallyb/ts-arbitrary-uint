import { Maybe, Some } from "ts-maybe";
import { IBinaryArray } from "../types/BinaryArray";
import { ChunkLength } from "../types/ChunkLength";
import { Bit } from "../types/Bit";
import { ChunkContainer } from "../types/ChunkContainer";
import { getViewBit, setViewBit } from "../functions/binary-array-common";

class FlexBinaryArray implements IBinaryArray{

    // Numeric Index Access only
    [key: number]: Maybe<Bit>;

    readonly length: number = 32;

    readonly chunkLength: ChunkLength = 32;

    readonly buffer: ArrayBuffer;

    readonly view: ChunkContainer;

    constructor(
        length: Maybe<number> = 32,
        chunkLength: Maybe<ChunkLength> = 32
    ) {
        if(Some(length))
            this.length = length;

        if(Some(chunkLength))
            this.chunkLength = chunkLength;

        let chunks = this.length % this.chunkLength > 0 ?
            Math.floor(this.length / this.chunkLength) + 1
            : this.length / this.chunkLength;

        let bytes = chunks / 8;

        this.buffer = new ArrayBuffer(bytes);
        this.view = new Uint32Array(this.buffer);

        return new Proxy(this, {
            
            get: (target, prop, receiver) => {
                return this.get(Number(prop));
            },

            set: (target, prop, value, receiver) => {
                return true;
            }

        });
    }

    private get(index: number) {

        if(index < 0)
            throw Error("Index ouf of bounds.");

        // if(index > this.length - 1)
            // we need to grow

        return getViewBit(
            this.view,
            this.chunkLength,
            index
        );

    }

    private set(index: number, value: Bit) {

        //if(index >= this.length)
            // We need to grow first

        // Note: Not checking the value here. This lib
        // is designed to be used within a TS strict 
        // environment so we are leaning on the compile
        // time checks to ensure nothing but 1 or 0 is
        // passed.

        setViewBit(
            this.view,
            this.chunkLength,
            index,
            value,
        )

        // This needs to return bool

    }

    // Convert the bit array to a binary string (from left to right)
    public toString(): string {
        let result = '';

        for (let i = 0; i < this.length; i++) {
            result += this.get(i).toString();
        }

        return result;
    }
}

export {
    FlexBinaryArray
}