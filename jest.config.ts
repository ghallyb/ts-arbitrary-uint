import { createDefaultPreset, JestConfigWithTsJest } from 'ts-jest'

const presetConfig = createDefaultPreset({
  //...options
})

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  injectGlobals: false,
}

export default jestConfig