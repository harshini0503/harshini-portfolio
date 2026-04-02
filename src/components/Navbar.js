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
        href="https://drive.google.com/file/d/1fqdOw7JaHlCtkBZ6cK3PPjVWlx0Vkr5H/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="nhire"
      >
        Resume ↗
      </a>
    </nav>
  )
}
