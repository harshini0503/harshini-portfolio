'use client'
import { useState, useEffect } from 'react'
import { TRAIT_CHIPS } from '@/lib/data'

const ICONS = {
  chip: <svg viewBox="0 0 40 40" width="30" height="30"><circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2.4"/><circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="20" y1="2" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="38"/><line x1="2" y1="20" x2="8" y2="20"/><line x1="32" y1="20" x2="38" y2="20"/></g></svg>,
  club: <svg viewBox="0 0 40 40" width="26" height="26"><path fill="currentColor" d="M20 6a6 6 0 0 0-5.2 9c-.3-.05-.5-.05-.8-.05a6 6 0 1 0 3.9 10.6c-.7 2-1.8 3.8-3.4 5.45h11a15 15 0 0 1-3.4-5.45A6 6 0 1 0 26 15c-.3 0-.5 0-.8.05A6 6 0 0 0 20 6z"/></svg>,
  spade: <svg viewBox="0 0 40 40" width="26" height="26"><path fill="currentColor" d="M20 4c4 7 13 12.5 13 19.5A6.5 6.5 0 0 1 20 25.7c-.7 2.3-1.9 4.3-3.7 6.3h7.4c-1.8-2-3-4-3.7-6.3A6.5 6.5 0 0 1 7 23.5C7 16.5 16 11 20 4z"/></svg>,
  diamond: <svg viewBox="0 0 40 40" width="26" height="26"><path fill="currentColor" d="M20 4 33 20 20 36 7 20z"/></svg>,
  heart: <svg viewBox="0 0 40 40" width="26" height="26"><path fill="currentColor" d="M20 34C9 26 4 19.6 4 13.6 4 8.8 7.8 5 12.5 5c2.9 0 5.6 1.5 7.5 4 1.9-2.5 4.6-4 7.5-4C32.2 5 36 8.8 36 13.6 36 19.6 31 26 20 34z"/></svg>,
  dice: <svg viewBox="0 0 40 40" width="27" height="27"><rect x="6" y="6" width="28" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="2.4"/><circle cx="14" cy="14" r="2.4" fill="currentColor"/><circle cx="26" cy="14" r="2.4" fill="currentColor"/><circle cx="20" cy="20" r="2.4" fill="currentColor"/><circle cx="14" cy="26" r="2.4" fill="currentColor"/><circle cx="26" cy="26" r="2.4" fill="currentColor"/></svg>,
}

const FLAGSHIP = [
  { icon: 'chip',    tip: 'BetMGM',    bg: 'linear-gradient(135deg,#141414,#2a2318)', ring: 'rgba(228,192,90,.4)', color: '#e4c870' },
  { icon: 'club',    tip: 'Borgata',   bg: 'linear-gradient(135deg,#2a0e14,#3a1420)', ring: 'rgba(212,175,120,.4)', color: '#d4af78' },
  { icon: 'spade',   tip: 'partypoker',bg: 'linear-gradient(135deg,#1a0505,#2e0a0a)', ring: 'rgba(228,90,80,.4)',  color: '#e85a50' },
  { icon: 'diamond', tip: 'Coral',     bg: 'linear-gradient(135deg,#051a1a,#0a2e2e)', ring: 'rgba(90,200,190,.4)', color: '#5ac8be' },
  { icon: 'heart',   tip: 'Ladbrokes', bg: 'linear-gradient(135deg,#1a0808,#2e0e0e)', ring: 'rgba(228,110,90,.4)', color: '#e46e5a' },
  { icon: 'dice',    tip: 'bwin',      bg: 'linear-gradient(135deg,#1a1206,#2e200a)', ring: 'rgba(228,160,80,.4)', color: '#e4a050' },
]

const ALL_MARKETS = [
  'BetMGM.nj', 'BetMGM.pa', 'BetMGM.mi', 'borgata.nj', 'borgata.pa', 'partypoker.nj',
  'partypoker', 'bwin.com', 'bwin.be', 'premium', 'partypoker.se', 'bwin.gr', 'bwin.dk',
  'Coral', 'Ladbrokes', 'Sportingbet.gr', 'Crystalbet', 'Danske Spil', 'bpremium.de',
  'partypoker.de', 'bwin.de', 'LadbrokesBE', 'OptibetLV', 'OptibetEE', 'sportingbet.com',
  'partypoker.fr', 'bwin.fr', 'PMU.fr', 'partypoker.es', 'bwin.es',
  'bwin.it', 'giocodigitale.it', 'partypoker.it',
  'partypoker.on', 'bwin.on', 'betmgm.on',

]

function TerminalLog() {
  const [lines, setLines] = useState([])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % ALL_MARKETS.length)
    }, 1100)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setLines(ls => {
      const next = [...ls, ALL_MARKETS[idx]]
      return next.slice(-6)
    })
  }, [idx])

  return (
    <div className="term-box">
      <div className="term-head">
        <span className="term-dot r"/><span className="term-dot y"/><span className="term-dot g"/>
        <span className="term-title">deploy --status</span>
      </div>
      <div className="term-body">
        {lines.map((l, i) => (
          <div key={`${l}-${i}`} className="term-line" style={{opacity: 0.35 + (i / lines.length) * 0.65}}>
            <span className="term-check">✓</span> {l} <span className="term-dim">deployed</span>
          </div>
        ))}
        <span className="term-cursor">▌</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <div className="hwrap">
      <div>
        <div className="how"><span className="hname">HARSHINI</span></div>
        <div className="how"><span className="hname" style={{animationDelay:'.07s'}}>KANAMATHAREDDY</span></div>
        <div className="how" style={{marginTop:'.6rem'}}>
          <div className="htitle">iOS &amp; Full-Stack Engineer · <em>2+ years</em> shipping at scale</div>
        </div>
        <p className="hbio">I build <strong>production iOS apps</strong> and <strong>cloud-native systems</strong> reaching thousands daily. From Swift + WKWebView at Entain to <strong>PyTorch ML on AWS ECS</strong> — I engineer things that actually ship.</p>
        <div className="hbtns">
          <a href="#projects" className="btn-primary"><span>View My Work</span></a>
          <a href="#contact" className="btn-ghost">Get In Touch</a>
        </div>
        <div className="hstats">
          <div><div className="hstat-n" data-target="2">0</div><div className="hstat-l">Years Exp.</div></div>
          <div><div className="hstat-n" data-target="6">0</div><div className="hstat-l">Projects</div></div>
          <div><div className="hstat-n" data-target="30">0</div><div className="hstat-l">+ Apps</div></div>
        </div>
      </div>
      <div className="hvisual">
        <div className="hero-dossier">
          <div className="fan-wrap">
            <div className="fan-hint"><span>Hover to explore</span><span className="fan-hint-arrow">↓</span></div>
            <div className="fan-stack">
              {FLAGSHIP.map((b, i) => (
                <a key={i} href="#experience" className="fan-card" style={{background: b.bg, borderColor: b.ring}} aria-label={`Worked on ${b.tip}`}>
                  <span className="fan-icon" style={{color: b.color}}>{ICONS[b.icon]}</span>
                  <span className="fan-name">{b.tip}</span>
                </a>
              ))}
            </div>
            <div className="fan-caption">+31 more markets</div>
          </div>

          <TerminalLog/>
        </div>
      </div>
      <div className="hscroll"><span>Scroll</span><div className="hscline"/></div>
    </div>
  )
}
