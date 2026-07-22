'use client'

import { useState, useEffect, useCallback } from 'react'
import Picture from '@/components/Picture'
import Icon from '@/components/Icon'

type ImageCarouselProps = {
  images: string[]
  initialIndex: number
  title: string
  onClose: () => void
}

export default function ImageCarousel({ images, initialIndex, title, onClose }: ImageCarouselProps) {
  const [index, setIndex] = useState(initialIndex)
  const showArrows = images.length > 1

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // Clavier : ← → pour naviguer, Échap pour fermer
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, prev, next])

  return (
    // Overlay semi-transparent — clic dessus ferme le carousel
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Diaporama des photos"
    >
      {/* Conteneur image — stoppe la propagation pour ne pas fermer en cliquant sur l'image */}
      <div
        className="relative w-full max-w-[900px] h-[60vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Picture fill src={images[index]} alt={`${title} — photo ${index + 1}`} />

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le diaporama"
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-grey-light transition-colors cursor-pointer"
        >
          <Icon name="close" size={18} />
        </button>

        {/* Flèche gauche */}
        {showArrows && (
          <button
            type="button"
            onClick={prev}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-grey-light transition-colors cursor-pointer"
          >
            <Icon name="back" size={18} />
          </button>
        )}

        {/* Flèche droite — même icône retournée 180° */}
        {showArrows && (
          <button
            type="button"
            onClick={next}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-grey-light transition-colors cursor-pointer"
          >
            <Icon name="back" size={18} className="rotate-180" />
          </button>
        )}

        {/* Compteur "2 / 5" */}
        {showArrows && (
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-body-sm px-3 py-1 rounded-full select-none">
            {index + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  )
}
