import { forwardRef } from 'react'

const TerracottaCurtain = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[100] bg-[#C84928] shadow-2xl"
      style={{ transform: 'translateX(-100%)' }}
    />
  )
})

TerracottaCurtain.displayName = 'TerracottaCurtain'

export default TerracottaCurtain
