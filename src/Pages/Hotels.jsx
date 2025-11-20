import { useEffect, useState } from 'react'
import { get_hotels } from '../Api/Api.js'
import { hotel_images } from '../Unsplash/Unsplash.js'
import HotelCard from '../HotelCard/HotelCard'
import '../Pages/Hotels.css'

export default function Hotels() {
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState('TAS')

    const cities = [
        { name: 'Ташкент', code: 'TAS', query: 'hotel'},
        { name: 'Париж', code: 'PAR', query: 'paris hotel'},
        { name: 'Дубай', code: 'DXB', query: 'dubai hotel'},
        { name: 'Москва', code: 'MOW', query: 'moscow hotel'},
        { name: 'Стамбул', code: 'IST', query: 'istanbul hotel'},
    ]

    useEffect(() => {
        async function fetchHotels() {
            setLoading(true)
            try {
                const selected_city = cities.find(c => c.code === selected)
                const hotels_data = await get_hotels(selected_city.code)
                const img = await hotel_images(selected_city.query)

                const offers = hotels_data.slice(0, img.length).map((hotel, i) => ({
                    ...hotel,
                    photo: { images: { large: { url: img[i]?.urls?.regular } } }
                }))

                setHotels(offers)
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchHotels()
    }, [selected])


    return (
        <div className="hotels__page">
            <h1>Популярные отели</h1>
            <div className="city__select">
                <label className='enter__city' htmlFor="city">Выберите город:</label>
                <select id="city" value={selected} onChange={(e) => setSelected(e.target.value)}>
                    {cities.map((city) => (
                        <option key={city.code} value={city.code}>{city.name}</option>
                    ))}
                </select>
            </div>
            {loading ? (
                <h4 className='loading__text'>Загрузка отелей...</h4>
            ) : (
                <div className="hotels">
                    {hotels.map((hotel, i) => (
                        <HotelCard key={i} hotel={hotel} />
                    ))}
                </div>
            )}
        </div>
    )
}