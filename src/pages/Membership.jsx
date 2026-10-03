import { useState, useEffect } from 'react'
import {
  RotateCw,
  CheckCircle2,
  MapPin,
  Truck,
  Send,
  ShieldCheck,
  Check,
} from 'lucide-react'
import { MEMBERSHIP_CARDS, MEMBERSHIP_BENEFITS } from '../constants/membershipCards'

export default function Membership() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState('store') // 'store' | 'home'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    birthdate: '',
    storeBranch: 'ExoCafé Thảo Điền - 28 Thảo Điền, P. Thảo Điền, TP. Thủ Đức',
    address: '',
    note: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Reset flip to front when changing card design
  const handleSelectCard = (index) => {
    setSelectedCardIndex(index)
    setIsFlipped(false)
  }

  const activeCard = MEMBERSHIP_CARDS[selectedCardIndex] || MEMBERSHIP_CARDS[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 800)
  }

  const handleResetForm = () => {
    setIsSubmitted(false)
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      birthdate: '',
      storeBranch: 'ExoCafé Thảo Điền - 28 Thảo Điền, P. Thảo Điền, TP. Thủ Đức',
      address: '',
      note: '',
    })
  }

  return (
    <div className="w-full bg-[#FAF8F5] pt-28 pb-16 sm:pt-36 sm:pb-24 min-h-screen text-brand-title">
      <div className="w-full px-6 sm:px-10 lg:px-14">
        {/* 1. HEADER (Styled with !font-hand as requested) */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <h1 className="!font-hand text-brand-title text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-tight font-normal">
            ExoCafé <span className="text-brand-accent">Membership</span>
          </h1>
          <p className="text-brand-body/75 mx-auto mt-2 max-w-xl font-sans text-xs sm:text-sm md:text-base font-medium">
            Chọn mẫu thiết kế bạn yêu thích nhất và đăng ký nhận thẻ thành viên vật lý hoàn toàn miễn phí từ ExoCafé.
          </p>
        </div>

        {/* 2. MAIN 2-COLUMN STAGE (Left: Thumbnails + 3D Card | Right: Form) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* LEFT COLUMN: 3D INTERACTIVE FLIP CARD SHOWCASE (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* 3 CARD THUMBNAIL SAMPLES (Centered directly above the card as marked) */}
            <div className="w-full max-w-[720px] mb-2 sm:mb-2.5 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <span className="font-title text-xs font-bold tracking-wider text-brand-body/70 uppercase">
                Chọn mẫu thẻ:
              </span>
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
                {MEMBERSHIP_CARDS.map((card, idx) => {
                  const isSelected = idx === selectedCardIndex
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSelectCard(idx)}
                      className={`group relative flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-1.5 transition-all duration-300 border ${
                        isSelected
                          ? 'bg-white border-brand-accent shadow-md ring-2 ring-brand-accent/20 scale-105'
                          : 'bg-white/70 border-black/8 hover:bg-white hover:border-black/20 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="w-10 sm:w-11 aspect-[3/2] overflow-hidden rounded-md shadow-2xs">
                        <img
                          src={card.frontImage}
                          alt={card.name}
                          className="h-full w-full object-contain"
                          loading="eager"
                        />
                      </div>
                      <span
                        className={`font-title text-xs font-bold ${
                          isSelected ? 'text-brand-accent' : 'text-brand-title'
                        }`}
                      >
                        {card.name}
                      </span>
                      {isSelected && (
                        <Check className="h-3 w-3 stroke-[3] text-brand-accent" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3D Flip Card Container */}
            <div className="perspective-1000 w-full max-w-[720px] pt-1 pb-3 select-none">
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className={`transform-style-3d relative w-full aspect-[3/2] cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE (member_card{N}_front) */}
                <div className="backface-hidden absolute inset-0 flex items-center justify-center">
                  <img
                    src={activeCard.frontImage}
                    alt={`${activeCard.name} - Mặt trước`}
                    className="h-full w-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-[1.015]"
                    loading="eager"
                  />
                </div>

                {/* BACK FACE (member_card{N}_back) */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center">
                  <img
                    src={activeCard.backImage}
                    alt={`${activeCard.name} - Mặt sau`}
                    className="h-full w-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-[1.015]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Flip Controller Bar (Centered relative to the card) */}
            <div className="mt-2 w-full max-w-[720px] flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setIsFlipped((prev) => !prev)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 font-title text-xs font-bold tracking-wider text-brand-title uppercase shadow-xs transition-all duration-300 hover:border-brand-accent hover:text-brand-accent hover:shadow-md active:scale-95"
              >
                <RotateCw
                  className={`h-4 w-4 transition-transform duration-500 ${
                    isFlipped ? 'rotate-180 text-brand-accent' : ''
                  }`}
                />
                <span>{isFlipped ? 'Xem mặt trước' : 'Xem mặt sau'}</span>
              </button>

              <span className="rounded-full bg-black/[0.05] px-3.5 py-1.5 font-sans text-xs font-medium text-brand-body/70">
                Đang hiển thị: <strong className="text-brand-title">{isFlipped ? 'Mặt sau' : 'Mặt trước'}</strong> (nhấp vào thẻ để lật)
              </span>
            </div>

            {/* Member Privileges Information */}
            <div className="mt-8 w-full max-w-[720px] rounded-3xl border border-black/6 bg-white/80 p-6 sm:p-7 shadow-xs backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-black/8 pb-4">
                <div>
                  <h3 className="font-title text-lg font-bold uppercase text-brand-title">
                    Quyền Lợi Thành Viên ExoCafé
                  </h3>
                  <span className="font-sans text-xs font-medium text-brand-body/65">
                    Áp dụng đồng bộ cho tất cả các mẫu thẻ thành viên
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MEMBERSHIP_BENEFITS.map((perk) => (
                  <div key={perk} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm font-medium text-brand-title/85 leading-snug">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REGISTRATION FORM (col-span-5) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8 shadow-xl">
              {isSubmitted ? (
                /* SUCCESS NOTIFICATION STATE */
                <div className="py-8 text-center animate-modalFadeIn">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                    <ShieldCheck className="h-9 w-9" />
                  </div>
                  <h3 className="font-title text-2xl font-bold uppercase text-brand-title">
                    Đăng Ký Thành Công!
                  </h3>
                  <p className="mt-2 font-sans text-sm text-brand-body/80 leading-relaxed">
                    Cảm ơn bạn <strong className="text-brand-title">{formData.fullName}</strong>. Yêu cầu phát hành{' '}
                    <strong className="text-brand-accent">{activeCard.name}</strong> đã được hệ thống ghi nhận.
                  </p>

                  <div className="my-6 rounded-2xl bg-[#FAF8F5] p-4 text-left font-sans text-xs text-brand-body/85 space-y-2 border border-black/5">
                    <div>
                      <span className="font-medium text-brand-body/60">Mẫu thẻ đã chọn: </span>
                      <strong>{activeCard.name}</strong>
                    </div>
                    <div>
                      <span className="font-medium text-brand-body/60">Số điện thoại: </span>
                      <strong>{formData.phone}</strong>
                    </div>
                    <div>
                      <span className="font-medium text-brand-body/60">Email: </span>
                      <strong>{formData.email}</strong>
                    </div>
                    <div>
                      <span className="font-medium text-brand-body/60">Phương thức nhận: </span>
                      <strong>
                        {deliveryMethod === 'store'
                          ? `Tại cửa hàng (${formData.storeBranch})`
                          : `Giao tận nơi (${formData.address})`}
                      </strong>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-brand-body/60 mb-6">
                    Bộ phận Chăm sóc Khách hàng ExoCafé sẽ liên hệ xác nhận và bàn giao thẻ trong vòng 24 giờ.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="cursor-pointer rounded-full bg-brand-title px-8 py-3.5 font-title text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-accent transition-colors shadow-md"
                  >
                    Đăng ký thêm thông tin khác
                  </button>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <h2 className="font-title text-xl sm:text-2xl font-bold uppercase text-brand-title">
                      Đăng Ký Nhận Thẻ Vật Lý
                    </h2>
                    <p className="mt-1 font-sans text-xs sm:text-sm text-brand-body/70">
                      Điền thông tin bên dưới để kích hoạt tài khoản và nhận thẻ cứng miễn phí.
                    </p>
                  </div>

                  {/* Selected Card Badge */}
                  <div className="flex items-center justify-between rounded-2xl bg-[#FAF8F5] p-3 border border-black/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 aspect-[3/2] overflow-hidden rounded-md shadow-xs">
                        <img
                          src={activeCard.frontImage}
                          alt={activeCard.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-title text-xs sm:text-sm font-bold text-brand-title">
                          {activeCard.name}
                        </div>
                        <div className="text-[10px] sm:text-xs font-sans text-brand-body/60">
                          Phiên bản thẻ vật lý cao cấp
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 font-sans text-[11px] font-bold text-emerald-800">
                      Phát hành 0đ
                    </span>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Hoàng Long"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                    />
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                        Số điện thoại <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0901 234 567"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                      />
                    </div>
                    <div>
                      <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ten@example.com"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                      />
                    </div>
                  </div>

                  {/* Birthdate */}
                  <div>
                    <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                      Ngày sinh (Nhận quà ưu đãi sinh nhật) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.birthdate}
                      onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                    />
                  </div>

                  {/* Delivery Method Selection */}
                  <div>
                    <label className="block font-title text-xs font-bold uppercase text-brand-title mb-2">
                      Hình thức nhận thẻ
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('store')}
                        className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl p-3 border text-xs font-title font-bold uppercase transition-all ${
                          deliveryMethod === 'store'
                            ? 'bg-brand-title text-white border-brand-title shadow-xs'
                            : 'bg-white text-brand-title/75 border-black/10 hover:border-black/20'
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Tại cửa hàng</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('home')}
                        className={`cursor-pointer flex items-center justify-center gap-2 rounded-xl p-3 border text-xs font-title font-bold uppercase transition-all ${
                          deliveryMethod === 'home'
                            ? 'bg-brand-title text-white border-brand-title shadow-xs'
                            : 'bg-white text-brand-title/75 border-black/10 hover:border-black/20'
                        }`}
                      >
                        <Truck className="h-4 w-4" />
                        <span>Giao tận nơi</span>
                      </button>
                    </div>
                  </div>

                  {/* Conditional input based on delivery method */}
                  {deliveryMethod === 'store' ? (
                    <div>
                      <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                        Chọn chi nhánh ExoCafé nhận thẻ
                      </label>
                      <select
                        value={formData.storeBranch}
                        onChange={(e) => setFormData({ ...formData, storeBranch: e.target.value })}
                        className="w-full cursor-pointer rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-xs sm:text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                      >
                        <option value="ExoCafé Thảo Điền - 28 Thảo Điền, P. Thảo Điền, TP. Thủ Đức">
                          ExoCafé Thảo Điền - 28 Thảo Điền, TP. Thủ Đức
                        </option>
                        <option value="ExoCafé Saigon Center - 65 Lê Lợi, Bến Nghé, Quận 1">
                          ExoCafé Saigon Center - 65 Lê Lợi, Quận 1
                        </option>
                        <option value="ExoCafé Crescent Mall - Tôn Dật Tiên, Tân Phú, Quận 7">
                          ExoCafé Crescent Mall - Tân Phú, Quận 7
                        </option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                        Địa chỉ nhận thẻ tận nơi <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={deliveryMethod === 'home'}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                        className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                      />
                    </div>
                  )}

                  {/* Optional Note */}
                  <div>
                    <label className="block font-title text-xs font-bold uppercase text-brand-title mb-1.5">
                      Ghi chú thêm (tùy chọn)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Lời nhắn thêm hoặc thời gian thuận tiện nhận cuộc gọi..."
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 font-sans text-xs sm:text-sm text-brand-title outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 resize-none"
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-brand-title py-3.5 px-6 font-title text-xs sm:text-sm font-bold tracking-widest uppercase text-white shadow-md transition-all duration-300 hover:bg-brand-accent hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Đang gửi thông tin...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Xác nhận đăng ký nhận thẻ</span>
                      </>
                    )}
                  </button>

                  <p className="text-center font-sans text-[11px] text-brand-body/55">
                    Thông tin của bạn được bảo mật tuyệt đối theo chính sách bảo vệ dữ liệu thành viên ExoCafé.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
