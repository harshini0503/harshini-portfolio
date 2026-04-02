'use client'
import { useEffect } from 'react'
export default function ScrollEffects() {
  useEffect(()=>{
    // Scroll progress bar
    const sbar=document.getElementById('sbar')
    // Nav active
    const secIds=['hero','about','timeline','projects','skills','experience','volunteer','contact']
    function onScroll(){
      const s=window.scrollY,h=document.body.scrollHeight-window.innerHeight
      if(sbar) sbar.style.width=(s/h*100)+'%'
      const nav=document.getElementById('nav')
      if(nav) nav.classList.toggle('solid',s>60)
      let cur='hero'
      secIds.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<90)cur=id})
      document.querySelectorAll('.nlinks a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur))
    }
    window.addEventListener('scroll',onScroll,{passive:true})

    // Reveal on scroll — re-triggers every time
    const obs=new IntersectionObserver(entries=>entries.forEach(x=>{
      if(x.isIntersecting) x.target.classList.add('in')
      else x.target.classList.remove('in')
    }),{threshold:.06,rootMargin:'0px 0px -20px 0px'})
    document.querySelectorAll('.rv,.rl,.rr,.rs').forEach(el=>obs.observe(el))

    // Counters
    const cobs=new IntersectionObserver(entries=>entries.forEach(x=>{
      if(x.isIntersecting&&!x.target.dataset.done){
        x.target.dataset.done=1
        const t=+x.target.dataset.target,dur=1500,s=performance.now()
        ;(function step(n){
          const p=Math.min((n-s)/dur,1),e=1-Math.pow(1-p,3)
          x.target.textContent=Math.floor(e*t)+(t>=30?'+':'')
          if(p<1) requestAnimationFrame(step)
          else x.target.textContent=t+(t>=30?'+':'')
        })(performance.now())
      }
    }),{threshold:.5})
    document.querySelectorAll('[data-target]').forEach(el=>cobs.observe(el))

    // Section portal iris — fires every time section enters viewport
    const G='rgba(200,168,74,',P='rgba(40,96,168,',C='rgba(32,184,168,'
    function createPortal(sec){
      const existing=sec.querySelector('.pcwrap');if(existing)existing.remove()
      const wrap=document.createElement('div')
      wrap.className='pcwrap'
      wrap.style.cssText='position:absolute;inset:0;z-index:15;pointer-events:none;overflow:hidden;'
      const cv=document.createElement('canvas')
      wrap.appendChild(cv);sec.appendChild(wrap)
      let W=0,H=0,prog=0,done=false,rafId
      function resize(){W=cv.width=sec.offsetWidth||window.innerWidth;H=cv.height=sec.offsetHeight||600}
      resize();new ResizeObserver(()=>{if(!done)resize()}).observe(sec)
      const ctx=cv.getContext('2d')
      function frame(t){
        if(done){wrap.remove();return}
        prog=Math.min(1,prog+0.008)
        ctx.clearRect(0,0,W,H)
        const cx=W/2,cy=H/2,maxR=Math.sqrt(cx*cx+cy*cy)*1.18,r=maxR*prog,time=t*.001
        ctx.fillStyle='#04080e';ctx.fillRect(0,0,W,H)
        if(prog>0.005){
          ctx.save();ctx.globalCompositeOperation='destination-out'
          const hg=ctx.createRadialGradient(cx,cy,0,cx,cy,r)
          hg.addColorStop(0,'rgba(0,0,0,1)');hg.addColorStop(0.82,'rgba(0,0,0,1)');hg.addColorStop(0.94,'rgba(0,0,0,0.7)');hg.addColorStop(1,'rgba(0,0,0,0)')
          ctx.fillStyle=hg;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();ctx.restore()
        }
        if(prog>0.01&&prog<0.98){
          const eg=ctx.createRadialGradient(cx,cy,r*.88,cx,cy,r*1.1)
          eg.addColorStop(0,C+'0)');eg.addColorStop(0.35,C+'0.3)');eg.addColorStop(0.6,G+'0.45)');eg.addColorStop(1,G+'0)')
          ctx.fillStyle=eg;ctx.beginPath();ctx.arc(cx,cy,r*1.1,0,Math.PI*2);ctx.arc(cx,cy,Math.max(0,r*.88),0,Math.PI*2,true);ctx.fill()
        }
        [[r*.9,1.2,G,0.6,0.4],[r*.75,.7,P,0.45,-0.28],[r*.58,.5,C,0.35,0.55]].forEach(([rr,lw,col,al,spd])=>{
          if(rr<5||prog<0.08)return
          ctx.save();ctx.translate(cx,cy);ctx.rotate(time*spd)
          ctx.strokeStyle=col+Math.min(al,al*prog*1.6)+')';ctx.lineWidth=lw;ctx.setLineDash([6,4])
          ctx.beginPath();ctx.arc(0,0,rr,0,Math.PI*2);ctx.stroke();ctx.restore()
        })
        if(prog>0.12){
          ctx.save();ctx.translate(cx,cy);ctx.rotate(time*.2)
          ctx.strokeStyle=G+Math.min(0.3,0.3*prog)+')';ctx.lineWidth=0.5;ctx.setLineDash([])
          for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.06,Math.sin(a)*r*.06);ctx.lineTo(Math.cos(a)*r*.84,Math.sin(a)*r*.84);ctx.stroke()}
          ctx.restore()
        }
        if(prog>0.04&&prog<0.97){
          for(let i=0;i<8;i++){
            const a=i*Math.PI*2/8+time*.5
            const ox=cx+Math.cos(a)*r,oy=cy+Math.sin(a)*r
            const sg=ctx.createRadialGradient(ox,oy,0,ox,oy,8)
            sg.addColorStop(0,G+'0.8)');sg.addColorStop(1,G+'0)')
            ctx.fillStyle=sg;ctx.beginPath();ctx.arc(ox,oy,5,0,Math.PI*2);ctx.fill()
          }
        }
        if(prog>=1){done=true;wrap.remove();return}
        rafId=requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    }
    const pobs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)createPortal(e.target)}),{threshold:0.04,rootMargin:'0px 0px -20px 0px'})
    document.querySelectorAll('.sec').forEach(sec=>{if(sec.id!=='hero')pobs.observe(sec)})

    return ()=>{ window.removeEventListener('scroll',onScroll); obs.disconnect(); cobs.disconnect(); pobs.disconnect() }
  },[])
  return null
}