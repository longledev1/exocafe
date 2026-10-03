import { Phone } from 'lucide-react'
import { PRODUCTS } from '../../constants/products'

export default function ProductListSection() {
  return (
    <section
      id="product-catalog"
      className="w-full bg-[#FAF8F5] pt-3 pb-20 sm:pt-4 md:pb-28"
    >
      <div className="mx-auto max-w-[1560px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <h2 className="font-title text-brand-title text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl">
            Sản Phẩm Đóng Gói ExoCafé
          </h2>
          <p className="text-brand-body/75 mx-auto mt-3 max-w-xl font-sans text-sm font-medium sm:text-base">
            Khám phá hạt cà phê rang mộc thượng hạng, bánh nướng tươi mỗi ngày
            và các món quà mang đậm phong vị của miền nhiệt đới.
          </p>
        </div>

        {/* Product Cards Grid: Wider 3-Column Luxury Layout */}
        <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            return (
              <div
                key={product.id}
                className="group hover:border-brand-accent/20 relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* 1. Hình ảnh dọc tràn viền (Full-bleed Top Image) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0EDE8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* 2. Phần nội dung có lề đệm rộng rãi bên dưới */}
                <div className="flex flex-grow flex-col justify-between p-6 sm:p-7">
                  <div>
                    {/* Tên (Hàng 1 - Chiếm trọn vẹn bề ngang) */}
                    <h3 className="font-title text-brand-title mb-1.5 text-lg leading-snug font-bold tracking-wide uppercase sm:text-xl">
                      {product.name}
                    </h3>

                    {/* Giá (Hàng 2) */}
                    <div className="mb-3">
                      <span className="font-title text-brand-accent text-lg font-extrabold sm:text-xl">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    {/* Mô tả */}
                    <p className="text-brand-body/85 mb-4 font-sans text-xs leading-relaxed font-medium sm:text-sm">
                      {product.description}
                    </p>

                    {/* Sản phẩm đi kèm (Contents) */}
                    {product.contents && product.contents.length > 0 && (
                      <div className="mt-3 border-t border-black/5 pt-3.5">
                        <span className="font-title text-brand-title mb-2 block text-xs font-bold tracking-wider uppercase opacity-90">
                          Sản phẩm đi kèm:
                        </span>
                        <ul className="text-brand-body/85 space-y-1.5 text-xs font-medium sm:text-sm">
                          {product.contents.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-brand-accent mt-0.5 shrink-0 text-sm leading-none">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 3. Nút Liên Hệ (Chỗ mua đổi thành Liên hệ vì sản phẩm chưa mở bán) */}
                  <div className="mt-5 border-t border-black/5 pt-5">
                    <a
                      href="tel:0901234567"
                      className="border-brand-title/20 bg-brand-title font-title hover:bg-brand-accent hover:border-brand-accent flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-all duration-300 hover:shadow-md active:scale-98 sm:text-sm"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Liên hệ</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
