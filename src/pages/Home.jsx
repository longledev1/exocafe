import SpaceBanner from '../components/SpaceBanner'
import TropicalAllDay from '../components/TropicalAllDay'
import SweetSection from '../components/SweetSection'
import IslandFavorites from '../components/IslandFavorites'
import EllipticalMenu from '../components/EllipticalMenu'
import SectionTypographyHeader from '../components/SectionTypographyHeader'
import SpaceGallery from '../components/SpaceGallery'

export default function Home() {
  return (
    <div>
      <SpaceBanner />
      <TropicalAllDay />
      <SweetSection />
      <SectionTypographyHeader bgText="PARADISE" handText="favorites" />{' '}
      <EllipticalMenu />
      <SectionTypographyHeader bgText="SERENITY" handText="moments" />{' '}
      <SpaceGallery />
    </div>
  )
}
