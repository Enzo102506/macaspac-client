export default function Section({ id, icon, title, description, children }) {
  return (
    <div id={id} className="section-card">
      <svg className="icon" role="presentation" aria-hidden="true">
        <use href={icon}></use>
      </svg>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {children}
      </ul>
    </div>
  )
}
