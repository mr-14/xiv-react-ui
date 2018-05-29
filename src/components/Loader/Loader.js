import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10000,
  },
  bar: {
    height: '3px',
  },
  hide: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s linear 500ms, opacity 500ms',
  }
}

class Loader extends React.Component {
  state = {
    hidden: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      setTimeout(() => { this.show() }, 250)
    } else {
      this.setState({ hidden: true })
    }
  }

  show = () => {
    if (this.props.show) {
      this.setState({ hidden: false })
    }
  }

  render() {
    const { classes } = this.props
    const { hidden } = this.state

    return (
      <div className={classNames(classes.root, hidden && classes.hide)}>
        <LinearProgress color="secondary" classes={{ root: classes.bar }} />
      </div>
    )
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool,
}

const mapStateToProps = state => ({
  show: state.root.loader,
})

export default withStyles(styles)(
  connect(mapStateToProps)(Loader)
)
