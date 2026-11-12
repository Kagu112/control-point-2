class NumberSchema {
  isValid(value) {
    return typeof value === 'number' && !Number.isNaN(value)
  }
}

class ArraySchema {
  constructor() {
    this.checkIntegers = false
    this.customValidators = []
  }

  integers() {
    this.checkIntegers = true
    return this
  }

  custom(fn) {
    this.customValidators.push(fn)
    return this
  }

  isValid(value) {
    if (!Array.isArray(value)) {
      return false 
    }

    if (this.checkIntegers) {
      if (value.length === 0) {
        return false
      }
      if (!value.every((item) => Number.isInteger(item))) {
        return false
      }
    }

    if (this.customValidators.length > 0) {
      const isCustomValid = this.customValidators.every((fn) => (
        value.every((item) => fn(item))
      ));
      if (!isCustomValid) {
        return false
      }
    }

    return true
  }
}

export default class Validator {
  number() {
    return new NumberSchema()
  }

  array() {
    return new ArraySchema()
  }
}