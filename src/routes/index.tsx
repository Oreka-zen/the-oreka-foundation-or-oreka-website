import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, BookOpen, Heart, HeartHandshake, Menu, Soup, X, Sprout, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import hero from '@/assets/community-hero.jpg'
import logo from '@/assets/oreka-logo.png'
import food from '@/assets/food.jpg'
import education from '@/assets/education.jpg'
import outreach from '@/assets/outreach.jpg'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'The Oreka Foundation | Food. Education. Hope.' },
    { name: 'description', content: 'The Oreka Foundation supports individuals and families through food assistance, education, health, and community outreach. Discover our story and mission.' },
    { property: 'og:title', content: 'The Oreka Foundation | Stronger Communities, Brighter Futures' },
    { property: 'og:description', content: 'Rooted in compassion. Built on dignity. Creating pathways to a brighter future through food, education, and hope.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
})

const programs = [
  { image: food, alt: 'Food and essential pantry supplies from the Oreka Foundation flyer', kicker: 'Nourishing lives', title: 'Food assistance', description: 'Providing food and essential supplies to individuals and families experiencing hardship.', icon: Soup },
  { image: education, alt: 'Schoolchildren featured in the Oreka Foundation flyer', kicker: 'Opening doors', title: 'Educational support', description: 'Supporting access to education and school resources so children have the opportunity to thrive.', icon: BookOpen },
  { image: outreach, alt: 'A community care package bearing the Oreka Foundation logo', kicker: 'Showing up with care', title: 'Community outreach', description: 'Meeting people where they are with essential resources, meaningful connections, and support.', icon: HeartHandshake },
]

function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [donationOpen, setDonationOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)
  const donate = () => setDonationOpen(true)
  const closeMenu = () => setMenuOpen(false)
  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a href="#home" aria-label="The Oreka Foundation home" onClick={closeMenu}><img className="brand-logo" src={logo} alt="The Oreka Foundation — Food. Education. Hope." width={173} height={80} /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-link" href="#about">Who we are</a>
            <a className="nav-link" href="#work">What we do</a>
            <a className="nav-link" href="#mission">Our mission</a>
            <a className="nav-link" href="#get-involved">Get involved</a>
            <Link className="nav-link" to="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <Button variant="donate" className="donate-button" onClick={donate}><Heart size={14} /> Donate <ArrowRight size={14} /></Button>
            <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{[['Who we are', '#about'], ['What we do', '#work'], ['Our mission', '#mission'], ['Get involved', '#get-involved']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}<Link to="/contact" onClick={closeMenu}>Contact</Link></nav>}
      </header>
      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={hero} alt="Illustrative scene of a volunteer sharing food with a family" width={1536} height={1024} fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-inner">
            <div className="eyebrow">The Oreka Foundation</div>
            <h1>Stronger communities.<br /><em>Brighter futures.</em></h1>
            <p className="hero-intro">Every act of kindness creates a possibility.<br />Together, we bring food, education, and hope to individuals and families who need it most.</p>
            <div className="hero-buttons"><Button variant="donate" onClick={donate}>Give hope today <ArrowRight /></Button><Button asChild variant="hero"><a href="#work">Explore our work <ArrowRight /></a></Button></div>
            <div className="hero-signature"><HeartHandshake /> Rooted in compassion. Built on dignity.</div>
          </div>
        </section>
        <div className="values-strip"><div className="values-inner">
          <div className="value"><Soup /><span>Food & nourishment</span></div>
          <div className="value"><BookOpen /><span>Education & opportunity</span></div>
          <div className="value"><HeartHandshake /><span>Community & care</span></div>
          <div className="value"><Heart /><span>Hope & possibility</span></div>
        </div></div>
        <section className="section-shell intro-layout" id="about">
          <div><div className="eyebrow section-eyebrow">Compassion in action</div><h2 className="section-heading">Small acts.<br />Meaningful change.</h2></div>
          <div className="intro-copy"><p>The Oreka Foundation was created from a deeply personal desire to serve individuals and families experiencing hardship and to help create stronger, more hopeful communities.</p><p>We believe a brighter future starts with the everyday essentials: a nourishing meal, the chance to learn, and the reassurance that someone cares.</p><a className="text-link" href="#story">The story behind our purpose <ArrowRight /></a></div>
        </section>
        <section className="programs-section" id="work"><div className="section-shell">
          <div className="section-topline"><div><div className="eyebrow section-eyebrow">What we do</div><h2 className="section-heading">Care that meets real needs.</h2></div><p>Every person deserves dignity. Our work focuses on the essentials that help people and communities move forward.</p></div>
          <div className="program-grid">{programs.map((program, index) => <article className="program-card" key={program.title}><div className="program-image-wrap"><img src={program.image} alt={program.alt} loading="lazy" width={500} height={250} /></div><div className="program-body"><span className="program-kicker">{program.kicker}</span><h3>{program.title}</h3><p>{program.description}</p><Button variant="link" className="p-0 h-auto" onClick={() => setSelectedProgram(index)}>Learn more <ArrowRight /></Button></div></article>)}</div>
          <p className="wellness-note"><Heart /> Our vision also includes health and wellness initiatives and other forms of essential support.</p>
        </div></section>
        <section className="mission-section" id="mission"><div className="eyebrow">Our mission</div><blockquote>To improve the lives of individuals and families in need by providing access to food, education, essential resources, health and community support while fostering dignity, opportunity, and hope for a better future.</blockquote><div className="mission-bottom">Food. Education. Hope.</div></section>
        <section className="section-shell story-layout" id="story">
          <div><div className="eyebrow section-eyebrow">Our story</div><h2 className="section-heading">A legacy of love.<br />A future of hope.</h2><div className="story-tribute"><Sprout className="text-gold-ink" size={24} /><h3>In memory of Abosede “Bose”</h3><p>A life that inspired a purpose.<br />A name that carries her legacy forward.</p></div></div>
          <div className="story-copy"><p>The Foundation is named in memory of Abosede “Bose”, whose native name was Oreka. Her legacy inspired a vision centered on compassion, dignity, service, and creating meaningful opportunities for others.</p><p>Our work focuses on addressing everyday needs that can have a lasting impact on a person or family. Through food assistance, educational support, community outreach, health and wellness initiatives, and other forms of essential support, we aim to meet people where they are while helping create pathways toward a brighter future.</p><p>We believe meaningful change does not always begin with something enormous. Sometimes it begins with a family having enough food, a child receiving the resources needed to remain in school, someone gaining access to basic health services, or a community simply knowing that someone cares.</p><p><strong>Food. Education. Hope.</strong><br />These are the foundations of the work we are building.</p></div>
        </section>
        <section className="giving-section" id="get-involved"><div className="section-shell giving-inner"><div><div className="eyebrow section-eyebrow">Be part of a brighter tomorrow</div><h2>Hope grows when we give together.</h2><p>Join us in creating stronger, more hopeful communities.</p></div><Button variant="donate" onClick={donate}><Heart /> Support our mission <ArrowRight /></Button></div></section>
      </main>
      <footer className="site-footer"><div className="footer-inner"><div className="footer-top"><div><a href="#home" className="footer-name">The Oreka Foundation</a><div className="footer-tagline">FOOD. EDUCATION. HOPE.</div></div><nav className="footer-links" aria-label="Footer navigation"><a href="#about">Who we are</a><a href="#work">Our work</a><a href="#mission">Our mission</a><Link to="/contact">Contact</Link></nav></div><div className="footer-bottom"><div>© {new Date().getFullYear()} The Oreka Foundation. All rights reserved.</div><span>Compassion. Dignity. Opportunity.</span></div></div></footer>
      <Dialog open={donationOpen} onOpenChange={setDonationOpen}><DialogContent className="donation-dialog"><Heart className="donation-symbol" /><DialogTitle>Thank you for choosing hope.</DialogTitle><DialogDescription>Online giving is not available yet. We’re preparing a secure way to support The Oreka Foundation’s work in food, education, and community care. No payment is being collected here.</DialogDescription><Button onClick={() => setDonationOpen(false)}>Continue exploring <ArrowRight /></Button><div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} /> Your kindness makes a difference.</div></DialogContent></Dialog>
      <Dialog open={selectedProgram !== null} onOpenChange={(open) => { if (!open) setSelectedProgram(null) }}><DialogContent className="donation-dialog">{selectedProgram !== null && <><DialogTitle>{programs[selectedProgram]?.title}</DialogTitle><DialogDescription>{programs[selectedProgram]?.description} Our approach is rooted in compassion, dignity, and creating meaningful opportunities for individuals and families.</DialogDescription><Button onClick={() => { setSelectedProgram(null); donate() }} variant="donate">Support our mission <Heart /></Button></>}</DialogContent></Dialog>
    </>
  )
}
