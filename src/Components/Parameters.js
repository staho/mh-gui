import { Box, Grid, TextField } from '@material-ui/core'
import React from 'react'

class Parameters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noOfCars: 5,
            carCapacity: 1000,
            noOfClients: 30
        }
    }

    onNoOfCarsChange = event => {
        console.log(event)
        this.setState({noOfCars: event.target.value})
    }

    onCarCapacityChange = event => {
        this.setState({carCapacity: event.target.value})
    }

    onNoOfClientsChange = event => {
        this.setState({noOfClients: event.target.value})
    }

    render() {
        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <TextField style={{margin: "20px"}} id="no-of-cars" label="Liczba aut" value={this.state.noOfCars} onChange={this.onNoOfCarsChange}/>
                <TextField style={{margin: "20px"}} id="car-capacity" label="Pojemność auta" value={this.state.carCapacity} onChange={this.onCarCapacityChange}/>
                <TextField style={{margin: "20px"}} id="no-of-clients" label="Liczba klientów" value={this.state.noOfClients} onChange={this.onNoOfClientsChange}/>
            </Grid>
        )
    }
}

export default Parameters