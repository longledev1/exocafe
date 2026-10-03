import { useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 5 curated horizontal product showcase cards in Polaroid/Art Frame style (compact viewport fit)
const FANNED_CARDS = [
  {
    id: 'store-p2',
    title: 'Exo Drip Coffee Box',
    image: '/images/store/product2_horizontal.png',
    offset: -380,
    yOffset: 8,
    rotation: -7,
  },
  {
    id: 'store-p4',
    title: 'Exo Homemade Tropical Jam',
    image: '/images/store/product4_horizontal.png',
    offset: -190,
    yOffset: 2,
    rotation: -3.5,
  },
  {
    id: 'store-p1',
    title: 'Exo Tropicana Gift Box',
    image: '/images/store/product1_horizontal.png',
    offset: 0,
    yOffset: -4,
    rotation: 0,
    isCenter: true,
  },
  {
    id: 'store-p5',
    title: 'Exo Tropical Cookies Bag',
    image: '/images/store/product5_horizontal.png',
    offset: 190,
    yOffset: 2,
    rotation: 3.5,
  },
  {
    id: 'store-p6',
    title: 'Exo Mini Plant Gift Set',
    image: '/images/store/product6_horizontal.png',
    offset: 380,
    yOffset: 8,
    rotation: 7,
  },
]

export default function StoreHeroFannedCards({ onSelectProduct }) {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef([])
  const [activeHoverId, setActiveHoverId] = useState(null)
  const [isFanned, setIsFanned] = useState(false)

  const getMultiplier = useCallback(() => {
    if (typeof window === 'undefined') return 1.0
    if (window.innerWidth < 640) return 0.38
    if (window.innerWidth < 768) return 0.52
    if (window.innerWidth < 1024) return 0.75
    return 1.0
  }, [])

  // Coordinated Entrance & Silky Smooth Fan-Out Animation:
  // 1. Headline & Subtitle smoothly enter on landing
  // 2. Cards start stacked neatly in the center as 1 deck
  // 3. Cards fan out sequentially from center to both wings with elegant fluid physics
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion || !containerRef.current) {
        setIsFanned(true)
        return
      }

      const mult = getMultiplier()
      const centerIndex = 2

      // Master timeline coordinating title entrance + card spread
      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          setIsFanned(true)
        },
      })

      // 1. Title Entrance (smooth fade + upward rise)
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          0
        )
      }

      // 2. Subtitle Entrance (gentle staggered fade + upward rise)
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.18
        )
      }

      // 3. Initial Stack of Deck: start hidden & slightly lowered
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        gsap.set(card, {
          x: 0,
          y: 30,
          rotation: index === centerIndex ? 0 : (index - centerIndex) * 0.7,
          scale: index === centerIndex ? 0.95 : 0.92,
          opacity: 0,
        })
      })

      // 4. Stacked Card Deck smoothly fades in & rises up
      tl.to(
        cardsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: (index) => (index === centerIndex ? 1 : 0.97),
          duration: 0.7,
          ease: 'power2.out',
        },
        0.32
      )

      // 5. Fluid Card Fan-Out from center outward (blossoming after appearing)
      const fanStartTime = 0.88
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        const config = FANNED_CARDS[index]
        const distanceFromCenter = Math.abs(index - centerIndex) // 0, 1, 2, 3
        const targetX = config.offset * mult
        const targetY = config.yOffset * mult
        const targetRot = config.rotation

        tl.to(
          card,
          {
            x: targetX,
            y: targetY,
            rotation: targetRot,
            scale: 1,
            duration: 1.25,
            ease: 'power3.out',
          },
          fanStartTime + distanceFromCenter * 0.08
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] pt-20 pb-6 sm:pt-30 sm:pb-8"
    >
      {/* Background ambient decorative glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-35">
        <div className="from-brand-accent/15 to-brand-title/15 h-[360px] w-[650px] rounded-full bg-gradient-to-r via-[#E6B87D]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6">
        {/* Large Title (Boutique Gift Store Vibe) */}
        <h2
          ref={titleRef}
          className="!font-hand text-brand-title text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-[68px]"
        >
          Thoughtful gifts from our <br className="hidden sm:block" />
          <span className="text-brand-accent font-hand">tropical garden.</span>
        </h2>

        {/* Subtitle with font-medium */}
        <p
          ref={subtitleRef}
          className="text-brand-body/90 mt-2.5 max-w-2xl font-sans text-xs leading-relaxed font-medium text-balance sm:text-sm"
        >
          Gói trọn hương vị cà phê rang mộc, trà hoa quả và thức bánh nướng thủ
          công vào từng set quà tinh tế — để bạn thưởng thức tại nhà hay gửi
          trao người&nbsp;trân&nbsp;quý.
        </p>

        {/* FANNED DECK CARDS CONTAINER (FITS 100% IN FIRST VIEWPORT FOLD) */}
        <div className="relative my-4 flex h-[245px] w-full items-center justify-center sm:my-6 sm:h-[280px] md:h-[305px]">
          {FANNED_CARDS.map((card, index) => {
            const isHovered = activeHoverId === card.id
            const zIndex = isHovered
              ? 50
              : 20 + Math.abs(2 - Math.abs(2 - index))

            return (
              <div
                key={card.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => isFanned && setActiveHoverId(card.id)}
                onMouseLeave={() => isFanned && setActiveHoverId(null)}
                onClick={() => onSelectProduct && onSelectProduct(card)}
                style={{
                  zIndex,
                  transformOrigin: 'bottom center',
                }}
                className="absolute cursor-pointer will-change-transform select-none"
              >
                {/* Art Postcard / Polaroid White Matte Frame */}
                <div
                  className={`w-[170px] rounded-2xl border border-black/8 bg-white p-2 shadow-[0_16px_36px_rgba(0,0,0,0.16)] transition-all duration-300 ease-out sm:w-[205px] sm:rounded-3xl sm:p-2.5 md:w-[240px] md:p-3 lg:w-[270px] ${
                    isHovered
                      ? 'ring-brand-accent/60 -translate-y-4 scale-106 shadow-[0_28px_60px_rgba(0,0,0,0.28)] ring-2'
                      : 'hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)]'
                  }`}
                >
                  {/* Inner Image with crisp inner rounding */}
                  <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-[#F0EDE8] sm:rounded-2xl">
                    <img
                      src={card.image}
                      alt={card.title || `Sản phẩm Exo Café ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading={index === 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
