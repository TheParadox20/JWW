import './style.css'
import { inject } from '@vercel/analytics'

inject({ mode: import.meta.env.DEV ? 'development' : 'production' })

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

document.querySelectorAll('.video-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.video-carousel-track')
  const slides = Array.from(track.children)
  const previous = carousel.querySelector('.video-carousel-prev')
  const next = carousel.querySelector('.video-carousel-next')
  const count = carousel.querySelector('.video-carousel-count')
  let activeIndex = 0

  const getLayout = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const slideWidth = slides[0].getBoundingClientRect().width
    const step = slideWidth + gap
    const visible = Math.max(1, Math.min(slides.length, Math.round((track.clientWidth + gap) / step)))
    return { step, visible, lastIndex: slides.length - visible }
  }

  const updateCarousel = () => {
    const { step, visible, lastIndex } = getLayout()
    const index = Math.max(0, Math.min(lastIndex, Math.round(track.scrollLeft / step)))
    if (index !== activeIndex) {
      slides[activeIndex].querySelector('video')?.pause()
      activeIndex = index
    }
    previous.disabled = index === 0
    next.disabled = index === lastIndex
    const first = String(index + 1).padStart(2, '0')
    const last = String(index + visible).padStart(2, '0')
    count.textContent = `${visible > 1 ? `${first}–${last}` : first} / ${String(slides.length).padStart(2, '0')}`
  }

  const goToSlide = (index) => {
    const { step, lastIndex } = getLayout()
    track.scrollTo({
      left: Math.max(0, Math.min(lastIndex, index)) * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }
  previous.addEventListener('click', () => goToSlide(activeIndex - 1))
  next.addEventListener('click', () => goToSlide(activeIndex + 1))
  track.addEventListener('scroll', updateCarousel, { passive: true })
  window.addEventListener('resize', updateCarousel)
  carousel.classList.add('is-enhanced')
  updateCarousel()
})

if (document.querySelector('.hero')) {
  import('./animations.js').then(({ initAnimations }) => initAnimations()).catch(() => {
    // The page remains usable if the optional animation module cannot load.
  })
}
