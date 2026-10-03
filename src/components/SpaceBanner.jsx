import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function SpaceBanner() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      // 1. Fade in the gradient overlay
      gsap.from('.banner-overlay', {
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
      })

      // 2. Animate the background leaf (soft slide in and rotate)
      gsap.from('.banner-leaf', {
        x: -60,
        y: -30,
        rotation: 35,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.out',
        delay: 0.1,
      })

      // 3. Slide up and fade in the title
      gsap.from('.banner-title', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      })

      // 4. Slide up and fade in the description text
      gsap.from('.banner-text', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/videos/exoCafe_video.mp4"
        poster="/images/space_banner_poster.jpg"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay from Left to Right (pulled back left for maximum video visibility) */}
      <div className="banner-overlay absolute inset-0 z-10 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 via-30% to-transparent"></div>

      {/* Background Banana Leaf texture on the left */}
      <img
        src="/images/leaf.png"
        alt="Banana Leaf Background"
        className="banner-leaf pointer-events-none absolute -top-24 -left-36 z-10 w-[480px] scale-x-[-1] rotate-[55deg] opacity-[0.25] mix-blend-multiply select-none"
      />

      {/* Text Content */}
      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-14 pt-16 md:pt-24">
        <div className="text-brand-body max-w-[500px]">
          <h2 className="banner-title text-brand-title mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            <span>CÂU CHUYỆN</span>
            <br />
            <span className="text-brand-accent">Về Miền Nhiệt Đới</span>
          </h2>

          <p className="banner-text text-brand-body/85 mb-8 font-sans text-sm leading-relaxed font-normal sm:text-base">
            <span className="text-brand-title font-bold">EXOCAFÉ</span> là mô
            hình cà phê và bánh ngọt mang đậm tinh thần miền nhiệt đới, kết hợp
            giữa hương vị sáng tạo, nguyên liệu tươi theo mùa và không gian xanh
            gần gũi với thiên nhiên. Mỗi thức uống, mỗi chiếc bánh và từng góc
            nhỏ trong quán đều được chăm chút để mang đến một trải nghiệm thư
            giãn, tươi mới và đầy cảm hứng.
          </p>
        </div>
      </div>
    </section>
  )
}
