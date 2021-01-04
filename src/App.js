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
      currentStep: null,
      parameters: {
        noOfCars: 5,
        carCapacity: 1000,
        noOfClients: 30
      },
      data: []
    }
  }

  handleStepChange = step => {
    if (step.key === "result" && this.state.result === undefined) {
      this.setState({ currentStep: { key: "loading" } })
      this.fetchResult(this.transformInput())
    } else {
      this.setState({ currentStep: step })
    }
  }

  transformInput = () => {
    let request = {}
    const stateParameters = {...this.state.parameters}
    request.noOfCars = stateParameters.noOfCars
    request.carCapacity = stateParameters.carCapacity
    request.noOfCities = stateParameters.noOfClients - 1
    const data = [...this.state.data]
    request.cities = data.map(c => {
      return {
        name: c.city,
        demand: c.demand,
        latitude: c.lat,
        longitude: c.lon
      }
    })

    let body = {}
    body.request = request
    console.log(body)
    return body
  }

  fetchResult = inputData => {
    fetch("http://localhost:8080/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
    }).then(r => r.json())
      .then(data => {
        console.log(data)
        this.setState({ currentStep: { key: "result", label: "Wynik" }, result: data.response })
      })

  }

  replaceData = data => {
    const noOfClients = data.length
    let parametersTemp = { ...this.state.parameters }
    parametersTemp.noOfClients = noOfClients
    this.setState({ data: data, parameters: parametersTemp })
  }


  handleParametersChange = parameter => event => {
    const value = event.target.value
    let parametersTemp = { ...this.state.parameters }
    parametersTemp[parameter] = Number.parseInt(value)
    this.setState({ parameters: parametersTemp })
  }

  handleDataChange = (newData, index) => {
    if (index === undefined) throw new Error("Index must be provided on data change event")

    let tempData = [...this.state.data]
    tempData[index] = newData
    this.setState({ data: tempData })
  }

  resolveView = currentStep => {
    if (currentStep != null) {
      currentStep = currentStep.key
    }
    switch (currentStep) {
      case "data":
        return <Data data={this.state.data} noOfRows={this.state.parameters.noOfClients} onDataChange={this.handleDataChange} onDataReplace={this.replaceData} />
      case "result":
        return <Result result={this.state.result} data={this.state.data}/>
      case "loading":
        return <div />
        // todo: make some spinning shit
      case "parameters":
      default:
        return <Parameters parameters={this.state.parameters} onParameterChange={this.handleParametersChange} />
    }
  }

  render() {
    const currentStep = this.state.currentStep
    const stepView = this.resolveView(currentStep)

    return (
      <div className="App">
        <header className="App-header">
          <Grid
            style={{ height: "100vh" }}
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch">
            <Grid item style={{ height: "10%" }}>
              <AppBar handleStepChange={this.handleStepChange} />
            </Grid>
            <Grid item style={{ height: "90%" }} container direction="row" justify="center" alignItems="center">
              {stepView}
            </Grid>
          </Grid>
        </header>
      </div>
    );
  }

}

export default App;
