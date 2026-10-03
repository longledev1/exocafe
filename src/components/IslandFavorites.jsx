import SectionTypographyHeader from './SectionTypographyHeader'

/**
 * IslandFavorites Component
 * Wrapper around SectionTypographyHeader pre-configured with "ISLAND" and "Favorites".
 */
export default function IslandFavorites(props) {
  return (
    <SectionTypographyHeader
      bgText="ISLAND"
      handText="Favorites"
      {...props}
    />
  )
}
