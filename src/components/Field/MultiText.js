import React from 'react'
import PropTypes from 'prop-types'
import { valueType } from '../../types'
import ComboText from './ComboText'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const styles = theme => ({
  root: {
    width: '100%',
  },
  withoutLabel: {
    marginTop: theme.spacing.unit,
  },
})

class MultiText extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      values: props.value || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ values: nextProps.value })
    }
  }

  handleChange = (id, value) => {
    this.setState({ inputValue: value })
  }

  handleAdd = () => {
    if (!this.state.inputValue) {
      return
    }

    const state = {
      inputValue: '',
      values: [...this.state.values, this.state.inputValue]
    }
    this.setState(state)
    this.props.onChange(this.props.id, state.values)
  }

  handleRemove = value => () => {
    const values = [...this.state.values]
    const valueToRemove = values.indexOf(value)
    values.splice(valueToRemove, 1)
    this.setState({ values })
    this.props.onChange(this.props.id, values)
  }

  renderValues = (id, values, placeholder) => (
    values.map((value, index) => (
      <ComboText
        key={`${id}-${index}`}
        className={this.props.classes.withoutLabel}
        id={`${id}-${index}`}
        icon={<RemoveIcon />}
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
        onClick={this.handleRemove(value)}
        disabled
      />
    ))
  )

  render() {
    const { id, label, placeholder, margin } = this.props
    const { inputValue, values } = this.state

    return (
      <React.Fragment>
        <ComboText
          id={id}
          label={label}
          icon={<AddIcon />}
          placeholder={placeholder}
          value={inputValue}
          onChange={this.handleChange}
          onClick={this.handleAdd}
          onBlur={this.handleAdd}
          margin={margin}
        />
        {this.renderValues(id, values, placeholder)}
      </React.Fragment>
    )
  }
}

MultiText.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.arrayOf(valueType),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  margin: PropTypes.string,
}

MultiText.defaultProps = {
  margin: 'none'
}

export default withStyles(styles)(MultiText)
