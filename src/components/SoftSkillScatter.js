export default function SoftSkillScatter({ skills }) {
  return (
    <div className="scatter rv" style={{ marginTop: '-.5rem' }}>
      {skills.map((s, i) => (
        <div className="sc-soft" key={i} style={{ animationDelay: `${i * 0.8}s` }}>
          <div className="sc-soft-ico">{s.ico}</div>
          <div>
            <div className="sc-soft-name">{s.name}</div>
            <div className="sc-soft-desc">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
