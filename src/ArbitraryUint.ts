import { Maybe } from "ts-maybe";

class ArbitraryUint {

    public size: number = 0;

    public chunkSize: number = 0;

    public chunkCount: number = 0;

    public chunks: Maybe<BigUint64Array>;

    private createEmpty(size: number) {
        if(size <= 0)
            throw "Invalid Size";

        const chunkSize = this.getOptimalChunkSize(size);
        const chunkCount = Math.ceil(size / chunkSize);
    }

    private getOptimalChunkSize(size: number) {

        // Pick from 8, 16, 32, 64
        // Is this practical / worthwhile implementing?

        return 64;
    }

}