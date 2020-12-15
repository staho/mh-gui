import { Box, Grid, TextField } from '@material-ui/core'
import React from 'react'

class Parameters extends React.Component {

    render() {
        const parameters = this.props.parameters
        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <TextField style={{margin: "20px"}} type="number" id="no-of-cars" label="Liczba aut" value={parameters.noOfCars} onChange={this.props.onParameterChange("noOfCars")}/>
                <TextField style={{margin: "20px"}} type="number" id="car-capacity" label="Pojemność auta" value={parameters.carCapacity} onChange={this.props.onParameterChange("carCapacity")}/>
                <TextField style={{margin: "20px"}} type="number" id="no-of-clients" label="Liczba klientów" value={parameters.noOfClients} onChange={this.props.onParameterChange("noOfClients")}/>
            </Grid>
        )
    }
}

export default Parameters