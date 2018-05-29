import React from 'react'
import PropTypes from 'prop-types'
import { columnType } from '../../../types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  filterBy: {
    flex: 1,
  },
  filterOp: {
    flex: '0 0 auto',
  },
  filterInput: {
    flex: 2,
  },
  filterSearch: {
    flex: '0 0 auto',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  activeFilterRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
})

class AdvanceTableFilter extends React.Component {
  state = {
    filterBy: '',
    filterOp: 'eq',
    filterPrimary: '',
    filterSecondary: '',
    filterType: 'text',
    activeFilters: [],
  }

  handleFilterByChange = id => event => {
    const { columns } = this.props
    const col = columns.find(column => (column.id === event.target.value))
    if (col) {
      const filterType = col.type ? col.type : 'text'
      this.setState({ [id]: event.target.value, filterType })
    }
  }

  handleFilterOpChange = event => {
    this.setState({ filterOp: event.target.value })
  }

  handleFilterInputChange = id => event => {
    this.setState({ [id]: event.target.value })
  }

  handleFilterSubmit = event => {
    event.preventDefault()
    const { filterBy, filterPrimary, filterSecondary } = this.state
    if (filterBy === '' || (filterPrimary === '' && filterSecondary === '')) {
      return
    }

    const activeFilters = this.addActiveFilters()
    this.resetFilter()

    this.updateRow(activeFilters)
  }

  updateRow = filters => {
    const params = filters.map(filter => {
      return {
        key: filter.filterBy,
        val: filter.filterPrimary,
        op: filter.op || '=',
      }
    })

    this.props.onFilter(params)
  }

  resetFilter = () => {
    this.setState({
      filterBy: '',
      filterOp: 'eq',
      filterPrimary: '',
      filterSecondary: '',
      filterType: 'text',
    })
  }

  addActiveFilters = () => {
    const { filterBy, filterOp, filterPrimary, filterSecondary } = this.state
    const newFilter = { filterBy, filterOp, filterPrimary, filterSecondary }
    const activeFilters = [...this.state.activeFilters, newFilter]
    this.setState({ activeFilters })
    return activeFilters
  }

  deleteActiveFilters = data => () => {
    const activeFilters = [...this.state.activeFilters]
    const filterToDelete = activeFilters.indexOf(data)
    activeFilters.splice(filterToDelete, 1)
    this.setState({ activeFilters })

    this.updateRow(activeFilters)
  }

  renderFilterBy = () => {
    const { classes, columns } = this.props
    
    return (
      <FormControl className={classNames(classes.formControl, classes.filterBy)}>
        <Select
          value={this.state.filterBy}
          onChange={this.handleFilterByChange('filterBy')}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {columns.map(column => (
            <MenuItem key={column.id} value={column.id}>{column.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  renderFilterOp = () => {
    const { classes } = this.props

    switch (this.state.filterType) {
      case 'date':
      case 'number':
        return <Typography className={classNames(classes.formControl, classes.filterOp)}>BETWEEN</Typography>
      default:
        return (
          <FormControl className={classNames(classes.formControl, classes.filterOp)}>
            <Select
              value={this.state.filterOp}
              onChange={this.handleFilterOpChange}
            >
              <MenuItem value="eq">=</MenuItem>
              <MenuItem value="like">&asymp;</MenuItem>
            </Select>
          </FormControl>
        )
    }
  }

  renderFilterPrimary = () => {
    const { classes } = this.props
    const { filterType } = this.state
    return (
      <FormControl className={classNames(classes.formControl, classes.filterInput)}>
        <Input
          type={filterType === 'date' || filterType === 'dateRange' ? 'date' : 'text'}
          value={this.state.filterPrimary}
          onChange={this.handleFilterInputChange('filterPrimary')}
        />
      </FormControl>
    )
  }

  renderFilterSecondary = () => {
    const { classes } = this.props
    const { filterType } = this.state

    if (this.state.filterType !== 'dateRange') {
      return null
    }

    return (
      <FormControl className={classNames(classes.formControl, classes.filterInput)}>
        <Input
          type={filterType === 'date' || filterType === 'dateRange' ? 'date' : 'text'}
          value={this.state.filterSecondary}
          onChange={this.handleFilterInputChange('filterSecondary')}
        />
      </FormControl>
    )
  }

  renderActiveFilters = () => {
    if (!this.state.activeFilters || this.state.activeFilters.length === 0) {
      return null
    }

    const { classes } = this.props

    return (
      <div className={classes.activeFilterRow}>
        {this.state.activeFilters.map((item, index) => {
          let label = item.filterPrimary
          if (item.filterSecondary) {
            label += '-' + item.filterSecondary
          }

          return (
            <Chip
              label={label}
              key={index}
              onRequestDelete={this.deleteActiveFilters(item)}
              className={classes.chip}
            />
          )
        })}
      </div>
    )
  }

  render = () => {
    const { classes } = this.props

    return (
      <form>
        <Toolbar className={classes.root} disableGutters>
          {this.renderFilterBy()}
          {this.renderFilterOp()}
          {this.renderFilterPrimary()}
          {this.renderFilterSecondary()}
          <div className={classNames(classes.formControl, classes.filterSearch)}>
            <IconButton type="submit" onClick={this.handleFilterSubmit}>
              <SearchIcon />
            </IconButton>
          </div>
        </Toolbar>
        {this.renderActiveFilters()}
      </form>
    )
  }
}

AdvanceTableFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  onFilter: PropTypes.func,
}

export default withStyles(styles, { withTheme: true })(AdvanceTableFilter)
