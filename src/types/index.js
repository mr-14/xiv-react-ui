import { shape, string, number, object, func, oneOf, oneOfType, arrayOf, element } from 'prop-types'

export const errorType = shape({
  id: string.isRequired,
  message: string.isRequired,
})

export const validatorsType = arrayOf(
  shape({
    type: string.isRequired,
    message: string.isRequired,
    val: oneOfType([string, number]),
  })
)

export const optionsType = arrayOf(
  shape({
    id: oneOfType([number, string]).isRequired,
    label: string.isRequired,
  })
)

export const fieldType = shape({
  id: string,
  component: func.isRequired,
  props: object,
  error: errorType,
  value: oneOfType([string, number]),
})

export const columnType = shape({
  id: string,
  label: string,
  type: oneOf(['text', 'number', 'date', 'hidden']),
  lookup: object,
  parser: oneOfType([
    oneOf(['list', 'date', 'datetime']),
    func
  ]),
  dropdown: string,
})

export const pageActionType = shape({
  icon: string.isRequired,
  tooltip: string,
  link: string.isRequired,
})

export const navItemType = shape({
  label: string.isRequired,
  icon: element,
  onClick: func,
})

export const valueType = oneOfType([number, string])
