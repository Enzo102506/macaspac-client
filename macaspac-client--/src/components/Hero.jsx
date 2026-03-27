import { useState } from 'react'

export default function Hero({ heroImg, reactLogo, viteLogo }) {
  const [count, setCount] = useState(0)

  return (
    <section id="center" className="hero-section">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>
      <div className="hero-content">
        <h2>Get started</h2>
        <p>
          Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
        </p>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
    </section>
  )
}
