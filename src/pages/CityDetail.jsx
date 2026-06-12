import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CITIES, getWeatherIcon, getWeatherDesc } from '../data/cities'
import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

function CityDetail() {
  const { cityName } = useParams()
  const navigate = useNavigate()

  const city = CITIES.find(
    (c) => c.city.toLowerCase() === cityName.toLowerCase()
  )

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!city) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weathercode,windspeed_10m,apparent_temperature&timezone=auto`,
      { signal: controller.signal }
    )
      .then(res => {
        if (!res.ok) throw new Error("Erreur réseau")
        return res.json()
      })
      .then(data => {
        const c = data.current
        setWeather({
          temp:       Math.round(c.temperature_2m),
          feelsLike:  Math.round(c.apparent_temperature),
          desc:       getWeatherDesc(c.weathercode),
          icon:       getWeatherIcon(c.weathercode),
        })
      })
      .catch(err => {
        if (err.name !== "AbortError") setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [city])

  if (!city) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl mb-4">Ville "{cityName}" introuvable.</p>
        <button
          onClick={() => navigate('/')}
          className="border rounded-lg px-4 py-2">
          Retour à l'accueil
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <button
        onClick={() => navigate('/')}
        className="border rounded-lg px-4 py-2 mb-6">
        Retour
      </button>

      <h1 className="text-3xl font-bold mb-4">{city.city}</h1>

      {loading && <LoadingSpinner />}
      {error   && <ErrorMessage message={error} />}

      {weather && (
        <Card className="bg-(--card-bg)">
          <p className="text-5xl mb-2">{weather.icon}</p>
          <p className="text-4xl font-bold mb-1">{weather.temp}°C</p>
          <p className="text-(--muted) mb-4">{weather.desc}</p>
          <div className="border-t border-(--nav-border) pt-4 space-y-2">
            <p>Ressenti : <strong>{weather.feelsLike}°C</strong></p>
            <p>Latitude : <strong>{city.lat}</strong></p>
            <p>Longitude : <strong>{city.lon}</strong></p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default CityDetail
