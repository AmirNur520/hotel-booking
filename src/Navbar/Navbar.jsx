import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Navbar/Navbar.css'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => setOpen(!open)
    const closeMenu = () => setOpen(false)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'auto'
        }
    })

    return (
        <div className="navbar__block">
            <h1 className='logo__text'><Link to='/' className='logo__text' onClick={closeMenu}>HotelBooking</Link></h1>
            <div className={`menu-icon ${open ? 'open' : ''}`} onClick={toggleMenu}>
                <div className='icons'></div>
                <div className='icons'></div>
                <div className='icons'></div>
            </div>
            <ul className={`nav-links ${open ? 'active' : ''}`}>
                <li><Link to='/' onClick={() => setOpen(false)}>Главная</Link></li>
                <li><Link to='/Hotels' onClick={() => setOpen(false)}>Отели</Link></li>
                <li><Link to='/Favorites' onClick={() => setOpen(false)}>Избранное</Link></li>
                <li><Link to='/About' onClick={() => setOpen(false)}>О нас</Link></li>
                <li><Link to='/Contacts' onClick={() => setOpen(false)}>Контакты</Link></li>
            </ul>
            {open && <div className='overlay__block' onClick={closeMenu}></div>}
        </div>
    )
}