import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  button: {
    minWidth: 24,
  },
  input: {
    width: 48,
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
      value: props.min
    }
  }

  changeCount = event => {
    const value = parseInt(event.target.value, 10)
    if (!value) { return }

    if (value >= this.props.max) {
      this.setState({ value: this.props.max })
      return
    }

    if (value <= this.props.min) {
      this.setState({ value: this.props.min })
      return
    }

    this.setState({ value })
  }

  increaseCount = () => {
    if (this.state.value >= this.props.max) { return }
    this.setState({ value: this.state.value + 1 })
  }

  decreaseCount = () => {
    if (this.state.value <= this.props.min) { return }
    this.setState({ value: this.state.value - 1 })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Button className={classes.button} onClick={this.decreaseCount}><RemoveIcon /></Button>
        <input className={classes.input} onChange={this.changeCount} value={this.state.value} />
        <Button className={classes.button} onClick={this.increaseCount}><AddIcon /></Button>
      </div>
    )
  }
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
}

Counter.defaultProps = {
  max: 999,
  min: 1
}

export default withStyles(styles, { withTheme: true })(Counter)
