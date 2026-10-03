import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const INSPIRATION_ITEMS = [
  {
    id: 'cafe',
    num: '01',
    label: 'CAFÉ',
    subtitle: 'Nguồn Cội & Hạt Cà Phê Mộc',
    videoSrc: '/videos/cafe.mp4',
    poster: '/images/coffee.png',
    tagline: 'Coffee Origin & Tropical Farm',
  },
  {
    id: 'cake',
    num: '02',
    label: 'CAKE',
    subtitle: 'Bánh Ngọt Thủ Công & Trái Cây Tươi',
    videoSrc: '/videos/cake.mp4',
    poster: '/images/cake1.png',
    tagline: 'Artisanal Tropical Pastry',
  },
  {
    id: 'flowers',
    num: '03',
    label: 'FLOWERS',
    subtitle: 'Hoa Tươi & Sắc Mộc Thiên Nhiên',
    videoSrc: '/videos/flowers.mp4',
    poster: '/images/leaf.png',
    tagline: 'Organic Natural Botanical',
  },
]

export default function InspirationHero({
  activeIndex,
  displayedIndex,
  isTransitioning,
  handleCardClick,
  videoRef,
}) {
  const heroStageRef = useRef(null)
  const titleContainerRef = useRef(null)
  const cardsContainerRef = useRef(null)

  // Cinematic Page Entrance Animation
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (titleContainerRef.current) {
        tl.fromTo(
          titleContainerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 }
        )
      }

      if (cardsContainerRef.current) {
        tl.fromTo(
          cardsContainerRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          '-=0.6'
        )
      }
    },
    { scope: heroStageRef }
  )

  const currentVideoItem = INSPIRATION_ITEMS[displayedIndex]

  return (
    <section
      ref={heroStageRef}
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden pt-24 pb-8 md:pt-28 md:pb-12"
    >
      {/* MAIN VIDEO LAYER */}
      <div className="absolute inset-0 z-0 h-full w-full bg-transparent overflow-hidden">
        <video
          ref={videoRef}
          key={currentVideoItem.id}
          src={currentVideoItem.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-105 contrast-105"
        />

        {/* Ambient Vignette Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20" />
      </div>

      {/* FIXED TITLE + FIXED DESCRIPTION OVERLAY */}
      <div
        ref={titleContainerRef}
        className="brand-container relative z-20 mx-auto my-auto max-w-4xl text-center text-white px-4"
      >
        <h1 className="font-title text-3xl font-bold tracking-widest text-white uppercase sm:text-5xl md:text-6xl mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
          NGUỒN CẢM HỨNG
        </h1>

        <p className="font-sans mx-auto max-w-3xl text-sm font-medium leading-relaxed text-white sm:text-base md:text-lg md:leading-loose drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
          "ExoCafe bắt đầu từ những điều tự nhiên và nguyên bản — từ hạt cà phê,
          những chiếc bánh được chăm chút bởi đôi tay người thợ, đến sắc hoa và
          mảng xanh của miền nhiệt đới. Tất cả hòa quyện để tạo nên một không
          gian nơi hương vị, thiên nhiên và sự sáng tạo cùng kể một câu chuyện
          riêng."
        </p>
      </div>

      {/* CARD PREVIEWS AT BOTTOM ([ CAFÉ ] [ CAKE ] [ FLOWERS ]) */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            ref={cardsContainerRef}
            className="flex w-full items-center justify-center gap-4 overflow-x-auto pb-2 scrollbar-none md:w-auto md:gap-6"
          >
            {INSPIRATION_ITEMS.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(index)}
                  disabled={isTransitioning}
                  style={{
                    borderRadius: '1rem',
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  }}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-5 py-3 text-left transition-all duration-300 outline-none focus:outline-none cursor-pointer sm:px-7 sm:py-3.5 ${
                    isActive
                      ? 'bg-white/20 shadow-2xl opacity-100 backdrop-blur-xl'
                      : 'bg-black/40 opacity-70 hover:opacity-100 hover:bg-black/60 backdrop-blur-md'
                  }`}
                >
                  {/* Live Motion Video Preview Thumbnail */}
                  <div
                    style={{
                      borderRadius: '0.75rem',
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                    }}
                    className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl bg-black/40 sm:h-13 sm:w-13"
                  >
                    <video
                      src={item.videoSrc}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        isActive
                          ? 'brightness-110'
                          : 'brightness-90 group-hover:brightness-105'
                      }`}
                    />
                  </div>

                  {/* Label & Number */}
                  <div className="flex flex-col">
                    <span className="font-title text-[10px] tracking-widest text-white/70 uppercase sm:text-xs">
                      {item.num}
                    </span>
                    <span className="font-title text-sm font-bold tracking-widest text-white uppercase sm:text-base">
                      {item.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
