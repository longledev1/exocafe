import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // 1. Tắt vĩnh viễn tính năng ghi nhớ vị trí scroll của trình duyệt
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const resetScroll = () => {
      window.scrollTo(0, 0)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }

    // Cuộn ngay tức thì trước khi render paint
    resetScroll()

    // Bắt thêm sau khi các thư viện animation / DOM hydrate
    const rafId = requestAnimationFrame(resetScroll)
    const timer = setTimeout(resetScroll, 60)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [pathname])

  return null
}
