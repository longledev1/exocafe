import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-brand-bg relative w-full overflow-hidden pt-24 sm:pt-32 md:pt-36 pb-12 text-[#2D2A26] select-none"
    >
      {/* 1. OVERSIZED CURSIVE TYPOGRAPHY OVERLAY: "Cheers!" */}
      <div className="relative w-full text-center">
        <span className="font-hand text-[#C84928]/35 pointer-events-none relative z-10 inline-block text-[130px] leading-none select-none sm:text-[200px] md:text-[270px] lg:text-[330px]">
          Cheers!
        </span>
      </div>

      {/* 2. MAIN FOOTER CONTENT CONTAINER */}
      <div className="relative z-20 mx-auto -mt-20 sm:-mt-28 md:-mt-36 lg:-mt-44 w-full max-w-[2100px] px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Horizontal Top Dividing Line */}
        <div className="mb-10 w-full border-t border-[#C84928]/40 sm:mb-12" />

        {/* 3 COLUMNS WITH VERTICAL DIVIDER LINES */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {/* COLUMN 1: EXOCAFÉ TROPICA (THÔNG TIN THƯƠNG HIỆU & ĐỊA CHỈ) */}
          <div className="flex flex-col justify-between pt-0 pr-0 md:pr-8 lg:pr-12">
            <div>
              <h4 className="font-title text-brand-title mb-4 flex min-h-[28px] items-center text-base font-bold tracking-wider uppercase sm:text-lg">
                EXOCAFÉ TROPICA
              </h4>
              <div className="font-sans text-xs font-normal leading-relaxed text-[#2D2A26]/80 sm:text-sm">
                <p>120 Lê Lợi, Phường Bến Thành</p>
                <p>Quận 1, TP. Hồ Chí Minh</p>
                <p className="mt-2">
                  <a
                    href="tel:0901234567"
                    className="font-semibold text-[#2D2A26] underline transition-colors hover:text-[#C84928]"
                  >
                    +84 (0) 90 123 4567
                  </a>
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C84928] text-white transition-all hover:bg-[#A3381B] hover:scale-105 active:scale-95"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C84928] text-white transition-all hover:bg-[#A3381B] hover:scale-105 active:scale-95"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: GIỜ MỞ CỬA (OPENING HOURS IN VIETNAMESE) */}
          <div className="flex flex-col justify-between border-t border-[#C84928]/40 pt-8 pr-0 md:border-t-0 md:border-r md:border-l md:border-[#C84928]/40 md:px-8 md:pt-0 lg:px-12">
            <div>
              <h4 className="font-title text-brand-title mb-4 flex min-h-[28px] items-center text-base font-bold tracking-wider uppercase sm:text-lg">
                GIỜ MỞ CỬA
              </h4>
              <div className="flex flex-col gap-4 font-sans text-xs text-[#2D2A26]/80 sm:text-sm">
                <div>
                  <p className="font-medium text-[#2D2A26]">Thứ Hai đến Thứ Sáu</p>
                  <p className="font-light text-[#2D2A26]/70">07:30 - 22:00</p>
                </div>
                <div>
                  <p className="font-medium text-[#2D2A26]">Thứ Bảy</p>
                  <p className="font-light text-[#2D2A26]/70">07:30 - 22:30</p>
                </div>
                <div>
                  <p className="font-medium text-[#2D2A26]">Chủ Nhật & Ngày Lễ</p>
                  <p className="font-light text-[#2D2A26]/70">08:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: KHÁM PHÁ (ROUTER LINKS & ACTIONS) */}
          <div className="flex flex-col justify-between border-t border-[#C84928]/40 pt-8 pl-0 md:border-t-0 md:pt-0 md:pl-8 lg:pl-12">
            <div>
              <h4 className="font-title text-brand-title mb-4 flex min-h-[28px] items-center text-base font-bold tracking-wider uppercase sm:text-lg">
                KHÁM PHÁ EXOCAFÉ
              </h4>
            
              {/* ROUTER NAVIGATION LINKS */}
              <ul className="flex flex-col gap-3 font-sans text-xs text-[#2D2A26]/80 sm:text-sm">
                <li>
                  <a
                    href="#menu"
                    className="font-medium text-[#2D2A26] transition-colors hover:text-[#C84928]"
                  >
                    • Thực đơn đặc sản
                  </a>
                </li>
                <li>
                  <a
                    href="#stores"
                    className="font-medium text-[#2D2A26] transition-colors hover:text-[#C84928]"
                  >
                    • Hệ thống cửa hàng
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="font-medium text-[#2D2A26] transition-colors hover:text-[#C84928]"
                  >
                    • Liên hệ & Đặt bàn
                  </a>
                </li>
              </ul>
            </div>

            {/* ACTION BUTTONS (LIÊN HỆ & CỬA HÀNG) */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#C84928] px-7 py-2.5 font-title text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-[#A3381B] hover:shadow-lg active:scale-95 sm:px-8 sm:py-3 sm:text-sm"
              >
                LIÊN HỆ
              </a>
              <Link
                to="/store"
                className="inline-flex items-center justify-center rounded-full border border-[#C84928] px-7 py-2.5 font-title text-xs font-bold tracking-wider text-[#C84928] uppercase transition-all hover:bg-[#C84928] hover:text-white active:scale-95 sm:px-8 sm:py-3 sm:text-sm"
              >
                CỬA HÀNG
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-12 border-t border-[#C84928]/20 pt-6 text-center font-sans text-xs text-[#2D2A26]/60">
          © {new Date().getFullYear()} EXOCAFÉ TROPICA. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  )
}
