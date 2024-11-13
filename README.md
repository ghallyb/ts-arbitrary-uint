## What Is It

- Types for creating arbitrary length unsigned integers.
- Functions to perform bitwise operations on them.
- Comparison functions

This library is intended for use in a specific other project
and as such, bitwise and comparison operations might
not be implemented exhaustively.

## API Notes

**ArbitraryUint**
Wrapper class for array of 64bit uints.
- Fixed size once created

SetBit(offsetFromRight, val);
SetBits(start, end, val);

And(...x: AribtraryUint)
Or(...x: AribtraryUint)
Xor(...x: AribtraryUint)

Equal
NotEqual
GreaterThan
LessThan
GreaterThanOrEqual
LessThanOrEqual
