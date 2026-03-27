export default function LinkCard({ href, icon, label, target = "_blank" }) {
  return (
    <li>
      <a href={href} target={target}>
        {React.isValidElement(icon) ? (
          icon
        ) : typeof icon === 'string' ? (
          <img className="button-icon" src={icon} alt="" />
        ) : (
          icon
        )}
        {label}
      </a>
    </li>
  )
}
