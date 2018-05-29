import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper, { Step, StepLabel, StepContent } from '@material-ui/core/Stepper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  // root: {
  //   width: '90%',
  // },
})

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  }

  render() {
    const { classes, navBar, steps, wrapperClass } = this.props
    const { activeStep } = this.state

    return (
      <div>
        {navBar}
        <Stepper className={wrapperClass} activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            const label = step.title
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{step.content}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
      </div>
    )
  }

  renderToolbarActions = () => {
    if (!this.props.toolbarActions) {
      return null
    }

    return this.props.toolbarActions.map((action, index) => (
      this.renderActionButton(action, index, 'inherit')
    ))
  }

  renderActionButton = (action, index, color) => {
    const buttonProps = {
      key: index,
      color: color || 'primary',
      type: action.type || 'button',
    }

    if (action.onClick) {
      buttonProps.onClick = () => action.onClick(this.props.history)
    }

    return (
      <Button {...buttonProps}>{action.label}</Button>
    )
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
  wrapperClass: PropTypes.string,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.element,
    })
  ),
}

export default withStyles(styles)(VerticalLinearStepper)