export function converFirebaseDataToArray (data) {
  const result = []
  Object.keys(data).forEach(key => result.push({ id: key, ...data[key] }))

  return result
}
