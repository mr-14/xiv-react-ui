import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import MuiIconButton from '@material-ui/core/IconButton'

function IconButton({ color, tooltip, onClick, children }) {
  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <MuiIconButton color={color} onClick={onClick}>{children}</MuiIconButton>
      </Tooltip>
    )
  }

  return <MuiIconButton color={color} onClick={onClick}>{children}</MuiIconButton>
}

IconButton.propTypes = {
  color: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default IconButton
