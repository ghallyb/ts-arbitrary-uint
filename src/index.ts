import { Maybe } from "ts-maybe";

// What to export from here?

// getFixedFns(len, chun = 32, mut = false)
// getMutableFixedFns(len, chun)
// getImmutableFixedFns(len, chun)

// getFlexFns(defaultLength = 8, defaultChun = 8, mut)
// getMutableFixedFns(...args)
// getImmutableFixedFns(len, chun)


// OR

// const fixed = getFixedFns(...args);
// const ops = fixed.getImmutable()
// const opsM = fixed.getMutable();

// OR

// const ops = fixed.immutable;
// const opsM = fixed.mutable;