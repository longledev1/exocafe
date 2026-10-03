import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null)

  const [displayedText1, setDisplayedText1] = useState('')
  const [displayedText2, setDisplayedText2] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' -> 'textFadeOut' -> 'logoFadeIn'

  const fullText1 = 'Không chỉ là một quán cà phê'
  const fullText2 = 'mà đây là nơi ta đắm mình trong miền nhiệt đới'

  useEffect(() => {
    let index1 = 0
    let index2 = 0
    let intervalId

    const typeLine1 = () => {
      intervalId = setInterval(() => {
        if (index1 <= fullText1.length) {
          setDisplayedText1(fullText1.slice(0, index1))
          index1++
        } else {
          clearInterval(intervalId)
          setTimeout(() => {
            typeLine2()
          }, 300)
        }
      }, 40)
    }

    const typeLine2 = () => {
      intervalId = setInterval(() => {
        if (index2 <= fullText2.length) {
          setDisplayedText2(fullText2.slice(0, index2))
          index2++
        } else {
          clearInterval(intervalId)
          setTimeout(() => {
            setPhase('textFadeOut')
          }, 1100)
        }
      }, 35)
    }

    typeLine1()

    return () => clearInterval(intervalId)
  }, [])

  useGSAP(
    () => {
      // 1. Blinking caret (cursor) animation
      gsap.fromTo(
        '.splash-caret',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, repeat: -1, yoyo: true, ease: 'steps(1)' }
      )

      // 2. Ambient Morning Light source parallax shift
      gsap.to('.splash-light', {
        x: '+=40',
        y: '+=30',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // 3. Sparkles/Dust particles float animations
      gsap.utils.toArray('.splash-particle').forEach((particle) => {
        gsap.fromTo(
          particle,
          {
            x: 'random(-45, 45)',
            y: 'random(-45, 45)',
            opacity: 0,
            scale: 'random(0.3, 0.8)',
          },
          {
            x: 'random(-140, 140)',
            y: 'random(-140, 140)',
            opacity: 'random(0.2, 0.7)',
            duration: 'random(6, 9)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 'random(0, 2)',
          }
        )
      })
    },
    { scope: containerRef }
  )

  useGSAP(() => {
    if (phase === 'textFadeOut') {
      gsap.to('.splash-text-container', {
        opacity: 0,
        y: -25,
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setPhase('logoFadeIn')
        },
      })
    }

    if (phase === 'logoFadeIn') {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            fadeOutSplash()
          }, 1200)
        },
      })

      // Show Logo Container & Footer
      gsap.set('.splash-logo-container, .splash-footer', {
        display: 'flex',
        opacity: 0,
      })

      tl.to(['.splash-logo-container', '.splash-footer'], {
        opacity: 1,
        duration: 0.2,
      })

      // Fade in the logo image (Blur to Clear)
      tl.fromTo(
        '.splash-logo',
        { filter: 'blur(20px)', opacity: 0, scale: 0.95 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          scale: 1.0,
          duration: 1.4,
          ease: 'power3.out',
        },
        '-=0.1'
      )

      // Fade in the tagline "TROPICANA FLAVORS" after 0.2s
      tl.fromTo(
        '.splash-tagline',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        '-=1.0'
      )

      // Sunlight flare sweep across the logo from left to right
      tl.fromTo(
        '.logo-shine',
        { left: '-100%' },
        { left: '200%', duration: 1.8, ease: 'power2.inOut' },
        '-=0.8'
      )

      // Fade in the footer member text
      tl.fromTo(
        '.splash-footer',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=1.6'
      )
    }
  }, [phase])

  const fadeOutSplash = () => {
    gsap.to(containerRef.current, {
      scale: 1.08,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 1.0,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete()
      },
    })
  }

  return (
    <div
      ref={containerRef}
      className="bg-brand-bg fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* 1. Ambient Morning Light Source (Parallax background element) */}
      <div className="splash-light pointer-events-none absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(241,241,229,0.5)_0%,rgba(250,248,245,0)_70%)] blur-3xl"></div>

      {/* 2. Sparkling Dust Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="splash-particle pointer-events-none absolute rounded-full bg-white/75 blur-[0.5px]"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}

      {/* 3. Phase 1: Typing Text Container */}
      {phase !== 'logoFadeIn' && (
        <div className="splash-text-container font-hand text-brand-title/95 z-20 flex max-w-7xl translate-y-[-24px] flex-col items-center justify-center px-6 text-center text-3xl leading-normal md:translate-y-[-48px] md:text-4xl lg:text-5xl">
          <div className="font-hand mb-2 min-h-[3rem] sm:whitespace-nowrap md:min-h-[4.5rem]">
            {displayedText1}
            {phase === 'typing' && !displayedText2 && (
              <span className="splash-caret ml-1 inline-block font-sans text-xl font-light sm:text-3xl">
                |
              </span>
            )}
          </div>
          <div className="text-brand-accent font-hand min-h-[3rem] sm:whitespace-nowrap md:min-h-[4.5rem]">
            {displayedText2}
            {phase === 'typing' && displayedText2 && (
              <span className="splash-caret ml-1 inline-block font-sans text-xl font-light sm:text-3xl">
                |
              </span>
            )}
          </div>
        </div>
      )}

      {/* 4. Phase 2: Central Logo & Tagline Container */}
      <div className="splash-logo-container absolute inset-0 z-20 hidden flex-col items-center justify-center">
        <div className="flex translate-y-[-24px] flex-col items-center md:translate-y-[-48px]">
          <div className="relative flex flex-col items-center overflow-hidden">
            <img
              src="/images/logo/Exocafe_logo.png"
              alt="ExoCafe Logo"
              className="splash-logo h-44 w-auto object-contain md:h-64"
            />
            {/* Sunlight shine sweep */}
            <div className="logo-shine pointer-events-none absolute top-0 z-30 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>

          {/* mr-[-0.5em] perfectly balances out the tracking-[0.5em] on the last letter for mathematical centering */}
          <p className="splash-tagline text-2xs text-brand-accent mt-[-20px] mr-[2em] text-center font-sans font-semibold tracking-[0.5em] uppercase md:mt-[-30px] md:text-xs">
            TROPICANA FLAVORS
          </p>
        </div>
      </div>

      {/* 5. Phase 2: Faint Footer Membership Text */}
      <div className="splash-footer pointer-events-none absolute bottom-8 z-30 hidden text-center opacity-0">
        <p className="text-brand-title/40 mr-[-0.35em] text-center font-sans text-[10px] font-medium tracking-[0.35em] uppercase md:text-xs">
          A member of NS GROUP
        </p>
      </div>
    </div>
  )
}
