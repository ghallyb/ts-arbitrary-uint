import { Maybe } from "ts-maybe";
import { IBinaryArray } from "./BinaryArray";
import { ChunkLength } from "./ChunkLength";
import { Bit } from "./Bit";
import { ChunkContainerMap } from "./ChunkContainerMap";
import { getViewBit, getViewFromChunkLength, setViewBit } from "../functions/binary-array-common";

class FixedBinaryArray<
    L extends number,
    C extends ChunkLength
> implements IBinaryArray{

    // Numeric Index Access only
    [key: number]: Maybe<Bit>;

    readonly length: L;

    readonly chunkLength: C;

    readonly buffer: ArrayBuffer;

    readonly view: ChunkContainerMap[C];

    constructor(
        length: L, 
        chunkLength: C
    ) {
        this.length = length;
        this.chunkLength = chunkLength;

        let chunks = this.length % this.chunkLength > 0 ?
            Math.floor(this.length / this.chunkLength) + 1
            : this.length / this.chunkLength;

        let bytes = chunks / 8;

        this.buffer = new ArrayBuffer(bytes);
        this.view = getViewFromChunkLength(
            this.chunkLength, 
            this.buffer);

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

        if(index < 0 || index > this.length - 1)
            throw Error("Index ouf of bounds.");

        return getViewBit(
            this.view,
            this.chunkLength,
            index
        );

    }

    private set(index: number, value: Bit) {

        if(index < 0 || index > this.length - 1)
            throw Error("Index ouf of bounds.");

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
    FixedBinaryArray
}