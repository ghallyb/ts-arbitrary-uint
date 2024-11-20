## What Is It ##

- Types for creating arbitrary length bit arrays.
- Getters and setters that use the bit position (not byte) for
  access.
- Functions to perform bitwise operations on the array (as if
  it were a single very long binary value).
- A single function for checking if all values are Zeroed.

This library is intended for use in a specific other project
and as such, I'm not sure to what extent others might be able
to find utility in it. It may be possible to use it as the basis
for a high performance Arbitrary Length UInt library.

### Notes on terminology ###

There are two types of `BinaryArray`: `Fixed` and `Flexible`

**Fixed**

When we use the term fixed, we mean that the length of the array
can't be changed after it is defined (unless you use a specific
function to resize it). You are still free to create any sized 
`FixedBinaryArray` you like.

Using Fixed versions of the `BinaryArray` and it's functions 
improves performance, because we can ommit certain runtime 
safety checks and coalescing between sizes.

**Flexible**

You can also use flexible versions of the `BinaryArray` and it's
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

The `BinaryArray` uses a `ArrayBuffer` under the hood. I intend
to do a bit of experimenting for my own education and to profile
performance. To that end, I have exposed the ability to change
the underlying view that is used to manipulate the ArrayBuffer.

- `Uint8Array`
- `Uint16Array`
- `Uint32Array`
- `BigUint64Array`
- `DataView` (maybe)

The ability to change the size of the underlying "chunks" has
been build in so that I can do some experimentation with regards
to the following areas of performance:

- CPU performance
- Memory use
- SIMD via WebAssembly (or possibly WebGPU)

Unless one has a specific use case, it is probably wise just to
leave at the default size, which I have not yet decided on. Probs
32. Dunno.