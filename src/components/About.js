import { TRAIT_CHIPS } from '@/lib/data'
export default function About() {
  return (
    <div className="agrid">
      <div className="rl">
        <div className="aframe">
          <div className="aimg" style={{padding:0,overflow:'hidden'}}>
            <img src="/image.jpg" alt="Harshini Kanamathareddy"
              style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center',display:'block'}}/>
          </div>
          <div className="acorner tl"/><div className="acorner tr"/>
          <div className="acorner bl"/><div className="acorner br"/>
          <div className="abadge">iOS · Python · AWS</div>
        </div>
      </div>
      <div>
        <div className="eyebrow rv">About Me</div>
        <h2 className="stitle rv d1">The <span className="gold">Story</span><br/><span className="dim">So Far</span></h2>
        <p className="apara rv d2">I'm a <strong>Software Engineer</strong> with 3+ years of industry experience, currently pursuing an <strong>MS in Computer Science at SJSU (May 2026)</strong>. My work spans native iOS, backend systems, and applied ML — focused on <span className="ahl">reliability, performance, and real impact.</span></p>
        <p className="apara rv d3">At <strong>Entain</strong>, I led Casino integrations for BETMGM, Borgata, Coral, and Ladbrokes — reducing game launch latency by <strong>~30 seconds</strong> and eliminating production crashes for thousands of daily users. I own features end-to-end: Figma spec through TestFlight release.</p>
        <p className="apara rv d4">I also lead <strong>Kontagious</strong> at SJSU as Chapter President — building community for international students through mentorship and career guidance.</p>
        <div className="statsbar rv d5">
          <div><div className="sn" data-target="3">0</div><div className="sl">Years Exp.</div></div>
          <div><div className="sn" data-target="6">0</div><div className="sl">Projects</div></div>
          <div><div className="sn" data-target="30">0</div><div className="sl">+ Apps</div></div>
        </div>
        <div className="trait-row rv d6">
          {TRAIT_CHIPS.map((c,i)=><div className="tchip" key={i}>{c}</div>)}
        </div>
      </div>
    </div>
  )
}