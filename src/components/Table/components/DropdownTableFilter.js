import React from 'react'
import PropTypes from 'prop-types'
import { fieldType } from '../../../types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  filterField: {
    margin: theme.spacing.unit,
  },
  filterBy: {
    flex: 1,
  },
  filterInput: {
    flex: 3,
  },
  filterSearch: {
    flex: '0 0 auto',
  },
})

class DropdownTableFilter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterBy: props.fields[0].id,
      filterValue: null,
    }
  }

  handleFilterByChange = event => {
    this.setState({ filterBy: event.target.value, filterValue: null })
  }

  handleFilterInputChange = (id, value) => {
    this.setState({ filterValue: value })
  }

  handleFilterSubmit = event => {
    event.preventDefault()
    const { filterBy, filterValue } = this.state

    this.props.onFilter({
      key: filterBy,
      val: filterValue,
    })
  }

  renderFilterBy = () => {
    const { classes, fields } = this.props

    return (
      <FormControl className={classNames(classes.filterField, classes.filterBy)}>
        <Select
          value={this.state.filterBy}
          onChange={this.handleFilterByChange}
        >
          {fields.map(field => (
            <MenuItem key={field.id} value={field.id}>{field.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  renderFilterInput = () => {
    const { classes, fields } = this.props
    const field = fields.find(item => item.id === this.state.filterBy)
    const props = field.props || {}
    props.id = field.id
    props.onChange = this.handleFilterInputChange
    props.value = this.state.filterValue || field.default || ''

    return (
      <div className={classNames(classes.filterField, classes.filterInput)}>
        <field.component {...props} />
      </div>
    )
  }

  render = () => {
    const { classes } = this.props

    return (
      <form>
        <Toolbar className={classes.root} disableGutters>
          {this.renderFilterBy()}
          {this.renderFilterInput()}
          <div className={classNames(classes.filterField, classes.filterSearch)}>
            <IconButton type="submit" onClick={this.handleFilterSubmit}>
              <SearchIcon />
            </IconButton>
          </div>
        </Toolbar>
      </form>
    )
  }
}

DropdownTableFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(fieldType).isRequired,
  onFilter: PropTypes.func,
}

export default withStyles(styles, { withTheme: true })(DropdownTableFilter)
