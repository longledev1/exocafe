import { forwardRef } from 'react'

const OriginStory = forwardRef(({ setSelectedPhoto }, ref) => {
  return (
    <div
      ref={ref}
      className="mb-24 grid grid-cols-1 items-start gap-8 md:mb-36 md:grid-cols-12"
    >
      {/* Left Column: Cursive Tagline + Dashed Line + Tilted Coffee Bean Photo (Pulled to edge) */}
      <div className="-ml-6 flex flex-col justify-start sm:-ml-12 md:col-span-5 md:col-start-1 md:-ml-16 lg:-ml-24">
        <span className="font-hand mt-[-40px] pl-6 text-4xl tracking-wider text-[#FAF8F5]/90 sm:pl-12 sm:text-5xl md:pl-16 lg:pl-24 lg:text-6xl">
          CAFÉ
        </span>
        <div className="my-4 ml-6 w-48 border-t-2 border-dashed border-[#FAF8F5]/35 sm:ml-12 md:ml-16 lg:ml-24" />

        {/* Tilted Photo (Left Bottom - Small Square aspect-square, Touches Left Edge) */}
        <div
          onClick={() =>
            setSelectedPhoto({
              title: 'Cà Phê Mộc Nguyên Bản',
              caption: 'Từng hạt cà phê nguyên bản chiết xuất đậm đà.',
              src: '/images/coffee.png',
            })
          }
          className="group relative mt-4 -ml-[90px] w-[82%] max-w-[240px] -rotate-4 cursor-pointer overflow-hidden rounded-2xl bg-black/40 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-0 sm:mt-6 sm:max-w-[280px] lg:mt-[90px] lg:max-w-[350px]"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <img
              src="/images/coffee.png"
              alt="Cà Phê Mộc Nguyên Bản"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        </div>
      </div>

      {/* Center Column: Big Bold Title + Narrative Paragraph */}
      <div className="-mt-[320px] -ml-[60px] py-2 text-left sm:py-4 md:col-span-5 md:col-start-5">
        <h2 className="font-title mb-6 text-3xl leading-tight font-bold tracking-widest text-[#FAF8F5] uppercase sm:mb-8 sm:text-5xl lg:text-6xl">
          <span className="block whitespace-nowrap">HƯƠNG VỊ</span>
          <span className="block whitespace-nowrap">TỪ</span>
          <span className="block whitespace-nowrap">NGUYÊN BẢN</span>
        </h2>
        <p className="max-w-xl font-sans text-sm leading-relaxed font-light text-[#FAF8F5]/80 sm:text-base md:leading-loose">
          Từng giọt cà phê ExoCafe được chắt chiu từ những nông trại nhiệt đới rực
          nắng, nơi thổ nhưỡng trù phú và tâm huyết tỉ mỉ của người nông dân tạo
          nên nguồn hương vị đậm đà nguyên bản nhất.
        </p>
      </div>

      {/* Right Column: Tilted Harvest Photo (Horizontally Level with Left Photo) */}
      <div className="mt-8 sm:mt-12 md:col-span-3 md:col-start-10 md:mt-24 lg:-mt-[590px]">
        <div
          onClick={() =>
            setSelectedPhoto({
              title: 'Thu Hoạch Nông Trại Nhiệt Đới',
              caption: 'Cận cảnh hạt cà phê chín đỏ trên vùng trồng nhiệt đới.',
              src: '/images/space5.jpg',
            })
          }
          className="group relative rotate-5 cursor-pointer overflow-hidden rounded-2xl bg-black/40 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-0"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <img
              src="/images/space5.jpg"
              alt="Thu Hoạch Nông Trại Nhiệt Đới"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        </div>
      </div>
    </div>
  )
})

OriginStory.displayName = 'OriginStory'

export default OriginStory
