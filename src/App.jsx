import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, CalendarBlank, FlowerLotus, MapPin, Sparkle } from '@phosphor-icons/react'
import { atmosphereLanterns, couple, events, media, venue } from './data'
import { downloadWeddingIcs } from './calendar'
import Reveal from './components/Reveal'
import Countdown from './components/Countdown'
import WelcomeCard from './components/WelcomeCard'
import ScratchSection from './components/ScratchSection'
import Credit from './components/Credit'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [playing, setPlaying] = useState(false)
  const video = useRef(null)
  const root = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const leafY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 95])

  // Scroll-driven GSAP choreography (starts once the intro is finished).
  useEffect(() => {
    if (reduce || !introDone || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-copy>*', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
      gsap.to('.hero-art', {
        scale: 1.09,
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.utils.toArray('.event').forEach((el, i) =>
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 ? -42 : 42, rotate: 0.5 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', end: 'top 58%', scrub: 0.8 },
          },
        ),
      )
      gsap.utils.toArray('.ceremony-image').forEach((fig) =>
        gsap.fromTo(
          fig.querySelector('img'),
          { scale: 1.1, yPercent: -3 },
          {
            scale: 1,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        ),
      )
      gsap.fromTo(
        '.story-inner',
        { clipPath: 'inset(0 50% 0 50%)', opacity: 0.4 },
        {
          clipPath: 'inset(0 0% 0 0%)',
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.story', start: 'top 80%', end: 'center 55%', scrub: 1 },
        },
      )
      gsap.to('.map i', { y: -10, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut' })
      gsap.utils.toArray('.atmos-lantern').forEach((el, i) => {
        const depth = Number(el.dataset.depth || 0.4)
        gsap.to(el, {
          yPercent: -90 * depth,
          x: Math.sin(i) * 18 * depth,
          rotation: i % 2 ? 4 : -4,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1.2 + depth },
        })
        gsap.to(el.querySelector('.lantern-flame'), {
          scaleY: 1.18,
          opacity: 0.72,
          repeat: -1,
          yoyo: true,
          duration: 0.7 + i * 0.08,
          ease: 'sine.inOut',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [introDone, reduce])

  const startIntro = () => {
    const v = video.current
    if (v) {
      v.currentTime = 0
      setPlaying(true)
      v.play().catch(() => setPlaying(false))
    }
  }

  return (
    <main ref={root}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <div className="lantern-atmosphere" aria-hidden="true">
        {atmosphereLanterns.map((l, i) => (
          <span
            key={i}
            className="atmos-lantern"
            data-depth={l.d}
            style={{ left: `${l.x}%`, top: `${l.y}%`, '--scale': l.s, '--blur': `${l.b}px`, '--delay': `${-i * 0.6}s` }}
          >
            <i className="lantern-chain" />
            <i className="lantern-cap" />
            <i className="lantern-body">
              <b className="lantern-flame" />
            </i>
            <i className="lantern-tail" />
          </span>
        ))}
      </div>

      {!introDone && (
        <div className={'welcome ' + (playing ? 'intro-playing' : '')}>
          <video
            ref={video}
            className="welcome-video"
            muted
            playsInline
            preload="auto"
            poster={media.openingPoster}
            onEnded={() => setIntroDone(true)}
            aria-label="Shiva and Parvati joining hands, the opening of Nagendra and Shravya's engagement invitation"
          >
            <source src={media.openingVideo} type="video/mp4" />
          </video>
          <div className="welcome-shade" />
          <div className="garland-edge" />
          {!playing && <WelcomeCard onDone={startIntro} />}
          {playing && (
            <button className="skip-intro" onClick={() => setIntroDone(true)}>
              Skip intro
            </button>
          )}
        </div>
      )}

      <section className="hero">
        <motion.img
          className="hero-art"
          src={media.hero}
          alt="Lord Shiva and Goddess Parvati joining hands before a South Indian temple, with a couple seated in pooja below"
          style={{ y: reduce ? 0 : heroY }}
        />
        <div className="hero-scrim" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: +!!introDone, y: introDone ? 0 : 24 }}
          transition={{ delay: 0.15, duration: 1 }}
        >
          <p className="blessing">Blessed by Lord Shiva &amp; Goddess Parvati</p>
          <h1>
            {couple.groom} <span>&amp;</span> {couple.bride}
          </h1>
          <div className="date-rule">
            <i />
            03 · 12 · 2026
            <i />
          </div>
          <p>Engagement · {venue.city}</p>
        </motion.div>
        <motion.div className="leaf-float left" style={{ y: reduce ? 0 : leafY }} />
        <motion.div className="leaf-float right" style={{ y: reduce ? 0 : leafY }} />
        <div className="scroll-cue">
          <ArrowDown size={20} />
          <span>Our engagement</span>
        </div>
      </section>

      <section className="count-section">
        <Reveal>
          <p className="kicker">Until our engagement</p>
          <h2>Counting every heartbeat</h2>
          <Countdown />
        </Reveal>
      </section>

      <ScratchSection />

      <section className="story ornamental">
        <Reveal className="story-inner">
          <FlowerLotus size={34} weight="thin" />
          <p className="script">A union blessed by the divine</p>
          <h2>Two hearts, one blessing</h2>
          <p>
            With the blessings of Lord Shiva and Goddess Parvati, and with the love of our families, we joyfully invite you to witness the beginning of our journey together.
          </p>
          <div className="families">
            <div>
              <small>The groom</small>
              <b>{couple.groomFull}</b>
              <span>Son of {couple.groomParents}</span>
            </div>
            <i>&amp;</i>
            <div>
              <small>The bride</small>
              <b>{couple.brideFull}</b>
              <span>Daughter of {couple.brideParents}</span>
            </div>
          </div>
          <div className="signature">
            {couple.groom} <i>&amp;</i> {couple.bride}
          </div>
        </Reveal>
      </section>

      <section className="ceremony-moment pooja-moment">
        <div className="floating-glass lotus-one">✿</div>
        <div className="floating-glass lotus-two">❀</div>
        <div className="floating-diya">◒</div>
        <Reveal className="ceremony-head">
          <p className="script">The first blessing</p>
          <h2>Pooja begins at 8:48 AM</h2>
          <p>A quiet, sacred start to our engagement day.</p>
        </Reveal>
        <div className="ceremony-pair">
          <figure className="ceremony-image">
            <img src={media.poojaBride} loading="lazy" alt="Illustrated portrait of the bride in a yellow half-saree at the pooja" />
            <figcaption>The bride</figcaption>
          </figure>
          <figure className="ceremony-image">
            <img src={media.poojaGroom} loading="lazy" alt="Illustrated portrait of the groom in a copper kurta at the pooja" />
            <figcaption>The groom</figcaption>
          </figure>
        </div>
      </section>

      <section className="ceremony-moment ring-moment">
        <Reveal className="ceremony-head">
          <p className="script">Followed by</p>
          <h2>The ring ceremony</h2>
          <p>Two rings, two families and one beautiful promise.</p>
        </Reveal>
        <div className="ceremony-pair single">
          <figure className="ceremony-image">
            <img src={media.ring} loading="lazy" alt="Illustrated couple in lilac outfits exchanging rings" />
          </figure>
        </div>
        <Reveal className="ceremony-caption">
          <span>Lunch follows</span>
        </Reveal>
      </section>

      <section className="events">
        <Reveal>
          <h2>Engagement day</h2>
          <p className="section-intro">One morning of blessings, rings and a shared meal.</p>
        </Reveal>
        <div className="event-list">
          {events.map((e, i) => (
            <Reveal key={e.name} className={'event ' + (i === 1 ? 'featured' : '')}>
              <div className="event-number">0{i + 1}</div>
              <div>
                <span className="event-icon">{e.icon}</span>
                <h3>{e.name}</h3>
                <p>{e.note}</p>
                <dl>
                  <div><dt>Date</dt><dd>{e.date}</dd></div>
                  <div><dt>Time</dt><dd>{e.time}</dd></div>
                  <div><dt>Venue</dt><dd>{e.venue}</dd></div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="venue ornamental">
        <Reveal>
          <MapPin size={38} weight="thin" />
          <p className="script">Meet us in Vijayawada</p>
          <h2>{venue.name}</h2>
          <p>{venue.city}</p>
          <div className="map google-map">
            <iframe
              title={'Google Map of ' + venue.name}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={'https://www.google.com/maps?q=' + encodeURIComponent(venue.mapQuery) + '&z=15&output=embed'}
            />
            <div className="map-overlay">
              <span>
                <MapPin size={19} weight="fill" />
                Engagement venue
              </span>
              <b>{venue.name}</b>
              <small>Pinch or drag to explore</small>
            </div>
          </div>
          <div className="actions">
            <a
              className="button primary"
              href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.mapQuery)}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={19} />
              Open in Google Maps
            </a>
            <button className="button secondary" onClick={downloadWeddingIcs}>
              <CalendarBlank size={19} />
              Add to Calendar
            </button>
          </div>
        </Reveal>
      </section>

      <footer>
        <img src={media.footer} loading="lazy" alt="Shiva and Parvati joining hands" />
        <div className="footer-overlay" />
        <Reveal className="footer-copy">
          <Sparkle size={27} weight="thin" />
          <p>We cannot wait to celebrate with you</p>
          <h2>
            {couple.groom} <i>&amp;</i> {couple.bride}
          </h2>
          <span>3 December 2026 · Vijayawada</span>
        </Reveal>
        <Credit />
      </footer>
    </main>
  )
}
