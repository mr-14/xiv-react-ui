// TODO: refactor to use object as method signature
export default function validate(value, validators, dirty, refValues) {
  if (!validators || !dirty) {
    return { hasError: false }
  }

  for (const validator of validators) {
    let hasError = false

    switch (validator.type) {
      case 'required':
        hasError = isEmpty(value)
        break
      case 'min':
        hasError = lessThanMin(value, validator.val)
        break
      case 'func':
        hasError = validator.func(refValues, value)
        break
      default:
        return { hasError: true, message: `Validation rule not supported: ${validator.type}` }
    }

    if (hasError) {
      return { hasError, message: validator.message }
    }
  }

  return { hasError: false }
}

function isEmpty(value) {
  return value === null || value === ''
}

function lessThanMin(value, minValue) {
  return value < minValue
}
