import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { WAYS } from './../DevData/ResultMock'


const colors = ["#FF5733", "#000000", "#0017FF", "#FF00D8", "#7800FF", "#905C1E", "#FF4BAD", "#006114", "#AF601A", "#B03A2E" ]

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
            return <Polyline positions={line} pathOptions={{color: colors[i]}}/>
        })
    }

    prepareMarkers = data => {
        return data.map(c => this.prepareSingleMarker(c))
    }

    prepareSingleMarker = markerData => {
        const position = [ markerData.lat, markerData.lon ]
        return <Marker position = {position}>
            <Popup>
                {`${markerData.city}`}<br/>
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
        return {color: color}
      }

    render() {
        const result = this.props.result
        const data = this.props.data
        const paths = result.paths
        const markers = this.prepareMarkers(data)
        const polyLines = this.preparePolyLines(paths)

        return (
            <div style={{height: "100%", width: "100%"}}>
                <MapContainer center={[52.082, 19.48]} zoom={7} scrollWheelZoom={false} style={{height: "inherit", width:"inherit"}}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {polyLines}  
                    {markers}                  
                </MapContainer>
            </div>
        )
    }
}

export default Result