import { useEffect, useState } from "react";
import HotelCard from "../HotelCard/HotelCard";
import '../Pages/Favorites.css'

export default function Favorites() {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
            const fav = JSON.parse(localStorage.getItem('favorites')) || []
            setHotels(fav)
    }, [])

    return (
        <div className="favorites__page">
            <h1>Избранные отели</h1>

            {hotels.length === 0 ? (
                <h2>У вас пока нет избранных отелей</h2>
            ) :  (
                <div className="hotels">
                    {hotels.map(h => (
                        <HotelCard key={h.hotelId} hotel={h} />
                    ))}
                </div>
            )}
        </div>
    )
}