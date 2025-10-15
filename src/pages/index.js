import * as React from "react"

const navLinks = [
  { label: "Overview", href: "#home", id: "home" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Contact", href: "#contact", id: "contact" },
]

const experiences = [
  {
    role: "Software Engineer · University of Washington",
    period: "Sep 2022 – Feb 2025 · Seattle, WA",
    summary:
      "Automated campus software deployments and infrastructure to deliver faster, more reliable tooling for students and staff.",
    highlights: [
      "Optimized Gradle build pipelines and REST APIs to automate silent installs, cutting deployment time 50% and doubling system performance while driving a 70% user satisfaction lift.",
      "Applied CI/CD security testing and release chain management to keep installations compliant without slowing delivery.",
      "Orchestrated Kubernetes and Terraform infrastructure to reduce manual configuration by 60% and keep environments consistent end-to-end.",
    ],
  },
  {
    role: "Coding Instructor & STFC Admin · University of Washington",
    period: "Oct 2022 – Mar 2025 · Seattle, WA",
    summary:
      "Guided student technologists while running funding operations that scale the university’s developer ecosystem.",
    highlights: [
      "Secured 1st place in the PNW Coding Competition using Dijkstra's Algorithm to solve a satellite communications path challenge.",
      "Mentored a cohort of 13 honors freshmen through foundational programming coursework and project critiques.",
      "Delivered an Angular and Django inventory platform that reduced bookstore load times by 25% and improved usability.",
    ],
  },
  {
    role: "IT Intern · KBA Inc.",
    period: "Jun 2021 – Sep 2022 · Bellevue, WA",
    summary:
      "Modernized enterprise infrastructure and security tooling for 500+ employees during a major cloud upgrade.",
    highlights: [
      "Streamlined SharePoint libraries and user lists for 540 concurrent users to enable upgrades across SharePoint, UKG, and Dynamics SL.",
      "Deployed vulnerability scanners, SIEM, IDS/IPS, and firewall policies to harden endpoints while maintaining agile stakeholder communication.",
      "Resolved Remote Gateway Server and VPN issues and integrated Azure with on-prem directories, keeping 400+ staff connected during the Dynamics SL 2018 rollout.",
    ],
  },
]

const projects = [
  {
    title: "Cyberforce",
    year: "2024",
    summary:
      "Full-stack incident response simulator that blends machine learning analytics with operational security drills for renewable energy partners.",
    meta: [
      "Role: Lead Full-Stack Engineer",
      "Tools: React, Node.js, Azure, Hive, Kafka, Spark",
    ],
  },
  {
    title: "Campus Deployment Automation",
    year: "2023",
    summary:
      "CI/CD tooling that powers campus-wide silent installations, doubling performance while keeping release security checks automated.",
    meta: [
      "Role: Software Engineer",
      "Tools: Gradle, REST APIs, Kubernetes, Terraform",
    ],
  },
  {
    title: "STFC Inventory Platform",
    year: "2024",
    summary:
      "An Angular and Django service that streamlines bookstore operations and reduces load times for student technology services by 25%.",
    meta: [
      "Role: Coding Instructor & STFC Admin",
      "Tools: Angular, Django, PostgreSQL",
    ],
  },
]

const writings = [
  {
    title: "Prototypes build trust",
    href: "#",
    description: "2024 · Crafting the right fidelity to align cross-functional teams.",
  },
  {
    title: "Eight heuristics for accessible design",
    href: "#",
    description: "2023 · A framework I use when reviewing flows with product teams.",
  },
  {
    title: "Designing a discovery cadence",
    href: "#",
    description: "2022 · How we built a research habit inside a startup moving fast.",
  },
]

const NeuralField = ({ className = "background" }) => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext("2d")
    if (!context) {
      return undefined
    }

    let animationFrame = 0
    const pointer = { x: 0, y: 0, active: false, lastActive: 0 }
    let nodes = []

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const densityFactor = Math.min(220, Math.floor((width * height) / 5200))
      nodes = Array.from({ length: densityFactor }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 1.8 + 0.7,
      }))
    }

    const handlePointerMove = event => {
      pointer.active = true
      pointer.lastActive = performance.now()
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const handleTouchMove = event => {
      if (!event.touches.length) {
        return
      }
      const touch = event.touches[0]
      pointer.active = true
      pointer.lastActive = performance.now()
      pointer.x = touch.clientX
      pointer.y = touch.clientY
    }

    const updateNodes = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const maxSpeed = 2
      const stormBand = height * 0.4

      nodes.forEach(node => {
        const turbulence = node.y < stormBand ? 0.16 : 0.1
        node.vx += (Math.random() - 0.5) * turbulence
        node.vy += (Math.random() - 0.5) * turbulence

        node.x += node.vx
        node.y += node.vy

        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1
        }
        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1
        }

        if (pointer.active) {
          const dx = pointer.x - node.x
          const dy = pointer.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 1
          const influenceRadius = 220

          if (distance < influenceRadius) {
            const strength = (1 - distance / influenceRadius) * (node.y < stormBand ? 0.28 : 0.2)
            node.vx += (dx / distance) * strength * 0.12
            node.vy += (dy / distance) * strength * 0.12
          }
        }

        node.vx = Math.max(Math.min(node.vx, maxSpeed), -maxSpeed)
        node.vy = Math.max(Math.min(node.vy, maxSpeed), -maxSpeed)
        node.vx *= 0.99
        node.vy *= 0.99
      })

      if (pointer.active && performance.now() - pointer.lastActive > 220) {
        pointer.active = false
      }
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      const width = window.innerWidth
      const height = window.innerHeight

      context.lineWidth = 0.85

      for (let i = 0; i < nodes.length; i += 1) {
        const nodeA = nodes[i]

        for (let j = i + 1; j < nodes.length; j += 1) {
          const nodeB = nodes[j]
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 190

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            context.strokeStyle = `rgba(99, 210, 255, ${opacity * 0.42})`
            context.beginPath()
            context.moveTo(nodeA.x, nodeA.y)
            context.lineTo(nodeB.x, nodeB.y)
            context.stroke()
          }
        }
      }

      nodes.forEach(node => {
        context.fillStyle = "rgba(148, 221, 255, 0.6)"
        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fill()
      })

      if (pointer.active) {
        const gradient = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          140
        )
        gradient.addColorStop(0, "rgba(79, 209, 255, 0.4)")
        gradient.addColorStop(0.4, "rgba(34, 197, 247, 0.3)")
        gradient.addColorStop(1, "rgba(14, 116, 144, 0)")
        context.fillStyle = gradient
        context.beginPath()
        context.arc(pointer.x, pointer.y, 140, 0, Math.PI * 2)
        context.fill()
      }

      context.fillStyle = "rgba(3, 7, 18, 0.16)"
      context.fillRect(0, 0, width, height)
    }

    const render = () => {
      updateNodes()
      draw()
      animationFrame = window.requestAnimationFrame(render)
    }

    const handleResize = () => {
      setupCanvas()
    }

    setupCanvas()
    render()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handlePointerMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handlePointerMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="background__canvas" />
    </div>
  )
}

const IndexPage = () => {
  const [activeSection, setActiveSection] = React.useState("home")
  const currentYear = React.useMemo(() => new Date().getFullYear(), [])
  const scrollIndicatorRef = React.useRef(null)
  const [scrollActive, setScrollActive] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    const elements = document.querySelectorAll("[data-animate]")
    if (!elements.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    )

    elements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    const sections = document.querySelectorAll("[data-section]")
    if (!sections.length) {
      return undefined
    }

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section")
            if (id) {
              setActiveSection(id)
            }
          }
        })
      },
      { threshold: 0.45, rootMargin: "-10% 0px -35% 0px" }
    )

    sections.forEach(section => sectionObserver.observe(section))

    return () => sectionObserver.disconnect()
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    const handlePointerMove = event => {
      const indicator = scrollIndicatorRef.current
      if (!indicator) {
        return
      }

      const rect = indicator.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const activationRadius = Math.max(rect.width, rect.height) * 1.6

      setScrollActive(distance < activationRadius)
    }

    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  const formatIndex = React.useCallback(index => String(index + 1).padStart(2, "0"), [])

  return (
    <div className="page-wrapper">
      <NeuralField />
      <div className="page-shell">
        <main className="page-content">
          <section className="hero reveal" id="home" data-animate data-section="home">
            <div className="hero__identity">
              <span className="hero__name">Sayed Ali</span>
              <span className="hero__title">Software Developer</span>
            </div>
            <div
              className={`hero__scroll-indicator ${scrollActive ? "hero__scroll-indicator--active" : ""}`}
              aria-hidden="true"
              ref={scrollIndicatorRef}
            >
              <span>Scroll down</span>
              <span className="hero__scroll-indicator-arrow">▼</span>
            </div>
          </section>

          <section
            className="section reveal"
            id="experience"
            data-animate
            data-section="experience"
          >
            <header className="section__header">
              <span className="section__eyebrow">Experience</span>
              <h2 className="section__title">Making complex workflows feel effortless</h2>
              <p className="section__summary">
                I help growing teams align on product direction, validate experiments, and ship polished systems that scale.
              </p>
            </header>
            <div className="timeline">
              {experiences.map(experience => (
                <article className="timeline__item" key={experience.role}>
                  <header className="timeline__header">
                    <h3 className="timeline__role">{experience.role}</h3>
                    <span className="timeline__period">{experience.period}</span>
                  </header>
                  <p className="timeline__summary">{experience.summary}</p>
                  <ul className="timeline__list">
                    {experience.highlights.map(highlight => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section reveal"
            id="projects"
            data-animate
            data-section="projects"
          >
            <header className="section__header">
              <span className="section__eyebrow">Selected Projects</span>
              <h2 className="section__title">Shaping products from vision to launch</h2>
              <p className="section__summary">
                A snapshot of collaborations where research, prototyping, and engineering came together to ship ambitious work.
              </p>
            </header>
            <div className="project-grid">
              {projects.map(project => (
                <article className="project-card" key={project.title}>
                  <header>
                    <h3>{project.title}</h3>
                    <span>{project.year}</span>
                  </header>
                  <p>{project.summary}</p>
                  <div className="project-card__meta">
                    {project.meta.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section reveal"
            id="writing"
            data-animate
            data-section="writing"
          >
            <header className="section__header">
              <span className="section__eyebrow">Writing</span>
              <h2 className="section__title">Notes from the field</h2>
              <p className="section__summary">
                Reflections on building trust with prototypes, running accessible critiques, and scaling research habits.
              </p>
            </header>
            <div className="writing-list">
              {writings.map(entry => (
                <article className="writing-item" key={entry.title}>
                  <h3>
                    <a href={entry.href} aria-label={`Read article "${entry.title}"`}>
                      {entry.title}
                    </a>
                  </h3>
                  <span>{entry.description}</span>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section reveal"
            id="contact"
            data-animate
            data-section="contact"
          >
            <header className="section__header">
              <span className="section__eyebrow">Contact</span>
              <h2 className="section__title">Let’s build something transformative</h2>
              <p className="section__summary">
                Whether you need a design partner, an audit, or a prototyping sprint, I’d love to hear what you’re working on.
              </p>
            </header>
            <div className="contact__links">
              <a href="mailto:hudsonzaidi@gmail.com">Email</a>
              <a href="https://www.linkedin.com/in/sayedli/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://sayedli.github.io" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </section>

          <footer className="footer">
            <span>© {currentYear} Sayed Ali · Seattle</span>
            <a href="mailto:hudsonzaidi@gmail.com">hudsonzaidi@gmail.com</a>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <html lang="en" />
    <title>Sayed Ali – Designer &amp; Engineer</title>
    <meta
      name="description"
      content="Sayed Ali's Portfolio– Product designer and engineer focused on thoughtful tools and inspiring experiences."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" type="image/png" href="/favicon.png" />
  </>
)
