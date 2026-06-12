import { useState, useEffect } from 'react'
import { CITIES, getWeatherIcon, getWeatherDesc } from '../data/cities'
import WeatherCard from '../components/WeatherCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

function Home() {
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

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
        onRefresh={() => setRefresh(r => r + 1)}
        loading={loading}/>

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
              icon={city.icon}/>
          ))}
        </div>
      )}
    </>
  )
}

export default Home
