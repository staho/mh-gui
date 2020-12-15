import './App.css';
import { Grid } from '@material-ui/core';
import React from 'react'
import AppBar from './Components/AppBar';
import Parameters from './Components/Parameters';
import Data from './Components/Data';
import Result from './Components/Result';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentStep: null
    }
  }

  handleStepChange = step => {
    console.log(step)
    this.setState({currentStep: step})
  }

  resolveView = currentStep => {
    if(currentStep != null) {
      currentStep = currentStep.key
    }
    switch (currentStep) {
      case "data":
        return <Data />
      case "result":
        return <Result />
      case "parameters":
      default:
        return <Parameters />
    }
  }

  render() {
    const currentStep = this.state.currentStep
    const stepView = this.resolveView(currentStep)

    return (
      <div className="App">
        <header className="App-header">
            <Grid
              style={{height: "100vh"}}
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch">
                <Grid item>
                  <AppBar handleStepChange={this.handleStepChange} />
                </Grid>
                <Grid item style={{height: "90vh"}} container direction="row" justify="center" alignItems="center">
                  {stepView}
                </Grid>
          </Grid>
        </header>
      </div>
    );
  }

}

export default App;
