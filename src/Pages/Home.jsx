import '../Pages/Home.css'
import { Link } from 'react-router-dom'
import img from '../assets/hotel.jpg'

export default function Home() {
    return (
        <div className="home__block">
            <div className="home__content">
                <div className="home__text">
                    <h1>Добро пожаловать в HotelBooking</h1>
                    <p>Найдите лучшие отели по всему миру и забронируйте прямо сейчас.</p>
                    <Link to="/Hotels" className='btn-hotels'>Перейти к отелям</Link>
                </div>
                <div className="hotel__img">
                    <img src={img} alt="Main hotel" />
                </div>
            </div>

            <div className="advantages__block">
                <h1>Почему выбирают нас</h1>
                <div className="advantages__cards">
                    <div className="adv__card">
                        <h3>🕒 Быстрое бронирование</h3>
                        <p>Забронируйте отель всего за пару кликов.</p>
                    </div>
                    <div className="adv__card">
                        <h3>💰 Лучшие цены</h3>
                        <p>Мы предлагаем только актуальные и выгодные предложения.</p>
                    </div>
                    <div className="adv__card">
                        <h3>🌍 Множество направлений</h3>
                        <p>От Ташкента до Дубая — более 100 направлений для вашего отдыха.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}