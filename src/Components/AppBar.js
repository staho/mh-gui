import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import App from '../App'
import React from 'react'

class AppBar extends React.Component {

    render() {
        return(
            <Stepper>
                <Step>
                    <StepLabel>
                        Parametry
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Dane
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        Wynik
                    </StepLabel>
                </Step>
            </Stepper>
        )
    }

}

export default AppBar