import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar.jsx'
import Footer from './Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import Hotels from './Pages/Hotels.jsx'
import About from './Pages/About.jsx'
import Contacts from './Pages/Contacts.jsx'
import NotFound from './Pages/NotFound.jsx'
import Preloader from './Preloader/Preloader.jsx';
import Favorites from './Pages/Favorites.jsx';
import './App.css'

function Content() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [disappear, setDisappear] = useState(false)

  useEffect(() => {
    setDisappear(true)
    setLoading(true)
    const timer = setTimeout(() => {
      setDisappear(false)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
   <div className={`app__block ${disappear ? 'dissapear' : ''}`}>
    {loading && <Preloader />}
      <Navbar />
      <div className={`page__content ${disappear ? 'dissapear__out' : 'dissapear__in'}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Hotels' element={<Hotels />} />
        <Route path='/Favorites' element={<Favorites />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contacts' element={<Contacts />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </div>
   <Footer />
   </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
    <Content />
    </BrowserRouter>
  )
}