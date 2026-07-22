'use client'

import PropertyCard from './PropertyCard'
import { useFavorites } from '@/hooks/useFavorites'
import type { Property } from '@/lib/api'

/** Grille des logements favoris — filtre en temps réel depuis localStorage */
export default function FavoritesGrid({ properties }: { properties: Property[] }) {
  const { favorites, toggleFavorite } = useFavorites()

  const favoriteProperties = properties.filter(p => favorites.has(p.id))

  if (favoriteProperties.length === 0) {
    return (
      <p className="text-body-sm text-grey-dark">
        Vous n&apos;avez pas encore de logements favoris. Parcourez les annonces et cliquez sur le cœur pour en ajouter.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favoriteProperties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          price={property.price_per_night}
          isFavorite={true}
          onToggleFavorite={() => toggleFavorite(property.id)}
        />
      ))}
    </div>
  )
}
