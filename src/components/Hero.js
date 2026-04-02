import { TRAIT_CHIPS } from '@/lib/data'
export default function Hero() {
  return (
    <div className="hwrap">
      <div>
        <div className="hbadge"><span className="bdot"/>&nbsp;Available · San Jose, CA · OPT Eligible</div>
        <div className="how"><span className="hname">HARSHINI</span></div>
        <div className="how"><span className="hname" style={{animationDelay:'.07s'}}>KANAMATHAREDDY</span></div>
        <div className="how" style={{marginTop:'.6rem'}}>
          <div className="htitle">iOS &amp; Full-Stack Engineer · <em>3+ years</em> shipping at scale</div>
        </div>
        <p className="hbio">I build <strong>production iOS apps</strong> and <strong>cloud-native systems</strong> reaching thousands daily. From Swift + WKWebView at Entain to <strong>PyTorch ML on AWS ECS</strong> — I engineer things that actually ship.</p>
        <div className="hbtns">
          <a href="#projects" className="btn-primary"><span>View My Work</span></a>
          <a href="#contact" className="btn-ghost">Get In Touch</a>
        </div>
        <div className="hstats">
          <div><div className="hstat-n" data-target="3">0</div><div className="hstat-l">Years Exp.</div></div>
          <div><div className="hstat-n" data-target="6">0</div><div className="hstat-l">Projects</div></div>
          <div><div className="hstat-n" data-target="30">0</div><div className="hstat-l">+ Apps</div></div>
        </div>
      </div>
      <div className="hvisual">
        <div className="sring">
          <div className="ro"/><div className="rm"/><div className="ri"/>
          <div className="rcore">HK</div>
          <div className="rspark" style={{top:'8px',left:'50%',animationDelay:'0s'}}/>
          <div className="rspark" style={{top:'50%',right:'6px',animationDelay:'.8s',background:'var(--portal)',boxShadow:'0 0 6px var(--portal)'}}/>
          <div className="rspark" style={{bottom:'10px',left:'44%',animationDelay:'1.5s',background:'var(--portal2)',boxShadow:'0 0 6px var(--portal2)'}}/>
        </div>
      </div>
      <div className="hscroll"><span>Scroll</span><div className="hscline"/></div>
    </div>
  )
}