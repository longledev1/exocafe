import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { FOOD_MENU_CATEGORIES as CATEGORIES } from '../constants/foodMenu'

// ─── C-shaped Circular Arc Configuration ───
// All coordinates in SVG viewBox space (700 x 700)
// Circle: center (580, 350), radius 265
// C-arc spans 260° from 310° (top-right) counterclockwise through 180° (left apex) to 50° (bottom-right)
// CX is pushed far right so the arc tails extend off the right edge of the viewport
const VB_W = 700
const VB_H = 700
const CX = 580
const CY = 350
const R = 265

// 5 slot angles evenly distributed along the C-arc (step = 65°)
const SLOT_ANGLES_DEG = [310, 245, 180, 115, 50]

// Precompute percentage positions for each slot (matching SVG viewBox coordinates exactly)
const SLOTS = SLOT_ANGLES_DEG.map((deg, i) => {
  const rad = (deg * Math.PI) / 180
  return {
    pctX: ((CX + R * Math.cos(rad)) / VB_W) * 100,
    pctY: ((CY + R * Math.sin(rad)) / VB_H) * 100,
    scale: [0.72, 0.95, 1.36, 0.95, 0.72][i],
    opacity: [0.65, 0.85, 1.0, 0.85, 0.65][i],
    zIndex: [10, 25, 50, 25, 10][i],
  }
})

// SVG arc path computed from the same circle geometry
const ARC_START_RAD = (310 * Math.PI) / 180
const ARC_END_RAD = (50 * Math.PI) / 180
const ARC_PATH = `M ${Math.round(CX + R * Math.cos(ARC_START_RAD))} ${Math.round(CY + R * Math.sin(ARC_START_RAD))} A ${R} ${R} 0 1 0 ${Math.round(CX + R * Math.cos(ARC_END_RAD))} ${Math.round(CY + R * Math.sin(ARC_END_RAD))}`

export default function EllipticalMenu() {
  const [activeIndex, setActiveIndex] = useState(0)
  const leftPanelRef = useRef(null)
  const sectionRef = useRef(null)
  const total = CATEGORIES.length

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(
        '.island-bg-text',
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 0.5,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.6,
          ease: 'power2.out',
        }
      )

      tl.fromTo(
        '.island-text-stroke',
        { strokeDashoffset: 850, strokeWidth: 1 },
        { strokeDashoffset: 0, duration: 1.8, ease: 'power1.inOut' },
        '-=1.2'
      )

      tl.to(
        '.island-text-stroke',
        {
          fill: '#C84928',
          strokeWidth: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
    },
    { scope: sectionRef }
  )

  // Select category & animate left panel
  const selectCategory = (index) => {
    if (index === activeIndex) return
    setActiveIndex(index)

    // Animate Left Panel card entrance smoothly
    if (leftPanelRef.current) {
      gsap.killTweensOf(leftPanelRef.current)
      gsap.fromTo(
        leftPanelRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }

  // Nav helpers
  const handlePrev = () => selectCategory((activeIndex - 1 + total) % total)
  const handleNext = () => selectCategory((activeIndex + 1) % total)

  const currentCategory = CATEGORIES[activeIndex]

  // Map each category to a slot on the arc based on active index
  // Active item always at slot 2 (leftmost spotlight position)
  const getSlotIndex = (catIdx) => {
    return (((catIdx - activeIndex + 2) % total) + total) % total
  }

  return (
    <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#B94425] py-8 pr-0 pl-4 text-white select-none sm:mb-24 sm:pl-8 md:py-12 md:pl-12 lg:mb-32 lg:min-h-[90vh] lg:pl-16">
      <div className="relative z-10 mr-0 ml-auto flex w-full max-w-[2100px] flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
        {/* ================= LEFT PANEL (GREEN FOOD CARD EXTENDED HORIZONTALLY) ================= */}
        <div
          className="pointer-events-none z-10 -mt-2 flex w-full flex-shrink-0 flex-col justify-between pr-2 sm:pr-4 lg:-mt-6 lg:w-[62%] lg:pr-4 xl:w-[60%]"
          ref={leftPanelRef}
        >
          {/* Category Title & Description */}
          <div className="pointer-events-auto mb-4 sm:mb-6">
            <h2 className="font-title mb-2 text-2xl leading-tight font-bold tracking-wider whitespace-nowrap text-white uppercase sm:mb-3 sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
              {currentCategory.title}
            </h2>
            <p className="w-full max-w-none font-sans text-xs leading-relaxed font-light text-white/80 sm:text-sm md:text-base">
              {currentCategory.subtitle}
            </p>
          </div>

          {/* Child Products Grid Card (Deep Green Container - Stretched Wide Horizontally) */}
          <div className="pointer-events-auto relative flex min-h-[340px] w-full flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#2D4D43] p-5 text-white shadow-2xl sm:min-h-[380px] sm:p-7 md:min-h-[420px] md:p-8 lg:min-h-[440px] lg:p-9">
            {/* Arrow Nav Controls */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 active:scale-95 sm:left-3 sm:h-11 sm:w-11"
              aria-label="Previous Category"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 active:scale-95 sm:right-3 sm:h-11 sm:w-11"
              aria-label="Next Category"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Products Grid (2 Rows x 4 Columns - Stretched Wide Horizontally) */}
            {currentCategory.products && currentCategory.products.length > 0 ? (
              <div className="grid grid-cols-4 gap-x-4 gap-y-4 px-6 sm:gap-x-8 sm:gap-y-5 sm:px-10 md:gap-x-12 md:px-12 lg:gap-x-14 lg:px-14">
                {currentCategory.products.map((item) => (
                  <div
                    key={item.id}
                    className="group flex cursor-pointer flex-col items-center justify-center text-center"
                  >
                    <div className="mb-2 flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:mb-2.5 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-30 lg:w-30">
                      <img
                        src={item.image || item.img}
                        alt={item.name}
                        className="h-full w-full object-contain drop-shadow-lg filter"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-title group-hover:text-brand-accent w-full px-1 text-center text-[11px] leading-snug font-semibold tracking-normal text-white uppercase transition-colors sm:text-xs md:text-sm">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-white/75">
                <p className="font-sans text-sm sm:text-base font-medium">
                  Mục thực đơn đang được cập nhật món mới...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT PANEL: C-ARC CAROUSEL (FULL 720px LARGE SCALE) ================= */}
        {/* CRITICAL: SVG arc + items share ONE container — flush to right viewport edge */}
        <div className="pointer-events-none relative z-30 -mr-4 mr-0 flex w-full items-center justify-end overflow-visible pr-0 lg:-mr-8 lg:w-[46%] xl:w-[44%]">
          <div
            className="pointer-events-none relative w-full overflow-visible"
            style={{
              aspectRatio: `${VB_W} / ${VB_H}`,
              maxWidth: '840px',
              marginRight: '-80px',
            }}
          >
            {/* SVG Circular Arc Track Band — uses exact same circle (CX,CY,R) as item positions */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter
                  id="arcShadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="12"
                    floodColor="#000"
                    floodOpacity="0.25"
                  />
                </filter>
              </defs>
              <path
                d={ARC_PATH}
                fill="none"
                stroke="#FAF6EE"
                strokeWidth="78"
                strokeLinecap="round"
                filter="url(#arcShadow)"
                className="opacity-90"
              />
            </svg>

            {/* Category Items — positioned using % derived from the SAME viewBox coordinates */}
            {CATEGORIES.map((cat, idx) => {
              const slotIdx = getSlotIndex(idx)
              const slot = SLOTS[slotIdx]
              const isActive = slotIdx === 2

              return (
                <div
                  key={cat.id}
                  onClick={() => selectCategory(idx)}
                  className="group pointer-events-auto absolute flex cursor-pointer flex-col items-center justify-center rounded-full p-2 transition-transform duration-300 select-none active:scale-95"
                  style={{
                    left: `${slot.pctX}%`,
                    top: `${slot.pctY}%`,
                    transform: `translate(-50%, -50%) scale(${slot.scale})`,
                    opacity: slot.opacity,
                    zIndex: slot.zIndex,
                    cursor: 'pointer',
                    transition:
                      'left 0.8s cubic-bezier(0.25,0.46,0.45,0.94), top 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
                  }}
                >
                  {/* Active Soft Glowing Shadow Aura */}
                  {isActive && (
                    <>
                      {/* Deep Radiant Glow Shadow */}
                      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/45 blur-2xl sm:h-48 sm:w-48 md:h-56 md:w-56" />
                      {/* Ground Contact Shadow */}
                      <div className="pointer-events-none absolute bottom-4 left-1/2 -z-10 h-5 w-30 -translate-x-1/2 rounded-full bg-black/35 blur-md" />
                    </>
                  )}
                  <div className="relative flex cursor-pointer flex-col items-center justify-center">
                    {/* Item Image */}
                    <div className="flex h-32 w-32 cursor-pointer items-center justify-center sm:h-40 sm:w-40 md:h-46 md:w-46 lg:h-50 lg:w-50">
                      <img
                        src={cat.spotlightImg}
                        alt={cat.title}
                        className={`h-full w-full cursor-pointer object-contain transition-all duration-500 ${
                          isActive
                            ? 'scale-108 brightness-110 contrast-105 drop-shadow-[0_0_26px_rgba(255,255,255,0.85)] drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]'
                            : 'brightness-[0.65] drop-shadow-[0_5px_12px_rgba(0,0,0,0.22)] group-hover:scale-105 group-hover:brightness-90'
                        }`}
                      />
                    </div>

                    {/* Category Label Pill */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
