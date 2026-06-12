import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-500 mb-6">Cette page n'existe pas.</p>
      <button
        onClick={() => navigate('/')}
        className="border rounded-lg px-4 py-2">
      Retour à l'accueil
      </button>
    </div>
  )
}

export default NotFound
