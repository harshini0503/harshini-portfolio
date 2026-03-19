import { LEADERSHIP } from '@/lib/data'
export default function Leadership() {
  return (
    <div className="lead-outer">
      <div className="lead-eyebrow rv">Volunteering &amp; Leadership</div>
      <div className="lcards rv d1">
        {LEADERSHIP.map((l,i)=>(
          <div className="lcard" key={i}>
            <div className="lcard-icon">{l.icon}</div>
            <div>
              <div className="lrole">{l.role}</div>
              <div className="lorg">{l.org}</div>
              <div className="ldate">{l.date}</div>
              <div className="ldesc">{l.desc}</div>
              <div className="ltags">{l.tags.map((t,j)=><span key={j} className="ltag">{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}