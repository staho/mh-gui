import { Grid, List, ListItem, ListItemIcon, Paper, TextField } from '@material-ui/core'
import React from 'react'
import CityInput from './CityInput'

class Data extends React.Component {
    handlePaste = event => {
        const pastedText = event.clipboardData.getData('Text')
        let lines = pastedText.split("\r\n")
        let parsedData = lines.map((line, index) => {
            const parsedLine = line.split("\t")
            return {
                city: parsedLine[0],
                lat: parsedLine[1],
                lon: parsedLine[2],
                demand: parsedLine[3]
            }
        })
        console.log(parsedData)
        this.props.onDataReplace(parsedData)
    }

    handleValueChange = (index, param) => event => {
        let newValue = event.target.value
        let tempData = {...this.props.data[index]}
        tempData[param] = newValue
        this.props.onDataChange(tempData, index)
    }

    handleDataChange = idx => data => {
        this.props.onDataChange(data, idx)
    }

    prepareEmptyRows = noOfRows => {
        let rows = []
        let data = this.props.data
        for(let i = 0; i < noOfRows; i++) {       
            rows.push(
                <CityInput key={`city-input-${i}`} idx={i} handleDataChange={this.handleDataChange(i)} data={data[i]}/>
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
        ) 
    }
}

export default Data