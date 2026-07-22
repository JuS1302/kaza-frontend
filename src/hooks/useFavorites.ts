'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'kasa_favorites'

/**
 * Gère la liste des logements favoris avec persistance dans localStorage.
 * Démarre vide pour que le rendu serveur et client soient identiques (évite l'erreur d'hydration).
 * @returns favorites - Set des IDs favoris, toggleFavorite - fonction pour ajouter/retirer
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Lecture localStorage uniquement côté client, après l'hydration
    function loadFavorites() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setFavorites(new Set(JSON.parse(stored)))
    }
    loadFavorites()
  }, [])

  /** Ajoute l'ID aux favoris s'il n'y est pas, le retire sinon */
  function toggleFavorite(id: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }

  return { favorites, toggleFavorite }
}
