'use client'
import { useEffect, useRef, useState } from 'react'
export default function Loader() {
  const [pct, setPct] = useState(0)
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)
  const cvRef = useRef(null)
  useEffect(() => {
    const cv = cvRef.current; if (!cv) return
    const ctx = cv.getContext('2d'); if (!ctx) return
    let t = 0, alive = true, rafId
    const RINGS = [[48,0.4,'rgba(200,168,74,0.5)'],[36,-0.3,'rgba(40,96,168,0.4)'],[24,0.55,'rgba(32,184,168,0.3)']]
    function draw() {
      if (!alive) return
      ctx.clearRect(0,0,120,120); t += 0.02
      const cx=60,cy=60
      RINGS.forEach(([r,spd,col])=>{
        ctx.save();ctx.translate(cx,cy);ctx.rotate(t*spd)
        ctx.strokeStyle=col;ctx.lineWidth=0.75
        ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke()
        for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(Math.cos(a)*(r-5),Math.sin(a)*(r-5));ctx.lineTo(Math.cos(a)*(r+5),Math.sin(a)*(r+5));ctx.stroke()}
        ctx.restore()
      })
      ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fillStyle='rgba(200,168,74,0.6)';ctx.fill()
      rafId = requestAnimationFrame(draw)
    }
    draw()
    let v=0
    const iv = setInterval(()=>{v+=Math.floor(Math.random()*12+4);if(v>=100){v=100;clearInterval(iv)};setPct(v)},140)
    const onLoad=()=>{setTimeout(()=>{clearInterval(iv);setPct(100);setTimeout(()=>{setOut(true);setTimeout(()=>setGone(true),800)},300)},1800)}
    if(document.readyState==='complete') onLoad(); else window.addEventListener('load',onLoad)
    return ()=>{alive=false;clearInterval(iv);cancelAnimationFrame(rafId)}
  },[])
  if(gone) return null
  return (
    <div id="loader" className={out?'loader-out':''} style={{position:'fixed',inset:0,zIndex:9999,background:'var(--void)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2rem'}}>
      <canvas ref={cvRef} width={120} height={120}/>
      <div className="ll">HARSHINI KANAMATHAREDDY</div>
      <div className="lb"><div className="lbf" style={{width:`${pct}%`}}/></div>
      <div className="lpct">{pct}%</div>
    </div>
  )
}