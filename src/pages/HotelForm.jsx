
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addHotel, updateHotel } from '../redux/hotelSlice'

function HotelForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const hotels = useSelector((state) => state.hotels.hotels)

    const hotel = hotels.find((item) => String(item.id) === id)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        latitude: '',
        longitude: '',
        price: '',
        image: ''
    })

    const [errors, setErrors] = useState({})

    // Load existing hotel details while editing
    useEffect(() => {
        if (hotel) {
            setFormData({
                title: hotel.title || '',
                description: hotel.description || '',
                location: hotel.location || '',
                latitude: hotel.latitude ?? '',
                longitude: hotel.longitude ?? '',
                price: hotel.price ?? '',
                image: hotel.image || ''
            })
        }
    }, [hotel])

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            setErrors((prev) => ({
                ...prev,
                image: 'Please select a valid image file'
            }))
            e.target.value = ''
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
                ...prev,
                image: 'Image size must be less than 5 MB'
            }))
            e.target.value = ''
            return
        }

        const reader = new FileReader()

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                image: reader.result
            }))

            setErrors((prev) => ({
                ...prev,
                image: ''
            }))
        }

        reader.readAsDataURL(file)
    }

    // Validate form fields
    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Hotel name is required'
        } else if (formData.title.trim().length < 3) {
            newErrors.title = 'Hotel name must have at least 3 characters'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must have at least 10 characters'
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required'
        }

        if (formData.latitude.trim() === '') {
            newErrors.latitude = 'Latitude is required'
        } else if (
            !Number.isFinite(Number(formData.latitude)) ||
            Number(formData.latitude) < -90 ||
            Number(formData.latitude) > 90
        ) {
            newErrors.latitude = 'Latitude must be between -90 and 90'
        }

        if (formData.longitude.trim() === '') {
            newErrors.longitude = 'Longitude is required'
        } else if (
            !Number.isFinite(Number(formData.longitude)) ||
            Number(formData.longitude) < -180 ||
            Number(formData.longitude) > 180
        ) {
            newErrors.longitude = 'Longitude must be between -180 and 180'
        }

        if (formData.price === '') {
            newErrors.price = 'Price is required'
        } else if (
            !Number.isFinite(Number(formData.price)) ||
            Number(formData.price) <= 0
        ) {
            newErrors.price = 'Price must be greater than zero'
        }

        if (!formData.image) {
            newErrors.image = 'Please upload a hotel image'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        const hotelData = {
            ...formData,
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
            price: Number(formData.price),
            id: hotel ? hotel.id : Date.now()
        }

        if (hotel) {
            dispatch(updateHotel(hotelData))
        } else {
            dispatch(addHotel(hotelData))
        }

        navigate('/')
    }

    return (
        <div className="app-container">

            <nav className="navbar">
                <h2>Hotel Booking</h2>
                <a href="/">Home</a>
            </nav>

            <div className="form-container">

                <h1>{hotel ? 'Edit Hotel' : 'Add Hotel'}</h1>

                <form onSubmit={handleSubmit}>

                    {/* Hotel Image */}
                    <div className="form-group">
                        <label>Hotel Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {errors.image && (
                            <span className="error-message">
                                {errors.image}
                            </span>
                        )}

                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Hotel Preview"
                            />
                        )}
                    </div>

                    {/* Hotel Name */}
                    <div className="form-group">
                        <label>Hotel Name</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter hotel name"
                        />

                        {errors.title && (
                            <span className="error-message">
                                {errors.title}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter hotel description"
                        />

                        {errors.description && (
                            <span className="error-message">
                                {errors.description}
                            </span>
                        )}
                    </div>

                    {/* Location */}
                    <div className="form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter hotel location"
                        />

                        {errors.location && (
                            <span className="error-message">
                                {errors.location}
                            </span>
                        )}
                    </div>

                    {/* Latitude */}
                    <div className="form-group">
                        <label>Latitude</label>

                        <input
                            type="number"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            placeholder="Enter latitude"
                            step="any"
                        />

                        {errors.latitude && (
                            <span className="error-message">
                                {errors.latitude}
                            </span>
                        )}
                    </div>

                    {/* Longitude */}
                    <div className="form-group">
                        <label>Longitude</label>

                        <input
                            type="number"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            placeholder="Enter longitude"
                            step="any"
                        />

                        {errors.longitude && (
                            <span className="error-message">
                                {errors.longitude}
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label>Price per Night (₹)</label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="1"
                        />

                        {errors.price && (
                            <span className="error-message">
                                {errors.price}
                            </span>
                        )}
                    </div>

                    <button type="submit">
                        {hotel ? 'Update Hotel' : 'Save Hotel'}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default HotelForm
