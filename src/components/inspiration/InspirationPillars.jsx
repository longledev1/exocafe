import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InspirationPillars() {
  const pillarsSectionRef = useRef(null)
  const pillarsHeaderRef = useRef(null)
  const pillarsCardsRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      if (pillarsSectionRef.current) {
        if (pillarsHeaderRef.current) {
          gsap.fromTo(
            pillarsHeaderRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pillarsSectionRef.current,
                start: 'top 80%',
              },
            }
          )
        }

        if (pillarsCardsRef.current) {
          gsap.fromTo(
            pillarsCardsRef.current.children,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.18,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pillarsCardsRef.current,
                start: 'top 85%',
              },
            }
          )
        }
      }
    },
    { scope: pillarsSectionRef }
  )

  return (
    <section
      ref={pillarsSectionRef}
      className="bg-brand-bg relative w-full overflow-hidden pt-20 pb-24 text-brand-body"
    >
      <div className="brand-container mx-auto max-w-6xl px-6">
        <div ref={pillarsHeaderRef} className="mb-16 text-center">
          <span className="font-hand text-brand-accent text-3xl sm:text-4xl md:text-5xl">
            Philosophy of ExoCafe
          </span>
          <h2 className="font-title text-brand-title mt-2 text-2xl font-bold tracking-widest uppercase sm:text-3xl md:text-4xl">
            BA TRỤ CỘT NGUYÊN BẢN
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-brand-accent/40" />
        </div>

        <div
          ref={pillarsCardsRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12"
        >
          {/* Pillar 1: CÀ PHÊ */}
          <div className="group rounded-3xl bg-white/60 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 font-title text-4xl font-bold text-brand-accent">
              01
            </div>
            <h3 className="font-title text-brand-title mb-3 text-xl font-bold tracking-wider uppercase">
              CÀ PHÊ — ĐẬM ĐÀ NGUYÊN BẢN
            </h3>
            <p className="font-sans text-xs font-light leading-relaxed text-brand-body/80 sm:text-sm">
              Từng hạt cà phê thượng hạng tuyển chọn từ những vùng trồng nhiệt đới
              rực nắng, được rang xay tỉ mỉ để giữ trọn vị mộc đắng nhẹ, hậu vị
              ngọt thanh và hương thơm nồng nàn quyến rũ.
            </p>
          </div>

          {/* Pillar 2: BÁNH NGỌT */}
          <div className="group rounded-3xl bg-white/60 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 font-title text-4xl font-bold text-brand-accent">
              02
            </div>
            <h3 className="font-title text-brand-title mb-3 text-xl font-bold tracking-wider uppercase">
              BÁNH NGỌT — TỈ MỈ THỦ CÔNG
            </h3>
            <p className="font-sans text-xs font-light leading-relaxed text-brand-body/80 sm:text-sm">
              Những chiếc bánh tươi ngọt lành ra đời từ sự sáng tạo và đôi tay
              khéo léo của người thợ, kết hợp hài hòa hương vị trái cây tươi nhiệt
              đới để tạo nên trải nghiệm ẩm thực tinh tế.
            </p>
          </div>

          {/* Pillar 3: CẮM HOA */}
          <div className="group rounded-3xl bg-white/60 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="mb-6 font-title text-4xl font-bold text-brand-accent">
              03
            </div>
            <h3 className="font-title text-brand-title mb-3 text-xl font-bold tracking-wider uppercase">
              CẮM HOA — NGHỆ THUẬT THIÊN NHIÊN
            </h3>
            <p className="font-sans text-xs font-light leading-relaxed text-brand-body/80 sm:text-sm">
              Nghệ thuật cắm hoa tươi và bài trí mảng xanh rực rỡ, mang hơi thở
              khoáng đạt của thiên nhiên vào không gian, kết nối cảm xúc và đánh
              thức mọi giác quan của bạn.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
