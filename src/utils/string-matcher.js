const stringMatcher = (needle, haystack) => {
  const sNeedle = needle
    .toLowerCase()
    .trim()
    .replace(/\s/g, '')
  const sHaystack = haystack
    .toLowerCase()
    .trim()
    .replace(/\s/g, '')
  const found = sHaystack.indexOf(sNeedle)
  return found !== -1 ? true : false
}

export default stringMatcher
