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
    role: "Principal Product Designer · Atlas Labs",
    period: "2021 – Present",
    summary:
      "Leading core product design for an AI-assisted planning platform serving cross-functional product teams. Partnered with PMs and engineers to launch roadmap workflows adopted by 80% of customers, contributing to a 2× increase in retention.",
    highlights: [
      "Shipped design system libraries across Figma & React for faster handoffs.",
      "Ran co-creation sessions with enterprise customers to de-risk major bet launches.",
      "Built interactive prototypes with React to validate complex scheduling flows.",
    ],
  },
  {
    role: "Senior Product Designer · Northbound",
    period: "2018 – 2021",
    summary:
      "Designed onboarding, account management, and reporting experiences for SMB financial tools. Introduced a modular research practice that informed quarterly strategy and reduced support tickets by 35%.",
    highlights: [
      "Created adaptable UI patterns that scaled across three B2B products.",
      "Partnered with data science to craft visualizations for high-volume dashboards.",
      "Facilitated design critiques and mentored junior designers.",
    ],
  },
  {
    role: "Design Engineer · Freelance",
    period: "2014 – 2018",
    summary:
      "Collaborated with founders and non-profits to launch custom sites, brand collateral, and product experiments. Delivered polished experiences with an emphasis on accessibility and maintainable code.",
    highlights: [
      "Built responsive design systems for early-stage SaaS products.",
      "Conducted research sprints with community organizations.",
      "Provided ongoing UX coaching and front-end audits.",
    ],
  },
]

const projects = [
  {
    title: "Atlas Boards",
    year: "2023",
    summary:
      "A shared planning workspace for product leads. Introduced collaborative prioritization, contextual insights, and automated status updates. Resulted in a 25% reduction in weekly stand-up meetings.",
    meta: [
      "Role: Lead Designer, Prototype Engineer",
      "Tools: Figma, React, Framer Motion",
    ],
  },
  {
    title: "Northbound Guides",
    year: "2020",
    summary:
      "A contextual knowledge base that brings support insights into the product. Shipped a guided onboarding flow that improved activation by 18% and scaled across two other products.",
    meta: ["Role: Product Designer", "Tools: Figma, Notion, Vue"],
  },
  {
    title: "Open Transit Map",
    year: "2017",
    summary:
      "Volunteer project building a lightweight transit map for underserved areas. Focused on accessibility-first design, dark mode support, and inclusive language localization.",
    meta: ["Role: Design Engineer", "Tools: Sketch, React Native"],
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

const NeuralField = () => {
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

      const densityFactor = Math.min(120, Math.floor((width * height) / 9000))
      nodes = Array.from({ length: densityFactor }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.7 + 0.6,
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

      nodes.forEach(node => {
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
          const influenceRadius = 160

          if (distance < influenceRadius) {
            const strength = (1 - distance / influenceRadius) * 0.6
            node.vx -= (dx / distance) * strength * 0.05
            node.vy -= (dy / distance) * strength * 0.05
          }
        }

        node.vx *= 0.995
        node.vy *= 0.995
      })

      if (pointer.active && performance.now() - pointer.lastActive > 220) {
        pointer.active = false
      }
    }

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      const width = window.innerWidth
      const height = window.innerHeight

      context.lineWidth = 0.7

      for (let i = 0; i < nodes.length; i += 1) {
        const nodeA = nodes[i]

        for (let j = i + 1; j < nodes.length; j += 1) {
          const nodeB = nodes[j]
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 155

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            context.strokeStyle = `rgba(94, 234, 212, ${opacity * 0.35})`
            context.beginPath()
            context.moveTo(nodeA.x, nodeA.y)
            context.lineTo(nodeB.x, nodeB.y)
            context.stroke()
          }
        }
      }

      nodes.forEach(node => {
        context.fillStyle = "rgba(148, 163, 184, 0.55)"
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
          110
        )
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.35)")
        gradient.addColorStop(1, "rgba(14, 116, 144, 0)")
        context.fillStyle = gradient
        context.beginPath()
        context.arc(pointer.x, pointer.y, 110, 0, Math.PI * 2)
        context.fill()
      }

      context.fillStyle = "rgba(3, 7, 18, 0.18)"
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
    <div className="background" aria-hidden="true">
      <canvas ref={canvasRef} className="background__canvas" />
    </div>
  )
}

const IndexPage = () => {
  const [activeSection, setActiveSection] = React.useState("home")
  const currentYear = React.useMemo(() => new Date().getFullYear(), [])

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

  const formatIndex = React.useCallback(index => String(index + 1).padStart(2, "0"), [])

  return (
    <div className="page-wrapper">
      <NeuralField />
      <div className="page-shell">
        <aside className="page-nav">
          <span className="page-nav__logo">Hassan Ali</span>
          <nav aria-label="Primary">
            <ul className="page-nav__list">
              {navLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                    className={`page-nav__item ${activeSection === link.id ? "is-active" : ""}`}
                    href={link.href}
                  >
                    <span>{formatIndex(index)}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="page-content">
          <section
            className="hero reveal"
            id="home"
            data-animate
            data-section="home"
          >
            <div className="hero__intro">
              <span className="hero__eyebrow">Product Designer &amp; Engineer</span>
              <h1 className="hero__title">
                Building thoughtful tools and inclusive experiences for product teams.
              </h1>
              <p className="hero__summary">
                I blend design strategy, rapid prototyping, and code to move ideas from discovery to launch.
                I'm happiest when partnering with teams to shape calm, legible tools that help people do their best work.
              </p>
              <div className="hero__details">
                <span className="hero__location">Based in Toronto · Working remotely</span>
                <a className="hero__cta" href="mailto:hello@hassanali.com">
                  Start a conversation
                </a>
              </div>
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
              <h2 className="section__title">Let’s build something considerate</h2>
              <p className="section__summary">
                Whether you need a design partner, an audit, or a prototyping sprint, I’d love to hear what you’re working on.
              </p>
            </header>
            <div className="contact__links">
              <a href="mailto:hello@hassanali.com">Email</a>
              <a href="https://linkedin.com/in/hassanali" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/hassanali" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </section>

          <footer className="footer">
            <span>© {currentYear} Hassan Ali · Toronto</span>
            <a href="mailto:hello@hassanali.com">hello@hassanali.com</a>
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
    <title>Hassan Ali – Product Designer &amp; Engineer</title>
    <meta
      name="description"
      content="Personal website of Hassan Ali – Product designer and engineer focused on thoughtful tools and inclusive experiences."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </>
)
