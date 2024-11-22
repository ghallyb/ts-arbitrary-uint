type OmitFirstParam<T extends (...args: any[]) => any> =
  T extends (x: infer X, ...args: infer Rest) => infer R
    ? (...args: Rest) => R
    : never;

export {
    OmitFirstParam
}