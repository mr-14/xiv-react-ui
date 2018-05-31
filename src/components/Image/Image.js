import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    backgroundRepeat: 'no-repeat',
  },
}

function Image({ classes, src, size, height, width, align, valign }) {
  const style = { 
    backgroundImage: `url("${src}")`,
    backgroundSize: size,
    backgroundPosition: `${align} ${valign}`,
    height, 
    width 
  }
  
  return (
    <div className={classes.root} style={style} />
  )
}

Image.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(['cover', 'contain']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  valign: PropTypes.oneOf(['top', 'bottom', 'center']),
}

Image.defaultProps = {
  size: 'cover',
  width: '100%',
  height: '100%',
  align: 'center',
  valign: 'center',
}

export default withStyles(styles)(Image)
