import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initAnimations() {
  const motion = gsap.matchMedia()

  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const hero = gsap.timeline({ defaults: { ease: 'power2.out' } })

    hero
      .from('.hero-copy > *', { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.1 })
      .from('.portrait-photo', { autoAlpha: 0, y: 24, duration: 0.9 }, 0.15)
      .from('.hope-poster', { autoAlpha: 0, y: 16, duration: 0.7 }, 0.45)

    gsap.utils.toArray('.about-grid > *, .focus-heading > *').forEach((element) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 24,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray('.credentials, .focus-list').forEach((group) => {
      gsap.from(group.children, {
        autoAlpha: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      })
    })

    gsap.from('.vision blockquote, .quote-credit', {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.vision blockquote', start: 'top 85%', once: true },
    })
  })
}
