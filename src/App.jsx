import './App.css'
import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const CITIES = [
  { id: 1, city: "Paris",      lat: 48.85, lon:  2.35 },
  { id: 2, city: "Lyon",       lat: 45.75, lon:  4.85 },
  { id: 3, city: "Brest",      lat: 48.39, lon: -4.49 },
  { id: 4, city: "Marseille",  lat: 43.30, lon:  5.37 },
  { id: 5, city: "Strasbourg", lat: 48.58, lon:  7.75 },
]

function getWeatherIcon(code) {
  if (code === 0) return "☀️"
  if (code <= 3)  return "⛅"
  if (code <= 48) return "🌫️"
  if (code <= 67) return "🌧️"
  if (code <= 77) return "🌨️"
  if (code <= 82) return "🌧️"
  return "⛈️"
}

function getWeatherDesc(code) {
  if (code === 0)  return "Ensoleillé"
  if (code <= 3)   return "Nuageux"
  if (code <= 48)  return "Brouillard"
  if (code <= 55)  return "Bruine"
  if (code <= 67)  return "Pluvieux"
  if (code <= 77)  return "Neigeux"
  if (code <= 82)  return "Averses"
  return "Orageux"
}

function App() {
  const [searchTerm,  setSearchTerm]  = useState("")
  const [weatherData, setWeatherData] = useState([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)
  const [refresh,     setRefresh]     = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const responses = await Promise.all(
          CITIES.map(({ lat, lon }) =>
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`,
              { signal: controller.signal }
            ).then(res => {
              if (!res.ok) throw new Error("Erreur réseau")
              return res.json()
            })
          )
        )

        const data = CITIES.map((city, i) => ({
          id:   city.id,
          city: city.city,
          temp: Math.round(responses[i].current.temperature_2m),
          desc: getWeatherDesc(responses[i].current.weathercode),
          icon: getWeatherIcon(responses[i].current.weathercode),
        }))

        setWeatherData(data)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    return () => controller.abort()
  }, [refresh])

  const filteredCities = weatherData.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <h1 className="flex justify-center pb-4">Weather App</h1>

      {/* Prop drilling commence ici : onClear et onRefresh sont des callbacks
          passés vers SearchBar depuis App, qui possède le state */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
        onRefresh={() => setRefresh(r => r + 1)}
        loading={loading}
      />

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <p className="w-full text-center">{filteredCities.length} ville(s) trouvée(s)</p>
          {filteredCities.map((city) => (
            <WeatherCard
              key={city.id}
              city={city.city}
              temperature={city.temp}
              description={city.desc}
              icon={city.icon}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App
