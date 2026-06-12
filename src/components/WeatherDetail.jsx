import { useState } from "react"

function WeatherDetail({ temperature, description, icon }) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <>
      <p className="pb-2">
        {temperature}°C <span className="icon">{icon}</span>
      </p>
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="text-black bg-white rounded-lg p-1">
        Description
      </button>
      <p className={showDescription ? "" : "hidden"}>{description}</p>
    </>
  )
}

export default WeatherDetail
