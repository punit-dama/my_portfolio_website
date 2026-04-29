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
    btnScrollTop.style.display = 'flex'
  } else {
    btnScrollTop.style.display = 'none'
  }
}

document.addEventListener('scroll', scrollUp)
