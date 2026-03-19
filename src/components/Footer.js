import { NAV_LINKS } from '@/lib/data'
export default function Footer() {
  return (
    <footer>
      <div className="flogo">HK</div>
      <div className="fnav">
        {NAV_LINKS.map(l=><a key={l.href} href={l.href}>{l.label}</a>)}
      </div>
      <div className="fcopy">© 2025 Harshini Kanamathareddy · San Jose, CA</div>
    </footer>
  )
}