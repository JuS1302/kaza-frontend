'use client'

import { useState, useEffect } from 'react'
import PropertyCard from './PropertyCard'
import type { Property } from '@/lib/api'

const STORAGE_KEY = 'kasa_favorites'

/** Grille de propriétés avec gestion des favoris en localStorage */
export default function PropertiesGrid({ properties }: { properties: Property[] }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Lecture des favoris sauvegardés au montage du composant
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setFavorites(new Set(JSON.parse(stored)))
  }, [])

  /** Ajoute ou retire un logement des favoris */
  function toggleFavorite(id: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }

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
