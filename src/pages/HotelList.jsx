
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/pagination'

function HotelList() {

    const hotels = useSelector((state) => state.hotels.hotels)

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedLocation, setSelectedLocation] = useState('all')
    const [maxPrice, setMaxPrice] = useState(10000)

    const hotelsPerPage = 6

    // Get unique locations
    const locations = [
        ...new Set(hotels.map((hotel) => hotel.location))
    ]

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [search, selectedLocation, maxPrice])

    // Clear filters
    const clearFilters = () => {
        setSearch('')
        setSelectedLocation('all')
        setMaxPrice(10000)
    }

    // Search and filter hotels
    const filteredHotels = hotels
        .filter((hotel) =>
            hotel.title.toLowerCase().includes(search.toLowerCase()) ||
            hotel.location.toLowerCase().includes(search.toLowerCase())
        )
        .filter((hotel) =>
            selectedLocation === 'all' ||
            hotel.location === selectedLocation
        )
        .filter((hotel) => Number(hotel.price) <= maxPrice)

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredHotels.length / hotelsPerPage
    )

    const startIndex = (currentPage - 1) * hotelsPerPage

    const currentHotels = filteredHotels.slice(
        startIndex,
        startIndex + hotelsPerPage
    )

    // Handle page change when filtered results decrease
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    return (
        <div className="app-container">

            {/* Navbar */}
            <nav className="navbar">
                <h2>Hotel Booking</h2>
                <a href="/">Home</a>
            </nav>

            {/* Hotel Header */}
            <div className="hotel-header">
                <div>
                    <h1>Our Hotels</h1>
                    <p>Find the perfect stay for your next trip.</p>
                </div>

                <button onClick={() => navigate('/add-hotel')}>
                    + Add Hotel
                </button>
            </div>

            {/* Search and Filters */}
            <div className="hotel-filters">

                <input
                    type="text"
                    placeholder="Search hotels..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="all">All Locations</option>

                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                {/* Price Range Filter */}
                <div className="price-filter">

                    <div className="price-label">
                        <label>Maximum Price</label>
                        <span>
                            ₹{maxPrice.toLocaleString('en-IN')}
                        </span>
                    </div>

                    <button
                        className="clear-filter-btn"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="500"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(Number(e.target.value))
                        }
                    />

                </div>

            </div>

            {/* Results Count */}
            <p className="results-count">
                {filteredHotels.length} hotels found
            </p>

            {/* Hotel Cards */}
            <div className="hotel-list">

                {currentHotels.length > 0 ? (

                    currentHotels.map((hotel) => (

                        <div className="hotel-card" key={hotel.id}>

                            <img
                                src={hotel.image}
                                alt={hotel.title}
                            />

                            <div className="hotel-details">

                                <h3>{hotel.title}</h3>

                                <p className="hotel-location">
                                    {hotel.location}
                                </p>

                                <p className="hotel-description">
                                    {hotel.description}
                                </p>

                                <h4>
                                    ₹{Number(hotel.price).toLocaleString('en-IN')}
                                    <span> / night</span>
                                </h4>

                                {/* Details and Booking Buttons */}
                                <div className="hotel-actions">

                                    <button
                                        className="details-btn"
                                        onClick={() =>
                                            navigate(`/hotel/${hotel.id}`)
                                        }
                                    >
                                        View Details
                                    </button>

                                    <button
                                        className="book-now-btn"
                                        onClick={() =>
                                            navigate(`/hotel/${hotel.id}`)
                                        }
                                    >
                                        Book Now
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="no-hotels">
                        No hotels found.
                    </p>

                )}

            </div>

            {/* Pagination */}
            {totalPages > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

        </div>
    )
}

export default HotelList
