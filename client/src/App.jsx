import { useEffect, useRef, useState } from 'react';
import { company, heroBackground, heroSlides, aboutImages, services, categories, projects, serviceOptions } from './data.js';

const wa = `https://wa.me/${company.whatsapp}`;

/* Image that stays tidy until you add the real file */
function Pic({ src, alt, className = '' }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className={`pic-missing ${className}`}><span>{src.split('/').pop()}</span></div>;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

/* Adds .in when an element scrolls into view */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className = '', fallback = true }) {
  const [ok, setOk] = useState(true);
  if (ok) return <img className={className} src={company.logo} alt={company.name} onError={() => setOk(false)} />;
  return fallback ? <span className={`logo-fallback ${className}`}>{company.name}</span> : null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Portfolio', '#portfolio'], ['Contact', '#contact']];
  return (
    <header className={`header ${solid ? 'solid' : ''}`}>
      <div className="topbar">
        <div className="wrap">
          <span>{company.location}</span>
          <span className="tb-right">
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </span>
        </div>
      </div>
      <div className="navbar wrap">
        <a href="#home" className="brand" onClick={() => setOpen(false)}><Logo /></a>
        <nav className={open ? 'open' : ''}>
          {links.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          <a href="#quote" className="btn btn-yellow small" onClick={() => setOpen(false)}>Get a quote</a>
        </nav>
        <button className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu"><i /><i /><i /></button>
      </div>
    </header>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="hero-bg">
        {heroSlides.map((s, n) => (
          <div key={s} className={`slide ${n === i ? 'on' : ''}`} style={{ backgroundImage: `url(${s})` }} />
        ))}
      </div>
      <div className="hero-inner">
        <div className="hero-panel">
          <h1>MileHigh<br />Signs</h1>
          <p className="tag">Elevating Your Brand, One Sign at a Time.</p>
          <p className="lead">Professional signage, printing and branding solutions designed to make your business stand out.</p>
          <div className="row">
            <a href="#quote" className="btn btn-yellow">Get a quote</a>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-line">WhatsApp us</a>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="btn btn-line">Call now</a>
          </div>
        </div>
        <div className="dots">{heroSlides.map((_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} />)}</div>
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap split">
        <div className="reveal">
          <h2>Made to be noticed</h2>
          <p>MileHigh Signs is a professional signage, printing and branding company providing creative, high-quality solutions that help businesses stand out.</p>
          <p>From a single shop sign to a full fleet of branded vehicles, we handle design, production and installation under one roof, so the finished work looks exactly the way you pictured it.</p>
        </div>
        <div className="about-pics reveal">
          <Pic src={aboutImages[0]} alt="Our workshop" className="ap1" />
          <Pic src={aboutImages[1]} alt="Installation team" className="ap2" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap">
        <h2 className="reveal">What we do</h2>
        <div className="svc-grid">
          {services.map((s, n) => (
            <article key={s.title} className={`svc reveal s${n}`}>
              <div className="svc-img"><Pic src={s.image} alt={s.title} /></div>
              <div className="svc-body"><h3>{s.title}</h3><p>{s.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [cat, setCat] = useState('All');
  const [view, setView] = useState(null);
  const list = cat === 'All' ? projects : projects.filter(p => p.category === cat);
  useEffect(() => {
    const k = e => e.key === 'Escape' && setView(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  return (
    <section id="portfolio" className="section portfolio">
      <div className="wrap">
        <h2 className="reveal">Our work</h2>
        <div className="filters reveal">
          {categories.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="grid" key={cat}>
          {list.map(p => (
            <figure key={p.name} className="card" onClick={() => setView(p)}>
              <Pic src={p.image} alt={p.name} />
              <figcaption><small>{p.category}</small><strong>{p.name}</strong><span>{p.text}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
      {view && (
        <div className="lightbox" onClick={() => setView(null)}>
          <div className="lb-box" onClick={e => e.stopPropagation()}>
            <Pic src={view.image} alt={view.name} />
            <div><small>{view.category}</small><h3>{view.name}</h3><p>{view.text}</p></div>
            <button onClick={() => setView(null)} aria-label="Close">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

function Quote() {
  const [state, setState] = useState({ busy: false, msg: '', ok: false });
  const [fileName, setFileName] = useState('');
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ busy: true, msg: '', ok: false });
    try {
      const res = await fetch('/api/quotes', { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      form.reset(); setFileName('');
      setState({ busy: false, ok: true, msg: 'Thank you. We have your request and will reply shortly.' });
    } catch (err) {
      setState({ busy: false, ok: false, msg: err.message || 'Could not send. Please try WhatsApp instead.' });
    }
  }
  return (
    <section id="quote" className="section quote">
      <div className="wrap split">
        <div className="reveal">
          <h2>Tell us what you need</h2>
          <p>Share a few details and a photo or artwork if you have one. We will come back with a price and a timeline.</p>
        </div>
        <form onSubmit={submit} className="form reveal">
          <label>Name<input name="name" required /></label>
          <label>Company<input name="company" /></label>
          <label>Phone or WhatsApp<input name="phone" type="tel" required /></label>
          <label>Service required
            <select name="service" required defaultValue="">
              <option value="" disabled>Choose a service</option>
              {serviceOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="full">Project description<textarea name="description" rows="4" required /></label>
          <label className="full file">
            <span>{fileName || 'Upload artwork or a photo'}</span>
            <input name="artwork" type="file" accept="image/*,.pdf,.ai,.eps,.psd" onChange={e => setFileName(e.target.files[0]?.name || '')} />
          </label>
          <button className="btn btn-yellow full" disabled={state.busy}>{state.busy ? 'Sending' : 'Send request'}</button>
          {state.msg && <p className={`note ${state.ok ? 'good' : 'bad'} full`}>{state.msg}</p>}
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <h2 className="reveal">Find us</h2>
        <div className="split">
          <ul className="details reveal">
            <li><small>Phone</small><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></li>
            <li><small>WhatsApp</small><a href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</a></li>
            <li><small>Email</small><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li><small>Location</small><span>{company.location}</span></li>
            <li className="soc">{company.social.map(s => <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</li>
          </ul>
          <div className="map reveal">
            <iframe title="Map" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap fgrid">
        <div className="fcol fbrand">
          <Logo className="footer-logo" />
          <p>Professional signage, printing and branding solutions designed to make your business stand out.</p>
        </div>
        <div className="fcol">
          <h4>Explore</h4>
          <a href="#about">About us</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#quote">Get a quote</a>
        </div>
        <div className="fcol">
          <h4>Services</h4>
          {services.map(s => <a key={s.title} href="#services">{s.title}</a>)}
        </div>
        <div className="fcol">
          <h4>Contact</h4>
          <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
          <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <span>{company.location}</span>
        </div>
      </div>
      <div className="fbottom wrap">
        <span>{new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span className="fsoc">{company.social.map(s => <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>)}</span>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero /><About /><Services /><Portfolio /><Quote /><Contact />
      </main>
      <Footer />
      <a className="float-wa" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
    </>
  );
}
