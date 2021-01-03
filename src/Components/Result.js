import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { WAYS } from './../DevData/ResultMock'

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: WAYS
        }
    }

    prepareLineForWay = way => {
        return way.map(point => {
            return [point.lat, point.lon]
        })
    }

    prepareLines = ways => {
        return ways.map(way => this.prepareLineForWay(way))
    }

    preparePolyLines = ways => {
        const lines = this.prepareLines(ways)
        return lines.map(line => {
            return <Polyline positions={line} pathOptions={this.getRandomLineColor()}/>
        })
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
        console.log(WAYS)
        const polyLines = this.preparePolyLines(WAYS)

        return (
            <div style={{height: "100%", width: "100%"}}>
                <MapContainer center={[52.082, 19.48]} zoom={7} scrollWheelZoom={false} style={{height: "inherit", width:"inherit"}}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {polyLines}                    
                </MapContainer>
            </div>
        )
    }
}

export default Result