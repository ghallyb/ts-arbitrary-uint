import { IBinaryArray } from "./BinaryArray";

type OptionalyMutable = (
    a: IBinaryArray,
    b: any,
    c: IBinaryArray,
) => IBinaryArray
    
type OptionalMutabilitySet<F extends OptionalyMutable> = 
  F extends (x: infer A, y: infer B, ...args: any[]) => infer R
    ? (x: A, y: B) => R
    : never;

export {
    OptionalyMutable,
    OptionalMutabilitySet,
}