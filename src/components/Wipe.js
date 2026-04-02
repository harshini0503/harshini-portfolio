'use client'
import { useEffect, useRef } from 'react'
export default function Wipe() {
  const wipeRef=useRef(null)
  const cvRef=useRef(null)
  useEffect(()=>{
    const wipeEl=wipeRef.current;if(!wipeEl)return
    const cv=cvRef.current;if(!cv)return
    const ctx=cv.getContext('2d')
    let W,H,rafId=null,phase='idle',prog=0,target=null
    const resize=()=>{W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
    resize();window.addEventListener('resize',resize)
    const G='rgba(200,168,74,',P='rgba(40,96,168,',C='rgba(32,184,168,'
    function draw(progress,t){
      ctx.clearRect(0,0,W,H)
      const cx=W/2,cy=H/2,maxR=Math.sqrt(cx*cx+cy*cy)*1.2
      const portalR=maxR*progress
      ctx.fillStyle='#04080e';ctx.fillRect(0,0,W,H)
      if(progress>0.01){
        ctx.save();ctx.globalCompositeOperation='destination-out'
        const hg=ctx.createRadialGradient(cx,cy,0,cx,cy,portalR)
        hg.addColorStop(0,'rgba(0,0,0,1)');hg.addColorStop(0.88,'rgba(0,0,0,0.96)');hg.addColorStop(1,'rgba(0,0,0,0)')
        ctx.fillStyle=hg;ctx.beginPath();ctx.arc(cx,cy,portalR,0,Math.PI*2);ctx.fill();ctx.restore()
      }
      if(progress>0.02&&progress<0.98){
        const eg=ctx.createRadialGradient(cx,cy,portalR-18,cx,cy,portalR+18)
        eg.addColorStop(0,C+'0)');eg.addColorStop(0.45,C+'0.4)');eg.addColorStop(0.55,G+'0.55)');eg.addColorStop(1,G+'0)')
        ctx.fillStyle=eg;ctx.beginPath();ctx.arc(cx,cy,portalR+18,0,Math.PI*2);ctx.arc(cx,cy,Math.max(0,portalR-18),0,Math.PI*2,true);ctx.fill()
      }
      [[portalR*.9,1.2,G,0.7,0.5],[portalR*.76,.7,P,0.5,-0.35]].forEach(([r,lw,col,al,sp])=>{
        if(r<4||progress<0.06)return
        ctx.save();ctx.translate(cx,cy);ctx.rotate(t*0.001*sp)
        ctx.strokeStyle=col+Math.min(al,al*progress*2)+')';ctx.lineWidth=lw;ctx.setLineDash([6,4])
        ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.restore()
      })
      if(progress>0.12){
        ctx.save();ctx.translate(cx,cy);ctx.rotate(t*0.0003)
        ctx.strokeStyle=G+Math.min(0.4,0.4*progress)+')';ctx.lineWidth=0.55;ctx.setLineDash([])
        for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*portalR*.08,Math.sin(a)*portalR*.08);ctx.lineTo(Math.cos(a)*portalR*.86,Math.sin(a)*portalR*.86);ctx.stroke()}
        ctx.restore()
      }
      if(progress>0.04&&progress<0.96){
        for(let i=0;i<8;i++){
          const a=i*Math.PI*2/8+t*0.0007
          const ox=cx+Math.cos(a)*portalR,oy=cy+Math.sin(a)*portalR
          const sg=ctx.createRadialGradient(ox,oy,0,ox,oy,8)
          sg.addColorStop(0,G+'0.85)');sg.addColorStop(1,G+'0)')
          ctx.fillStyle=sg;ctx.beginPath();ctx.arc(ox,oy,5,0,Math.PI*2);ctx.fill()
        }
      }
    }
    function runAnim(t){
      if(phase==='closing'){
        prog=Math.max(0,prog-0.016);draw(prog,t)
        if(prog<=0){phase='opening';prog=0;if(target){target.scrollIntoView({behavior:'instant'});target=null}}
        rafId=requestAnimationFrame(runAnim)
      } else if(phase==='opening'){
        prog=Math.min(1,prog+0.018);draw(prog,t)
        if(prog>=1){phase='idle';wipeEl.classList.remove('active');cancelAnimationFrame(rafId);rafId=null}
        else rafId=requestAnimationFrame(runAnim)
      }
    }
    function onClick(e){
      const a=e.currentTarget
      e.preventDefault()
      const tEl=document.querySelector(a.getAttribute('href'))
      if(!tEl||phase!=='idle')return
      target=tEl;phase='closing';prog=1
      wipeEl.classList.add('active')
      if(rafId)cancelAnimationFrame(rafId)
      rafId=requestAnimationFrame(runAnim)
    }
    const links=document.querySelectorAll('a[href^="#"]')
    links.forEach(a=>a.addEventListener('click',onClick))
    return ()=>{window.removeEventListener('resize',resize);links.forEach(a=>a.removeEventListener('click',onClick));if(rafId)cancelAnimationFrame(rafId)}
  },[])
  return <div id="wipe" ref={wipeRef}><canvas ref={cvRef}/></div>
}