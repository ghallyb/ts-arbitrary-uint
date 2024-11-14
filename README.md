## What Is It ##

- Types for creating arbitrary length unsigned integers.
- Functions to perform bitwise operations.
- Functions for performing comparisons.

This library is intended for use in a specific other project
and as such, bitwise and comparison operations might
not be implemented exhaustively. Arithmatic operators
are excluded for now, but may be added later to make the
library more generally useful.

### Notes on term "Arbitrary" ###

When using the term "arbitrary" we are referring to the length
of the integer. It can be basically as many bits as you like.

There may be some confusion because the library has the concepts
of `Fixed` and `Flexible`

**Fixed**

When we use the term fixed, we mean that the length of the Uint
can't be changed after it is defined (unless you use a specific
function to resize it). You are still free to create any sized uint you like.

Using Fixed versions of the `ArbitraryUint` and it's functions 
improves performance, because we can ommit certain runtime 
saafety checks and coalescing between sizes.

**Flexible**

You can also flexible versions of the `ArbitraryUint` and it's
functions. These can be of different lengths and underlying 
chunk size. 

You can use the flexible functions on two items
of differing lengths and chunk sizes seamlessly, however it
does incur a bit of a performance hit as aditional runtime
checks and coalescing are required:

- Where the chunk size is different, one of the items
  gets converted to match the others chunk size.
- Where the length is different, the item needs to be
  padded with leading zeros.

### Chunk Size ###

The `ArbitraryUint` uses a `TypedArray` under the hood. The
typed array is a transparent type that is not used directly,
but is derived from to create `UintXArray` of different sizes,
where `X` is the number of bits per array item. To that end,
`ArbitraryUint` can use any of the following as the underlying storage type:

- `Uint8Array`
- `Uint16Array`
- `Uint32Array`
- `BigUint64Array`

The ability to change the size of the underlying "chunks" has
been build in so that I can do some experimentation with regards
to the following areas of performance:

- CPU performance
- Memory use
- SIMD via WebAssembly (or possibly WebGPU)

Unless one has a specific use case, it is probably wise just to
leave at the default size, which I have not yet decided on. Probs
32. Dunno.