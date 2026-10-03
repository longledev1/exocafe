import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SUPPORTING_CARDS = [
  {
    id: 's1',
    num: '01',
    title: 'Nguồn gốc',
    desc: 'Từ vùng đất nơi những hạt cà phê đầu tiên bắt đầu hành trình.',
    src: '/images/inspiration/s1.png',
  },
  {
    id: 's2',
    num: '02',
    title: 'Nhiệt',
    desc: 'Cận cảnh hạt cà phê đang được rang, chuyển màu dưới tác động của nhiệt.',
    src: '/images/inspiration/s2.png',
  },
  {
    id: 's3',
    num: '03',
    title: 'Biến đổi',
    desc: 'Từng thay đổi trong hạt góp phần hình thành nên tầng hương và vị đặc trưng.',
    src: '/images/inspiration/s3.png',
  },
  {
    id: 's4',
    num: '04',
    title: 'Xay',
    desc: 'Hạt cà phê được xay để giải phóng những hương thơm đã được hình thành trong quá trình rang.',
    src: '/images/inspiration/s4.png',
  },
  {
    id: 's5',
    num: '05',
    title: 'Chiết xuất',
    desc: 'Nước chạm vào cà phê, đưa những tầng hương vị vào từng giọt.',
    src: '/images/inspiration/s5.png',
  },
  {
    id: 's6',
    num: '06',
    title: 'Từ hạt đến tách',
    desc: 'Một hành trình nguyên bản kết thúc trong một tách cà phê.',
    src: '/images/inspiration/s6.png',
  },
]

export default function ScrollStorytellingSection() {
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const bgLayerRef = useRef(null)
  const redHeroTextRef = useRef(null)

  // THE SINGLE TRANSPARENT COFFEE BEAN IMAGE REF IN THE ENTIRE DOM
  const coffeeBeanWrapperRef = useRef(null)
  const contentHeaderRef = useRef(null)

  const contentSectionRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 15)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15)
  }

  const scroll = (direction) => {
    const el = scrollContainerRef.current
    if (!el) return
    const cardEl = el.querySelector('.journey-card')
    const cardWidth = cardEl ? cardEl.clientWidth + 24 : 320
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  // CONTINUOUS SCROLL-DRIVEN TIMELINE (SCRUBBED HERO)
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (
        prefersReducedMotion ||
        !sectionRef.current ||
        !pinContainerRef.current
      ) {
        return
      }

      // Master scrubbed timeline controlling hero stages inside pinned screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=240%',
          scrub: 1,
          pin: pinContainerRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // STAGE 1 (0% -> 20%): RED HERO HEADLINE VISIBLE
      // STAGE 2 (20% -> 40%): Headline exits, Background RED (#C84928) -> CREAM (#FAF8F5)
      tl.to(
        redHeroTextRef.current,
        {
          y: -50,
          scale: 0.92,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0.2
      )

      tl.to(
        bgLayerRef.current,
        {
          backgroundColor: '#FAF8F5',
          duration: 1.5,
          ease: 'power1.inOut',
        },
        0.2
      )

      // STAGE 3 (40% -> 65%): PURE TRANSPARENT COFFEE BEAN IMAGE REVEALS AT CENTER
      tl.fromTo(
        coffeeBeanWrapperRef.current,
        {
          scale: 1.15,
          y: 0,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.6
      )

      // STAGE 4 (65% -> 85%): COFFEE BEAN SHRINKS SLIGHTLY & SETTLES INTACT
      tl.to(
        coffeeBeanWrapperRef.current,
        {
          scale: 0.75,
          y: 10,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        1.8
      )

      // STAGE 5 (68% -> 90%): 2-LINE HANDWRITTEN HEADLINE FADES IN ABOVE COFFEE BEAN (WITH TOP BREATHING ROOM)
      tl.fromTo(
        contentHeaderRef.current,
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        1.8
      )

      // 2. GSAP SCROLLTRIGGER REVEAL FOR HORIZONTAL JOURNEY CARDS
      const journeyCards = gsap.utils.toArray('.journey-card')
      if (journeyCards.length > 0) {
        gsap.fromTo(
          journeyCards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* 1. PINNED SCROLL STORY HERO CONTAINER (RED HERO -> CREAM TRANSITION) */}
      <section
        ref={sectionRef}
        className="relative h-[280vh] w-full bg-[#C84928]"
      >
        {/* STICKY PINNED VIEWPORT */}
        <div
          ref={pinContainerRef}
          className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-8 sm:px-8 sm:pt-20 md:px-12 md:pt-24"
        >
          {/* DYNAMIC BACKGROUND COLOR LAYER (RED -> CREAM) */}
          <div
            ref={bgLayerRef}
            className="absolute inset-0 z-0 h-full w-full bg-[#C84928]"
          />

          {/* STAGE 1: RED HERO HEADLINE */}
          <div
            ref={redHeroTextRef}
            className="pointer-events-none absolute top-1/2 z-20 mx-auto max-w-4xl -translate-y-1/2 px-4 text-center text-[#FAF8F5]"
          >
            <h2 className="font-title mb-4 text-4xl leading-tight font-extrabold tracking-widest uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl">
              HƯƠNG VỊ
            </h2>
            <h3 className="font-title text-3xl leading-tight font-bold tracking-wider text-[#FAF8F5]/90 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-7xl">
              TỪ NGUYÊN BẢN
            </h3>
          </div>

          {/* STAGE 5 NARRATIVE TEXT: POSITIONED AT THE TOP WITH GENEROUS BREATHING SPACE */}
          <div
            ref={contentHeaderRef}
            className="text-brand-body pointer-events-auto relative z-40 mx-auto mb-6 w-full max-w-6xl px-4 text-center"
            style={{ opacity: 0 }}
          >
            <h2 className="text-brand-title mx-auto max-w-5xl text-base leading-relaxed font-normal sm:text-xl md:text-2xl lg:text-5xl">
              <span className="font-hand block whitespace-nowrap">
                Mỗi tách cà phê bắt đầu từ một hạt nguyên bản,
              </span>
              <span className="font-hand mt-1 block whitespace-nowrap">
                nơi đất trời, thời gian và bàn tay người thợ cùng tạo nên hương
                vị
              </span>
            </h2>
          </div>

          {/* THE ONE AND ONLY PURE TRANSPARENT COFFEE BEAN FLOATING IMAGE (PURE RAW TRANSPARENT PNG, ZERO SHADOW / ZERO BG) */}
          <div
            ref={coffeeBeanWrapperRef}
            className="pointer-events-none relative z-30 mx-auto flex w-[80%] max-w-[340px] items-center justify-center sm:max-w-[420px] md:max-w-[460px]"
            style={{ opacity: 0 }}
          >
            <img
              src="/images/inspiration/coffee_bean.png"
              alt="Hạt cà phê nguyên bản ExoCafe"
              className="h-auto w-full border-none bg-transparent object-contain shadow-none outline-none"
            />
          </div>
        </div>
      </section>

      {/* 2. MINIMAL FILMSTRIP HORIZONTAL PHOTO REEL (CONCEPT 1) */}
      <section
        ref={contentSectionRef}
        className="text-brand-body relative w-full bg-[#FAF8F5] pt-16 pb-28 md:pt-20 md:pb-36"
      >
        <div className="brand-container mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-16">
          {/* Minimal Section Divider */}
          <div className="bg-brand-accent/30 mx-auto mb-12 h-0.5 w-16" />

          {/* Minimal Editorial Header */}
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="font-title text-brand-accent text-xs font-bold tracking-[0.25em] uppercase">
                Hành Trình Hạt Mộc
              </span>
              <h2 className="font-title text-brand-title mt-2 text-2xl font-bold tracking-wider uppercase sm:text-3xl md:text-4xl">
                Sự Chuyển Hóa Của Hương Vị
              </h2>
            </div>

            {/* Minimalist Prev/Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-black/20 bg-white text-brand-title hover:bg-brand-title hover:text-white shadow-xs active:scale-95'
                    : 'border-black/10 bg-transparent text-black/20 cursor-not-allowed opacity-40'
                }`}
                aria-label="Xem bước trước"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
                  canScrollRight
                    ? 'border-black/20 bg-white text-brand-title hover:bg-brand-title hover:text-white shadow-xs active:scale-95'
                    : 'border-black/10 bg-transparent text-black/20 cursor-not-allowed opacity-40'
                }`}
                aria-label="Xem bước tiếp theo"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Minimal Filmstrip Gallery Track (Pure Photography + 1-Line Caption) */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-5 sm:gap-7 md:gap-8 overflow-x-auto pt-2 pb-6 scroll-smooth scrollbar-none snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {SUPPORTING_CARDS.map((card) => (
              <div
                key={card.id}
                className="journey-card group relative flex w-[230px] sm:w-[270px] md:w-[310px] lg:w-[330px] flex-shrink-0 flex-col snap-start select-none"
              >
                {/* Clean Aspect-3/4 Photo Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/5">
                  <img
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle top-left watermark number */}
                  <span className="font-title absolute top-3.5 left-3.5 text-xs font-bold tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {card.num}
                  </span>
                </div>

                {/* Minimalist Caption Below (Number + Stage Title + Small Description) */}
                <div className="mt-3.5 flex flex-col px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-title text-brand-accent text-xs font-bold tracking-wider">
                      {card.num}
                    </span>
                    <span className="h-2.5 w-[1px] bg-black/20" />
                    <span className="font-title text-brand-title text-xs font-semibold tracking-[0.16em] uppercase transition-colors group-hover:text-brand-accent">
                      {card.title}
                    </span>
                  </div>

                  {/* Small Description */}
                  <p className="text-brand-body/85 font-sans mt-1.5 text-xs sm:text-[13px] leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
