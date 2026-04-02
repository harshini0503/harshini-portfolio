'use client'
import { useEffect, useRef } from 'react'

export default function Background() {
  const cvRef = useRef(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, rafId, mx, my

    const resize = () => {
      W = cv.width  = window.innerWidth
      H = cv.height = window.innerHeight
      mx = W / 2; my = H / 2
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1200,
      vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
      r: Math.random() * 1.4 + .3, a: Math.random() * .5 + .1,
      type: Math.random() > .7 ? 'gold' : Math.random() > .5 ? 'portal' : 'dim'
    }))

    const rings = [
      { ox:.5, oy:.45, r:520, spd: .00018, ph:0, col:'rgba(40,96,168,0.04)'   },
      { ox:.5, oy:.45, r:360, spd:-.00028, ph:1, col:'rgba(200,168,74,0.03)'  },
      { ox:.5, oy:.45, r:210, spd: .00045, ph:2, col:'rgba(32,184,168,0.025)' },
    ]
    let tick = 0

    function draw() {
      ctx.clearRect(0, 0, W, H); tick += .008
      rings.forEach(rg => {
        rg.ph += rg.spd
        ctx.save(); ctx.translate(W*rg.ox, H*rg.oy); ctx.rotate(rg.ph)
        ctx.strokeStyle = rg.col; ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(0,0,rg.r,0,Math.PI*2); ctx.stroke()
        for (let i=0;i<8;i++) {
          const a = i*Math.PI/4
          ctx.beginPath()
          ctx.moveTo(Math.cos(a)*(rg.r-14), Math.sin(a)*(rg.r-14))
          ctx.lineTo(Math.cos(a)*(rg.r+14), Math.sin(a)*(rg.r+14))
          ctx.stroke()
        }
        ctx.restore()
      })
      const mg = ctx.createRadialGradient(mx,my,0,mx,my,300)
      mg.addColorStop(0,'rgba(40,96,168,0.05)')
      mg.addColorStop(.5,'rgba(200,168,74,0.02)')
      mg.addColorStop(1,'transparent')
      ctx.fillStyle = mg; ctx.fillRect(0,0,W,H)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0
        const pulse = .5+.5*Math.sin(tick+p.x*.008)
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle = p.type==='gold'
          ? `rgba(200,168,74,${p.a*pulse})`
          : p.type==='portal'
          ? `rgba(32,184,168,${p.a*.55*pulse})`
          : `rgba(232,224,208,${p.a*.28})`
        ctx.fill()
        if(p.type==='gold'&&p.a>.4){
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2)
          ctx.fillStyle=`rgba(200,168,74,${p.a*.055})`; ctx.fill()
        }
      })
      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize',resize); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <>
      <video
        autoPlay muted loop playsInline preload="auto"
        onCanPlay={e => e.target.play()}
        style={{
          position:'fixed', inset:0, width:'100%', height:'100%',
          objectFit:'cover', zIndex:0, opacity:0.90, pointerEvents:'none',
        }}
      >
        <source src="/galaxy.mp4" type="video/mp4"/>
      </video>

      <div style={{
        position:'fixed', inset:0, zIndex:1, pointerEvents:'none',
        background:'linear-gradient(to bottom,rgba(7,8,16,0.55) 0%,rgba(7,8,16,0.75) 100%)',
      }}/>

      <canvas id="bg" ref={cvRef} style={{
        position:'fixed', inset:0, zIndex:2, pointerEvents:'none', opacity:0.4,
      }}/>
    </>
  )
}