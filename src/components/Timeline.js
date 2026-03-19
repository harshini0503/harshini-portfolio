import { TIMELINE } from '@/lib/data'
export default function Timeline() {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto'}}>
      <div className="eyebrow rv">Journey</div>
      <h2 className="stitle rv d1">Career <span className="gold">Timeline</span></h2>
      <div className="tlwrap">
        <div className="tltrack"/>
        {TIMELINE.map((t,i)=>(
          <div key={i} className={`tle ${i%2===0?'rl':'rr'}`}>
            {i%2===0?(
              <><div className="tlc"><div className="tlyear">{t.year}</div><div className="tltitle">{t.title}</div><div className="tlorg">{t.org}</div><div className="tldet">{t.detail}</div></div><div className="tls"/></>
            ):(
              <><div className="tls"/><div className="tlc"><div className="tlyear">{t.year}</div><div className="tltitle">{t.title}</div><div className="tlorg">{t.org}</div><div className="tldet">{t.detail}</div></div></>
            )}
            <div className="tldw"><div className="tld" style={{background:t.color,boxShadow:`0 0 0 4px ${t.color}33,0 0 14px ${t.color}55`}}/></div>
          </div>
        ))}
      </div>
    </div>
  )
}