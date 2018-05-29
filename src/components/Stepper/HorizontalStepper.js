import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper, { Step, StepLabel } from '@material-ui/core/Stepper'

const styles = theme => ({

})

class HorizontalStepper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      values: props.values
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.values !== nextProps.values) {
      this.setState({ values: nextProps.values })
    }
  }

  handleNext = () => {
    const { activeStep } = this.state
    const stepId = this.props.steps[activeStep].id

    if (this.props.onStepValidation(stepId)) {
      this.setState({
        activeStep: activeStep + 1,
      })
    }
  }

  handleBack = () => {
    const { activeStep } = this.state
    this.setState({
      activeStep: activeStep - 1,
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  render() {
    const { wrapperClass, contentClass, header, steps } = this.props
    const { activeStep, values } = this.state
    const activeStepContent = steps[activeStep]
    const StepContent = activeStepContent.component
    const stepProps = activeStepContent.props
    stepProps.values = values[activeStepContent.id]

    return (
      <div style={{ height: '100%' }}>
        {header(this.getActions(steps, activeStep))}
        <Stepper className={wrapperClass} activeStep={activeStep}>
          {steps.map((step, index) => {
            const label = step.title
            const props = {}
            return (
              <Step key={label} {...props}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div className={contentClass}>
          {<StepContent {...stepProps} />}
        </div>
      </div>
    )
  }

  getActions = (steps, activeStep) => {
    const { t, onSubmit } = this.props
    const nextLabel = (activeStep === steps.length - 1) ? 'btn.save' : 'btn.next'
    const onClick = (activeStep === steps.length - 1) ? onSubmit : this.handleNext

    return [
      { label: t('btn.back'), disabled: activeStep === 0, onClick: this.handleBack },
      { label: t(nextLabel), onClick },
    ]
  }
}

HorizontalStepper.propTypes = {
  classes: PropTypes.object,
  wrapperClass: PropTypes.string,
  contentClass: PropTypes.string,
  header: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.element,
    })
  ),
  values: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onStepValidation: PropTypes.func,
}

export default withStyles(styles)(HorizontalStepper)