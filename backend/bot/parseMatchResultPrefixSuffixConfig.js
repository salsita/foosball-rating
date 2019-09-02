const parseConfigPart = configPart => {
  const splitConfigPart = configPart.split(',')
  if (splitConfigPart.length !== 4) {
    throw Error(`Could not parse config part "${splitConfigPart}"`)
  }
  return ({
    player1: splitConfigPart[0],
    player2: splitConfigPart[1],
    prefix: splitConfigPart[2],
    suffix: splitConfigPart[3],
  })
}

const parseMatchResultPrefixSuffixConfig = config => config ? config.split(';').map(parseConfigPart) : []

module.exports = parseMatchResultPrefixSuffixConfig
