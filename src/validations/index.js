export default function validate(value, validators, dirty) {
  if (!validators || !dirty) {
    return { hasError: false }
  }

  for (const validator of validators) {
    switch (validator.type) {
      case 'required':
        return { hasError: isEmpty(value), message: validator.message }
      case 'min':
        return { hasError: lessThanMin(value, validator.val), message: validator.message }
      default:
        console.error('Validation rule not supported', validator.type)
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