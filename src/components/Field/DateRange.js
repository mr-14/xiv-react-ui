import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ToIcon from '@material-ui/icons/ChevronRight'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  inputWrapper: {
    flex: 1.5,
  },
  divider: {
    flex: '0 0 auto',
    padding: `0 ${theme.spacing.unit}px`,
    alignSelf: 'center',
    color: theme.palette.text.disabled
  }
})

class DateRange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: props.value ? props.value[0] : '',
      endDate: props.value ? props.value[1] : '',
    }
  }

  handleStartDateChange = event => {
    const startDate = event.target.value
    const endDate = (this.state.endDate < startDate) ? startDate : this.state.endDate
    this.setState({ startDate, endDate })
    this.props.onChange(this.props.id, [startDate, endDate])
  }

  handleEndDateChange = event => {
    const endDate = event.target.value
    const startDate = (endDate < this.state.startDate) ? endDate : this.state.startDate
    this.setState({ startDate, endDate })
    this.props.onChange(this.props.id, [startDate, endDate])
  }

  render() {
    const { classes, id, error, focused, disabled, margin } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.inputWrapper}>
          <TextField
            id={`${id}-start`}
            type='date'
            fullWidth
            margin={margin}
            autoFocus={focused}
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
            error={!!error}
            helperText={error}
          />
        </div>
        <div className={classes.divider}>
          <ToIcon />
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            id={`${id}-end`}
            type='date'
            fullWidth
            margin={margin}
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
        </div>
      </div>
    )
  }
}

DateRange.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

DateRange.defaultProps = {
  margin: 'none'
}

export default withStyles(styles, { withTheme: true })(DateRange)
