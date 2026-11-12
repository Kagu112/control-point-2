class NumberSchema {
  isValid(value) {
    return typeof value === 'number' && !Number.isNaN(value)
  }
}
