import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CityDetail from './pages/CityDetail'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navigation />
      <main className="px-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/city/:cityName" element={<CityDetail />}/>
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
