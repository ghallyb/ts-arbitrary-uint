import { IBinaryArray } from "./BinaryArray";

type OptionalyMutable = (
    result: IBinaryArray,
    ...args: any[]
) => IBinaryArray

export {
    OptionalyMutable,
}