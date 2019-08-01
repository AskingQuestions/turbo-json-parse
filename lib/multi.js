const ops = require('./ops')

module.exports = defaults

function defaults (opts) {
  const { ch, code } = ops(opts)

  const trimSpace = `while (${ch('ptr')} === ${code(' ')} || ${ch('ptr')} === ${code('\n')} || ${ch('ptr')} === ${code('\r')}) ptr++;`

  return compileMulti

  function compileMulti (gen, prop, rawSchema, compileAny) {
    if (prop) {
      for (let type of rawSchema.types) {
        gen(`try { ${trimSpace}`)

        compileAny(gen, prop, type)

        gen(`${trimSpace}} catch (turboException) {`)
      }

      gen(`
        throw new Error("Unexpected token in multi type")
      }`)

      // End above catch statements
      gen(`${(new Array(rawSchema.types.length)).join('}')}`)
    }
  }
}
