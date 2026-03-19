'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Leadership from '@/components/Leadership'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PortalDivider from '@/components/PortalDivider'
import SoftSkillScatter from '@/components/SoftSkillScatter'
import { SOFT_SKILLS } from '@/lib/data'

// Client-only components (use browser APIs)
const Cursor       = dynamic(() => import('@/components/Cursor'),       { ssr: false })
const Background   = dynamic(() => import('@/components/Background'),   { ssr: false })
const Wipe         = dynamic(() => import('@/components/Wipe'),         { ssr: false })
const ScrollEffects= dynamic(() => import('@/components/ScrollEffects'),{ ssr: false })
const Loader       = dynamic(() => import('@/components/Loader'),       { ssr: false })

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Background />
      <Wipe />
      <ScrollEffects />

      <Navbar />

      <section className="sec" id="hero">  <Hero />        </section>

      <SoftSkillScatter skills={SOFT_SKILLS.afterHero} />
      <PortalDivider />

      <section className="sec" id="about"> <About />       </section>

      <SoftSkillScatter skills={SOFT_SKILLS.afterProjects} />
      <PortalDivider />

      <section className="sec" id="projects"><Projects />  </section>

      <SoftSkillScatter skills={SOFT_SKILLS.afterSkills} />
      <PortalDivider />

      <section className="sec" id="skills"> <Skills />      </section>

      <PortalDivider />

      <section className="sec" id="experience"><Experience /></section>

      <PortalDivider />
      <Leadership />
      <PortalDivider />

      <section className="sec" id="timeline" style={{minHeight:'auto',padding:'4rem 5%'}}>
        <Timeline />
      </section>

      <SoftSkillScatter skills={SOFT_SKILLS.afterTimeline} />
      <PortalDivider />

      <section className="sec" id="contact"><Contact /></section>

      <Footer />
    </>
  )
}
