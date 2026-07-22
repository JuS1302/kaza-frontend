'use client'

import PropertyCard from './PropertyCard'
import { useFavorites } from '@/hooks/useFavorites'
import type { Property } from '@/lib/api'

/** Grille de propriétés avec gestion des favoris en localStorage */
export default function PropertiesGrid({ properties }: { properties: Property[] }) {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.slice(0, 12).map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          price={property.price_per_night}
          isFavorite={favorites.has(property.id)}
          onToggleFavorite={() => toggleFavorite(property.id)}
        />
      ))}
    </div>
  )
}
