export const CITIES = [
  { id: 1, city: "Paris",      lat: 48.85, lon:  2.35 },
  { id: 2, city: "Lyon",       lat: 45.75, lon:  4.85 },
  { id: 3, city: "Brest",      lat: 48.39, lon: -4.49 },
  { id: 4, city: "Marseille",  lat: 43.30, lon:  5.37 },
  { id: 5, city: "Strasbourg", lat: 48.58, lon:  7.75 },
]

export function getWeatherIcon(code) {
  if (code === 0) return "☀️"
  if (code <= 3)  return "⛅"
  if (code <= 48) return "🌫️"
  if (code <= 67) return "🌧️"
  if (code <= 77) return "🌨️"
  if (code <= 82) return "🌧️"
  return "⛈️"
}

export function getWeatherDesc(code) {
  if (code === 0)  return "Ensoleillé"
  if (code <= 3)   return "Nuageux"
  if (code <= 48)  return "Brouillard"
  if (code <= 55)  return "Bruine"
  if (code <= 67)  return "Pluvieux"
  if (code <= 77)  return "Neigeux"
  if (code <= 82)  return "Averses"
  return "Orageux"
}
