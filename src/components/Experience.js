'use client'
import { useState } from 'react'
import { EXPERIENCE } from '@/lib/data'

export default function Experience() {
  const [active, setActive] = useState('e1')
  const cur = EXPERIENCE.find(e => e.id === active)
  return (
    <div className="ew">
      <div className="eyebrow rv">Work History</div>
      <h2 className="stitle rv d1">Professional <span className="gold">Experience</span></h2>
      <div className="elayout rv d2">
        <div className="etabs">
          {EXPERIENCE.map(e => (
            <button
              key={e.id}
              className={`etab${active === e.id ? ' on' : ''}`}
              onClick={() => setActive(e.id)}
            >
              {e.logo && (
                <img
                  src={e.logo}
                  alt={e.company}
                  className="etab-logo"
                />
              )}
              <span className="etab-co">{e.company}</span>
              <span className="etab-role">{e.role}</span>
            </button>
          ))}
        </div>
        {cur && (
          <div className="epanel on">
            <div className="erole">{cur.role}</div>
            <div className="ecomp">
              {cur.logo && <img src={cur.logo} alt={cur.company} className="ecomp-logo"/>}
              {cur.company}
              <span className="ebadge">{cur.period}</span>
            </div>
            <div className="eloc">📍 {cur.location}</div>
            <ul className="ebullets">
              {cur.bullets.map((b, i) => (
                <li key={i}>
                  {b.text}
                  {b.impact && <span className="imp">{b.impact}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
