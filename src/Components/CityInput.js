import { ListItem, ListItemIcon, TextField } from '@material-ui/core'
import React from 'react'

class CityInput extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            lat: '',
            lon: '',
            demand: ''
        }    

        if(this.props.data !== undefined) {
            this.state.city = this.props.data.city ? this.props.data.city : ''
            this.state.lat = this.props.data.lat ? this.props.data.lat : ''
            this.state.lon = this.props.data.lon ? this.props.data.lon : ''
            this.state.demand = this.props.data.demand ? this.props.data.demand : ''
        }
    }

    
    handleValueChange = prop => event => {
        const newValue = event.target.value   
        this.setState({[prop]: newValue})
    }

    componentWillUnmount = () => {
        this.props.handleDataChange(this.state)
    }

    sendChanges = () => {
        this.props.handleDataChange(this.state)
    }

    render() {
        let idx = this.props.idx

        return (
            <ListItem key={`list-item-${idx}`}>
                    <ListItemIcon>
                        {`${idx + 1}. `}
                    </ListItemIcon>
                    <TextField style={{margin: "20px"}} type="text" id={`city-name-${idx}`} onChange={this.handleValueChange("city")} label="Miasto" value={this.state.city} onBlur={this.sendChanges}/>
                    <TextField style={{margin: "20px"}} type="text" id={`latitude-${idx}`} onChange={this.handleValueChange("lat")} label="Szerokość geo." value={this.state.lat} onBlur={this.sendChanges}/>
                    <TextField style={{margin: "20px"}} type="text" id={`longitude-${idx}`} onChange={this.handleValueChange("lon")} label="Długość geo." value={this.state.lon} onBlur={this.sendChanges}/>
                    <TextField style={{margin: "20px"}} type="number" id={`demand-${idx}`} onChange={this.handleValueChange("demand")} label="Zapotrzebowanie" value={this.state.demand} onBlur={this.sendChanges}/>
                </ListItem>
        )
    }


}

export default CityInput