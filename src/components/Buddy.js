'use client'
import { useState } from 'react'

const GREETINGS = [
  "Hey! I'm Spark ⚡ — need a shortcut?",
  "Looking for something specific?",
  "Psst — I know some good shortcuts.",
  "Want the quick tour?",
]

export default function Buddy() {
  const [open, setOpen] = useState(false)
  const [pop, setPop] = useState(false)
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)])

  const handleClick = () => {
    setOpen(o => !o)
    setPop(true)
    setTimeout(() => setPop(false), 500)
  }

  return (
    <div className="buddy-wrap">
      {open && (
        <div className="buddy-panel">
          <button className="buddy-close" aria-label="Close" onClick={()=>setOpen(false)}>✕</button>
          <p className="buddy-greet">{greeting}</p>
          <div className="buddy-actions">
            <a href="#projects" className="buddy-chip" onClick={()=>setOpen(false)}>🚀 See projects</a>
            <a href="#skills" className="buddy-chip" onClick={()=>setOpen(false)}>🛠 Skills</a>
            <a href="#contact" className="buddy-chip" onClick={()=>setOpen(false)}>👋 Say hi</a>
            <a href="https://drive.google.com/file/d/1x0byfVAJL_6gnc3wO-X3nlIHu8bdRzgA/view?usp=drive_link"
              target="_blank" rel="noopener noreferrer" className="buddy-chip" onClick={()=>setOpen(false)}>📄 Resume</a>
          </div>
        </div>
      )}

      <div className="buddy-stage">
        <span className="buddy-hand">👋</span>
        <span className="buddy-spark s1"/>
        <span className="buddy-spark s2"/>

        <button
          className={`buddy-btn${open ? ' on' : ''}${pop ? ' pop' : ''}`}
          onClick={handleClick}
          aria-label={open ? 'Close assistant' : 'Open assistant'}
        >
          <svg viewBox="0 0 60 60" width="34" height="34">
            <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(200,168,74,.5)" strokeWidth="1.4"/>
            <line x1="30" y1="9" x2="30" y2="2" stroke="rgba(200,168,74,.8)" strokeWidth="1.6"/>
            <circle cx="30" cy="2" r="2.4" fill="var(--gold2)"/>

            <g className="buddy-eye" style={{transformOrigin:'21px 30px'}}>
              <circle cx="21" cy="30" r="4.2" fill="rgba(7,8,16,.7)" stroke="rgba(200,168,74,.4)" strokeWidth="0.6"/>
              <g className="buddy-pupil-wrap" style={{transformOrigin:'21px 30px'}}>
                <circle cx="21" cy="30" r="2.1" fill="var(--gold2)"/>
              </g>
            </g>
            <g className="buddy-eye" style={{transformOrigin:'39px 30px'}}>
              <circle cx="39" cy="30" r="4.2" fill="rgba(7,8,16,.7)" stroke="rgba(200,168,74,.4)" strokeWidth="0.6"/>
              <g className="buddy-pupil-wrap" style={{transformOrigin:'39px 30px'}}>
                <circle cx="39" cy="30" r="2.1" fill="var(--gold2)"/>
              </g>
            </g>

            <path className="buddy-mouth" d="M20 40 q10 8 20 0" fill="none" stroke="var(--gold2)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
