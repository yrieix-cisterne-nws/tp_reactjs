import Card from "./Card"
import WeatherDetail from "./WeatherDetail"
import { useNavigate } from 'react-router-dom'

function WeatherCard({ city, temperature, description, icon }) {
  const navigate = useNavigate()

  return (
    <Card className={`${temperature >= 20 ? "bg-red-500" : "bg-blue-500"} text-white min-h-43`}>
      <h2>{city}</h2>
      <div className="flex flex-col">
        <WeatherDetail temperature={temperature} description={description} icon={icon} />
        <button
          onClick={() => navigate(`/city/${city}`)}
          className="mt-2 text-black bg-white rounded-lg p-1 text-sm">
          Voir les détails
        </button>
      </div>
    </Card>
  )
}

export default WeatherCard;