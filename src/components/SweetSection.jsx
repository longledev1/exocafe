import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SweetSection() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      // Set initial state for Scene 1 content entrance
      gsap.set('.scene-1-content', { opacity: 0, y: 50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // 1. Scene 1 ENTRANCE animation (slides up & fades in as you arrive)
      tl.to('.scene-1-content', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Hold Scene 1 for reading
      tl.to({}, { duration: 0.6 })

      // 2. Transition Scene 1 -> Scene 2
      tl.to('.scene-1-content', {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      tl.fromTo(
        '.scene-2-bg',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.inOut' },
        '-=0.6'
      )

      tl.fromTo(
        '.scene-2-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.inOut' },
        '-=0.6'
      )

      // Hold Scene 2 for reading
      tl.to({}, { duration: 0.6 })

      // 3. Transition Scene 2 -> Scene 3
      tl.to('.scene-2-content', {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      tl.fromTo(
        '.scene-3-bg',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.inOut' },
        '-=0.6'
      )

      tl.fromTo(
        '.scene-3-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.inOut' },
        '-=0.6'
      )

      // Hold Scene 3 for reading
      tl.to({}, { duration: 0.6 })

      // 4. Transition Scene 3 -> Scene 4
      tl.to('.scene-3-content', {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      tl.fromTo(
        '.scene-4-bg',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.inOut' },
        '-=0.6'
      )

      tl.fromTo(
        '.scene-4-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.inOut' },
        '-=0.6'
      )

      // Hold Scene 4 before unpinning
      tl.to({}, { duration: 0.6 })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative mb-16 h-screen w-full overflow-hidden bg-[#FAF6EE] select-none sm:mb-24 lg:mb-32"
    >
      {/* ================= SCENE 1 BACKGROUND ================= */}
      <div
        className="scene-1-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/sweetness_backup.png')" }}
      >
        {/* Very Light Transparent Warm Overlay */}
        <div className="absolute inset-0 bg-[#FAF6EE]/10"></div>
      </div>

      {/* ================= SCENE 2 BACKGROUND ================= */}
      <div
        className="scene-2-bg absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat opacity-0"
        style={{ backgroundImage: "url('/images/sweetness2.png')" }}
      >
        {/* Soft Moss Green Tropical Gradient Overlay (Minimalist & Transparent) */}
        <div className="from-brand-title/70 via-brand-title/35 absolute inset-0 bg-gradient-to-r via-40% to-transparent"></div>
      </div>

      {/* ================= SCENE 3 BACKGROUND ================= */}
      <div
        className="scene-3-bg absolute inset-0 z-[2] bg-cover bg-center bg-no-repeat opacity-0"
        style={{ backgroundImage: "url('/images/sweetness3.png')" }}
      >
        {/* Soft Moss Green Tropical Gradient Overlay (Matching Scene 2 Layout) */}
        <div className="from-brand-title/70 via-brand-title/35 absolute inset-0 bg-gradient-to-r via-40% to-transparent"></div>
      </div>

      {/* ================= SCENE 4 BACKGROUND ================= */}
      <div
        className="scene-4-bg absolute inset-0 z-[3] bg-cover bg-center bg-no-repeat opacity-0"
        style={{ backgroundImage: "url('/images/sweetness4.png')" }}
      >
        {/* Soft Moss Green Tropical Gradient Overlay (Matching Scene 2 & 3 Layout) */}
        <div className="from-brand-title/70 via-brand-title/35 absolute inset-0 bg-gradient-to-r via-40% to-transparent"></div>
      </div>

      {/* ================= SCENE 1 CONTENT ================= */}
      <div className="scene-1-content brand-container absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-6 opacity-0 sm:px-12 md:items-start md:px-16 lg:px-24">
        <div className="flex max-w-2xl flex-col items-center text-center md:ml-4 lg:ml-8 lg:max-w-3xl xl:ml-12">
          {/* Main Title 2 lines */}
          <h2 className="font-title text-brand-accent text-center text-3xl leading-[1.15] font-semibold tracking-wider uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            CHẠM VÀO <br /> MIỀN NHIỆT ĐỚI
          </h2>

          {/* Leaf Line Divider Icon */}
          <div className="my-3 flex w-full max-w-xs items-center justify-center gap-3 opacity-75 sm:my-5">
            <div className="bg-brand-title/40 h-[1px] flex-1"></div>
            <svg
              className="text-brand-title h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 3v18m0-18C8.5 6 4 10 4 15a8 8 0 0016 0c0-5-4.5-9-8-12z"
              />
            </svg>
            <div className="bg-brand-title/40 h-[1px] flex-1"></div>
          </div>

          {/* Subtitle Description Exactly 2 lines */}
          <p className="text-brand-title w-full max-w-2xl text-center font-sans text-xs leading-relaxed font-medium sm:text-sm md:text-base">
            Một hành trình nơi thiên nhiên, hương vị và những kết nối chân thành{' '}
            <br />
            hòa quyện trong từng trải nghiệm.
          </p>
        </div>
      </div>

      {/* ================= SCENE 2 CONTENT ================= */}
      <div className="scene-2-content brand-container absolute inset-0 z-10 flex w-full flex-col items-start justify-end px-6 pb-12 text-left opacity-0 sm:px-12 sm:pb-16 md:px-16 md:pb-20 lg:px-24 lg:pb-24">
        <div className="flex max-w-lg flex-col items-start justify-center text-left">
          <h2
            className="font-title mb-3 text-left text-lg leading-tight font-semibold tracking-wide !text-white uppercase italic sm:text-xl md:text-2xl lg:text-3xl"
            style={{ color: '#ffffff' }}
          >
            CÁNH CỬA VÙNG <br /> XANH MÁT
          </h2>
          <p className="text-brand-bg/85 max-w-md text-left font-sans text-[11px] leading-relaxed font-light sm:text-xs md:max-w-lg md:text-sm">
            Bước qua cánh cửa của <span className="font-bold">EXOCAFÉ</span>,
            bạn như bỏ lại sau lưng nhịp sống hối hả để bước vào một thế giới
            thiên nhiên hài hòa. Với những tone màu tự nhiên, tươi mát, mộc mạc
            làm chủ đạo, không gian nơi đây mang đến cảm xúc bình yên nhẹ nhàng,
            đánh thức mọi giác quan bằng tiếng chim hót lanh lảnh, tiếng nước
            chảy róc rách và âm thanh của gió xào xạc qua từng kẽ lá.
          </p>
        </div>
      </div>

      {/* ================= SCENE 3 CONTENT ================= */}
      <div className="scene-3-content brand-container absolute inset-0 z-10 flex w-full flex-col items-start justify-end px-6 pb-12 text-left opacity-0 sm:px-12 sm:pb-16 md:px-16 md:pb-20 lg:px-24 lg:pb-24">
        <div className="flex max-w-lg flex-col items-start justify-center text-left">
          <h2
            className="font-title mb-3 text-left text-lg leading-tight font-semibold tracking-wide !text-white uppercase italic sm:text-xl md:text-2xl lg:text-3xl"
            style={{ color: '#ffffff' }}
          >
            HƯƠNG VỊ GIAO THOA <br /> NHIỆT ĐỚI
          </h2>
          <p className="text-brand-bg/85 max-w-md text-left font-sans text-[11px] leading-relaxed font-light sm:text-xs md:max-w-lg md:text-sm">
            Thưởng thức từng ngụm đồ uống tươi mát kết hợp cùng những chiếc bánh
            ngọt thủ công tinh tế, tạo nên khoảnh khắc thư thái trọn vẹn trong
            không gian tràn ngập sắc xanh của{' '}
            <span className="font-bold">EXOCAFÉ</span>.
          </p>
        </div>
      </div>

      {/* ================= SCENE 4 CONTENT ================= */}
      <div className="scene-4-content brand-container absolute inset-0 z-10 flex w-full flex-col items-start justify-end px-6 pb-12 text-left opacity-0 sm:px-12 sm:pb-16 md:px-16 md:pb-20 lg:px-24 lg:pb-24">
        <div className="flex max-w-lg flex-col items-start justify-center text-left">
          <h2
            className="font-title mb-3 text-left text-lg leading-tight font-semibold tracking-wide !text-white uppercase italic sm:text-xl md:text-2xl lg:text-3xl"
            style={{ color: '#ffffff' }}
          >
            HAI KHÔNG GIAN <br /> MỘT CẢM XÚC
          </h2>
          <p className="text-brand-bg/85 max-w-md text-left font-sans text-[11px] leading-relaxed font-light sm:text-xs md:max-w-lg md:text-sm">
            <span className="font-bold">EXOCAFÉ</span> được chia làm hai khu vực
            để chiều lòng mọi tâm trạng của bạn. Bạn có thể chọn phòng kính máy
            lạnh yên tĩnh, mát mẻ, hoặc thả mình tại khu vườn (garden) rợp bóng
            cây xanh bao quanh. Khu vườn được thiết kế mái che bằng những thanh
            gỗ mộc mạc và điểm xuyết thêm những chiếc xích đu nhỏ, tạo nên một
            góc thư giãn và lưu giữ những bức ảnh thật chill.
          </p>
        </div>
      </div>
    </section>
  )
}
