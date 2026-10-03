import { useState, useEffect } from 'react'
import { Package, Gift } from 'lucide-react'
import StoreHeroFannedCards from '../components/store/StoreHeroFannedCards'
import ProductListSection from '../components/store/ProductListSection'
import GiftCardSection from '../components/store/GiftCardSection'

export default function Store() {
  // 2 categories: 'products' (Sản phẩm) & 'giftcard' (Gift card)
  // Automatically defaults to 'products' when entering the page as requested
  const [activeTab, setActiveTab] = useState('products')

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* 1. TOP HERO: FANNED SPREAD CARDS SHOWCASE (100% EXCLUSIVE IN FIRST VIEWPORT FOLD) */}
      <StoreHeroFannedCards />

      {/* 2. TAB SWITCHER BUTTONS (SHOWN UPON SCROLLING DOWN) */}
      <div className="mx-auto flex max-w-7xl justify-center px-4 pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="relative inline-flex items-center rounded-full bg-black/[0.06] p-1.5 backdrop-blur-md border border-black/5 shadow-inner">
          {/* Smooth Sliding Active Pill Indicator */}
          <div
            className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full shadow-md transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
              activeTab === 'products'
                ? 'translate-x-0 bg-brand-title'
                : 'translate-x-full bg-brand-accent'
            }`}
          />

          {/* Tab 1: Sản phẩm */}
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2 font-title text-xs font-bold tracking-wider uppercase transition-colors duration-300 select-none sm:px-7 sm:py-2.5 sm:text-sm ${
              activeTab === 'products'
                ? 'text-white'
                : 'text-brand-body/70 hover:text-brand-title'
            }`}
          >
            <Package
              className={`h-3.5 w-3.5 transition-transform duration-300 sm:h-4 sm:w-4 ${
                activeTab === 'products' ? 'scale-110' : ''
              }`}
            />
            <span>Sản phẩm</span>
          </button>

          {/* Tab 2: Gift card */}
          <button
            type="button"
            onClick={() => setActiveTab('giftcard')}
            className={`relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2 font-title text-xs font-bold tracking-wider uppercase transition-colors duration-300 select-none sm:px-7 sm:py-2.5 sm:text-sm ${
              activeTab === 'giftcard'
                ? 'text-white'
                : 'text-brand-body/70 hover:text-brand-accent'
            }`}
          >
            <Gift
              className={`h-3.5 w-3.5 transition-transform duration-300 sm:h-4 sm:w-4 ${
                activeTab === 'giftcard' ? 'scale-110' : ''
              }`}
            />
            <span>Gift card</span>
          </button>
        </div>
      </div>

      {/* 3. CONDITIONAL TAB CONTENT */}
      {activeTab === 'products' ? (
        <div key="tab-products" className="animate-tabContent">
          {/* Danh sách các sản phẩm đóng gói & bánh tươi */}
          <ProductListSection />
        </div>
      ) : (
        <div key="tab-giftcard" className="animate-tabContent pb-16">
          {/* Khu vực thẻ quà tặng Gift Card */}
          <GiftCardSection />
        </div>
      )}
    </div>
  )
}
