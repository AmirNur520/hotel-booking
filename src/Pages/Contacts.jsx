import { useState } from 'react'
import '../Pages/Contacts.css'

export default function Contacts() {
    const [send, setSend] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [error, setError] = useState('')
    
    const change = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        setError('')
    }

    const submit = (e) => {
        e.preventDefault()
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError('Заполните все поля перед отправкой!')
            return
        }
        if (!form.email.includes('@') || !form.email.includes('.')) {
            setError('Введите корректный Email!')
            return
        }
        setSend(true)
        setForm({
            name: '',
            email: '',
            message: ''
        })
        setTimeout(() => {
            setSend(false)
        }, 2500)

    }


    return (
        <div className="contacts__block">
            <h1>Свяжитесь с нами</h1>
            <p>Мы всегда рады вашим отзывам и вопросам!</p>

            <form className='contacts__form'>
                <input type="text" name='name' value={form.name} onChange={change} placeholder='Введите ваше имя' />
                <input type="email" name='email' value={form.email} onChange={change} placeholder='Введите ваш Email' />
                <textarea rows='5' name='message' value={form.message} onChange={change} placeholder='Введите ваше сообщение'></textarea>
                <button className='btn-sub' onClick={submit} type='submit'>Отправить</button>
            </form>
            {error && <h3 className='error__title'>{error}</h3>}
            {send && (
                <div className="contacts__modal">
                    <div className="contacts__content">
                    <h2 className='modal__text'>Сообщение успешно отправлено!</h2>
                    </div>
                </div>
            )}
            <div className="contacts__info">
                <h3>Контактные данные</h3>
                <p>📍 Ташкент, ул. Амира, 60</p>
                <p>📞 +998 (91) 567-44-77</p>
                <p>✉️ support@hotelbooking.com</p>
                <iframe title='map'
                width="100%"
                height="250"
                style={{border: 0, borderRadius: 7}}
                allowFullScreen=""
                loading='lazy'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.978640858642!2d69.2807290154175!3d41.31108117927225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bdfab000001%3A0x9dbb0b18497a3e6b!2z0KLQsNGI0LrQtdC90YIsINCi0LDYt9Cw0YLRgdC60L7Qs9C-LCDQodCw0YLRgNC-0LXQvdGC!5e0!3m2!1sru!2s!4v1697123456789" 
                ></iframe>
            </div>
        </div>
    )
}