import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BAKERY_STORY_CARDS = [
  {
    id: 'b1',
    num: '01',
    badge: 'STAGE 01',
    title: 'CHỌN NGUYÊN LIỆU',
    desc: 'Những nguyên liệu tốt nhất tạo nên nền tảng cho một chiếc bánh ngon.',
    src: '/images/sweetness.png',
    rotationClass: '-rotate-2',
  },
  {
    id: 'b2',
    num: '02',
    badge: 'STAGE 02',
    title: 'NHÀO & NƯỚNG',
    desc: 'Từng lớp bột được nhào, tạo hình và nướng đến độ hoàn hảo.',
    src: '/images/cake1.png',
    rotationClass: 'rotate-1',
  },
  {
    id: 'b3',
    num: '03',
    badge: 'STAGE 03',
    title: 'HOÀN THIỆN',
    desc: 'Khoảnh khắc thủ công trở thành một trải nghiệm trọn vẹn.',
    src: '/images/sweetness3.png',
    rotationClass: '-rotate-1',
  },
]

// REALISTIC METALLIC PAPER CLIP SVG MATCHING USER REFERENCE
const PaperClipSVG = () => (
  <svg
    className="pointer-events-none absolute -top-3.5 right-4 z-30 h-10 w-6 rotate-[15deg] transform drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] sm:right-6 sm:h-12 sm:w-7"
    viewBox="0 0 28 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Silver wire clip stroke */}
    <path
      d="M17 10 V36 C17 40.5 13.5 44 9 44 C4.5 44 1 40.5 1 36 V14 C1 8.5 5.5 4 11 4 C16.5 4 21 8.5 21 14 V38 C21 45 15.5 50 8.5 50 C1.5 50 -4 45 -4 38"
      stroke="#E5E7EB"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M17 10 V36 C17 40.5 13.5 44 9 44 C4.5 44 1 40.5 1 36 V14 C1 8.5 5.5 4 11 4 C16.5 4 21 8.5 21 14 V38"
      stroke="#9CA3AF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

export default function SweetnessStorytellingSection() {
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const greenHeroRef = useRef(null)
  const greenHeroTextRef = useRef(null)
  const bgImgRef = useRef(null)

  // REFS FOR NARRATIVE TEXT, SVG PATHS & BRANCH MESSAGES
  const narrativeTextRef = useRef(null)
  const leftPathRef = useRef(null)
  const rightPathRef = useRef(null)
  const centerDotRef = useRef(null)
  const leftMessageRef = useRef(null)
  const rightMessageRef = useRef(null)
  const svgCanvasRef = useRef(null)

  // STAGE 7 BAKERY STORYTELLING REFS
  const bakeryHeaderRef = useRef(null)
  const bakeryStoryRef = useRef(null)

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

      // Calculate SVG stroke length for GSAP strokeDashoffset drawing
      const leftLength = leftPathRef.current?.getTotalLength() || 600
      const rightLength = rightPathRef.current?.getTotalLength() || 600

      if (leftPathRef.current && rightPathRef.current) {
        gsap.set(leftPathRef.current, {
          strokeDasharray: leftLength,
          strokeDashoffset: leftLength,
        })
        gsap.set(rightPathRef.current, {
          strokeDasharray: rightLength,
          strokeDashoffset: rightLength,
        })
      }

      // Master scrubbed timeline controlling pinned hero stages (800vh scroll distance for generous, relaxed hold time)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=800%',
          scrub: 1.2,
          pin: pinContainerRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // STAGE 1 (0% -> 15%): GREEN HERO (#495045) HEADLINE FADES & SLIDES AWAY HORIZONTALLY
      tl.to(
        greenHeroTextRef.current,
        {
          y: -50,
          scale: 0.95,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0.2
      )

      // STAGE 2 (15% -> 35%): GREEN HERO LAYER SLIDES AWAY HORIZONTALLY (REVEALING CAKE_BACKGROUND)
      tl.to(
        greenHeroRef.current,
        {
          x: '-100%',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        0.4
      )

      // Subtle background parallax zoom on cake_background
      tl.to(
        bgImgRef.current,
        {
          scale: 1.1,
          duration: 3.5,
          ease: 'power1.inOut',
        },
        0.4
      )

      // STAGE 3 (35% -> 48%): Bottom Center Starting Dot Appears on cake_background
      tl.fromTo(
        centerDotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
        1.2
      )

      // STAGE 4 (45% -> 60%): SVG Curved Paths Draw Upwards & Outwards from Bottom Center
      tl.to(
        [leftPathRef.current, rightPathRef.current],
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        1.5
      )

      // STAGE 5 (55% -> 70%): Top Narrative Text, Left Message ("Làm thủ công") & Right Message ("Thưởng thức trọn vị") Reveal
      tl.fromTo(
        narrativeTextRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        2.0
      )

      tl.fromTo(
        leftMessageRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        2.0
      )

      tl.fromTo(
        rightMessageRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        2.0
      )

      // STAGE 6 (68% -> 76%): SVG & Narrative Text fade out completely to clean the stage for 3 Paper Cards
      tl.to(
        [
          narrativeTextRef.current,
          leftMessageRef.current,
          rightMessageRef.current,
          svgCanvasRef.current,
        ],
        {
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        3.0
      )

      // STAGE 7 (75% -> 85%): STORYTELLING HEADER & 3 EDITORIAL PAPER CARDS REVEAL ON CAKE_BACKGROUND
      tl.fromTo(
        bakeryHeaderRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        3.4
      )

      if (bakeryStoryRef.current) {
        tl.fromTo(
          bakeryStoryRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          3.6
        )

        tl.fromTo(
          bakeryStoryRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power2.out',
          },
          3.8
        )
      }

      // STAGE 8 (70% -> 82.5%): 3 PAPER CARDS & HEADER FADE OUT SOFTLY AFTER AMPLE READING TIME
      tl.to(
        [bakeryHeaderRef.current, bakeryStoryRef.current],
        {
          y: -30,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        5.6
      )

      // STAGE 9 (82.5% -> 97.5%): HERO BACKGROUND FADES TO CREAM (#FAF8F5) FOR 100% SEAMLESS FOOTER TRANSITION
      tl.to(
        [bgImgRef.current, pinContainerRef.current],
        {
          backgroundColor: '#FAF8F5',
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        6.6
      )
    },
    { scope: sectionRef }
  )

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* 1. PINNED CINEMATIC HERO STORYTELLING SECTION (800vh height for generous, unhurried scroll hold time) */}
      <section ref={sectionRef} className="relative h-[800vh] w-full bg-black">
        {/* STICKY PINNED VIEWPORT */}
        <div
          ref={pinContainerRef}
          className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-black px-4 py-6 sm:px-8 sm:py-8"
        >
          {/* CINEMATIC BAKERY HERO BACKGROUND */}
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-black">
            <img
              ref={bgImgRef}
              src="/images/inspiration/cake_background.png"
              alt="ExoCafe Artisanal Bakery Background"
              className="h-full w-full scale-100 transform object-cover object-center"
            />
            {/* Dark Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
          </div>

          {/* STAGE 5: TOP NARRATIVE TEXT PARAGRAPH IN FONT-HAND */}
          <div
            ref={narrativeTextRef}
            className="pointer-events-auto absolute top-16 left-8 z-20 max-w-2xl text-left sm:top-20 sm:left-14 sm:max-w-3xl md:top-24 md:left-20"
            style={{ opacity: 0 }}
          >
            <p className="font-hand text-left text-base leading-relaxed font-normal text-[#FAF8F5] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:text-xl md:text-2xl lg:text-3xl">
              Từ những nguyên liệu chọn lọc, mỗi chiếc bánh được làm thủ công để
              giữ trọn hương vị tự nhiên và mang đến một khoảnh khắc ngọt ngào
              vừa đủ.
            </p>
          </div>

          {/* STAGE 4: LEFT BRANCH MESSAGE ("Làm thủ công") */}
          <div
            ref={leftMessageRef}
            className="pointer-events-auto absolute top-[52%] left-8 z-20 -translate-y-1/2 sm:left-14 md:left-20"
            style={{ opacity: 0 }}
          >
            <span className="font-hand text-3xl leading-tight font-normal whitespace-nowrap text-[#FAF8F5] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-5xl lg:text-4xl">
              Làm thủ công
            </span>
          </div>

          {/* STAGE 4: RIGHT BRANCH MESSAGE ("Thưởng thức trọn vị") */}
          <div
            ref={rightMessageRef}
            className="pointer-events-auto absolute top-[40%] right-8 z-20 -translate-y-1/2 text-left sm:right-14 md:right-20"
            style={{ opacity: 0 }}
          >
            <span className="font-hand text-left text-3xl leading-tight font-normal whitespace-nowrap text-[#FAF8F5] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-5xl lg:text-4xl">
              Thưởng thức trọn vị
            </span>
          </div>

          {/* STAGE 2-3: FULL-SCREEN OVERLAY SVG CANVAS FOR SWEEPING ARCS FROM BOTTOM CENTER */}
          <div
            ref={svgCanvasRef}
            className="pointer-events-none absolute inset-0 z-20"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 1000 450"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bottom Center Starting Dot */}
              <circle
                ref={centerDotRef}
                cx="500"
                cy="420"
                r="6"
                fill="#FAF8F5"
              />

              {/* Left Branch Path Sweeping Upwards & Leftwards to "Làm thủ công" */}
              <path
                ref={leftPathRef}
                d="M 500 420 C 460 260 320 230 200 240"
                stroke="#FAF8F5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Right Branch Path Sweeping Upwards & Rightwards to "Thưởng thức trọn vị" */}
              <path
                ref={rightPathRef}
                d="M 500 420 C 540 260 680 160 800 170"
                stroke="#FAF8F5"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* GREEN (#495045) HERO LAYER (Z-INDEX 40 HIGHEST TO COVER SVG & DOTS UNTIL SWEEP) */}
          <div
            ref={greenHeroRef}
            className="absolute inset-0 z-40 flex h-full w-full flex-col items-center justify-center bg-[#495045] px-6 text-center"
          >
            <div
              ref={greenHeroTextRef}
              className="pointer-events-none relative z-40 mx-auto max-w-4xl text-center text-[#FAF8F5]"
            >
              <h2 className="font-title text-4xl leading-tight font-extrabold tracking-widest uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl lg:text-8xl">
                NGỌT NGÀO VỪA ĐỦ.
              </h2>
            </div>
          </div>

          {/* STAGE 7: EDITORIAL BAKERY STORYTELLING CONTAINER (100% INTACT & UNCLIPPED!) */}
          <div className="pointer-events-auto relative z-50 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-between pt-16 pb-4 sm:pt-20 md:pt-24">
            {/* Header (Positioned Lower Down as Requested) */}
            <div
              ref={bakeryHeaderRef}
              className="mx-auto max-w-3xl text-center"
              style={{ opacity: 0 }}
            >
              <h2 className="font-title mb-2 text-xl font-extrabold tracking-widest whitespace-nowrap text-[#FAF8F5] uppercase drop-shadow-md sm:mb-3 sm:text-3xl md:text-4xl">
                HÀNH TRÌNH CỦA MỘT CHIẾC BÁNH
              </h2>
              <p className="font-hand mx-auto max-w-xl text-xs leading-relaxed font-normal text-[#FAF8F5]/90 drop-shadow-md sm:text-base md:text-lg">
                Từ nguyên liệu nguyên bản đến những lớp bánh hoàn thiện — mỗi
                chiếc bánh là một câu chuyện được tạo nên bằng sự kiên nhẫn và
                đôi tay của người thợ.
              </p>
            </div>

            {/* 3 Real Notebook Lined Paper Cards with Metallic Paper Clip Matching Reference */}
            <div
              ref={bakeryStoryRef}
              className="grid w-full grid-cols-1 items-stretch justify-center gap-5 pb-2 sm:pb-4 md:grid-cols-3 md:gap-7"
            >
              {BAKERY_STORY_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`group relative flex transform flex-col justify-between overflow-hidden border-t border-r-2 border-b-2 border-l border-black/15 bg-[#FAF8F3] p-3 text-[#2C2724] shadow-[0_18px_35px_rgba(0,0,0,0.45)] transition-all duration-500 sm:p-4 ${card.rotationClass} bg-[linear-gradient(to_bottom,transparent_23px,rgba(0,0,0,0.04)_24px)] bg-[size:100%_24px] hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_24px_45px_rgba(0,0,0,0.6)]`}
                >
                  {/* REALISTIC METALLIC PAPER CLIP AT TOP RIGHT CORNER */}
                  <PaperClipSVG />

                  {/* Film Reel / Binder Holes Perforations Accent on Right Edge */}
                  <div className="pointer-events-none absolute top-0 right-0 bottom-0 flex w-2 flex-col justify-around py-3 opacity-30">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 w-1.5 rounded-sm bg-black/40"
                      />
                    ))}
                  </div>

                  {/* Editorial Photo Container */}
                  <div className="relative mb-3 aspect-[4/3] max-h-28 w-full overflow-hidden border border-black/10 bg-black/5 sm:max-h-32">
                    <img
                      src={card.src}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="font-title absolute top-2 left-2 rounded border border-[#E0D7C3] bg-[#FAF3DD] px-2 py-0.5 text-[9px] font-bold tracking-widest text-[#5C5035] uppercase shadow-sm backdrop-blur-md">
                      {card.num}
                    </div>
                  </div>

                  {/* Card Editorial Content */}
                  <div className="flex flex-grow flex-col pr-2 text-left">
                    <span className="font-title text-brand-accent mb-0.5 text-[10px] font-bold tracking-widest uppercase">
                      {card.badge}
                    </span>
                    <h3 className="font-title mb-1 truncate text-sm font-extrabold tracking-wider text-[#2C2724] uppercase sm:text-base">
                      {card.title}
                    </h3>
                    <p className="font-serif text-[11px] leading-relaxed font-light text-[#4A433D] sm:text-xs">
                      {card.desc}
                    </p>
                  </div>

                  {/* Subtle Notebook Footer Lines Accent */}
                  <div className="font-title mt-3 flex items-center justify-between border-t border-black/10 pt-2 text-[9px] tracking-widest text-[#7C726A] uppercase">
                    <span>ExoCafe Artisanal</span>
                    <span>Bakery Notebook</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
