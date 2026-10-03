import { forwardRef } from 'react'

export const TILTED_STORY_PHOTOS = [
  {
    id: 1,
    title: 'Nghệ Thuật Barista',
    caption: 'Tách cà phê Latte Art ấm áp khởi đầu ngày mới.',
    src: '/images/coffee.png',
    rotateClass: '-rotate-2 sm:-rotate-3',
    colClass: 'md:col-span-4 md:col-start-1',
    mtClass: 'md:mt-0',
  },
  {
    id: 2,
    title: 'Hạt Rang Nóng Hổi',
    caption: 'Mẻ hạt cà phê rang thủ công tỉ mỉ, lan tỏa hương thơm.',
    src: '/images/space3.png',
    rotateClass: 'rotate-2 sm:rotate-3',
    colClass: 'md:col-span-4 md:col-start-9',
    mtClass: 'md:mt-56',
  },
  {
    id: 3,
    title: 'Bánh Ngọt Tươi Mới',
    caption: 'Bánh pastry thủ công hòa quyện vị ngọt thanh trái cây.',
    src: '/images/cake1.png',
    rotateClass: 'rotate-2 sm:rotate-2',
    colClass: 'md:col-span-4 md:col-start-1',
    mtClass: 'md:mt-48 lg:mt-64',
  },
  {
    id: 4,
    title: 'Mảng Xanh Nhiệt Đới',
    caption: 'Sắc hoa tươi & vạt lá mộc mạc kết nối tự nhiên.',
    src: '/images/space8.jpg',
    rotateClass: '-rotate-2 sm:-rotate-3',
    colClass: 'md:col-span-4 md:col-start-9',
    mtClass: 'md:mt-96 lg:mt-[440px]',
  },
]

const TiltedStoryGallery = forwardRef(
  ({ setSelectedPhoto, storyHeaderRef }, ref) => {
    return (
      <>
        {/* Header Block: Title & Narrative Paragraph */}
        <div ref={storyHeaderRef} className="max-w-2xl mb-24 md:mb-32">
          <h2 className="font-title text-3xl font-bold tracking-widest text-[#FAF8F5] uppercase sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            TỪ HẠT ĐẾN TÁCH
          </h2>
          <p className="font-sans text-sm font-light leading-relaxed text-[#FAF8F5]/80 sm:text-base md:leading-loose">
            Mỗi tách cà phê ExoCafe là kết tinh của một hành trình nguyên bản từ
            những nông trại nhiệt đới rực nắng, từng mẻ hạt rang xay tỉ mỉ thủ
            công, cho đến khoảnh khắc bọt sữa sánh mịn quyện hòa từ đôi tay khéo
            léo của người thợ barista.
          </p>
        </div>

        {/* Asymmetric Tilted Photo Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-y-36 lg:gap-y-48"
        >
          {TILTED_STORY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className={`${photo.colClass} ${photo.mtClass}`}
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative overflow-hidden rounded-2xl bg-black/40 shadow-2xl transition-all duration-500 cursor-pointer ${photo.rotateClass} hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl`}
              >
                {/* Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                {/* Subtle Caption Under Photo */}
                <div className="p-4 sm:p-5 bg-[#2B231E]/90 backdrop-blur-sm">
                  <h4 className="font-title text-xs font-bold tracking-widest text-brand-accent uppercase sm:text-sm mb-1">
                    {photo.title}
                  </h4>
                  <p className="font-sans text-xs font-light leading-relaxed text-[#FAF8F5]/75">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
)

TiltedStoryGallery.displayName = 'TiltedStoryGallery'

export default TiltedStoryGallery
