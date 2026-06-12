import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function Navigation() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex items-center gap-6 px-6 py-3 border-b mb-4 bg-(--nav-bg) border-(--nav-border)">
      <Link to="/" className="font-bold text-lg">
        Weather App
      </Link>
      <div className="flex items-center gap-4 ml-auto">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? "underline font-semibold" : ""}>
          Accueil
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? "underline font-semibold" : ""}>
          À propos
        </NavLink>

        <button
          onClick={toggleTheme}
          className="border border-(--nav-border) rounded-lg px-3 py-1 text-sm"
          aria-label="Basculer le thème">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Navigation
