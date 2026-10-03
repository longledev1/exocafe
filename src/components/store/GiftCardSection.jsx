import { useState } from 'react'
import { Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { GIFT_CARDS } from '../../constants/giftCards'

export default function GiftCardSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activeCard = GIFT_CARDS[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? GIFT_CARDS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GIFT_CARDS.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      id="gift-card-catalog"
      className="w-full bg-[#FAF8F5] pt-2 pb-12 sm:pt-4 sm:pb-16"
    >
      <div className="mx-auto max-w-[1560px] px-4 sm:px-8 lg:px-12">
        {/* 1. Header (Centered at Top - Exactly like ProductListSection) */}
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <h2 className="font-title text-brand-title text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl">
            Thẻ Quà Tặng Nhiệt Đới
          </h2>
          <p className="text-brand-body/75 mx-auto mt-2.5 max-w-xl font-sans text-sm font-medium sm:text-base">
            Gửi trao khoảnh khắc thưởng thức cà phê và phong vị nhiệt đới trọn vẹn đến những người bạn trân quý.
          </p>
        </div>

        {/* 2. Compact 2-Column Stage Below Header (Spanning Wide Like Product Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
          {/* LEFT: 3D FLOATING CARD SHOWCASE (col-span-7) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Ambient Background Glow behind card */}
            <div className="pointer-events-none absolute inset-6 rounded-full bg-gradient-to-r from-brand-accent/15 via-[#E6B87D]/20 to-brand-title/15 blur-3xl opacity-80" />

            {/* Inner Card Wrapper with arrows pinned right beside card edges */}
            <div className="relative w-full max-w-[660px] flex items-center justify-center">
              {/* Previous Button (Snug against card left) */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Thẻ trước đó"
                className="absolute -left-2 sm:-left-4 md:-left-5 z-20 flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-black/8 bg-white/95 text-brand-title shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand-accent hover:text-brand-accent active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Active Card Image */}
              <div
                key={activeCard.id}
                className="animate-giftCardSwap relative z-10 w-full px-4 sm:px-6 transition-transform duration-500 hover:scale-[1.025] hover:-translate-y-1.5 cursor-pointer"
              >
                <img
                  src={activeCard.image}
                  alt={activeCard.name}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] select-none"
                  loading="eager"
                />
              </div>

              {/* Next Button (Snug against card right) */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Thẻ kế tiếp"
                className="absolute -right-2 sm:-right-4 md:-right-5 z-20 flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-black/8 bg-white/95 text-brand-title shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand-accent hover:text-brand-accent active:scale-95"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>

          {/* RIGHT: COMPACT CONTROLS & DETAILS (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 4 Denomination Selector Pills in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-md lg:max-w-lg mb-4">
              {GIFT_CARDS.map((card, idx) => {
                const isActive = idx === currentIndex
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`cursor-pointer rounded-2xl p-2.5 sm:p-3 transition-all duration-300 select-none flex flex-col text-left border ${
                      isActive
                        ? 'bg-brand-title text-white border-brand-title shadow-md scale-[1.02]'
                        : 'bg-white/80 text-brand-title/75 border-black/8 hover:border-brand-accent/40 hover:bg-white hover:text-brand-title shadow-xs'
                    }`}
                  >
                    <span className="font-title text-sm sm:text-base font-bold tracking-wider">
                      {card.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span
                      className={`text-[10px] sm:text-[11px] font-sans font-medium transition-colors ${
                        isActive ? 'text-white/80' : 'text-brand-body/55'
                      }`}
                    >
                      {card.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Selected Card Info Box */}
            <div className="mb-5 w-full max-w-md border-t border-black/8 pt-3.5">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="font-title text-brand-title text-lg sm:text-xl font-bold uppercase">
                  {activeCard.name}
                </span>
                <span className="font-title text-brand-accent text-xl sm:text-2xl font-black">
                  {activeCard.price.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <p className="text-brand-body/85 font-sans text-xs sm:text-sm font-medium leading-relaxed">
                {activeCard.description}
              </p>
            </div>

            {/* Contact CTA Button */}
            <a
              href="tel:0901234567"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-brand-title/20 bg-brand-title px-8 py-3.5 font-title text-xs sm:text-sm font-bold tracking-widest text-white uppercase shadow-md transition-all duration-300 hover:bg-brand-accent hover:border-brand-accent hover:shadow-lg active:scale-95"
            >
              <Phone className="h-4 w-4" />
              <span>Liên hệ đặt thẻ quà tặng</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
