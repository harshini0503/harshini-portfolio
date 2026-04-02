'use client'
import { useEffect, useRef } from 'react'
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  useEffect(()=>{
    let rx=0,ry=0,mx=0,my=0,rafId
    const onMove=e=>{
      mx=e.clientX;my=e.clientY
      if(dotRef.current){dotRef.current.style.left=mx+'px';dotRef.current.style.top=my+'px'}
    }
    const lerp=()=>{
      rx+=(mx-rx)*.1;ry+=(my-ry)*.1
      if(ringRef.current){ringRef.current.style.left=rx+'px';ringRef.current.style.top=ry+'px'}
      rafId=requestAnimationFrame(lerp)
    }
    window.addEventListener('mousemove',onMove)
    rafId=requestAnimationFrame(lerp)
    return ()=>{window.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])
  return(<>
    <div id="cur" ref={dotRef}>
      <svg viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="12" stroke="rgba(200,168,74,0.5)" strokeWidth="0.6"/>
        <path d="M13 1L14 12L13 13L12 12Z" fill="rgba(200,168,74,0.85)"/>
        <path d="M25 13L14 14L13 13L14 12Z" fill="rgba(200,168,74,0.85)"/>
        <path d="M13 25L12 14L13 13L14 14Z" fill="rgba(200,168,74,0.85)"/>
        <path d="M1 13L12 12L13 13L12 14Z" fill="rgba(200,168,74,0.85)"/>
        <circle cx="13" cy="13" r="2" fill="rgba(200,168,74,0.5)"/>
      </svg>
    </div>
    <div id="cur2" ref={ringRef}/>
  </>)
}