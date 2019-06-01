export default function(rule) {
  const [path, type] = rule.split('|')
  const parseChain = path.split('.').map(i => {
    const ifnan = isNaN(parseInt(i))
    return ifnan ? i : parseInt(i)
  })
  return function(input) {
    // todo: error handle
    let res = input
    for (const key of parseChain) {
      res = res[key]
    }
    if (type === 'float') {
      return parseFloat(res)
    } else if (type === 'int') {
      return parseInt(res)
    } else {
      return res
    }
  }
}
