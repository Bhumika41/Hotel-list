
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

// Fix default marker icons in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

function Hotelmap({ hotels }) {

    // Filter hotels with valid coordinates
    const validHotels = hotels.filter((hotel) =>
        hotel.latitude !== '' &&
        hotel.longitude !== '' &&
        hotel.latitude != null &&
        hotel.longitude != null &&
        Number.isFinite(Number(hotel.latitude)) &&
        Number.isFinite(Number(hotel.longitude))
    )

    if (validHotels.length === 0) {
        return <p>No hotel locations available.</p>
    }

    // Get hotel coordinates
    const positions = validHotels.map((hotel) => [
        Number(hotel.latitude),
        Number(hotel.longitude)
    ])

    return (
        <div className="map-container">

            <MapContainer
                center={positions[0]}
                zoom={6}
                bounds={positions}
                scrollWheelZoom={true}
                style={{ height: '450px', width: '100%' }}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {validHotels.map((hotel) => (

                    <Marker
                        key={hotel.id}
                        position={[
                            Number(hotel.latitude),
                            Number(hotel.longitude)
                        ]}
                    >

                        <Popup>
                            <h3>{hotel.title}</h3>
                            <p>{hotel.location}</p>
                            <strong>₹{hotel.price} / night</strong>
                        </Popup>

                    </Marker>

                ))}

            </MapContainer>

        </div>
    )
}

export default Hotelmap
