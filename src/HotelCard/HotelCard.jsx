import { useState, useEffect } from 'react'
import '../HotelCard/HotelCard.css'
import { get_hotel_offers } from '../Api/Api'

export default function HotelCard({ hotel }) {
    const [available, setAvailable] = useState(true)
    const [show, setShow] = useState(false)
    const [offer, setOffer] = useState(null)
    const [loadOffer, setLoadOffer] = useState(false)
    const [local, setLocal] = useState(hotel)
    const [fav, setFav] = useState(false)

    useEffect(() => {
        const is_fav = JSON.parse(localStorage.getItem('favorites')) || []
        setFav(is_fav.includes(hotel.hotelId))
    }, [hotel.hotelId])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(`hotel-${hotel.name}`))
        if (saved !== null) {
            setAvailable(saved)
        }
    }, [hotel.name])

    const toggle_fav = () => {
        let favs = JSON.parse(localStorage.getItem('favorites')) || []

        if (fav) {
            favs = favs.filter(h => h.hotelId !== hotel.hotelId)
        }
        else {
            if (!favs.some(h => h.hotelId === hotel.hotelId)) {
            favs.push(local)
            }
        }
        
        localStorage.setItem('favorites', JSON.stringify(favs))
        setFav(!fav)
    }

    const toggle = async () => {
        setShow(true)
        if (!offer) {
            setLoadOffer(true)
            const data = await get_hotel_offers(hotel.hotelId)
            setOffer(data)
            setLoadOffer(false)

        if (data?.offers?.[0]) {
            setLocal((prev) => ({
                ...prev,
                rating: data.hotel?.rating || prev.rating,
                price: data.offers[0].price?.total || prev.price
            }))
        }    
        }
    }
    const confirm = () => {
        const new_state = !available
        setAvailable(new_state)
        localStorage.setItem(`hotel-${hotel.name}`, JSON.stringify(new_state))
        setShow(false)
    }

    const stars = (rating) => {
        return '⭐'.repeat(rating || 0)
    }


    return (
        <>
            <div className="hotel__card">
                <img src={hotel.photo?.images?.large?.url} alt={hotel.name} />
                <div className="hotel__info">
                    <h2 className='card__text'>{local.name}</h2>
                    <h4>{local.address?.lines?.join(', ')}, {local.address?.cityName}</h4>
                    <h4 className='rating'>{stars(local.rating)} ({local.rating})</h4>
                    <p className={`status ${available ? 'available' : 'busy'}`}>
                        {available ? 'Доступен' : 'Занят'}
                    </p>
                    <div className="btns">
                    <button className='btn-toggle' onClick={toggle}>{available ? 'Подробнее' : 'Отменить'}</button>
                    <button className={`btn-fav ${fav ? 'active' : ''}`} onClick={toggle_fav}>
                        {fav ? 'Убрать из избранного' : 'В избранное ⭐'}
                    </button>
                    </div>
                    </div>
                </div>
            {show && (
                <div className="modal__block">
                    <div className="modal__content">
                        <h2 className='card__text'>{local.name}</h2>
                        {loadOffer ? (
                            <h4>Загрузка информации...</h4>
                        ) : offer ? (
                            <>
                            <h4>Рейтинг: {offer.hotel?.rating} ⭐</h4>
                            <h4>Тип комнаты: {offer.offers?.[0]?.room?.type}</h4>
                            <h4>Кроватей: {offer.offers?.[0]?.room?.typeEstimated?.beds}</h4>
                            <h4>Цена: {offer.offers?.[0]?.price?.total} {offer.offers?.[0]?.price?.currency}</h4>
                            </>
                        ) : (
                            <h4>Нет данных по ценам</h4>
                        )}
                        <h3>{available ? 'Забронировать отель?' : 'Отменить бронь?'}</h3>
                        <div className="modal__buttons">
                            <button className='confirm-btn' onClick={confirm}>Подтвердить</button>
                            <button className='cancel-btn' onClick={() => setShow(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}