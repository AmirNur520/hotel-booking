import '../Footer/Footer.css'
import img_1 from '../assets/instagram.png'
import img_2 from '../assets/facebook.png'
import img_3 from '../assets/telegram.png'

export default function Footer() {
    return (
        <div className="footer__block">
            <div className="footer__logo">
            <h1 className='logo__text'>HotelBooking</h1>
            </div>
            <div className="footer__links">
            <img src={img_1} className='logo__img' />
            <a href='#!' className='link'>Instagram</a>
            <img src={img_2} className='logo__img' />
            <a href='#!' className='link'>Facebook</a>
            <img src={img_3} className='logo__img' />
            <a href='#!' className='link'>Telegram</a>
            </div>
            <p className='footer__text'>&copy; 2025 HotelBooking. Все права защищены.</p>
        </div>
    )
}