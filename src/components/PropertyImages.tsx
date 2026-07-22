'use client'

import { useState } from 'react'
import Picture from '@/components/Picture'
import ImageCarousel from '@/components/ImageCarousel'

type PropertyImagesProps = {
  images: string[]
  title: string
}

export default function PropertyImages({ images, title }: PropertyImagesProps) {
  // null = carousel fermé ; un nombre = index de l'image cliquée
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null)

  const mainImage = images[0]
  const smallImages = images.slice(1, 5)

  if (!mainImage) return null

  return (
    <>
      {/* Desktop : 1 grande image à gauche + grille 2×2 à droite */}
      <div className="hidden md:flex gap-[10px]">
        <button
          type="button"
          onClick={() => setCarouselIndex(0)}
          aria-label="Ouvrir le diaporama — photo 1"
          className="relative w-[303px] h-[357px] rounded-[10px] overflow-hidden flex-shrink-0 cursor-pointer"
        >
          <Picture fill src={mainImage} alt={title} />
        </button>

        <div className="flex flex-col gap-[10px] flex-1">
          <div className="flex gap-[10px] flex-1">
            {smallImages.slice(0, 2).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCarouselIndex(i + 1)}
                aria-label={`Ouvrir le diaporama — photo ${i + 2}`}
                className="relative flex-1 h-[174px] rounded-[10px] overflow-hidden cursor-pointer"
              >
                <Picture fill src={src} alt={`Photo ${i + 2}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-[10px] flex-1">
            {smallImages.slice(2, 4).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCarouselIndex(i + 3)}
                aria-label={`Ouvrir le diaporama — photo ${i + 4}`}
                className="relative flex-1 h-[174px] rounded-[10px] overflow-hidden cursor-pointer"
              >
                <Picture fill src={src} alt={`Photo ${i + 4}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile : 1 grande image + rangée de 4 petites */}
      <div className="md:hidden flex flex-col gap-[10px]">
        <button
          type="button"
          onClick={() => setCarouselIndex(0)}
          aria-label="Ouvrir le diaporama — photo 1"
          className="relative w-full h-[422px] rounded-[10px] overflow-hidden cursor-pointer"
        >
          <Picture fill src={mainImage} alt={title} />
        </button>
        <div className="flex gap-2">
          {smallImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCarouselIndex(i + 1)}
              aria-label={`Ouvrir le diaporama — photo ${i + 2}`}
              className="relative flex-1 h-[109px] rounded-[6px] overflow-hidden cursor-pointer"
            >
              <Picture fill src={src} alt={`Photo ${i + 2}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Modal carousel — affiché quand carouselIndex n'est pas null */}
      {carouselIndex !== null && (
        <ImageCarousel
          images={images}
          initialIndex={carouselIndex}
          title={title}
          onClose={() => setCarouselIndex(null)}
        />
      )}
    </>
  )
}
