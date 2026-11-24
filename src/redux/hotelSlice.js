
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hotels: [
        {
            id: 1,
            title: 'Grand Palace Hotel',
            description: 'Luxury hotel with comfortable rooms.',
            location: 'Chennai, India',
            price: 4500,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR868riPJz8DVHU0f93iq9mILRCwTYquVcdUtYF_i7CC7LBF2zgt-LVodw&s=10'
        },
        {
            id: 2,
            title: 'Ocean View Resort',
            description: 'Beautiful resort with ocean views.',
            location: 'Goa, India',
            price: 3500,
            image: 'https://www.vacationstravel.com/wp-content/uploads/2017/03/Copy-of-Copy-of-011A1895-Edit-1024x683.jpg'
        },
        {
            id: 3,
            title: 'Royal Heritage Stay',
            description: 'Traditional heritage hotel.',
            location: 'Jaipur, India',
            price: 2800,
            image: 'https://r2imghtlak.ibcdn.com/r2-mmt-htl-image/htl-imgs/201712141807116805-53b9e71d-a252-4c74-acae-794e2196a2f4.jpg?&output-quality=75&downsize=336:168&crop=336:168;0,40&output-format=webp'
        }
    ]
}

const hotelSlice = createSlice({
    name: 'hotels',
    initialState,

    reducers: {
        addHotel: (state, action) => {
            state.hotels.push(action.payload)
        },

        updateHotel: (state, action) => {
            const index = state.hotels.findIndex(
                hotel => hotel.id === action.payload.id
            )

            if (index !== -1) {
                state.hotels[index] = action.payload
            }
        },

        deleteHotel: (state, action) => {
            state.hotels = state.hotels.filter(
                hotel => hotel.id !== action.payload
            )
        }
    }
})

export const { addHotel, updateHotel, deleteHotel } = hotelSlice.actions

export default hotelSlice.reducer



