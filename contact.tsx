import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { ArrowRight, Copy, Mail, Menu, Send, X } from 'lucide-react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import logo from '@/assets/oreka-logo.png'

export const CONTACT_EMAIL = 'TheOrekaFoundation@gmail.com'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [
    { title: 'Contact Us | The Oreka Foundation' },
    { name: 'description', content: 'Get in touch with The Oreka Foundation about partnerships, volunteering, giving, or general questions.' },
    { property: 'og:title', content: 'Contact The Oreka Foundation' },
    { property: 'og:description', content: 'Every meaningful initiative begins with a conversation. Reach out to The Oreka Foundation.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Contact,
})

const schema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  topic: z.string().min(1),
  message: z.string().trim().min(1, 'Please write a message').max(2000, 'Please keep it under 2000 characters'),
})

const topics = ['General inquiry', 'Partnerships & programs', 'Volunteering', 'Giving support']
const sections = [['Who we are', '/#about'], ['What we do', '/#work'], ['Our mission', '/#mission'], ['Get involved', '/#get-involved']]

function Contact() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT_EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* ignore */ }
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)))
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message
      setErrors(next); return
    }
    setErrors({}); setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mrpprkar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: parsed.data.name, email: parsed.data.email, topic: parsed.data.topic, message: parsed.data.message, _replyto: parsed.data.email, _subject: `Website message: ${parsed.data.topic}` }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.ok !== true) throw new Error('failed')
      setStatus('sent'); form.reset()
    } catch { setStatus('error') }
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <Link to="/" aria-label="The Oreka Foundation home"><img className="brand-logo" src={logo} alt="The Oreka Foundation — Food. Education. Hope." width={173} height={80} /></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {sections.map(([label, href]) => <a key={href} className="nav-link" href={href}>{label}</a>)}
            <Link className="nav-link" to="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <Button asChild variant="donate" className="donate-button"><a href="/#get-involved">Donate <ArrowRight size={14} /></a></Button>
            <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{sections.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></nav>}
      </header>
      <main>
        <section className="contact-hero"><div className="contact-hero-inner">
          <div className="eyebrow">Contact us</div>
          <h1>Connect with us.</h1>
          <p>Every meaningful initiative begins with a conversation. Whether you’d like to partner with us, volunteer, support our work, or simply ask a question, we’d love to hear from you.</p>
        </div></section>
        <section className="section-shell contact-layout">
          <aside className="contact-card">
            <Mail className="text-gold-ink" />
            <h2>Email us directly</h2>
            <p className="text-sm text-muted-foreground">Prefer writing from your own inbox? Reach us at:</p>
            <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <div className="flex flex-wrap gap-3">
              <Button asChild><a href={`mailto:${CONTACT_EMAIL}`}><Mail /> Send an email</a></Button>
              <Button variant="outline" onClick={copy}><Copy /> {copied ? 'Copied!' : 'Copy email'}</Button>
            </div>
          </aside>
          <div>
            <div className="eyebrow section-eyebrow">Send a message</div>
            <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 24 }}>We’d love to hear from you.</h2>
            {status === 'sent' ? (
              <div className="form-status" role="status">Thank you — your message has been sent. We’ll be in touch soon.<div className="mt-3"><Button variant="link" className="p-0 h-auto" onClick={() => setStatus('idle')}>Send another message <ArrowRight /></Button></div></div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <label>Full name<input name="name" autoComplete="name" maxLength={100} aria-invalid={!!errors["name"]} />{errors["name"] && <span className="field-error">{errors["name"]}</span>}</label>
                <label>Email address<input name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={!!errors["email"]} />{errors["email"] && <span className="field-error">{errors["email"]}</span>}</label>
                <label>Topic<select name="topic" defaultValue={topics[0]}>{topics.map((t) => <option key={t}>{t}</option>)}</select></label>
                <label>Message<textarea name="message" rows={6} maxLength={2000} aria-invalid={!!errors["message"]} />{errors["message"] && <span className="field-error">{errors["message"]}</span>}</label>
                {status === 'error' && <div className="form-status" role="alert">Sorry, your message couldn’t be sent. Please email us directly at {CONTACT_EMAIL}.</div>}
                <div><Button type="submit" variant="donate" disabled={status === 'sending'}><Send /> {status === 'sending' ? 'Sending…' : 'Send message'}</Button></div>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="site-footer"><div className="footer-inner"><div className="footer-top"><div><Link to="/" className="footer-name">The Oreka Foundation</Link><div className="footer-tagline">FOOD. EDUCATION. HOPE.</div></div><nav className="footer-links" aria-label="Footer navigation"><a href="/#about">Who we are</a><a href="/#work">Our work</a><a href="/#mission">Our mission</a><Link to="/contact">Contact</Link></nav></div><div className="footer-bottom"><div>© {new Date().getFullYear()} The Oreka Foundation. All rights reserved.</div><span>Compassion. Dignity. Opportunity.</span></div></div></footer>
    </>
  )
}
