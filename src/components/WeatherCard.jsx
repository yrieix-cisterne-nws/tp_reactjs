import Card from "./Card"
import WeatherDetail from "./WeatherDetail"

function WeatherCard({ city, temperature, description, icon }) {
  return (
    <Card className={`${temperature >= 20 ? "bg-red-500" : "bg-blue-500"} text-white min-h-35`}>
      <h2>{city}</h2>
      <WeatherDetail temperature={temperature} description={description} icon={icon} />
    </Card>
  )
}

export default WeatherCard
