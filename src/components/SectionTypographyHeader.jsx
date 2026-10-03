import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SectionTypographyHeader
 * Reusable Header Component for ExoCafé sections.
 * Displays a large background text and a cursive handwritten overlay text with GSAP ScrollTrigger animations.
 *
 * @param {string} bgText - Main large background text (e.g., "ISLAND", "TROPICAL", "SWEET")
 * @param {string} handText - Cursive handwritten text overlay (e.g., "Favorites", "All day", "Desserts")
 * @param {string} bgTextColor - Tailwind color class for background text
 * @param {string} strokeColor - Tailwind stroke color class for cursive text
 * @param {string} fillColor - Hex/CSS color used to fill the cursive text on animation completion
 * @param {string} className - Optional container styling overrides
 */
export default function SectionTypographyHeader({
  bgText = 'ISLAND',
  handText = 'Favorites',
  bgTextColor = 'text-brand-title',
  strokeColor = 'stroke-brand-accent',
  fillColor = '#C84928',
  className = '',
}) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // 1. Entrance animation for the background text (blur-to-focus fade)
      tl.fromTo(
        '.header-bg-text',
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 0.5,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power2.out',
        }
      )

      // 2. SVG outlines draw for handwritten text
      tl.fromTo(
        '.header-text-stroke',
        { strokeDashoffset: 850, strokeWidth: 1 },
        { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' },
        '-=1.4'
      )

      // 3. Solid color fill for handwritten text
      tl.to(
        '.header-text-stroke',
        {
          fill: fillColor,
          strokeWidth: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className={`bg-brand-bg relative overflow-hidden pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-24 lg:pb-10 ${className}`}
    >
      <div className="mb-6 w-full sm:mb-8">
        <div className="relative mx-auto flex min-h-[220px] w-full items-center justify-center sm:min-h-[300px] lg:min-h-[380px]">
          {/* Large background text spanning close to screen edges with 50% opacity */}
          <h2
            className={`header-bg-text font-title ${bgTextColor} w-full text-center text-[285px] leading-none font-bold uppercase opacity-50 select-none`}
          >
            {bgText}
          </h2>

          {/* SVG wrapper for handwritten cursive text */}
          <svg className="font-hand pointer-events-none absolute right-[5%] bottom-[20px] z-20 h-[1em] w-[1em] overflow-visible text-[clamp(5.5rem,14vw,16rem)] leading-[0.75] select-none sm:right-[12%] sm:bottom-0 lg:right-[9%]">
            <text
              x="100%"
              y="0.75em"
              textAnchor="end"
              className={`header-text-stroke ${strokeColor} fill-transparent stroke-[1px] leading-none`}
              style={{
                strokeDasharray: 850,
                strokeDashoffset: 850,
              }}
            >
              {handText}
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
