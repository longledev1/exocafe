import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

gsap.registerPlugin(ScrollTrigger)

const menuItems = [
  {
    id: 1,
    title: 'Nhâm nhi',
    image: '/images/exomenu_1.png',
    bgColor: 'bg-[#C84928]', // Đỏ gạch ấm Terracotta
    description:
      'Thưởng thức trọn vẹn hương vị nhiệt đới với các dòng thức uống thanh mát, được pha chế tỉ mỉ từ trái cây tươi nguyên chất, mang lại cảm giác sảng khoái tức thì.',
  },
  {
    id: 2,
    title: 'Ngọt ngào',
    image: '/images/exomenu_2.png',
    bgColor: 'bg-[#E59A84]', // Coral đào ngọt ngào
    description:
      'Từng lớp bánh mềm mịn hòa quyện cùng vị ngọt thanh của kem và trái cây tươi, mang đến một trải nghiệm vị giác hoàn hảo cho buổi chiều thư thái.',
  },
  {
    id: 3,
    title: 'Thanh mát',
    image: '/images/exomenu_3.png',
    bgColor: 'bg-[#A3B39C]', // Xanh xô thơm pastel thanh mát
    description:
      'Kem trái cây nhiệt đới mát lạnh, giữ trọn hương vị tự nhiên, là lựa chọn tuyệt vời để xua tan cái nóng và tận hưởng trọn vẹn không khí biển.',
  },
  {
    id: 4,
    title: 'Kết nối',
    image: '/images/exomenu_4.png',
    bgColor: 'bg-[#D1C295]', // Vàng tre nứa ấm sáng
    description:
      'Sự kết hợp độc đáo giữa các nguyên liệu hảo hạng tạo nên thức uống có hương vị đậm đà, khó quên, đánh thức mọi giác quan của bạn.',
  },
]

const MenuItemCard = ({ item }) => {
  return (
    <div className="group relative aspect-[3/4.2] w-full cursor-pointer overflow-hidden rounded-3xl sm:aspect-[3/4.5]">
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => {
          e.target.src =
            'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=600'
        }}
      />

      {/* Soft Top Gradient (visible by default to read the top-right title clearly) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/45 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0"></div>

      {/* Top-Right Title (visible by default) */}
      <div className="absolute top-6 right-6 z-20 text-right font-sans text-lg font-light tracking-wide text-white transition-all duration-500 group-hover:scale-95 group-hover:opacity-0 sm:text-xl">
        {item.title}
      </div>

      {/* Hover Reveal Content Overlay */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/70 p-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-8">
        <div className="translate-y-4 transform transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="font-title mb-2 text-xl font-normal !text-white sm:text-2xl">
            {item.title}
          </div>
          <p className="font-sans text-xs leading-relaxed font-light text-white/80 sm:text-sm">
            {item.description}
          </p>
          <button className="mt-4 cursor-pointer border-b border-[#E8DCC4] pb-1 font-sans text-xs text-[#E8DCC4] uppercase transition-all duration-200 hover:border-white hover:text-white">
            Khám phá thêm
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TropicalAllDay() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // Triggers when the top of the component hits 80% of the viewport height
          toggleActions: 'play none none none',
        },
      })

      // 1. Entrance animation for the TROPICAL background text (blur-to-focus fade)
      tl.fromTo(
        '.all-day-bg-text',
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 0.5,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power2.out',
        }
      )

      // 2. SVG outlines draw for "All day"
      tl.fromTo(
        '.all-day-text-stroke',
        { strokeDashoffset: 850, strokeWidth: 1 },
        { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' },
        '-=1.4'
      )

      // 3. Solid color fill for "All day" (fades transparent outline into full brand color and clears stroke to maintain original font weight)
      tl.to(
        '.all-day-text-stroke',
        {
          fill: '#C84928',
          strokeWidth: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      )

      // 4. Entrance animation for the poem heading text
      tl.fromTo(
        '.all-day-poem',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        '-=0.4'
      )

      // 5. Entrance animation for the Swiper slider container
      tl.fromTo(
        '.all-day-swiper-wrap',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="bg-brand-bg relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* 1. Large Typography Header */}
      <div className="mb-6 w-full sm:mb-8">
        <div className="relative mx-auto flex min-h-[220px] w-full items-center justify-center sm:min-h-[300px] lg:min-h-[380px]">
          {/* Large background text spanning close to screen edges with 50% opacity (Figma spec) */}
          <h2 className="all-day-bg-text font-title text-brand-title w-full text-center text-[285px] leading-none font-bold uppercase opacity-50 select-none">
            TROPICAL
          </h2>

          {/* SVG wrapper inheriting your exact classes: absolute, right, bottom, clamp font-size and line-height */}
          <svg className="font-hand text-brand-accent pointer-events-none absolute right-[5%] bottom-[20px] z-20 h-[1em] w-[1em] overflow-visible text-[clamp(5.5rem,14vw,16rem)] leading-[0.75] select-none sm:right-[12%] sm:bottom-0 lg:right-[9%]">
            <text
              x="100%"
              y="0.75em"
              textAnchor="end"
              className="all-day-text-stroke stroke-brand-accent fill-transparent stroke-[1px] leading-none"
              style={{
                strokeDasharray: 850,
                strokeDashoffset: 850,
              }}
            >
              All day
            </text>
          </svg>
        </div>
      </div>
      {/* Intro Text Section (Two Columns) */}
      <div className="brand-container all-day-poem relative z-30 mb-12 opacity-0 sm:mb-16">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-10 lg:gap-16">
          <h3 className="text-brand-title relative z-30 max-w-2xl font-sans text-xl leading-snug font-bold italic sm:text-2xl md:col-span-7 md:mt-[-80px] md:text-3xl lg:col-span-6 xl:col-span-6">
            Trọn vẹn hương vị nhiệt đới cho mọi <br /> khoảnh khắc trong ngày
          </h3>
          <p className="text-brand-body/75 relative z-30 max-w-xl font-sans text-xs leading-relaxed sm:text-sm md:col-span-5 md:mt-[-40px] lg:col-span-6 xl:col-span-6">
            Từ ly cà phê đánh thức buổi sáng, những thức uống trái cây tươi mát
            cho buổi chiều đến bánh ngọt và kem thủ công cho những phút giây thư
            giãn, mỗi hương vị tại ExoCafe đều được tạo nên để mang đến cảm giác
            tươi mới và trọn vẹn trong từng khoảnh khắc.
          </p>
        </div>
      </div>

      {/* 2. Signature Swiper Slider (Moved inside this component for proximity and coordinated scroll animation) */}
      <div className="all-day-swiper-wrap mt-[30px] w-full overflow-hidden opacity-0 sm:mt-[40px]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView={1.3}
          grabCursor={true}
          loop={false}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3.3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3.7,
              spaceBetween: 20,
            },
          }}
          className="w-full cursor-pointer overflow-visible py-4 pr-0 pl-6 md:pl-12 lg:pl-16 xl:pl-24 [&_.swiper-slide]:cursor-pointer [&_.swiper-wrapper]:cursor-pointer"
        >
          {menuItems.map((item) => (
            <SwiperSlide key={item.id} className="overflow-visible">
              <MenuItemCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
