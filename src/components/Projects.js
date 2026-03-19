'use client'
import { useState } from 'react'
import { PROJECTS } from '@/lib/data'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState(null)
  const cats=[{k:'all',l:'All'},{k:'ai',l:'AI / ML'},{k:'web',l:'Full-Stack'},{k:'ios',l:'iOS'},{k:'iot',l:'IoT'}]
  const proj = modal ? PROJECTS.find(p=>p.id===modal) : null
  return (
    <div className="proj-max">
      <div className="proj-head">
        <div>
          <div className="eyebrow rv">Portfolio</div>
          <h2 className="stitle rv d1">Selected <span className="gold">Projects</span></h2>
        </div>
        <div className="filters rv d2">
          {cats.map(c=>(
            <button key={c.k} className={`fb${filter===c.k?' on':''}`} onClick={()=>setFilter(c.k)}>{c.l}</button>
          ))}
        </div>
      </div>
      <div className="plist rv d1">
        {PROJECTS.map(p=>(
          <div key={p.id} className={`prow${filter!=='all'&&p.cat!==filter?' gone':''}`} onClick={()=>setModal(p.id)}>
            <div className="pico" style={{background:p.bg,overflow:'hidden'}}>
              {p.img
                ? <img src={p.img} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transition:'transform .4s',display:'block'}}
                    onMouseEnter={e=>e.target.style.transform='scale(1.07)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'}
                  />
                : <span style={{fontSize:'2.2rem'}}>{p.emoji}</span>}
            </div>
            <div className="pbody">
              <div className="ptop"><div className="pcat">{p.catLabel}</div><div className="pdate">{p.date}</div></div>
              <div className="ptitle">{p.title}</div>
              <div className="pdesc">{p.desc}</div>
              <div className="ptags">{p.tags.map((t,i)=><span key={i} className="ptag">{t}</span>)}</div>
            </div>
            <div className="parrow">✦</div>
          </div>
        ))}
      </div>
      {modal && proj && (
        <div className="mwrap open" onClick={e=>{if(e.target.classList.contains('mbg'))setModal(null)}}>
          <div className="mbg"/>
          <div className="modal">
            <div className="mhdr">
              <div className="mt">{proj.title}</div>
              <div className="mp">{proj.catLabel} · {proj.date}</div>
              <button className="mcls" onClick={()=>setModal(null)}>✕</button>
            </div>
            <div className="mbody">
              <div className="msec"><div className="msh">Overview</div><p className="mpara">{proj.overview}</p></div>
              <div className="msec"><div className="msh">Key Contributions</div><ul className="mlist">{proj.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul></div>
              <div className="msec"><div className="msh">Tech Stack</div><div className="mchips">{proj.tech.map((t,i)=><span key={i} className="mchip">{t}</span>)}</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}