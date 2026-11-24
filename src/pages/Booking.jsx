
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Booking() {

    const { id } = useParams()
    const navigate = useNavigate()

    const hotels = useSelector((state) => state.hotels.hotels)

    const hotel = hotels.find(
        (item) => String(item.id) === String(id)
    )

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [error, setError] = useState('')

    // Calculate number of nights
    const calculateNights = () => {

        if (!checkIn || !checkOut) {
            return 0
        }

        const startDate = new Date(checkIn + 'T00:00:00')
        const endDate = new Date(checkOut + 'T00:00:00')

        const difference = endDate - startDate

        return difference / (1000 * 60 * 60 * 24)
    }

    const nights = calculateNights()

    // Calculate total price
    const totalPrice = nights > 0
        ? nights * Number(hotel?.price || 0)
        : 0

    // Get today's date
    const today = new Date().toLocaleDateString('en-CA')

    // Handle check-in change
    const handleCheckIn = (value) => {
        setCheckIn(value)
        setError('')

        if (checkOut && value >= checkOut) {
            setCheckOut('')
        }
    }

    // Handle check-out change
    const handleCheckOut = (value) => {
        setCheckOut(value)
        setError('')
    }

    // Confirm booking
    const handleBooking = () => {

        if (!checkIn || !checkOut) {
            setError('Please select check-in and check-out dates.')
            return
        }

        if (nights <= 0) {
            setError('Check-out date must be after check-in date.')
            return
        }

        setError('')

        alert(
            `Booking Details\n\nHotel: ${hotel.title}\nGuests: ${guests}\nNights: ${nights}\nTotal Amount: ₹${totalPrice.toLocaleString('en-IN')}\n\nBooking feature will be implemented next!`
        )
    }

    if (!hotel) {
        return (
            <div className="app-container">
                <h2>Hotel not found!</h2>

                <button onClick={() => navigate('/')}>
                    Back to Hotels
                </button>
            </div>
        )
    }

    return (
        <div className="app-container">

            {/* Navbar */}
            <nav className="navbar">
                <h2>Hotel Booking</h2>

                <button onClick={() => navigate('/')}>
                    Back to Hotels
                </button>
            </nav>

            {/* Booking Page */}
            <div className="booking-container">

                <h1>Book Your Stay</h1>

                <p>
                    Complete your details to reserve your hotel.
                </p>

                {/* Hotel Information */}
                <div className="booking-hotel-card">

                    <img
                        src={hotel.image}
                        alt={hotel.title}
                    />

                    <div>
                        <h2>{hotel.title}</h2>

                        <p>{hotel.location}</p>

                        <h3>
                            ₹{Number(hotel.price).toLocaleString('en-IN')} / night
                        </h3>
                    </div>

                </div>

                {/* Booking Form */}
                <div className="booking-form">

                    <h2>Booking Details</h2>

                    {/* Check-in */}
                    <label>Check-in Date</label>

                    <input
                        type="date"
                        value={checkIn}
                        min={today}
                        onChange={(e) => handleCheckIn(e.target.value)}
                    />

                    {/* Check-out */}
                    <label>Check-out Date</label>

                    <input
                        type="date"
                        value={checkOut}
                        min={checkIn ? checkIn : today}
                        onChange={(e) => handleCheckOut(e.target.value)}
                    />

                    {/* Guests */}
                    <label>Number of Guests</label>

                    <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                    >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                    </select>

                    {/* Price Summary */}
                    <div className="booking-summary">

                        <h2>Booking Summary</h2>

                        <p>
                            Price per night:
                            <span>
                                ₹{Number(hotel.price).toLocaleString('en-IN')}
                            </span>
                        </p>

                        <p>
                            Number of nights:
                            <span>{nights > 0 ? nights : 0}</span>
                        </p>

                        <p>
                            Number of guests:
                            <span>{guests}</span>
                        </p>

                        <div className="booking-total">
                            <h3>Total Amount</h3>

                            <h2>
                                ₹{totalPrice.toLocaleString('en-IN')}
                            </h2>
                        </div>

                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="booking-error">
                            {error}
                        </p>
                    )}

                    {/* Confirm Booking */}
                    <button
                        className="confirm-booking-btn"
                        onClick={handleBooking}
                    >
                        Confirm Booking
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Booking
