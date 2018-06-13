import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Color from 'color'
import inViewport from 'in-viewport'
import { resizeToCover, scrolledOverPercent } from './bannerUtil'

const styles = {
  root: {
    position: 'relative',
  },
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  image: {
    backgroundAttachment: 'scroll',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 1,
    transitionProperty: 'opacity'
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  fixed: {
    backgroundAttachment: 'fixed'
  }
}

class Banner extends Component {
  constructor() {
    super()
    this.state = {
      backgroundPositionY: 'center',
      backgroundDimensions: null,
      heroDimensions: null,
      image: null,
      isInViewport: false,
    }
    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.updateSize = this.updateSize.bind(this)
  }

  componentDidMount() {
    inViewport(this.ref, () => this.setState({ isInViewport: true }))
    this.loadImage()

    if (this.props.parallaxOffset > 0) {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageSrc !== this.props.imageSrc) {
      this.loadImage()
    }
  }

  componentWillUnmount() {
    if (this.props.parallaxOffset > 0) {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)
    }
  }

  handleScroll() {
    this.updatePosition()
  }

  handleResize() {
    this.updateSize()
    this.updatePosition()
  }

  loadImage() {
    const image = new Image()
    image.src = this.props.imageSrc
    image.onload = () => {
      this.setState({ image })

      if (this.props.parallaxOffset > 0) {
        this.updateSize()
        this.updatePosition()
      }
    }
  }

  updateSize() {
    if (!this.state.image) { return }

    const heroDimensions = {
      height: this.ref.offsetHeight,
      width: this.ref.offsetWidth,
    }

    const imageDimensions = {
      height: this.state.image.height,
      width: this.state.image.width,
    }

    const resizedImage = resizeToCover(imageDimensions, heroDimensions)
    const initialVisibleImageHeight = resizedImage.height - this.props.parallaxOffset

    const minHeight = initialVisibleImageHeight < heroDimensions.height
      ? resizedImage.height + heroDimensions.height - initialVisibleImageHeight
      : resizedImage.height

    const finalHeight = minHeight + (this.ref.offsetTop * 2)

    const backgroundDimensions = resizeToCover(imageDimensions, { height: finalHeight })
    this.setState({ backgroundDimensions, heroDimensions })
  }

  updatePosition() {
    if (!this.state.backgroundDimensions) { return }
    const position = 0
      + this.ref.offsetTop
      // Center image vertically
      - (this.state.backgroundDimensions.height / 2)
      + (this.state.heroDimensions.height / 2)
      - (this.props.parallaxOffset / 2)
      // Apply scroll position
      + (this.props.parallaxOffset * scrolledOverPercent(this.ref))

    this.setState({ backgroundPositionY: `${Math.round(position)}px` })
  }

  render() {
    const { classes, className, style, minHeight } = this.props
    const { backgroundDimensions, backgroundPositionY } = this.state

    return (
      <div
        className={ClassNames(classes.root, className)}
        style={{ ...style, minHeight }}
        innerRef={(r) => { this.ref = r }}
      >
        <div 
          className={classes.cover}
          height={backgroundDimensions && backgroundDimensions.height}
          isVisible={this.state.image && this.state.isInViewport}
          isFixed={this.props.isFixed || this.props.parallaxOffset > 0}
          src={this.props.imageSrc}
          style={{ backgroundPositionY }}
          transitionDuration={this.props.transitionDuration}
          transitionTimingFunction={this.props.transitionTimingFunction}
          width={backgroundDimensions && backgroundDimensions.width}
        />
        <div
          className={classes.cover}
          color={this.props.color}
          isCentered={this.props.isCentered}
          opacity={this.props.opacity}
        >
          {this.props.children && <div>{this.props.children}</div>}
        </div>
      </div>
    )
  }
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  imageSrc: PropTypes.string,
  isCentered: PropTypes.bool,
  isFixed: PropTypes.bool,
  minHeight: PropTypes.string,
  opacity: PropTypes.number,
  parallaxOffset: PropTypes.number,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  transitionDuration: PropTypes.number,
  transitionTimingFunction: PropTypes.string,
}

Banner.defaultProps = {
  children: undefined,
  className: undefined,
  color: '#fff',
  imageSrc: undefined,
  isCentered: true,
  isFixed: false,
  minHeight: '50vh',
  opacity: 0.8,
  parallaxOffset: 0,
  style: undefined,
  transitionDuration: 600,
  transitionTimingFunction: 'ease-in-out',
}

export default withStyles(styles)(Banner)
