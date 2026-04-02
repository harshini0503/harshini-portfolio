'use client'
import { useEffect, useRef, useState } from 'react'
import { SKILLS, MARQUEE_ROW1, MARQUEE_ROW2 } from '@/lib/data'

/* ─── constants ─────────────────────────────────────────────────── */
const NODE_W  = 76
const NODE_H  = 80   // includes label
const MIN_SEP = 86   // minimum centre-to-centre distance
const MAX_SPD = 2.8  // px / frame cap
const FRICTION = 0.97
const BOUNCE   = 0.55

const CATS = [
  { k:'all',   l:'All'       },
  { k:'ios',   l:'📱 iOS'    },
  { k:'web',   l:'🌐 Web'    },
  { k:'ai',    l:'🧠 AI/ML'  },
  { k:'cloud', l:'☁️ Cloud'  },
  { k:'data',  l:'🗄️ Data'   },
]

/* ─── MarqueeRow ─────────────────────────────────────────────────── */
function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="mrow" style={{ '--dur':'34s', '--dir': reverse ? 'reverse' : 'normal' }}>
      <div className="mi">
        {doubled.map((d, i) => (
          <div className="stile" key={i}>
            <div className="stile-ico">
              {d.src
                ? <img src={d.src} alt={d.n} onError={e => { e.target.style.display = 'none' }} />
                : <span>{d.ico || '⚡'}</span>}
            </div>
            <div className="stile-name">{d.n}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── clamp helper ───────────────────────────────────────────────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const cap   = (n, max) => {
  const s = Math.hypot(n.vx, n.vy)
  if (s > max) { n.vx = n.vx / s * max; n.vy = n.vy / s * max }
}

/* ─── Skills component ───────────────────────────────────────────── */
export default function Skills() {
  const [cat, setCat] = useState('all')

  // All mutable state lives in refs — zero re-render side-effects
  const stageRef = useRef(null)
  const cvRef    = useRef(null)
  const rafRef   = useRef(null)
  const nodes    = useRef([])     // [{el, cat, x, y, vx, vy, dragging}]
  const drag     = useRef(null)   // currently dragged node
  const lastPos  = useRef({ x: 0, y: 0 })  // previous mouse pos for throw velocity
  const W        = useRef(0)
  const H        = useRef(0)

  /* ── spawn a ripple DOM element ──────────────────────────────── */
  function ripple(x, y) {
    const s = stageRef.current; if (!s) return
    const d = document.createElement('div')
    d.className  = 'ripple'
    d.style.left = x + 'px'
    d.style.top  = y + 'px'
    s.appendChild(d)
    setTimeout(() => d.remove(), 600)
  }

  /* ── build all DOM nodes for a given filter ──────────────────── */
  function build(filter, stageW, stageH) {
    const stage = stageRef.current
    const cv    = cvRef.current
    if (!stage || !cv) return

    W.current = stageW
    H.current = stageH
    cv.width  = stageW
    cv.height = stageH

    // Remove previous nodes
    nodes.current.forEach(n => n.el.remove())
    nodes.current = []

    const list = SKILLS.filter(sk => filter === 'all' || sk.cat === filter)
    if (!list.length) return

    const pad  = 20
    const aw   = stageW - pad * 2   // available width
    const ah   = stageH - pad * 2   // available height

    // Arrange in a grid so every node gets its own cell
    const cols = Math.max(2, Math.round(Math.sqrt(list.length * aw / ah)))
    const rows = Math.ceil(list.length / cols)
    const cw   = aw / cols
    const ch   = ah / rows

    list.forEach((sk, i) => {
      // ── DOM element ──
      const el = document.createElement('div')
      el.className = 'skill-node'
      el.style.cssText = [
        'position:absolute',
        `width:${NODE_W}px`,
        'display:flex',
        'flex-direction:column',
        'align-items:center',
        'gap:5px',
        'cursor:grab',
        'user-select:none',
        'will-change:transform',
      ].join(';')

      // Icon wrapper
      const icoWrap = document.createElement('div')
      icoWrap.className = 'skill-node-ico'
      icoWrap.style.pointerEvents = 'none'

      const isUrl = typeof sk.ico === 'string' && sk.ico.startsWith('http')
      if (isUrl) {
        const img = document.createElement('img')
        img.alt   = sk.n
        img.style.cssText = 'width:28px;height:28px;object-fit:contain;display:block;'
        img.onerror = () => { img.style.display = 'none' }
        icoWrap.appendChild(img)
        el.appendChild(icoWrap)
        img.src = sk.ico   // assign AFTER append to avoid flash
      } else {
        const span = document.createElement('span')
        span.style.cssText = 'font-size:1.6rem;line-height:1;display:block;'
        span.textContent = sk.ico || '?'
        icoWrap.appendChild(span)
        el.appendChild(icoWrap)
      }

      // Label
      const label = document.createElement('div')
      label.className = 'skill-node-name'
      label.style.pointerEvents = 'none'
      label.textContent = sk.n
      el.appendChild(label)

      // ── Starting position: centre of grid cell + small jitter ──
      const col   = i % cols
      const row   = Math.floor(i / cols)
      const cellX = pad + col * cw + cw / 2 - NODE_W / 2
      const cellY = pad + row * ch + ch / 2 - NODE_H / 2
      const jx    = clamp((cw - NODE_W) / 2 - 4, 0, 30)
      const jy    = clamp((ch - NODE_H) / 2 - 4, 0, 20)
      const x     = clamp(cellX + (Math.random() - 0.5) * jx * 2, 0, stageW - NODE_W)
      const y     = clamp(cellY + (Math.random() - 0.5) * jy * 2, 0, stageH - NODE_H)

      el.style.left = x + 'px'
      el.style.top  = y + 'px'
      stage.appendChild(el)

      const node = {
        el,
        cat: sk.cat,
        x, y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        dragging: false,
      }
      nodes.current.push(node)

      // Drag start
      const onStart = e => {
        e.preventDefault()
        drag.current          = node
        node.dragging         = true
        node.vx = node.vy     = 0
        lastPos.current       = { x: node.x, y: node.y }
        el.classList.add('active')
      }
      el.addEventListener('mousedown',  onStart)
      el.addEventListener('touchstart', onStart, { passive: false })
    })

    // ── Separation pass: iteratively push overlapping nodes apart ──
    // Run enough iterations so even worst-case stacking resolves
    const ns = nodes.current
    for (let iter = 0; iter < 12; iter++) {
      let moved = false
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a  = ns[i], b = ns[j]
          const cx1 = a.x + NODE_W / 2, cy1 = a.y + NODE_H / 2
          const cx2 = b.x + NODE_W / 2, cy2 = b.y + NODE_H / 2
          const dx  = cx1 - cx2
          const dy  = cy1 - cy2
          const d   = Math.hypot(dx, dy)
          if (d < MIN_SEP && d > 0) {
            const push = (MIN_SEP - d) / 2 + 1
            const nx   = dx / d, ny = dy / d
            a.x = clamp(a.x + nx * push, 0, stageW - NODE_W)
            a.y = clamp(a.y + ny * push, 0, stageH - NODE_H)
            b.x = clamp(b.x - nx * push, 0, stageW - NODE_W)
            b.y = clamp(b.y - ny * push, 0, stageH - NODE_H)
            moved = true
          }
        }
      }
      if (!moved) break   // converged early
    }

    // Apply separated positions to DOM
    ns.forEach(n => {
      n.el.style.left = n.x + 'px'
      n.el.style.top  = n.y + 'px'
    })
  }

  /* ── physics tick ────────────────────────────────────────────── */
  function startLoop() {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    const cv = cvRef.current; if (!cv) return
    const ctx = cv.getContext('2d'); if (!ctx) return

    function tick() {
      const ns    = nodes.current
      const stageW = W.current
      const stageH = H.current

      ctx.clearRect(0, 0, stageW, stageH)

      // ── connection lines between same-category nodes ──
      ctx.save()
      ctx.setLineDash([3, 6])
      ctx.lineWidth = 0.6
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          if (ns[i].cat !== ns[j].cat) continue
          const ax = ns[i].x + NODE_W / 2, ay = ns[i].y + NODE_H / 2
          const bx = ns[j].x + NODE_W / 2, by = ns[j].y + NODE_H / 2
          const d  = Math.hypot(ax - bx, ay - by)
          if (d < 200) {
            ctx.strokeStyle = `rgba(200,168,74,${((200 - d) / 200) * 0.12})`
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
          }
        }
      }
      ctx.restore()

      // ── update each node ──
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i]
        if (n.dragging) continue

        // Friction + gentle random wander so nodes never fully stop
        n.vx *= FRICTION
        n.vy *= FRICTION
        if (Math.random() < 0.004) {
          n.vx += (Math.random() - 0.5) * 0.8
          n.vy += (Math.random() - 0.5) * 0.8
        }

        // Speed cap before moving
        cap(n, MAX_SPD)

        n.x += n.vx
        n.y += n.vy

        // Wall collision — reflect velocity, clamp position
        if (n.x < 0) {
          n.x  = 0
          n.vx = Math.abs(n.vx) * BOUNCE
          ripple(2, n.y + NODE_H / 2)
        }
        if (n.x > stageW - NODE_W) {
          n.x  = stageW - NODE_W
          n.vx = -Math.abs(n.vx) * BOUNCE
          ripple(stageW - 2, n.y + NODE_H / 2)
        }
        if (n.y < 0) {
          n.y  = 0
          n.vy = Math.abs(n.vy) * BOUNCE
          ripple(n.x + NODE_W / 2, 2)
        }
        if (n.y > stageH - NODE_H) {
          n.y  = stageH - NODE_H
          n.vy = -Math.abs(n.vy) * BOUNCE
          ripple(n.x + NODE_W / 2, stageH - 2)
        }

        // Speed cap after wall
        cap(n, MAX_SPD)

        n.el.style.left = n.x + 'px'
        n.el.style.top  = n.y + 'px'
      }

      // ── node-node collisions ──
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a  = ns[i], b = ns[j]
          const ax = a.x + NODE_W / 2, ay = a.y + NODE_H / 2
          const bx = b.x + NODE_W / 2, by = b.y + NODE_H / 2
          const dx = ax - bx
          const dy = ay - by
          const d  = Math.hypot(dx, dy)

          if (d < 1) {
            // Perfectly overlapping — break symmetry with a random nudge
            a.x += (Math.random() - 0.5) * 8
            a.y += (Math.random() - 0.5) * 8
            b.x += (Math.random() - 0.5) * 8
            b.y += (Math.random() - 0.5) * 8
            continue
          }

          if (d < MIN_SEP) {
            const nx   = dx / d
            const ny   = dy / d
            const push = (MIN_SEP - d) * 0.5

            // Positional correction — push apart so they don't overlap
            a.x = clamp(a.x + nx * push, 0, W.current - NODE_W)
            a.y = clamp(a.y + ny * push, 0, H.current - NODE_H)
            b.x = clamp(b.x - nx * push, 0, W.current - NODE_W)
            b.y = clamp(b.y - ny * push, 0, H.current - NODE_H)

            // Velocity impulse — only if nodes are approaching each other
            const dvx = a.vx - b.vx
            const dvy = a.vy - b.vy
            const dot = dvx * nx + dvy * ny

            if (dot > 0) {
              // Exchange velocity along collision normal (elastic-ish, damped)
              const imp = dot * 0.45   // 0.45 = soft, stable; 1.0 = perfectly elastic (unstable)
              a.vx -= imp * nx;  a.vy -= imp * ny
              b.vx += imp * nx;  b.vy += imp * ny

              // Clamp both immediately after impulse
              cap(a, MAX_SPD)
              cap(b, MAX_SPD)

              if (dot > 1.2) ripple(ax + (bx - ax) / 2, ay + (by - ay) / 2)
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  /* ── mount effect ────────────────────────────────────────────── */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    // ── drag: mousemove / touchmove ──
    const onMove = e => {
      const n = drag.current; if (!n) return
      const touch = e.touches?.[0]
      const clientX = touch ? touch.clientX : e.clientX
      const clientY = touch ? touch.clientY : e.clientY
      const rect  = stage.getBoundingClientRect()
      const prevX = n.x, prevY = n.y
      n.x = clamp(clientX - rect.left - NODE_W / 2, 0, W.current - NODE_W)
      n.y = clamp(clientY - rect.top  - NODE_H / 2, 0, H.current - NODE_H)
      // Track velocity from mouse movement for throw
      lastPos.current = { x: n.x - prevX, y: n.y - prevY }
      n.el.style.left = n.x + 'px'
      n.el.style.top  = n.y + 'px'
    }

    const onEnd = () => {
      const n = drag.current; if (!n) return
      // Throw velocity = last mouse delta, clamped
      n.vx = clamp(lastPos.current.x * 1.5, -MAX_SPD, MAX_SPD)
      n.vy = clamp(lastPos.current.y * 1.5, -MAX_SPD, MAX_SPD)
      n.dragging = false
      n.el.classList.remove('active')
      drag.current = null
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onEnd)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend',  onEnd)

    // ── resize: update W/H and canvas size ──
    const ro = new ResizeObserver(() => {
      const w = stage.offsetWidth, h = stage.offsetHeight
      if (w > 0 && h > 0) {
        W.current = w; H.current = h
        const cv = cvRef.current
        if (cv) { cv.width = w; cv.height = h }
      }
    })
    ro.observe(stage)

    // ── init: poll until stage has real layout dimensions ──
    let active = true

    function tryInit() {
      if (!active) return
      // Use getBoundingClientRect for most reliable reading
      const rect = stage.getBoundingClientRect()
      const w = rect.width, h = rect.height
      if (w > 100 && h > 100) {
        build('all', w, h)
        startLoop()
      } else {
        // Stage not painted yet — try again next frame
        requestAnimationFrame(tryInit)
      }
    }

    // Wait one tick for React to paint, then start polling
    const tid = setTimeout(tryInit, 80)

    return () => {
      active = false
      clearTimeout(tid)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onEnd)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend',  onEnd)
      ro.disconnect()
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      nodes.current.forEach(n => n.el.remove())
      nodes.current = []
    }
  }, [])

  /* ── filter change ───────────────────────────────────────────── */
  function handleCat(k) {
    setCat(k)
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    const stage = stageRef.current; if (!stage) return
    const rect  = stage.getBoundingClientRect()
    const w = rect.width  || W.current
    const h = rect.height || H.current
    build(k, w, h)
    startLoop()
  }

  /* ── render ──────────────────────────────────────────────────── */
  return (
    <div className="sw">
      <div className="eyebrow rv">Tech Stack</div>
      <h2 className="stitle rv d1">Skills &amp; <span className="gold">Expertise</span></h2>
      <p className="sub rv d2" style={{ marginBottom: '2.5rem' }}>
        
      </p>

      <MarqueeRow items={MARQUEE_ROW1} reverse={false} />
      <MarqueeRow items={MARQUEE_ROW2} reverse={true}  />

      <div className="playground-wrap">
        <div className="pg-hdr">
          <div className="pg-title">Skills &amp; Tools</div>
          <div className="pg-hint"></div>
        </div>

        <div className="pg-cats">
          {CATS.map(c => (
            <button
              key={c.k}
              className={`pgcat${cat === c.k ? ' on' : ''}`}
              onClick={() => handleCat(c.k)}
            >
              {c.l}
            </button>
          ))}
        </div>

        <div
          id="skill-stage"
          ref={stageRef}
          style={{
            position:   'relative',
            height:     '420px',
            overflow:   'hidden',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(40,96,168,.07) 0%, transparent 70%)',
          }}
        >
          <canvas
            ref={cvRef}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
