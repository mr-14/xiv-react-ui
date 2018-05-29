import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType, columnType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { InputAdornment } from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import validate from '../../validations'
import { LookupDialog } from '../Dialog'

const styles = theme => ({
  inputAdornmnet: {
    alignSelf: 'flex-end'
  },
  inputIcon: {
    height: 24,
    width: 24,
  }
})

class Lookup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleSelect = value => {
    this.setState({ open: false })
    this.props.onChange(this.props.id, value)
  }

  render() {
    const { classes, className, id, label, value, placeholder, helperText, validators, dirty, disabled, dialog, getDisplayValue, margin} = this.props
    const { hasError, message } = validate(value, validators, dirty)
    let { errorText } = this.props
    if (hasError) {
      errorText = message
    }
    
    return [
      <TextField
        key={id}
        className={className}
        id={id}
        fullWidth
        margin={margin}
        disabled={disabled}
        label={label}
        // InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className={classes.inputAdornmnet}>
              <IconButton
                className={classes.inputIcon}
                onClick={this.handleClickOpen}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        value={getDisplayValue(value)}
        onClick={this.handleClickOpen}
        error={!!errorText}
        helperText={errorText ? errorText : helperText}
      />,
      <LookupDialog
        key={`dialog-${id}`}
        title={dialog.title}
        open={this.state.open}
        onClose={this.handleRequestClose}
        onSelect={this.handleSelect}
        columns={dialog.columns}
        onLoad={dialog.onLoad}
        value={value}
      />
    ]
  }
}

Lookup.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string
    })
  ]),
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  validators: validatorsType,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  dialog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(columnType).isRequired,
    onLoad: PropTypes.func.isRequired,
  }),
  getDisplayValue: PropTypes.func.isRequired,
  margin: PropTypes.string,
}

Lookup.defaultProps = {
  margin: 'none'
}

export default withStyles(styles, { withTheme: true })(Lookup)
