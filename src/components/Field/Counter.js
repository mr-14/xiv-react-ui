import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '2px',
  },
  button: {
    minWidth: 24,
  },
  buttonLeft: {
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  },
  buttonRight: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
  },
  input: {
    flex: 1,
    width: '100%',
    border: 0,
    fontSize: '24px',
    textAlign: 'center',
    '&:focus': {
      outline: 'none'
    }
  },
})

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.min
    }
  }

  static getDerivedStateFromProps(props, state) {
    return { value: props.value || props.min }
  }

  changeCount = event => {
    let value = parseInt(event.target.value, 10)
    if (!value) { return }

    if (value > this.props.max) {
      value = this.props.max
    }

    if (value < this.props.min) {
      value = this.props.min
    }

    this.setState({ value })
    this.props.onChange(this.props.id, value)
  }

  increaseCount = () => {
    let value = this.state.value + 1

    if (value > this.props.max) {
      value = this.props.max
    }

    this.setState({ value })
    this.props.onChange(this.props.id, value)
  }

  decreaseCount = () => {
    let value = this.state.value - 1

    if (value < this.props.min) {
      value = this.props.min
    }

    this.setState({ value })
    this.props.onChange(this.props.id, value)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Button className={ClassNames(classes.button, classes.buttonLeft)} onClick={this.decreaseCount}>
          <RemoveIcon />
        </Button>
        <input className={classes.input} onChange={this.changeCount} value={this.state.value} />
        <Button className={ClassNames(classes.button, classes.buttonRight)} onClick={this.increaseCount}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

Counter.defaultProps = {
  max: 999,
  min: 1
}

export default withStyles(styles, { withTheme: true })(Counter)
