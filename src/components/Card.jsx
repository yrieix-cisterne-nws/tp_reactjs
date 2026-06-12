function Card({ children, className = "" }) {
  return (
    <div className={`p-4 rounded-lg ${className} `}>
      {children}
    </div>
  )
}

export default Card
