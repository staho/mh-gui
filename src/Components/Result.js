import { Collapse, List, ListItem, ListItemText, Paper } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { WAYS } from './../DevData/ResultMock'


const colors = ["#FF5733", "#000000", "#0017FF", "#FF00D8", "#7800FF", "#905C1E", "#FF4BAD", "#006114", "#AF601A", "#B03A2E"]

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: WAYS
        }
    }

    prepareLineForWay = way => {
        return way.pathCities.map(point => {
            return [point.latitude, point.longitude]
        })
    }

    prepareLines = ways => {
        return ways.map(way => this.prepareLineForWay(way))
    }

    preparePolyLines = ways => {
        const lines = this.prepareLines(ways)
        return lines.map((line, i) => {
            return <Polyline positions={line} pathOptions={{ color: colors[i] }} />
        })
    }

    prepareMarkers = data => {
        return data.map(c => this.prepareSingleMarker(c))
    }

    prepareSingleMarker = markerData => {
        const position = [markerData.lat, markerData.lon]
        return <Marker position={position}>
            <Popup>
                {`${markerData.city}`}<br />
                {`Demand: ${markerData.demand}`}
            </Popup>
        </Marker>
    }

    getRandomLineColor = () => {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return { color: color }
    }

    preparePathListItem = index => {
        return <ListItem button onClick={this.handlePathClick(index)}>
                    <ListItemText style={{ color: "black" }} primary={`Scieżka ${index + 1}`} />
                    {this.state[`expanded${index}`] ? <ExpandLess style={{color: "black"}} /> : <ExpandMore style={{color: "black"}}/>}
                </ListItem>
    }

    prepareHiddenPathList = (path, index) => {
        console.log(path)
        let items = path.map(city => {
            return <ListItem style={{paddingLeft: "40px"}}>
                        <ListItemText style={{ color: "black" }} primary={`${city.name}`} secondary={city.demand === 0 ? "Depot" : ''} />
                    </ListItem>
        })

        return <Collapse in={this.state[`expanded${index}`]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {items}
                    </List>
                </Collapse>
    }

    preparePathsAsLists = paths => {
        let elements = []
        for(let i = 0; i < paths.length; i++) {
            elements.push(this.preparePathListItem(i))
            elements.push(this.prepareHiddenPathList(paths[i].pathCities, i))
        }
        
        return elements
    }

    handlePathClick = option => () => {
        let open = this.state[`expanded${option}`]
        open = open === undefined ? false : open
        open = !open
        this.setState({[`expanded${option}`]: open})
    }

    render() {
        const result = this.props.result
        const data = this.props.data
        const paths = result.paths
        const markers = this.prepareMarkers(data)
        const polyLines = this.preparePolyLines(paths)
        const listElements = this.preparePathsAsLists(paths)

        return (
            <div style={{ height: "100%", width: "100%", display: "flex" }}>
                <div style={{ height: "100%", width: "70%" }}>
                    <MapContainer center={[52.082, 19.48]} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {polyLines}
                        {markers}
                    </MapContainer>
                </div>
                <div style={{ height: "100%", width: "30%" }}>
                    <Paper elevation={0} style={{ fontSize: "24px" }}>{`Koszt całkowity: ${result.cost}`}</Paper>
                    <Paper elevation={0} style={{ fontSize: "24px" }}>{`Czas przebiegu algorytmu [s]: ${result.executionTime}`}</Paper>
                    <List>
                        {listElements}
                        {/* <ListItem button onClick={this.handlePathClick(0)}>
                            <ListItemText style={{ color: "black" }} primary="Wynik 1" />
                        </ListItem>
                        <Collapse in={false} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button style={{paddingLeft: "14px"}}>
                                    <ListItemText primary="Starrd" />
                                </ListItem>
                            </List>
                        </Collapse> */}
                    </List>
                </div>

            </div>
        )
    }
}

export default Result