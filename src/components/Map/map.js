import React, {Component} from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

var myIcon = L.icon({
    iconUrl: 'https://zradio.org/wp-content/uploads/2011/05/mapmarker.png',
    iconSize: [41, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
})

export default class SimpleMap extends Component {

    state = {
        location: {
            lat: this.props.latitude,
            lng: this.props.longitude,
        },
        zoom: 13,
    }

    render() {
        const position = [this.state.location.lat, this.state.location.lng]
        return(
            <Map style={{height: '600px'}} center={position} zoom={this.state.zoom}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={myIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </Map>
        )
    }
} 