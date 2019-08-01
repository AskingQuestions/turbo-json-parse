const objectDefaults = require('./object')
const numberDefaults = require('./number')
const stringDefaults = require('./string')
const booleanDefaults = require('./boolean')
const arrayDefaults = require('./array')
const nullDefaults = require('./null')
const multiDefaults = require('./multi')
const schema = require('./schema')

module.exports = defaults

function defaults (opts) {
  const compileString = stringDefaults(opts)
  const compileNumber = numberDefaults(opts)
  const compileBoolean = booleanDefaults(opts)
  const compileObject = objectDefaults(opts)
  const compileArray = arrayDefaults(opts)
  const compileMulti = multiDefaults(opts)
  const compileNull = nullDefaults(opts)

  return compileAny

  function compileAny (gen, prop, rawSchema) {
    switch (rawSchema.type) {
      case schema.STRING:
        compileString(gen, prop)
        break

      case schema.NUMBER:
        compileNumber(gen, prop)
        break

      case schema.MULTI:
        compileMulti(gen, prop, rawSchema, compileAny)
        break

      case schema.BOOLEAN:
        compileBoolean(gen, prop)
        break

      case schema.OBJECT:
        compileObject(gen, prop, rawSchema, compileAny)
        break

      case schema.NULL:
        compileNull(gen, prop)
        break

      case schema.ARRAY:
        compileArray(gen, prop, rawSchema, compileAny)
        break
    }
  }
}
