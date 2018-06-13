import React from 'react'
import PropTypes from 'prop-types'
import { validatorsType } from '../../types'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '../Paper'
import TextField from '@material-ui/core/TextField'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { InputAdornment } from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import validate from '../../validations'

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    // height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    // marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  formControl: {
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  inputAdornmnet: {
    alignSelf: 'flex-end',
    marginBottom: 6,
  },
  inputIcon: {
    height: 32,
    width: 32,
  }
})

class ComboBox extends React.Component {
  static getDerivedStateFromProps = (props, state) => {
    return {
      key: props.value,
      value: this.getSelectedLabel(props.value),
    }
  }

  static getSelectedLabel = key => {
    if (!key) {
      return ''
    }

    for (const option of this.props.options) {
      if (String(option.id) === String(key)) {
        return option.label
      }
    }

    return ''
  }

  constructor(props) {
    super(props)

    this.state = {
      key: props.value,
      value: ComboBox.getSelectedLabel(props.value),
      suggestions: [],
    }
  }

  getSuggestions = (value) => {
    const inputValue = value ? value.trim().toLowerCase() : ''
    const inputLength = inputValue.length
    const { options } = this.props
    let count = 0

    if (inputLength === 0) {
      return options
    }

    return options.filter(suggestion => {
      const keep = count < 5 && suggestion.label.toLowerCase().indexOf(inputValue) !== -1

      if (keep) {
        count += 1
      }

      return keep
    })
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.label
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  handleOptionClick = key => () => {
    this.props.onChange(this.props.id, key)
  }

  renderInput = (inputProps) => {
    const { classes, autoFocus, value, ref, ...other } = inputProps
    const { label, helperText, validators, dirty, margin } = this.props
    const { hasError, message } = validate(value, validators, dirty)
    let { errorText } = this.props
    if (hasError) {
      errorText = message
    }

    return (
      <TextField
        autoFocus={autoFocus}
        className={classes.textField}
        margin={margin}
        label={label}
        value={value}
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
          },
          endAdornment: (
            <InputAdornment position="end" className={classes.inputAdornmnet}>
              <IconButton className={classes.inputIcon}>
                <ArrowDownIcon />
              </IconButton>
            </InputAdornment>
          ),
          ...other,
        }}
        error={!!errorText}
        helperText={errorText ? errorText : helperText}
      />
    )
  }

  renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    )
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)

    return (
      <MenuItem selected={isHighlighted} component="div" onClick={this.handleOptionClick(suggestion.id)}>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={index} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            )
          })}
        </div>
      </MenuItem>
    )
  }

  render = () => {
    const { classes, placeholder, focused, disabled } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        shouldRenderSuggestions={() => true}
        inputProps={{
          autoFocus: focused,
          classes,
          placeholder,
          value: this.state.value,
          onChange: this.handleChange,
        }}
        disabled={disabled}
      />
    )
  }
}

ComboBox.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  validators: validatorsType,
  dirty: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
}

ComboBox.defaultProps = {
  margin: 'none'
}

export default withStyles(styles, { withTheme: true })(ComboBox)
