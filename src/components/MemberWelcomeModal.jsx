import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

export default function MemberWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Do not show on membership registration page itself
    if (location.pathname === '/membership' || location.pathname === '/thanh-vien') {
      return
    }

    // Small delay for smooth intro after page loads
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [location.pathname])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 280)
  }

  const handleNavigate = () => {
    handleClose()
    setTimeout(() => {
      navigate('/membership')
    }, 150)
  }

  // Keyboard accessibility
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Đăng ký thành viên ExoCafé"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Blurred Dark Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative z-10 w-full max-w-[420px] sm:max-w-[450px] overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#FAF8F5] border border-black/8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 ${
          isClosing ? 'scale-90 opacity-0 -translate-y-3' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Top-Right Circular Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng thông báo"
          className="absolute top-3 right-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:scale-105 active:scale-95"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Card Image Showcase (member_card.png) */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE8E1]">
          <img
            src="/images/store/member_card.png"
            alt="Thẻ thành viên ExoCafé"
            className="h-full w-full object-cover select-none transition-transform duration-700 hover:scale-105"
            loading="eager"
          />
          {/* Subtle gradient vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/20" />
        </div>

        {/* Content Body */}
        <div className="relative -mt-3 px-5 pb-5 sm:px-6 sm:pb-6 text-center">
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/20 bg-white/90 px-3 py-1 shadow-xs backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-brand-accent" />
            <span className="font-title text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-brand-accent">
              Thành Viên ExoCafé
            </span>
          </div>

          {/* Title with !font-hand */}
          <h2 className="mt-2 !font-hand text-3xl sm:text-4xl leading-tight font-normal text-brand-title">
            ExoCafé <span className="text-brand-accent">Membership</span>
          </h2>

          {/* Description */}
          <p className="mt-1 mx-auto max-w-xs font-sans text-xs text-brand-body/75 leading-relaxed font-medium">
            Đăng ký mở thẻ thành viên vật lý <strong>miễn phí 0đ</strong>, tích lũy điểm thưởng và nhận ngàn đặc quyền phong vị nhiệt đới.
          </p>

          {/* Highlights 3 Perks */}
          <div className="my-3.5 grid grid-cols-3 gap-1.5 border-y border-black/8 py-2 text-center">
            <div className="flex flex-col items-center p-0.5">
              <span className="font-title text-xs font-bold text-brand-title">0đ</span>
              <span className="text-[10px] text-brand-body/60 font-medium">Phát hành thẻ</span>
            </div>
            <div className="flex flex-col items-center p-0.5 border-x border-black/8">
              <span className="font-title text-xs font-bold text-brand-accent">Tích điểm</span>
              <span className="text-[10px] text-brand-body/60 font-medium">Đổi quà miễn phí</span>
            </div>
            <div className="flex flex-col items-center p-0.5">
              <span className="font-title text-xs font-bold text-brand-title">Quà sinh nhật</span>
              <span className="text-[10px] text-brand-body/60 font-medium">Ưu đãi bất ngờ</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleNavigate}
              className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-title py-2.5 px-4 font-title text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-brand-accent hover:shadow-lg active:scale-95"
            >
              <span>Đăng Ký Ngay</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/80 py-2.5 px-4 font-title text-xs font-bold uppercase tracking-wider text-brand-body/70 transition-all duration-200 hover:bg-white hover:text-brand-title active:scale-95"
            >
              Để sau
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
