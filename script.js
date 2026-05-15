const body = document.body
const btnHamburger = document.querySelector('.fa-bars')
const navList = document.querySelector('.nav__list')

// Theme Logic
const themeToggle = document.getElementById('theme-toggle')
const isLight = () => body.classList.contains('light')

const setTheme = (theme) => {
  if (theme === 'light') {
    body.classList.add('light')
    themeToggle.checked = true
  } else {
    body.classList.remove('light')
    themeToggle.checked = false
  }
  localStorage.setItem('portfolio-theme', theme)
}

// Initialize theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark'
setTheme(savedTheme)

themeToggle.addEventListener('change', () => {
  themeToggle.checked ? setTheme('light') : setTheme('dark')
})

// Mobile Nav Logic
const toggleNav = () => {
  const isOpening = btnHamburger.classList.contains('fa-bars')
  
  if (isOpening) {
    btnHamburger.classList.replace('fa-bars', 'fa-times')
    navList.style.display = 'flex'
    navList.classList.add('display-nav-list')
  } else {
    btnHamburger.classList.replace('fa-times', 'fa-bars')
    navList.style.display = 'none'
    navList.classList.remove('display-nav-list')
  }
}

btnHamburger.parentElement.addEventListener('click', toggleNav)

// Scroll Top Logic
const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top')
  if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btnScrollTop.classList.add('scroll-top--show')
  } else {
    btnScrollTop.classList.remove('scroll-top--show')
  }
}

// Typing Effect
const typeRole = () => {
  const roleElement = document.querySelector('.about__role')
  if (!roleElement) return
  
  const text = "Data Analyst"
  let index = 0
  roleElement.textContent = ""
  
  const type = () => {
    if (index < text.length) {
      roleElement.textContent += text.charAt(index)
      index++
      setTimeout(type, 80)
    }
  }
  setTimeout(type, 1000) // Start after preloader
}

// Scroll Reveal
const reveal = () => {
  const reveals = document.querySelectorAll('.reveal')
  reveals.forEach(element => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 100
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active')
    }
  })
}

// Interactive Particles
const initParticles = () => {
  const canvas = document.createElement('canvas')
  canvas.id = 'particle-canvas'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  
  let particles = []
  let mouse = { x: null, y: null }
  
  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', e => {
    mouse.x = e.x
    mouse.y = e.y
  })
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      
      if (mouse.x && mouse.y) {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx*dx + dy*dy)
        if (distance < 100) {
          this.x -= dx/20
          this.y -= dy/20
        }
      }
    }
    draw() {
      ctx.fillStyle = 'rgba(13, 148, 136, 0.3)'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.update()
      p.draw()
    })
    requestAnimationFrame(animate)
  }
  
  resize()
  for (let i = 0; i < 50; i++) particles.push(new Particle())
  animate()
}

// Preloader Logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader')
  const loaderData = document.querySelector('.loader-data')
  
  let count = 0
  const counterInterval = setInterval(() => {
    count += Math.floor(Math.random() * 15)
    if (count >= 100) {
      count = 100
      clearInterval(counterInterval)
      
      setTimeout(() => {
        preloader.classList.add('fade-out')
        document.body.style.overflow = 'auto'
        typeRole()
        initParticles()
      }, 300)
    }
    loaderData.textContent = count.toString().padStart(2, '0')
  }, 30)
})

window.addEventListener('scroll', reveal)
document.addEventListener('scroll', scrollUp)
reveal() // Initial check
