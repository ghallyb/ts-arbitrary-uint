type NotZero<T extends number> = T extends 0 ? never : T;

export {
    NotZero
}