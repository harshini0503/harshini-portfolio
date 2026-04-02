'use client'
import { useState } from 'react'
import { LEADERSHIP } from '@/lib/data'

export default function Leadership() {
  const [open, setOpen] = useState(null)

  return (
    <div className="vol-outer" id="volunteer">
      <div className="vol-header">
        <div className="lead-eyebrow rv">Volunteering &amp; Leadership</div>
        <h2 className="stitle rv d1">Community &amp; <span className="gold">Impact</span></h2>
      </div>

      <div className="vol-grid rv d2">
        {LEADERSHIP.map((l,i)=>(
          <div key={i} className={`vol-card${open===i?' vol-card-open':''}`}>

            {/* Card header bar */}
            <div className="vol-card-top">
              <div className="vol-card-icon-wrap">
                <span className="vol-card-icon">{l.icon}</span>
              </div>
              <div className="vol-card-meta">
                <div className="vol-role">{l.role}</div>
                <div className="vol-org">{l.org}</div>
              </div>
              <div className="vol-period">{l.date}</div>
            </div>

            {/* Description */}
            <div className="vol-desc">{l.desc}</div>

            {/* Highlights — always visible but collapsible on mobile */}
            <div className="vol-highlights">
              {l.highlights && l.highlights.map((h,j)=>(
                <div key={j} className="vol-hi">
                  <span className="vol-hi-dot"/>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="vol-tags">
              {l.tags.map((t,j)=><span key={j} className="vol-tag">{t}</span>)}
            </div>

            {/* Footer with link */}
            {l.website && (
              <div className="vol-footer">
                <a
                  href={l.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vol-link"
                >
                  <span className="vol-link-label">{l.website.label.replace(' ↗','')}</span>
                  <span className="vol-link-arrow">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
