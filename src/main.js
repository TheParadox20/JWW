import './style.css'

const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.site-nav')

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isOpen))
  navigation.classList.toggle('is-open', !isOpen)
})

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false')
    navigation.classList.remove('is-open')
  })
})

document.querySelector('#year').textContent = new Date().getFullYear()

if (document.querySelector('.hero')) {
  import('./animations.js').then(({ initAnimations }) => initAnimations()).catch(() => {
    // The page remains usable if the optional animation module cannot load.
  })
}
