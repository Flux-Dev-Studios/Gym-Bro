import { useEffect, useState } from 'react'
import './App.css'

const gymPulses = [
  { count: '50+', activity: 'on the gym floor right now' },
  { count: '12', activity: 'lifting with their coach right now' },
  { count: '18', activity: 'finding their flow on the rowers' },
  { count: '24', activity: 'in the middle of a strength session' },
  { count: '78', activity: 'members checked in for today’s gym rush' },
]

const equipment = [
  { name: 'DUMBBELLS', type: 'dumbbells' },
  { name: 'TREADMILLS', type: 'treadmill' },
  { name: 'ROWERS', type: 'rower' },
  { name: 'SQUAT RACKS', type: 'rack' },
  { name: 'KETTLEBELLS', type: 'kettlebell' },
  { name: 'SPIN BIKES', type: 'bike' },
  { name: 'CABLE MACHINES', type: 'cable' },
  { name: 'MEDICINE BALLS', type: 'medicine-ball' },
  { name: 'BATTLE ROPES', type: 'rope' },
  { name: 'LEG PRESSES', type: 'leg-press' },
  { name: 'PULL-UP BARS', type: 'pull-up' },
  { name: 'BENCHES', type: 'bench' },
] as const

const programs = [
  {
    number: '01',
    name: 'Strength',
    detail: 'Build real-world strength with a plan that meets you where you are.',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Modern strength training floor',
    className: 'program-card--strength',
  },
  {
    number: '02',
    name: 'Conditioning',
    detail: 'Get your heart pumping and your energy back with coach-led sessions.',
    image:
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Athlete training in a bright gym',
    className: 'program-card--conditioning',
  },
  {
    number: '03',
    name: 'Mobility',
    detail: 'Move better, recover smarter, and feel good doing what you love.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Athlete stretching before a workout',
    className: 'program-card--mobility',
  },
]

const plans = [
  {
    name: 'The Starter',
    description: 'All the essentials to make your first move.',
    monthlyPrice: 19,
    annualPrice: 15,
    features: ['Gym floor access', '1 group class each week', 'Personal training intro'],
  },
  {
    name: 'The Regular',
    description: 'For the routine you can’t wait to get back to.',
    monthlyPrice: 39,
    annualPrice: 31,
    features: ['Unlimited gym access', 'Unlimited group classes', 'Monthly coach check-in'],
    featured: true,
  },
  {
    name: 'The All-In',
    description: 'Your goals, your coach, your own game plan.',
    monthlyPrice: 69,
    annualPrice: 55,
    features: ['Everything in Regular', '2 personal training sessions', 'Recovery lounge access'],
  },
]

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h13M10.5 4l6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2m14.51-6.01-1.42 1.42M5.41 14.59l-1.42 1.42m12.02 0-1.42-1.42M5.41 5.41 3.99 3.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M16.7 12.1A7 7 0 0 1 7.9 3.3 7 7 0 1 0 16.7 12.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function EquipmentIcon({ type }: { type: (typeof equipment)[number]['type'] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {type === 'dumbbells' && (
        <path d="M4 8v8M7 6v12M17 6v12M20 8v8M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
      {type === 'treadmill' && (
        <path d="M4 18h16M6 15h10l-2-6M16 9l3-3M13 5h4M8 18l2-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'rower' && (
        <path d="M3 18h18M6 16l4-4h4l3 4M13 12l3-6M16 6l3 3M7 16v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'rack' && (
        <path d="M5 20V5M19 20V5M5 8h14M8 6v4M16 6v4M9 8v2M15 8v2M9 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'kettlebell' && (
        <>
          <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7 9h10l2 9H5l2-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </>
      )}
      {type === 'bike' && (
        <>
          <circle cx="6" cy="16" r="3" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="m6 16 4-7 4 7H6Zm4-7h4m-1 0 5 7m-8-9h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {type === 'cable' && (
        <path d="M5 20V4h3v16M16 20V4h3v16M8 7h5v6m0 0-2-2m2 2 2-2M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'medicine-ball' && (
        <>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6.5 6.5c3 2 4 5 4 9m7-9c-3 2-4 5-4 9M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {type === 'rope' && (
        <path d="M4 6c5 0 3 12 8 12s3-12 8-12M4 10c5 0 3 8 8 8s3-8 8-8M4 14c5 0 3 4 8 4s3-4 8-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
      {type === 'leg-press' && (
        <path d="M5 19h14M7 17V8h7l4 4m-9-4 3 5-4 4m5-8 4-3m-3 10h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'pull-up' && (
        <path d="M4 19V5m16 14V5M4 7h16m-5 0v4a3 3 0 0 1-6 0V7m3 7v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {type === 'bench' && (
        <path d="M4 8h12v3H4zM7 11v8m7-8v8m2-8 2 8M5 19h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function DumbbellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4 8v8M7 6v12M17 6v12M20 8v8M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [annualBilling, setAnnualBilling] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)
  const [gymPulseIndex, setGymPulseIndex] = useState(0)
  const [displayedActivity, setDisplayedActivity] = useState('')

  const closeMenu = () => setMenuOpen(false)
  const toggleTheme = () => setDarkTheme((isDark) => !isDark)

  useEffect(() => {
    const pulse = gymPulses[gymPulseIndex]
    const text = `${pulse.count} ${pulse.activity}`
    let typedCharacters = 0
    let erasedCharacters = text.length
    let typeTimer: number
    let eraseTimer: number | undefined
    let eraseTimeout: number | undefined

    typeTimer = window.setInterval(() => {
      typedCharacters += 1
      setDisplayedActivity(text.slice(0, typedCharacters))

      if (typedCharacters >= text.length) {
        window.clearInterval(typeTimer)
        const typingDuration = text.length * 28
        const erasingDuration = text.length * 24

        eraseTimeout = window.setTimeout(() => {
          eraseTimer = window.setInterval(() => {
            erasedCharacters -= 1
            setDisplayedActivity(text.slice(0, erasedCharacters))

            if (erasedCharacters <= 0) {
              if (eraseTimer !== undefined) window.clearInterval(eraseTimer)
              setGymPulseIndex((index) => (index + 1) % gymPulses.length)
            }
          }, 24)
        }, Math.max(0, 10_000 - typingDuration - erasingDuration))
      }
    }, 28)

    return () => {
      window.clearInterval(typeTimer)
      if (eraseTimeout !== undefined) window.clearTimeout(eraseTimeout)
      if (eraseTimer !== undefined) window.clearInterval(eraseTimer)
    }
  }, [gymPulseIndex])

  const currentGymPulse = gymPulses[gymPulseIndex]

  return (
    <div className={`app-shell${darkTheme ? ' app-shell--dark' : ''}`}>
      <div className="announcement">
        <span className="announcement__spark" aria-hidden="true">✳</span>
        Your first week is on us. <a href="#membership">Come try us out <ArrowIcon /></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Gym Bro home" onClick={closeMenu}>
          <span className="wordmark__icon" aria-hidden="true">G</span>
          <span>GYM<span className="wordmark__dot">.</span>BRO</span>
        </a>

        <nav
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href="#programs" onClick={closeMenu}>What we do</a>
          <a href="#about" onClick={closeMenu}>Our vibe</a>
          <a href="#membership" onClick={closeMenu}>Membership</a>
          <a className="button button--dark nav-cta" href="#membership" onClick={closeMenu}>
            Get started <ArrowIcon diagonal />
          </a>
        </nav>
        <div className="header-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${darkTheme ? 'light' : 'dark'} theme`}
            title={`Switch to ${darkTheme ? 'light' : 'dark'} theme`}
          >
            <ThemeIcon dark={darkTheme} />
          </button>
          <button
            className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__copy">
            <p className="eyebrow"><span className="eyebrow__line" /> YOUR NEIGHBORHOOD GYM, REIMAGINED</p>
            <h1>Build your body<br />Boost your <span className="highlight-word">confidence</span></h1>
            <p className="hero__description">
              No egos. No weird rules. Just good people, great coaches, and a gym that feels like yours.
            </p>
            <div className="hero__actions">
              <a className="button button--lime" href="#membership">
                Find your fit <ArrowIcon diagonal />
              </a>
              <a className="text-link" href="#programs">
                Take a look around <span>↓</span>
              </a>
            </div>
            <div className="hero__social-proof" aria-label="Sample gym activity">
              <div className="avatar-stack" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span><span>K</span>
              </div>
              <p
                className="activity-stat"
                aria-label={`${currentGymPulse.count} ${currentGymPulse.activity}`}
              >
                <span aria-hidden="true">{displayedActivity}</span>
                <span className="sr-only" aria-live="polite">
                  {currentGymPulse.count} {currentGymPulse.activity}
                </span>
              </p>
            </div>
          </div>

          <div className="hero__visual">
            <img
              className="hero__image"
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=90"
              alt="Athlete lifting weights during a training session"
            />
            <div className="hero__image-wash" />
            <div className="hero-sticker" aria-label="Get a diet plan just for you!">
              <span>GET A DIET PLAN</span>
              <strong>JUST FOR YOU!</strong>
              <span className="hero-sticker__star" aria-hidden="true">✳</span>
            </div>
            <div className="hero-caption">
              <span className="hero-caption__dot" />
              <span>BUILT FOR REAL LIFE</span>
              <span className="hero-caption__divider" />
              <span>ALL LEVELS WELCOME</span>
            </div>
            <span className="hero__side-note" aria-hidden="true">FIND YOUR PEOPLE · FIND YOUR PACE ·</span>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span>scroll</span>
            <DumbbellIcon />
          </div>
        </section>

        <section className="ticker" aria-label="Gym equipment">
          <div className="ticker__track">
            {Array.from({ length: 4 }, (_, repeat) => (
              <span className="ticker__group" key={repeat} aria-hidden={repeat > 0}>
                {equipment.map((item) => (
                  <span className="ticker__item" key={item.name}>
                    <EquipmentIcon type={item.type} />
                    {item.name}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </section>

        <section className="programs section-wrap" id="programs">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> A LITTLE SOMETHING FOR EVERY BODY</p>
              <h2>Find your <span>kind of strong.</span></h2>
            </div>
            <p className="section-heading__aside">
              Whether you’re brand new or back at it, there’s a place for you here.
            </p>
          </div>

          <div className="program-grid">
            {programs.map((program) => (
              <a
                className={`program-card ${program.className}`}
                href="#membership"
                key={program.number}
              >
                <img src={program.image} alt={program.imageAlt} loading="lazy" />
                <div className="program-card__shade" />
                <span className="program-card__number">{program.number} / 03</span>
                <div className="program-card__content">
                  <p>{program.detail}</p>
                  <div className="program-card__title">
                    <h3>{program.name}</h3>
                    <span className="circle-arrow"><ArrowIcon diagonal /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="about__photo">
            <img
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=85"
              alt="Members encouraging each other during a workout"
              loading="lazy"
            />
            <div className="about__photo-label"><span>✳</span> BETTER, TOGETHER.</div>
          </div>
          <div className="about__copy">
            <p className="eyebrow"><span className="eyebrow__line" /> THIS IS YOUR SPACE</p>
            <h2>We’re not here<br />to change you.<br /><span>We’re here for you.</span></h2>
            <p className="about__description">
              The best workout is the one that feels like it belongs to you. Our coaches meet you where you are, cheer for every win, and help you find your own version of strong.
            </p>
            <a className="button button--lime" href="#membership">
              Meet your new gym <ArrowIcon diagonal />
            </a>
            <div className="about__stats">
              <div><strong>24<span>/7</span></strong><p>access, on your time</p></div>
              <div><strong>40<span>+</span></strong><p>classes every week</p></div>
              <div><strong>100<span>%</span></strong><p>your kind of people</p></div>
            </div>
          </div>
        </section>

        <section className="membership section-wrap" id="membership">
          <div className="section-heading section-heading--membership">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> NO SURPRISES. JUST GOOD GYM.</p>
              <h2>Your next chapter<br /><span>starts right here.</span></h2>
            </div>
            <div className="billing-switch" aria-label="Choose billing frequency">
              <button
                className={!annualBilling ? 'billing-switch__option is-active' : 'billing-switch__option'}
                type="button"
                aria-pressed={!annualBilling}
                onClick={() => setAnnualBilling(false)}
              >
                Monthly
              </button>
              <button
                className={annualBilling ? 'billing-switch__option is-active' : 'billing-switch__option'}
                type="button"
                aria-pressed={annualBilling}
                onClick={() => setAnnualBilling(true)}
              >
                Yearly <span>−20%</span>
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <article
                className={`price-card${plan.featured ? ' price-card--featured' : ''}`}
                key={plan.name}
              >
                {plan.featured && <span className="price-card__tag">THE CROWD FAVORITE</span>}
                <p className="price-card__name">{plan.name}</p>
                <p className="price-card__description">{plan.description}</p>
                <p className="price-card__price">
                  <strong>${annualBilling ? plan.annualPrice : plan.monthlyPrice}</strong>
                  <span>/ month</span>
                </p>
                {annualBilling && <p className="price-card__billing">Billed annually</p>}
                <a
                  className={plan.featured ? 'button button--lime' : 'button button--outline'}
                  href="mailto:hello@gymbro.com?subject=I%27m%20ready%20to%20join"
                >
                  Choose {plan.name} <ArrowIcon diagonal />
                </a>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="membership__note">Not sure yet? Your first week’s on us. No pressure, no commitment.</p>
        </section>

        <section className="final-cta">
          <div className="final-cta__decor" aria-hidden="true">✳</div>
          <p className="eyebrow"><span className="eyebrow__line" /> YOUR PEOPLE ARE HERE</p>
          <h2>Come for a workout.<br /><span>Stay for the feeling.</span></h2>
          <a className="button button--dark" href="#membership">
            Your first week is free <ArrowIcon diagonal />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#home" aria-label="Gym Bro home">
          <span className="wordmark__icon" aria-hidden="true">G</span>
          <span>GYM<span className="wordmark__dot">.</span>BRO</span>
        </a>
        <p>Good energy. Good people. Good for you.</p>
        <div className="site-footer__links">
          <a href="#programs">Programs</a>
          <a href="#about">Our vibe</a>
          <a href="#membership">Membership</a>
        </div>
        <span className="site-footer__copyright">© 2026 GYM BRO. MADE FOR YOU.</span>
      </footer>
    </div>
  )
}

export default App
