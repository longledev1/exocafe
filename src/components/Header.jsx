import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Trang chủ', path: '/', type: 'route' },
  { label: 'Nguồn cảm hứng', path: '/inspiration', type: 'route' },
  { label: 'Cửa hàng', path: '/store', type: 'route' },
  { label: 'Thành viên', path: '/membership', type: 'route' },
  { label: 'Liên hệ', path: '/#contact', type: 'anchor' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Track window scroll to switch solid/transparent header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Open menu handler
  const openMenu = () => {
    setIsMenuOpen(true)
    setIsAnimatingOut(false)
  }

  // Close menu with smooth exit animation
  const closeMenu = useCallback(() => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsAnimatingOut(false)
    }, 280)
  }, [])

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen, closeMenu])

  // Body scroll lock when menu modal is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const showSolidHeader = isScrolled || isMenuOpen
  const isDarkHeader = location.pathname === '/inspiration' && !showSolidHeader

  return (
    <>
      {/* 1. FIXED TOP HEADER BAR */}
      <div className="fixed top-0 left-0 z-40 w-full flex justify-center transition-all duration-300 pointer-events-none pt-0">
        <nav
          className={`transition-all duration-300 pointer-events-auto w-full relative flex items-center justify-between px-6 sm:px-10 lg:px-14 ${
            showSolidHeader
              ? 'h-[76px] sm:h-[84px] bg-brand-bg/95 backdrop-blur-md text-brand-title border-b border-brand-title/10 shadow-sm'
              : isDarkHeader
              ? 'h-24 sm:h-28 md:h-32 bg-gradient-to-b from-black/70 via-black/35 to-transparent text-white border-none shadow-none'
              : 'h-24 sm:h-28 md:h-32 bg-transparent text-brand-title border-none shadow-none'
          }`}
        >
          {/* LEFT: BRAND LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/images/logo/Exocafe_logo.png"
                alt="ExoCafé Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  showSolidHeader ? 'h-13 sm:h-15 md:h-16' : 'h-18 sm:h-22 md:h-26 lg:h-28'
                } ${isDarkHeader ? 'drop-shadow-lg' : ''}`}
              />
            </Link>
          </div>

          {/* RIGHT: MENU BUTTON */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={openMenu}
              className={`group flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 sm:px-5 sm:py-2.5 font-title text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 select-none shadow-xs hover:shadow-md active:scale-95 ${
                showSolidHeader
                  ? 'border-brand-title/20 bg-white/80 text-brand-title hover:border-brand-accent hover:text-brand-accent hover:bg-white'
                  : isDarkHeader
                  ? 'border-white/30 bg-black/30 backdrop-blur-md text-white hover:border-white hover:bg-black/50'
                  : 'border-brand-title/20 bg-white/70 backdrop-blur-md text-brand-title hover:border-brand-accent hover:text-brand-accent hover:bg-white'
              }`}
              aria-label="Mở menu điều hướng"
            >
              <div className="flex flex-col gap-1 w-4 sm:w-4.5">
                <span className="h-[2px] w-full bg-current rounded-full transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="h-[2px] w-3/4 bg-current rounded-full transition-transform duration-300 group-hover:w-full" />
              </div>
              <span>MENU</span>
            </button>
          </div>
        </nav>
      </div>

      {/* 2. FLOATING MENU MODAL POPUP (Blossoming from top-right corner) */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isAnimatingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Blurred Backdrop */}
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-black/45 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            aria-hidden="true"
          />

          {/* Floating Rounded Card Modal Anchored to Top-Right */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-6 md:top-6 md:right-8 z-10 w-[calc(100vw-24px)] sm:w-[500px] md:w-[560px] max-w-[600px]">
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative rounded-[32px] sm:rounded-[40px] bg-white p-7 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-black/5 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isAnimatingOut
                  ? 'scale-75 -translate-y-4 translate-x-4 opacity-0 pointer-events-none'
                  : 'animate-menuCardPopRight'
              }`}
            >
              {/* Top-Right Circular Close Button (X) */}
              <button
                type="button"
                onClick={closeMenu}
                className="absolute top-5 right-5 sm:top-7 sm:right-7 flex h-10 w-10 sm:h-11 sm:w-11 cursor-pointer items-center justify-center rounded-full bg-[#F3EFEA] text-brand-title transition-all duration-200 hover:bg-[#E5DFD7] hover:scale-105 active:scale-95"
                aria-label="Đóng menu"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Centered Navigation Links List */}
              <div className="flex flex-col items-center justify-center gap-4.5 sm:gap-6 pt-6 pb-6 text-center">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.type === 'route'
                      ? location.pathname === item.path ||
                        (item.path === '/store' && location.pathname === '/cua-hang') ||
                        (item.path === '/membership' && location.pathname === '/thanh-vien')
                      : false

                  if (item.type === 'route') {
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={closeMenu}
                        className={`font-title text-2xl sm:text-3xl font-bold tracking-wide transition-all duration-200 hover:text-brand-accent ${
                          isActive
                            ? 'text-brand-title border-b-2 border-brand-title pb-1'
                            : 'text-brand-title/80 hover:scale-105'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  }

                  return (
                    <a
                      key={item.label}
                      href={item.path}
                      onClick={closeMenu}
                      className="font-title text-2xl sm:text-3xl font-bold tracking-wide text-brand-title/80 transition-all duration-200 hover:text-brand-accent hover:scale-105"
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
