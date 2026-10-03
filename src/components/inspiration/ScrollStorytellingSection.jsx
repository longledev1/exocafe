import { useRef } from 'react'
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
  const cardsGridRef = useRef(null)

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

      // 2. GSAP SCROLLTRIGGER REVEAL FOR 6 VERTICAL SUPPORTING CARDS GRID
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
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

      {/* 2. CONTINUOUS 6 VERTICAL SUPPORTING CARDS GRID SECTION (S1 -> S6) BELOW */}
      <section
        ref={contentSectionRef}
        className="text-brand-body relative w-full bg-[#FAF8F5] pt-16 pb-32"
      >
        <div className="brand-container mx-auto max-w-7xl px-6 md:px-12">
          {/* Section Divider */}
          <div className="bg-brand-accent/40 mx-auto mb-16 h-0.5 w-20" />

          {/* 6 Supporting Vertical Image Cards Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
          <div
            ref={cardsGridRef}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:gap-12"
          >
            {SUPPORTING_CARDS.map((card) => (
              <div
                key={card.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-4 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
              >
                {/* Vertical Portrait Image Container (aspect-[3/4]) */}
                <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/10">
                  <img
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                {/* Caption Content */}
                <div className="flex flex-col px-2 pb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-title text-brand-accent text-xs font-bold tracking-widest uppercase">
                      {card.num}
                    </span>
                    <h3 className="font-title text-brand-title text-base font-bold tracking-wider uppercase sm:text-lg">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-brand-body/80 font-sans text-xs leading-relaxed font-medium sm:text-sm">
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
