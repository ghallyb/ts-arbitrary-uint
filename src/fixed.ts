type ChunkContainerType =
    Uint8Array
    | Uint16Array
    | Uint32Array
    | BigUint64Array;


// type FixedSizeComparitor<T extends ChunkContainerType, S extends number> =
//     (target: T, compareTo: T) => boolean;

// type FixedSizeComparitors<T extends ChunkContainerType> = {
//     equal: FixedSizeComparitor<T>;    
//     notEqual: FixedSizeComparitor<T>;
//     greaterThan: FixedSizeComparitor<T>;
//     lessThan: FixedSizeComparitor<T>;
//     greaterThanOrEqual: FixedSizeComparitor<T>;
//     lessThanOrEqual: FixedSizeComparitor<T>;
// }

type Size = number;
type SizeLiteral = `${Size}`;

//var test: SizeLiteral = "4";

type FixedSizeComparitor<
    T extends ChunkContainerType, 
    S extends SizeLiteral> =
    (target: T, compareTo: T, size: S) => boolean;

const test: FixedSizeComparitor<Uint32Array, "32"> =
    (
        target: Uint32Array, 
        compareTo: Uint32Array,
        size: "32" = "32"
    ) => true;