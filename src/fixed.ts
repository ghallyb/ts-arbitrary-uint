// import { Maybe } from "ts-maybe";
// import { ChunkLength } from "./types/ChunkLength";

// type ChunkContainerType =
//     Uint8Array
//     | Uint16Array
//     | Uint32Array
//     | BigUint64Array;



// // type FixedSizeComparitor<T extends ChunkContainerType, S extends number> =
// //     (target: T, compareTo: T) => boolean;

// // type FixedSizeComparitors<T extends ChunkContainerType> = {
// //     equal: FixedSizeComparitor<T>;    
// //     notEqual: FixedSizeComparitor<T>;
// //     greaterThan: FixedSizeComparitor<T>;
// //     lessThan: FixedSizeComparitor<T>;
// //     greaterThanOrEqual: FixedSizeComparitor<T>;
// //     lessThanOrEqual: FixedSizeComparitor<T>;
// // }

// type FixedArbitraryUint<
//     L extends number,
//     C extends ChunkLength> = {
//         readonly size: L;
//         readonly container: C;
//     }

// type FixedSizeComparitor<
//     L extends number, 
//     C extends ChunkLength> =
//     (
//         target: FixedArbitraryUint<L, C>, 
//         compareTo: FixedArbitraryUint<L,C>
//     ) => boolean;

// // const test: FixedSizeComparitor<12, 32> =
// //     (
// //         target: FixedArbitraryUint<Uint32Array, 4>, 
// //         compareTo: FixedArbitraryUint<Uint32Array, 4>,
// //     ) => true;


// // const fixed = getFixedFunctionsForLength(42)

// type FixedSizeComparitors<
//     L extends number, 
//     C extends ChunkLength> = {
//         create: () => FixedArbitraryUint<L, C>;
//         equal: FixedSizeComparitor<L, C>;    
//     }

// type FixedFunctionsCreator<
//     L extends number,
//     C extends ChunkLength> = () => FixedSizeComparitors<L, C>;

// function getFixedFunctionsForLength<L extends number, C extends ChunkSize = 32>(
//     len: L, chunkSize: C = 32 as C): FixedSizeComparitors<L, C> {

//     return {
//         create: () => {
//             return {
//                 size: len,
//                 container: chunkSize,
//             }
//         },
//         equal: (x: FixedArbitraryUint<L, C>, y: FixedArbitraryUint<L,C>) => {
//             return true;
//         }
//     }

// }

// const fixed2562 = getFixedFunctionsForLength(256);
// const fixed256 = getFixedFunctionsForLength(256);
// // const a: FixedArbitraryUint<128, 32> = {
// //     size: 128,
// //     container: 32
// // };
// // const b: FixedArbitraryUint<128, 32> = {
// //     size: 128,
// //     container: 32
// // };

// const a = fixed256.create();
// const b = fixed2562.create();

// const c = fixed256.equal(a, b);

