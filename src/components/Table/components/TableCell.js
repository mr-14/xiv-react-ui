import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { columnType } from '../../../types'
import MuiTableCell from '@material-ui/core/TableCell'

const styles = theme => ({
  link: {
    color: '#aa00ff',
    cursor: 'pointer',
  },
})

function TableCell({ classes, column, row, value }) {
  const isNumeric = column.type === 'number'
  let cellVal = value
  let handleClick = null

  if (column.parser) {
    cellVal = column.parser(value)
  }

  if (column.onClick) {
    handleClick = () => column.onClick(row)
  }

  return (
    <MuiTableCell
      className={!!column.onClick ? classes.link : null}
      numeric={isNumeric}
      onClick={handleClick}
    >
      {cellVal}
    </MuiTableCell>)
}

TableCell.propTypes = {
  classes: PropTypes.object.isRequired,
  column: columnType.isRequired,
  row: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
}

export default withStyles(styles, { withTheme: true })(TableCell)
