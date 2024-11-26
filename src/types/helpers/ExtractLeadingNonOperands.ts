import { IBinaryArray } from "../BinaryArray";

type ExtractLeadingNonOperands<
    T1 extends IBinaryArray,
    T extends (...args: any[]) => any
> = 
    T extends (...args: [...infer F extends IBinaryArray[]]) => any ? 
    [ops: T1[]]
    : T extends (...first: [...infer F, infer T extends IBinaryArray]) => any ? 
        [...F, ops: T[]]
        : never

export {
    ExtractLeadingNonOperands
}