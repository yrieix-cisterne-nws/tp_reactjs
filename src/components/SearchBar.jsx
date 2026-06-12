function SearchBar({ value, onChange, onClear, onRefresh, loading }) {
  return (
    <div className="flex justify-center gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Rechercher une ville..."
        className="border p-2 rounded-lg mb-4"
      />
      <button onClick={onClear} className="border rounded-lg mb-4 px-3">
        Effacer
      </button>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="border rounded-lg mb-4 px-3"
      >
        Actualiser
      </button>
    </div>
  )
}

export default SearchBar
