'use client'
import { NAV_LINKS } from '@/lib/data'

export default function Navbar() {
  return (
    <nav id="nav">
      <a className="nlogo" href="#hero">HK</a>
      <ul className="nlinks">
        {NAV_LINKS.map(l=>(
          <li key={l.href}><a href={l.href} data-rune={l.rune}>{l.label}</a></li>
        ))}
      </ul>
      <a
        href="https://drive.google.com/file/d/1x0byfVAJL_6gnc3wO-X3nlIHu8bdRzgA/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        className="nhire"
      >
        Resume ↗
      </a>
    </nav>
  )
}
