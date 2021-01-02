import { Grid, List, ListItem, ListItemIcon, Paper, TextField } from '@material-ui/core'
import React from 'react'

class Data extends React.Component {

    handlePaste = event => {
        console.log(event.clipboardData.getData('Text'))
    }

    handleValueChange = (index, param) => event => {
        let newValue = event.target.value
        console.log(newValue, index, param)
        let tempData = {...this.props.data[index]}
        tempData[param] = newValue
        this.props.onDataChange(tempData, index)
    }

    prepareEmptyRows = noOfRows => {
        let rows = []
        let data = this.props.data
        for(let i = 0; i < noOfRows; i++) {
            let city = ''
                , lat = ''
                , lon = ''
                , demand = ''
            if(data[i] !== undefined) {
                city = data[i].city ? data[i].city : ''
                lat = data[i].lat ? data[i].lat : ''
                lon = data[i].lon ? data[i].lon : ''
                demand = data[i].demand ? data[i].demand : ''
            }
            

            rows.push(
                <ListItem key={`list-item-${i}`}>
                    <ListItemIcon>
                        {`${i + 1}. `}
                    </ListItemIcon>
                    <TextField style={{margin: "20px"}} type="text" id={`city-name-${i}`} onChange={this.handleValueChange(i, "city")} label="Miasto" value={city}/>
                    <TextField style={{margin: "20px"}} type="text" id={`latitude-${i}`} onChange={this.handleValueChange(i, "lat")} label="Szerokość geo." value={lat}/>
                    <TextField style={{margin: "20px"}} type="text" id={`longitude-${i}`} onChange={this.handleValueChange(i, "lon")} label="Długość geo." value={lon}/>
                    <TextField style={{margin: "20px"}} type="number" id={`demand-${i}`} onChange={this.handleValueChange(i, "demand")} label="Zapotrzebowanie" value={demand}/>

                </ListItem>
            )
        }

        return rows
    }

    render() {
        const noOfRows = this.props.noOfRows
        const rows = this.prepareEmptyRows(noOfRows)
    

        return(
            <List style={{overflow: "auto", width: "100%", height: "inherit"}} onPaste={this.handlePaste}>
                {rows}
            </List>
            // <Grid
            //     item
            //     container
            //     direction="column"
            //     justify="flex-start"
            //     alignItems="stretch"
            //     style={{overflow: "auto", height: "inherit"}}
            //     >
            //     {rows}
            // </Grid>
        ) 
    }
}

export default Data