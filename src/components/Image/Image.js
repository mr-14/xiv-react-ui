import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    backgroundRepeat: 'no-repeat',
  },
}

function Image({ classes, className, src, size, height, width, align, valign, onClick }) {
  const style = { 
    backgroundImage: `url("${src}")`,
    backgroundSize: size,
    backgroundPosition: `${align} ${valign}`,
    height, 
    width 
  }
  
  return (
    <div className={ClassNames(classes.root, className)} style={style} onClick={onClick} />
  )
}

Image.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(['cover', 'contain']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  valign: PropTypes.oneOf(['top', 'bottom', 'center']),
  onClick: PropTypes.func,
}

Image.defaultProps = {
  size: 'cover',
  width: '100%',
  height: '100%',
  align: 'center',
  valign: 'center',
}

export default withStyles(styles)(Image)
