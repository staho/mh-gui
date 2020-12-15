import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import App from '../App'
import React from 'react'

const steps = [
    {
        label: "Parametry",
        key: "parameters"
    },
    {
        label: "Dane",
        key: "data"

    },
    {
        label: "Wynik",
        key: "result"
    }
]

class AppBar extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            currentStep: 0
        }
    }

    handleStep = step => () => {
        this.props.handleStepChange(steps[step])
        this.setState({currentStep: step})
    }

    prepareSteps = () => {
        return steps.map((step, i) => {
            return (
                <Step key={step.key}>
                    <StepLabel onClick={this.handleStep(i)}>
                        {step.label}
                    </StepLabel>
                </Step>
            )
        })
    }

    render() {
        const steps = this.prepareSteps()

        return(
            <Stepper activeStep={this.state.currentStep}>
                {steps}
            </Stepper>
        )
    }

}

export default AppBar