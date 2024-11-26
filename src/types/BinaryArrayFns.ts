import { FixedBinaryArray } from "../classes/FixedBinaryArray"
import { FlexBinaryArray } from "../classes/FlexBinaryArray";
import { IBinaryArray } from "./BinaryArray"
import { ChunkLength } from "./ChunkLength";
import { ExtractLeadingNonOperands } from "./helpers/ExtractLeadingNonOperands";
import { NotZero } from "./NotZero";

type And<T extends IBinaryArray> = (op1: T, op2: T) => T
type Or<T extends IBinaryArray> = (op1: T, op2: T) => T
type Xor<T extends IBinaryArray> = (op1: T, op2: T) => T
type Not<T extends IBinaryArray> = (op: T) => T
type ShiftLeft<T extends IBinaryArray> = (shiftBy: number, op: T) => T
type ShifRight<T extends IBinaryArray> = (shiftBy: number, op: T) => T
type MutAnd<T extends IBinaryArray> = (mutOp1: T, op2: T) => T
type MutOr<T extends IBinaryArray> = (mutOp1: T, op2: T) => T
type MutXor<T extends IBinaryArray> = (mutOp1: T, op2: T) => T
type MutNot<T extends IBinaryArray> = (mutOp: T) => T
type MutShiftLeft<T extends IBinaryArray> = (shiftBy: number, mutOp: T) => T
type MutShifRight<T extends IBinaryArray> = (shiftBy: number, mutOp: T) => T

type BitwiseFns<T extends IBinaryArray> = {
    and: And<T>
    or: Or<T>
    xor: Xor<T>
    not: Not<T>
    shiftLeft: ShiftLeft<T>
    shiftRight: ShifRight<T>
}

type MutableBitwiseFns<T extends IBinaryArray> = {
    mutAnd: MutAnd<T>
    mutOr: MutOr<T>
    mutXor: MutXor<T>
    mutNot: MutNot<T>
    mutShiftLeft: MutShiftLeft<T>
    mutShiftRight: MutShifRight<T>
}

type Equal<T extends IBinaryArray> = (op1: T, op2: T) => boolean
type AllBitsAreZero<T extends IBinaryArray> = (op: T) => boolean
type AllBitsAreOne<T extends IBinaryArray> = (op: T) => boolean
type SomeBitsAreOne<T extends IBinaryArray> = (op: T) => boolean

type ComparisonFns<T extends IBinaryArray> = {
    equal: Equal<T>
    allBitsAreZero: AllBitsAreZero<T>
    allBitsAreOne: AllBitsAreOne<T>
    someBitsAreOne: SomeBitsAreOne<T>
}

type CommonFns<T extends IBinaryArray> =
    BitwiseFns<T> 
    & MutableBitwiseFns<T>
    & ComparisonFns<T>


type ApplyToAll<T extends IBinaryArray> = <
    K extends keyof CommonFns<T>,
    F extends CommonFns<T>[K] 
>(
    fn: F,
    ...args: ExtractLeadingNonOperands<T, F>
) => ReturnType<F>;

type CollectionFns<T extends IBinaryArray> = {
    applyToAll: ApplyToAll<T>,
}

type FixedTransformationFns<T extends IBinaryArray> = {
    create: () => T

    resize: (
        len: NotZero<number>,
        chunkSize: ChunkLength,
        op: T
    ) => FixedBinaryArray<typeof len, typeof chunkSize>

    toFlex: (op: T) => FlexBinaryArray
}

type FixedFns<
    L extends number,
    C extends ChunkLength,
    T extends FixedBinaryArray<L,C>
> = CommonFns<T> & CollectionFns<T>

type FlexTransformationFns = {
    create: () => FlexBinaryArray
    
    resize: (
        len: NotZero<number>,
        chunkSize: ChunkLength,
        op: FlexBinaryArray,
    ) => FlexBinaryArray

    toFixed: (
        len: NotZero<number>, 
        chunkLen: ChunkLength,
        op: FlexBinaryArray,
    ) => FixedBinaryArray<typeof len, typeof chunkLen>
}

type FlexFns = 
    CommonFns<FlexBinaryArray>
    & CollectionFns<FlexBinaryArray>

export {
    CommonFns,
    FixedFns,
    FlexFns
}
