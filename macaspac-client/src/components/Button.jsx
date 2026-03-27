export default function Button({ label, onClick, variant = 'primary', type = 'button' }) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`button button-${variant}`}
    >
      {label}
    </button>
  )
}
