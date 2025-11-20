import { Link } from 'react-router-dom'
import '../Pages/NotFound.css'
import img_error from '../assets/error.jpg'

export default function NotFound() {
    return (
        <div className="notfound__block">
            <img src={img_error} className='error' />
            <h1>Ошибка 404</h1>
            <h2>Страница не найдена</h2>
            <Link to="/" className='btn'>На главную</Link>
        </div>
    )
}