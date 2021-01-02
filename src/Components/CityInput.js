import { ListItem, ListItemIcon, TextField } from '@material-ui/core'
import React from 'react'

class CityInput extends React.Component {


    render() {
        return (
            <ListItem key={`list-item-${i}`}>
                    <ListItemIcon>
                        {`${i + 1}. `}
                    </ListItemIcon>
                    <TextField style={{margin: "20px"}} type="text" id={`city-name-${i}`} onChange={this.handleValueChange(i, "city")} label="Miasto" value={city} onBlur={() => console.log("x")}/>
                    <TextField style={{margin: "20px"}} type="text" id={`latitude-${i}`} onChange={this.handleValueChange(i, "lat")} label="Szerokość geo." value={lat}/>
                    <TextField style={{margin: "20px"}} type="text" id={`longitude-${i}`} onChange={this.handleValueChange(i, "lon")} label="Długość geo." value={lon}/>
                    <TextField style={{margin: "20px"}} type="number" id={`demand-${i}`} onChange={this.handleValueChange(i, "demand")} label="Zapotrzebowanie" value={demand}/>
                </ListItem>
        )
    }


}

export default CityInput