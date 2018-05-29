import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 4}px`,
  },
})

function Input(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      {...other}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...InputProps,
      }}
    />
  )
}

function Suggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem, onClick }) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      onClick={event => {
        itemProps.onClick(event)
        onClick(suggestion.id)
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

Suggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  onClick: PropTypes.func.isRequired,
}

function getSuggestions(suggestions, inputValue) {
  let count = 0

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5

    if (keep) {
      count += 1
    }

    return keep
  })
}

class AutoSelect extends React.Component {
  constructor(props) {
    super(props)

    this.selectedIds = []
    this.state = {
      inputValue: '',
      selectedItem: [],
    }
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      })
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleOptionClick = fieldId => optionId => {
    if (this.props.multiple) {
      if (this.selectedIds.indexOf(optionId) === -1) {
        this.selectedIds = [...this.selectedIds, optionId]
      }
  
      this.props.onChange(this.props.id, this.selectedIds)
    } else {
      this.props.onChange(this.props.id, optionId)
    }
  }

  handleChange = item => {
    let { selectedItem } = this.state

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item]
    }

    this.setState({
      inputValue: '',
      selectedItem,
    })
  }

  handleDelete = item => () => {
    const selectedItem = [...this.state.selectedItem]
    selectedItem.splice(selectedItem.indexOf(item), 1)

    this.setState({ selectedItem })
    this.props.onChange(this.props.id, selectedItem)
  }

  renderSingleInput = (getInputProps, selectedItem) => {
    const { classes, id, placeholder } = this.props

    return Input({
      fullWidth: true,
      classes,
      InputProps: getInputProps({
        placeholder,
        id,
      }),
    })
  }

  renderMultiInput = (getInputProps, selectedItem) => {
    const { classes, id, placeholder } = this.props

    return Input({
      fullWidth: true,
      classes,
      InputProps: getInputProps({
        startAdornment: selectedItem.map(item => (
          <Chip
            key={item}
            tabIndex={-1}
            label={item}
            className={classes.chip}
            onDelete={this.handleDelete(item)}
          />
        )),
        onChange: this.handleInputChange,
        onKeyDown: this.handleKeyDown,
        placeholder,
        id,
      }),
    })
  }

  renderOptions = (getItemProps, isOpen, inputValue, selectedItem, highlightedIndex) => {
    const { classes, options, id } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <Paper className={classes.paper} square>
        {getSuggestions(options, inputValue).map((suggestion, index) =>
          Suggestion({
            suggestion,
            index,
            itemProps: getItemProps({ item: suggestion.label }),
            highlightedIndex,
            selectedItem,
            onClick: this.handleOptionClick(id)
          }),
        )}
      </Paper>
    )
  }

  render() {
    const { classes, multiple } = this.props
    const { inputValue, selectedItem } = this.state
    const props = !multiple ? null : {
      onChange: this.handleChange,
      inputValue,
      selectedItem
    }

    return (
      <Downshift {...props}>
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex, }) => (
          <div className={classes.container}>
            {multiple ? this.renderMultiInput(getInputProps, selectedItem) : this.renderSingleInput(getInputProps, selectedItem)}
            {this.renderOptions(getItemProps, isOpen, inputValue, selectedItem, highlightedIndex)}
          </div>
        )}
      </Downshift>
    )
  }
}

AutoSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

AutoSelect.defaultProps = {
  multiple: false,
}

export default withStyles(styles)(AutoSelect)
