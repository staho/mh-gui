import { Box, Grid, Paper, TextField } from '@material-ui/core'
import React from 'react'

class Parameters extends React.Component {

    render() {
        const parameters = this.props.parameters
        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <Paper elevation={0}>Parametry danych</Paper>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="no-of-cars" label="Liczba aut" value={parameters.noOfCars} onChange={this.props.onParameterChange("noOfCars")}/>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="car-capacity" label="Pojemność auta" value={parameters.carCapacity} onChange={this.props.onParameterChange("carCapacity")}/>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="no-of-clients" label="Liczba klientów" value={parameters.noOfClients} onChange={this.props.onParameterChange("noOfClients")}/>
                <Paper elevation={0}>Parametry algorytmu</Paper>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="tabu-delay" label="Tabu tenure" value={parameters.tabuDelay} onChange={this.props.onParameterChange("tabuDelay")}/>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="tabu-random-bound" label="Tabu random" value={parameters.tabuRandomBound} onChange={this.props.onParameterChange("tabuRandomBound")}/>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="max-iterations" label="Liczba iteracji" value={parameters.maxIterations} onChange={this.props.onParameterChange("maxIterations")}/>
                <TextField style={{margin: "20px", width: "50%"}} type="number" id="max-iterations-without-improvement" label="Liczba iteracji bez poprawy" value={parameters.maxIterationsWithoutImprovement} onChange={this.props.onParameterChange("maxIterationsWithoutImprovement")}/>
            </Grid>
        )
    }
}

export default Parameters