'use client'
import { useState, useRef } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)

    try {
      const data = new FormData(formRef.current)

      const res = await fetch('https://formspree.io/f/xgonrqgg', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })

      if (res.ok) {
        setSent(true)
        formRef.current.reset()
        setTimeout(() => setSent(false), 4000)
      } else {
        alert('Something went wrong. Please email directly at k.harshinim5@gmail.com')
      }
    } catch {
      alert('Network error. Please email k.harshinim5@gmail.com directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="cbgtxt">CONTACT</div>

      <div className="cin">
        <div>
          <div className="eyebrow rv">Get In Touch</div>
          <h2 className="stitle rv d1">
            Let&apos;s <span className="gold">Connect</span>
          </h2>

          <div className="ctagline rv d2">
            Seeking <em>full-time roles</em> in iOS, full-stack, or applied ML.
          </div>

          <div className="citems rv d3">
            <a href="mailto:k.harshinim5@gmail.com" className="crow">
              <div className="cico">✉</div>
              <div>
                <div className="cmlab">Email</div>
                <div className="cmval">k.harshinim5@gmail.com</div>
              </div>
            </a>

            <a href="tel:+16693250368" className="crow">
              <div className="cico">☎</div>
              <div>
                <div className="cmlab">Phone</div>
                <div className="cmval">+1 (669) 325-0368</div>
              </div>
            </a>

            <a href="https://github.com/harshini0503" target="_blank" rel="noopener noreferrer" className="crow">
              <div className="cico" style={{fontFamily:'monospace',fontSize:'.85rem',fontWeight:700}}>gh</div>
              <div>
                <div className="cmlab">GitHub</div>
                <div className="cmval">github.com/harshinim5 ↗</div>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/harshini0503/" target="_blank" rel="noopener noreferrer" className="crow">
              <div className="cico">in</div>
              <div>
                <div className="cmlab">LinkedIn</div>
                <div className="cmval">harshini-kanamathareddy ↗</div>
              </div>
            </a>

            <div className="crow">
              <div className="cico">📍</div>
              <div>
                <div className="cmlab">Location</div>
                <div className="cmval">San Jose, CA · OPT Eligible</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rr d2">
          <form className="cform" onSubmit={handleSubmit} ref={formRef}>

            {/* Hidden fields for Formspree */}
            <input type="hidden" name="_subject" value="New Portfolio Message" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="frow2">
              <div className="fg">
                <label className="flbl">First Name</label>
                <input
                  className="fi"
                  type="text"
                  name="firstName"
                  required
                />
              </div>

              <div className="fg">
                <label className="flbl">Last Name</label>
                <input
                  className="fi"
                  type="text"
                  name="lastName"
                  required
                />
              </div>
            </div>

            <div className="fg">
              <label className="flbl">Email</label>
              <input
                className="fi"
                type="email"
                name="email"
                required
              />
            </div>

            <div className="fg">
              <label className="flbl">Subject</label>
              <input
                className="fi"
                type="text"
                name="subject"
                placeholder="Job Opportunity · Collaboration…"
              />
            </div>

            <div className="fg">
              <label className="flbl">Message</label>
              <textarea
                className="fta"
                rows={5}
                name="message"
                placeholder="Tell me about the role or project…"
                required
              />
            </div>

            <button
              type="submit"
              className="fsub"
              disabled={sending}
              style={
                sent
                  ? { background: 'linear-gradient(135deg,#1dbfa8,#0d9984)' }
                  : {}
              }
            >
              {sent
                ? '✓ Message Sent!'
                : sending
                ? 'Sending…'
                : 'Send Message'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}