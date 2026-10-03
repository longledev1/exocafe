import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTypographyHeader from './SectionTypographyHeader'

gsap.registerPlugin(ScrollTrigger)

const SPACE_IMAGES = [
  {
    id: 1,
    title: 'Góc Nhiệt Đới Đương Đại',
    subtitle: 'Không gian mở tràn ngập ánh sáng tự nhiên & cây xanh',
    type: 'landscape',
    src: '/images/space1.png',
    num: '01',
  },
  {
    id: 2,
    title: 'Chi Tiết Kiến Trúc Tối Giản',
    subtitle: 'Đường nét thiết kế mộc mạc mang cảm hứng biển đảo',
    type: 'portrait',
    src: '/images/space2.png',
    num: '02',
  },
  {
    id: 3,
    title: 'Khu Vực Thưởng Thức Cà Phê',
    subtitle: 'Bàn gỗ tự nhiên hòa quyện với ánh sáng hoàng hôn',
    type: 'landscape',
    src: '/images/space3.png',
    num: '03',
  },
  {
    id: 4,
    title: 'Góc Check-in Ấn Tượng',
    subtitle: 'Vòm cong mềm mại tôn vinh vẻ đẹp kiến trúc Exo',
    type: 'portrait',
    src: '/images/space4.png',
    num: '04',
  },
  {
    id: 5,
    title: 'Sảnh Đón Khách Rộng Mở',
    subtitle: 'Tối ưu không gian thư giãn cho những buổi hẹn hò',
    type: 'landscape',
    src: '/images/space5.jpg',
    num: '05',
  },
  {
    id: 6,
    title: 'Nét Đẹp Tinh Tế Từ Thiên Nhiên',
    subtitle: 'Sự kết hợp hoàn hảo giữa vật liệu nứa tre & bê tông',
    type: 'portrait',
    src: '/images/space6.jpg',
    num: '06',
  },
  {
    id: 7,
    title: 'Khoảng Sân Thơ Mộng',
    subtitle: 'Nơi dừng chân lý tưởng nhâm nhi ly trà trái cây',
    type: 'landscape',
    src: '/images/space7.jpg',
    num: '07',
  },
  {
    id: 8,
    title: 'Góc Tĩnh Lặng Riêng Tư',
    subtitle: 'Không gian ấm cúng cho những phút giây lắng đọng',
    type: 'portrait',
    src: '/images/space8.jpg',
    num: '08',
  },
]

export default function SpaceGallery() {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)
  const galleryRef = useRef(null)

  // GSAP Entrance Animations
  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.gallery-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    },
    { scope: galleryRef }
  )

  // Lightbox Navigation
  const handlePrev = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) =>
      prev === 0 ? SPACE_IMAGES.length - 1 : prev - 1
    )
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setSelectedImgIndex((prev) =>
      prev === SPACE_IMAGES.length - 1 ? 0 : prev + 1
    )
  }

  const activeModalImage =
    selectedImgIndex !== null ? SPACE_IMAGES[selectedImgIndex] : null

  return (
    <section
      ref={galleryRef}
      className="bg-brand-bg relative w-full overflow-hidden pb-24"
    >
      {/* Asymmetric Editorial Gallery Grid (2 Columns rhythm alternating Landscape & Portrait) */}
      <div className="brand-container mx-auto max-w-[1700px]">
        {/* Pair 1 & 2 */}
        <div className="mb-8 grid grid-cols-12 items-center gap-6 md:mb-12 md:gap-8 lg:gap-10">
          {/* Space 1 - Landscape */}
          <div
            onClick={() => setSelectedImgIndex(0)}
            className="gallery-card group relative col-span-12 aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-7"
          >
            <img
              src={SPACE_IMAGES[0].src}
              alt={SPACE_IMAGES[0].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[0].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Landscape Architecture
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl md:text-3xl">
                {SPACE_IMAGES[0].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[0].subtitle}
              </p>
            </div>
          </div>

          {/* Space 2 - Portrait */}
          <div
            onClick={() => setSelectedImgIndex(1)}
            className="gallery-card group relative col-span-12 aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-5"
          >
            <img
              src={SPACE_IMAGES[1].src}
              alt={SPACE_IMAGES[1].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[1].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Interior Focus
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl">
                {SPACE_IMAGES[1].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[1].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Pair 3 & 4 (Inverted: Portrait Left, Landscape Right) */}
        <div className="mb-8 grid grid-cols-12 items-center gap-6 md:mb-12 md:gap-8 lg:gap-10">
          {/* Space 4 - Portrait */}
          <div
            onClick={() => setSelectedImgIndex(3)}
            className="gallery-card group relative col-span-12 aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-5"
          >
            <img
              src={SPACE_IMAGES[3].src}
              alt={SPACE_IMAGES[3].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[3].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Architectural Highlight
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl">
                {SPACE_IMAGES[3].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[3].subtitle}
              </p>
            </div>
          </div>

          {/* Space 3 - Landscape */}
          <div
            onClick={() => setSelectedImgIndex(2)}
            className="gallery-card group relative col-span-12 aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-7"
          >
            <img
              src={SPACE_IMAGES[2].src}
              alt={SPACE_IMAGES[2].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[2].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Main Seating
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl md:text-3xl">
                {SPACE_IMAGES[2].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[2].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Pair 5 & 6 */}
        <div className="mb-8 grid grid-cols-12 items-center gap-6 md:mb-12 md:gap-8 lg:gap-10">
          {/* Space 5 - Landscape */}
          <div
            onClick={() => setSelectedImgIndex(4)}
            className="gallery-card group relative col-span-12 aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-7"
          >
            <img
              src={SPACE_IMAGES[4].src}
              alt={SPACE_IMAGES[4].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[4].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Welcome Lounge
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl md:text-3xl">
                {SPACE_IMAGES[4].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[4].subtitle}
              </p>
            </div>
          </div>

          {/* Space 6 - Portrait */}
          <div
            onClick={() => setSelectedImgIndex(5)}
            className="gallery-card group relative col-span-12 aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-5"
          >
            <img
              src={SPACE_IMAGES[5].src}
              alt={SPACE_IMAGES[5].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[5].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Material & Texture
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl">
                {SPACE_IMAGES[5].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[5].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Pair 7 & 8 (Inverted: Portrait Left, Landscape Right) */}
        <div className="grid grid-cols-12 items-center gap-6 md:gap-8 lg:gap-10">
          {/* Space 8 - Portrait */}
          <div
            onClick={() => setSelectedImgIndex(7)}
            className="gallery-card group relative col-span-12 aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-5"
          >
            <img
              src={SPACE_IMAGES[7].src}
              alt={SPACE_IMAGES[7].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[7].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Private Corner
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl">
                {SPACE_IMAGES[7].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[7].subtitle}
              </p>
            </div>
          </div>

          {/* Space 7 - Landscape */}
          <div
            onClick={() => setSelectedImgIndex(6)}
            className="gallery-card group relative col-span-12 aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl bg-black/5 shadow-xl lg:col-span-7"
          >
            <img
              src={SPACE_IMAGES[6].src}
              alt={SPACE_IMAGES[6].title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="font-title absolute top-6 right-6 text-xs tracking-widest text-white/70 uppercase sm:text-sm">
              [{SPACE_IMAGES[6].num}]
            </div>
            <div className="absolute right-6 bottom-6 left-6 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:right-8 sm:bottom-8 sm:left-8">
              <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                Outdoor Garden
              </span>
              <h3 className="font-title text-xl font-bold tracking-wider sm:text-2xl md:text-3xl">
                {SPACE_IMAGES[6].title}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-xs font-light text-white/80 sm:text-sm">
                {SPACE_IMAGES[6].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN MINIMALIST LIGHTBOX MODAL */}
      {activeModalImage && (
        <div
          onClick={() => setSelectedImgIndex(null)}
          className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl transition-all duration-300"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImgIndex(null)}
            className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/30"
            aria-label="Close Lightbox"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/30 sm:left-8"
            aria-label="Previous Image"
          >
            <svg
              className="h-6 w-6"
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

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/30 sm:right-8"
            aria-label="Next Image"
          >
            <svg
              className="h-6 w-6"
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

          {/* Modal Active Image & Info */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black/40 shadow-2xl"
          >
            <img
              src={activeModalImage.src}
              alt={activeModalImage.title}
              className="max-h-[75vh] w-auto rounded-2xl object-contain"
            />
            <div className="p-6 text-center text-white">
              <span className="font-title text-brand-accent text-xs tracking-widest uppercase">
                [{activeModalImage.num} / 08]
              </span>
              <h3 className="font-title mt-1 text-2xl font-bold tracking-wider sm:text-3xl">
                {activeModalImage.title}
              </h3>
              <p className="mt-1 font-sans text-sm font-light text-white/80">
                {activeModalImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
