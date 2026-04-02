'use client'
import { useState } from 'react'
import { PROJECTS } from '@/lib/data'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(PROJECTS[0].id)
  const [modal, setModal] = useState(null)
  const cats = [{k:'all',l:'All'},{k:'ai',l:'AI / ML'},{k:'web',l:'Full-Stack'},{k:'ios',l:'iOS'},{k:'iot',l:'IoT'}]
  const visible = PROJECTS.filter(p => filter==='all' || p.cat===filter)
  const activeProjAll = PROJECTS.find(p=>p.id===active)
  const activeProj = visible.includes(activeProjAll) ? activeProjAll : visible[0]
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
            <button key={c.k} className={`fb${filter===c.k?' on':''}`}
              onClick={()=>{ setFilter(c.k) }}>
              {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* Split-pane layout */}
      <div className="psplit rv d1">
        {/* Left: numbered list */}
        <div className="plist-panel">
          {visible.map((p,i)=>(
            <div
              key={p.id}
              className={`pentry${activeProj&&activeProj.id===p.id?' pentry-active':''}`}
              onClick={()=>setActive(p.id)}
            >
              <div className="pentry-num">0{i+1}</div>
              <div className="pentry-body">
                <div className="pentry-cat">{p.catLabel}</div>
                <div className="pentry-title">{p.title}</div>
                <div className="pentry-tags">
                  {p.tags.slice(0,3).map((t,j)=><span key={j} className="pentry-tag">{t}</span>)}
                </div>
              </div>
              <div className="pentry-arrow">→</div>
            </div>
          ))}
        </div>

        {/* Right: detail panel */}
        {activeProj && (
          <div className="pdetail">
            <div className="pdetail-img" style={{background: activeProj.bg}}>
              {activeProj.img
                ? <img src={activeProj.img} alt={activeProj.title} />
                : <span className="pdetail-emoji">{activeProj.emoji}</span>}
              <div className="pdetail-imgmeta">
                <span className="pdetail-badge">{activeProj.catLabel}</span>
                <span className="pdetail-date">{activeProj.date}</span>
              </div>
            </div>
            <div className="pdetail-content">
              <div className="pdetail-title">{activeProj.title}</div>
              <div className="pdetail-desc">{activeProj.desc}</div>
              <div className="pdetail-stack">
                {activeProj.tags.map((t,i)=><span key={i} className="pdetail-chip">{t}</span>)}
              </div>
              <div className="pdetail-actions">
                <button className="pdetail-cta" onClick={()=>setModal(activeProj.id)}>
                  Full Details ✦
                </button>
                {activeProj.github && (
                  <a href={activeProj.github} target="_blank" rel="noopener noreferrer" className="pdetail-gh">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
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
              {proj.github && (
                <div className="msec">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="mlink-btn" onClick={e=>e.stopPropagation()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
