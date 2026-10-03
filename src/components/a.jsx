import { useState, useRef } from 'react'
import gsap from 'gsap'

const CATEGORIES = [
  {
    id: 'coffee',
    title: 'DANH MỤC CÀ PHÊ',
    subtitle:
      'Hương vị đậm đà truyền thống kết hợp cùng hạt cà phê Arabica & Robusta rang xay nguyên chất.',
    spotlightImg: '/images/coffee.png',
    products: [
      { id: 'c1', name: 'Cà Phê Truyền Thống', img: '/images/coffee.png' },
      { id: 'c2', name: 'Bạc Xỉu Sài Gòn', img: '/images/coffee.png' },
      { id: 'c3', name: 'Cà Phê Đen Đá', img: '/images/coffee.png' },
      { id: 'c4', name: 'Cà Phê Sữa Đá', img: '/images/coffee.png' },
      { id: 'c5', name: 'Cà Phê Trứng Exo', img: '/images/coffee.png' },
      { id: 'c6', name: 'Cà Phê Dừa Béo', img: '/images/coffee.png' },
      { id: 'c7', name: 'Espresso Macchiato', img: '/images/coffee.png' },
      { id: 'c8', name: 'Cold Brew Cam', img: '/images/coffee.png' },
    ],
  },
  {
    id: 'tea',
    title: 'DANH MỤC TRÀ',
    subtitle:
      'Sự hòa quyện tuyệt vời giữa vị trà thanh mát và trái cây tươi chọn lọc mọng nước.',
    spotlightImg: '/images/tea.png',
    products: [
      { id: 't1', name: 'Trà Chanh Dây Thảo Mộc', img: '/images/tea.png' },
      { id: 't2', name: 'Trà Đào Cam Sả', img: '/images/tea.png' },
      { id: 't3', name: 'Trà Vải Hoa Cúc', img: '/images/tea.png' },
      { id: 't4', name: 'Trà Dâu Tây Xoài', img: '/images/tea.png' },
      { id: 't5', name: 'Trà Ổi Hồng Sen', img: '/images/tea.png' },
      { id: 't6', name: 'Trà Tắc Xí Muội', img: '/images/tea.png' },
      { id: 't7', name: 'Trà Mãng Cầu', img: '/images/tea.png' },
      { id: 't8', name: 'Trà Long Nhãn', img: '/images/tea.png' },
    ],
  },
  {
    id: 'cake1',
    title: 'DANH MỤC BÁNH NGỌT',
    subtitle:
      'Bánh tươi nướng mỗi ngày với hương vị mềm mịn, béo ngậy chuẩn phong cách Pháp.',
    spotlightImg: '/images/cake1.png',
    products: [
      { id: 'k1', name: 'Tart Dâu Tây Thủ Công', img: '/images/cake1.png' },
      { id: 'k2', name: 'Tiramisu Ca Cao', img: '/images/cake1.png' },
      { id: 'k3', name: 'Cheesecake Xoài', img: '/images/cake1.png' },
      { id: 'k4', name: 'Bánh Mousse Matcha', img: '/images/cake1.png' },
      { id: 'k5', name: 'Croissant Bơ Pháp', img: '/images/cake1.png' },
      { id: 'k6', name: 'Bánh Red Velvet', img: '/images/cake1.png' },
      { id: 'k7', name: 'Macaron Trái Cây', img: '/images/cake1.png' },
      { id: 'k8', name: 'Bánh Sừng Bò Trứng Muối', img: '/images/cake1.png' },
    ],
  },
  {
    id: 'cake2',
    title: 'DANH MỤC BÁNH NƯỚNG',
    subtitle:
      'Những món bánh nướng thơm lừng và tráng miệng phong phú hấp dẫn khó cưỡng.',
    spotlightImg: '/images/cake2.png',
    products: [
      { id: 'ck1', name: 'Bánh Gato Trái Cây', img: '/images/cake2.png' },
      { id: 'ck2', name: 'Bánh Tart Cam', img: '/images/cake2.png' },
      { id: 'ck3', name: 'Bánh Waffle Mật Ong', img: '/images/cake2.png' },
      { id: 'ck4', name: 'Bánh Donut Ca Cao', img: '/images/cake2.png' },
      { id: 'ck5', name: 'Bánh Pancake Dâu', img: '/images/cake2.png' },
      { id: 'ck6', name: 'Bánh Cookie Hạt Đào', img: '/images/cake2.png' },
      { id: 'ck7', name: 'Crepe Sốt Sô-cô-la', img: '/images/cake2.png' },
      { id: 'ck8', name: 'Brownie Hạnh Nhân', img: '/images/cake2.png' },
    ],
  },
  {
    id: 'ice_cream',
    title: 'DANH MỤC KEM',
    subtitle:
      'Những món kem tươi mát lạnh ngọt ngào xua tan đi cái nóng miền nhiệt đới.',
    spotlightImg: '/images/ice_cream.png',
    products: [
      { id: 'i1', name: 'Kem Bạc Hà Sô-cô-la', img: '/images/ice_cream.png' },
      { id: 'i2', name: 'Kem Dừa Trái Cây', img: '/images/ice_cream.png' },
      { id: 'i3', name: 'Bingsu Xoài Chín', img: '/images/ice_cream.png' },
      { id: 'i4', name: 'Kem Trái Cây Exo', img: '/images/ice_cream.png' },
      { id: 'i5', name: 'Kem Sầu Riêng Bơ', img: '/images/ice_cream.png' },
      { id: 'i6', name: 'Sữa Chua Dầm Đá', img: '/images/ice_cream.png' },
      { id: 'i7', name: 'Kem Matcha Đậu Đỏ', img: '/images/ice_cream.png' },
      { id: 'i8', name: 'Sundai Dâu Tây', img: '/images/ice_cream.png' },
    ],
  },
]

export default function EllipticalMenu() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(0)
  const leftPanelRef = useRef(null)
  const animRef = useRef(null)
  const currentAngleObj = useRef({ angle: 0 })

  const total = CATEGORIES.length
  const stepAngle = (2 * Math.PI) / total

  // Spotlight position angle (Leftmost curve of ellipse loop: Math.PI = 180 degrees)
  const spotlightAngle = Math.PI

  // Rotate carousel to selected category
  const selectCategory = (index) => {
    if (index === activeIndex) return
    setActiveIndex(index)

    // Compute shortest rotational path to bring category `index` to spotlightAngle
    const targetAngle = spotlightAngle - index * stepAngle

    // Normalize target angle relative to current angle for continuous rotation
    let delta = targetAngle - currentAngleObj.current.angle
    delta = Math.atan2(Math.sin(delta), Math.cos(delta))
    const finalAngle = currentAngleObj.current.angle + delta

    // Kill running tween
    if (animRef.current) animRef.current.kill()

    // Smooth spring-like rotation using GSAP
    animRef.current = gsap.to(currentAngleObj.current, {
      angle: finalAngle,
      duration: 1.1,
      ease: 'power3.out',
      onUpdate: () => {
        setRotationAngle(currentAngleObj.current.angle)
      },
    })

    // Animate Left Panel content smoothly
    if (leftPanelRef.current) {
      gsap.fromTo(
        leftPanelRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.15 }
      )
    }
  }

  // Next / Prev category helpers
  const handlePrev = () => {
    const newIdx = (activeIndex - 1 + total) % total
    selectCategory(newIdx)
  }

  const handleNext = () => {
    const newIdx = (activeIndex + 1) % total
    selectCategory(newIdx)
  }

  const currentCategory = CATEGORIES[activeIndex]

  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#B94425] py-16 pr-0 pl-4 text-white select-none sm:pl-8 md:py-24 md:pl-12 lg:pl-16">
      <div className="relative z-10 mr-0 ml-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-8 lg:flex-row lg:gap-0">
        {/* ================= LEFT PANEL ================= */}
        <div
          className="z-20 flex w-full flex-shrink-0 flex-col justify-between pr-4 sm:pr-6 lg:w-[42%] lg:pr-2 xl:w-[40%]"
          ref={leftPanelRef}
        >
          {/* Category Title & Description */}
          <div className="mb-6 sm:mb-8">
            <h2 className="font-title mb-3 text-3xl leading-tight font-bold tracking-wider text-white uppercase sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              {currentCategory.title}
            </h2>
            <p className="max-w-xl font-sans text-xs leading-relaxed font-light text-white/85 sm:text-sm md:text-base">
              {currentCategory.subtitle}
            </p>
          </div>

          {/* Child Products Grid Card (Deep Green Container) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2D4D43] p-5 text-white shadow-2xl sm:p-6 md:p-8">
            {/* Arrow Nav Controls */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-3 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 active:scale-95 sm:left-4 sm:h-10 sm:w-10"
              aria-label="Previous Category"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
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
              className="absolute top-1/2 right-3 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 active:scale-95 sm:right-4 sm:h-10 sm:w-10"
              aria-label="Next Category"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
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

            {/* Products Grid (2 Rows x 4 Columns) */}
            <div className="grid grid-cols-4 gap-3 px-6 sm:gap-4 sm:px-8">
              {currentCategory.products.map((item) => (
                <div
                  key={item.id}
                  className="group flex cursor-pointer flex-col items-center justify-center text-center"
                >
                  <div className="mb-1.5 flex h-16 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:mb-2 sm:h-20 sm:w-16">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-contain drop-shadow-md filter"
                    />
                  </div>
                  <span className="font-title group-hover:text-brand-accent line-clamp-2 text-[9px] leading-tight font-semibold tracking-wider text-white uppercase transition-colors sm:text-[11px]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL: 3D ELLIPTICAL CAROUSEL ================= */}
        <div className="relative mr-0 flex min-h-[420px] w-full items-center justify-end overflow-visible pr-0 sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] lg:w-[56%] xl:w-[58%]">
          {/* Steady Ellipse Track Image (/images/elipse.png) extending flush to the right edge */}
          <div className="pointer-events-none absolute top-1/2 right-[-40px] flex w-[540px] -translate-y-1/2 items-center justify-end sm:right-[-60px] sm:w-[640px] md:right-[-75px] md:w-[750px] lg:right-[-90px] lg:w-[840px]">
            <img
              src="/images/elipse.png"
              alt="Elliptical Carousel Track"
              className="h-auto w-full object-contain object-right opacity-95 drop-shadow-xl filter"
            />
          </div>

          {/* Elliptical Carousel Items */}
          <div className="relative flex h-full min-h-[420px] w-full items-center justify-end pr-0 sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px]">
            {CATEGORIES.map((cat, idx) => {
              // Current angle for category idx
              const theta = rotationAngle + idx * stepAngle

              // ✅ CODE MỚI ĐÃ SỬA (Quỹ đạo chuẩn Elip)
              const Rx = 250 // Bán kính ngang: Tăng/giảm để chỉnh độ rộng của vòng elip
              const Ry = 220 // Bán kính dọc: Tăng/giảm để chỉnh độ cao của vòng elip

              const offsetX = 100 // Đẩy tâm elip sang trái (số âm) hoặc phải (số dương)
              const offsetY = 0 // Đẩy tâm elip lên trên (số âm) hoặc xuống dưới (số dương)

              // Sử dụng phương trình chuẩn, không nhân thêm hệ số làm méo
              const x = Math.cos(theta) * Rx + offsetX
              const y = Math.sin(theta) * Ry + offsetY

              // Perspective Depth calculation (Leftmost = Front = 1.0, Rightmost = Back = 0.0)
              const depth = (1 - Math.cos(theta)) / 2

              const isActive = idx === activeIndex

              // Dynamic scale, opacity, zIndex based on depth & active state
              const scale = isActive ? 1.45 : 0.62 + depth * 0.32
              const zIndex = Math.round(10 + depth * 40) + (isActive ? 50 : 0)
              const opacity = isActive ? 1.0 : 0.68 + depth * 0.3

              return (
                <div
                  key={cat.id}
                  onClick={() => selectCategory(idx)}
                  className="group absolute top-1/2 left-1/2 cursor-pointer transition-all duration-500 ease-out"
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0px) scale(${scale})`,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                >
                  <div className="relative flex flex-col items-center justify-center">
                    {/* Item Category Thumbnail Image Card */}
                    <div className="relative flex h-32 w-28 items-center justify-center p-1 sm:h-40 sm:w-34 md:h-48 md:w-40 lg:h-52 lg:w-44">
                      <img
                        src={cat.spotlightImg}
                        alt={cat.title}
                        className={`h-full w-full object-contain transition-all duration-500 ${
                          isActive
                            ? 'scale-110 brightness-115 contrast-105 drop-shadow-[0_28px_35px_rgba(0,0,0,0.7)]'
                            : 'opacity-85 brightness-90 drop-shadow-[0_8px_14px_rgba(0,0,0,0.38)] group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-105'
                        }`}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>

                    {/* Category Label Pill Badge */}
                    <div
                      className={`font-title mt-1.5 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-500 ${
                        isActive
                          ? 'text-brand-title scale-105 bg-white font-bold opacity-100 shadow-xl ring-2 ring-white/50'
                          : 'scale-90 bg-black/40 text-white/80 opacity-70 group-hover:bg-black/60 group-hover:opacity-100'
                      }`}
                    >
                      {cat.title}
                    </div>

                    {/* Active Glowing Ring & Ambient Light */}
                    {isActive && (
                      <div className="pointer-events-none absolute -bottom-3 h-5 w-28 animate-pulse rounded-full bg-white/50 blur-lg sm:w-36"></div>
                    )}
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
