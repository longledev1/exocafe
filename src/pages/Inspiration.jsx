import { useState, useRef } from 'react'
import gsap from 'gsap'

import InspirationHero from '../components/inspiration/InspirationHero'
import TerracottaCurtain from '../components/inspiration/TerracottaCurtain'
import InspirationPillars from '../components/inspiration/InspirationPillars'
import ScrollStorytellingSection from '../components/inspiration/ScrollStorytellingSection'
import SweetnessStorytellingSection from '../components/inspiration/SweetnessStorytellingSection'

export default function Inspiration() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const videoRef = useRef(null)
  const curtainRef = useRef(null)

  // Terracotta Orange Curtain Sweep Transition on Video Switch
  const handleCardClick = (targetIndex) => {
    if (targetIndex === activeIndex || isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex(targetIndex)

    const curtain = curtainRef.current
    const video = videoRef.current

    if (curtain) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(curtain, { x: '-100%' })
          setIsTransitioning(false)
        },
      })

      // Curtain Sweep IN from Left (0 -> 100% cover)
      tl.fromTo(
        curtain,
        { x: '-100%' },
        {
          x: '0%',
          duration: 0.38,
          ease: 'power2.inOut',
          onComplete: () => {
            setDisplayedIndex(targetIndex)
            if (video) {
              video.currentTime = 0
              video.play().catch(() => {})
            }
          },
        }
      )

      // Curtain Sweep OUT to Right (0 -> 100% reveal)
      tl.to(curtain, {
        x: '100%',
        duration: 0.45,
        ease: 'power2.out',
        delay: 0.05,
      })
    } else {
      setDisplayedIndex(targetIndex)
      setIsTransitioning(false)
    }
  }

  return (
    <div className="bg-brand-bg min-h-screen w-full">
      {/* 1. HERO VIDEO SHOWCASE */}
      <InspirationHero
        activeIndex={activeIndex}
        displayedIndex={displayedIndex}
        isTransitioning={isTransitioning}
        handleCardClick={handleCardClick}
        videoRef={videoRef}
      />

      {/* 2. TERRACOTTA ORANGE CURTAIN SWEEP OVERLAY */}
      <TerracottaCurtain ref={curtainRef} />

      {/* 3. 3 CORE PILLARS SECTION */}
      <InspirationPillars />

      {/* 4. PINNED SCROLL-DRIVEN COFFEE STORYTELLING SECTION */}
      <ScrollStorytellingSection />

      {/* 5. PINNED BAKERY & SWEETNESS STORYTELLING SECTION (SVG SPLIT PATH) */}
      <SweetnessStorytellingSection />
    </div>
  )
}
