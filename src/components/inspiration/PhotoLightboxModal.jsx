export default function PhotoLightboxModal({ selectedPhoto, onClose }) {
  if (!selectedPhoto) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl bg-[#2D2520] p-4 shadow-2xl border border-white/10"
      >
        <img
          src={selectedPhoto.src}
          alt={selectedPhoto.title}
          className="max-h-[75vh] w-full object-contain rounded-2xl"
        />
        <div className="mt-4 text-center px-4 py-2">
          <h3 className="font-title text-lg font-bold tracking-wider text-brand-accent uppercase mb-1">
            {selectedPhoto.title}
          </h3>
          <p className="font-sans text-sm font-light text-white/80">
            {selectedPhoto.caption}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-[#C84928]"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
