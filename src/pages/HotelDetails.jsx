
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

function HotelDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const hotels = useSelector((state) => state.hotels.hotels)

    const hotel = hotels.find(
        (item) => String(item.id) === String(id)
    )

    if (!hotel) {
        return (
            <div className="app-container">

                <nav className="navbar">
                    <h2>Hotel Booking</h2>
                </nav>

                <div className="hotel-not-found">
                    <h2>Hotel not found!</h2>

                    <button onClick={() => navigate('/')}>
                        Back to Hotels
                    </button>
                </div>

            </div>
        )
    }

    return (
        <div className="app-container">

            {/* Navbar */}
            <nav className="navbar">
                <h2>Hotel Booking</h2>

                <button
                    className="back-hotels-btn"
                    onClick={() => navigate('/')}
                >
                    Back to Hotels
                </button>
            </nav>

            {/* Hotel Details */}
            <div className="hotel-details-page">

                {/* Hotel Image */}
                <div className="details-image-container">

                    <img
                        src={hotel.image}
                        alt={hotel.title}
                        className="details-image"
                    />

                </div>

                {/* Hotel Information */}
                <div className="details-content">

                    <p className="details-label">
                        HOTEL INFORMATION
                    </p>

                    <h1>{hotel.title}</h1>

                    <p className="details-location">
                        {hotel.location}
                    </p>

                    <div className="details-divider"></div>

                    {/* Description */}
                    <div className="details-description-section">

                        <h2>About This Hotel</h2>

                        <p className="details-description">
                            {hotel.description}
                        </p>

                    </div>

                    {/* Price */}
                    <div className="details-price-section">

                        <div>
                            <p>Price per night</p>

                            <h2>
                                ₹{Number(hotel.price).toLocaleString('en-IN')}
                            </h2>
                        </div>

                        <span className="price-note">
                            Exclusive hotel stay
                        </span>

                    </div>

                    {/* Booking Button */}
                    <button
                        className="book-btn"
                        onClick={() => navigate(`/booking/${hotel.id}`)}
                    >
                        Book Now
                    </button>

                </div>

            </div>

        </div>
    )
}

export default HotelDetails
