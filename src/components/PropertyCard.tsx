'use client'

import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/Icon'
import type { Property } from '@/lib/api'

type PropertyCardProps = {
  property: Property
  price?: number
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export default function PropertyCard({
  property,
  price,
  isFavorite = false,
  onToggleFavorite,
}: PropertyCardProps) {
  return (
    <div className="rounded-[10px] overflow-hidden">

      {/* Image + cœur favoris */}
      <div className="relative h-[376px]">
        <Link href={`/properties/${property.id}`}>
          <Image
            src={property.cover}
            alt={property.title}
            fill
            className="object-cover"
          />
        </Link>
        <button
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className={`absolute top-4 right-4 w-8 h-8 rounded-[5px] flex items-center justify-center ${isFavorite ? 'bg-red-main' : 'bg-grey-light'}`}
        >
          <Icon
            name="grey-heart"
            size={10}
            className={isFavorite ? 'brightness-0 invert' : ''}
          />
        </button>
      </div>

      {/* Zone texte blanche — titre+localisation en haut, prix en bas */}
      <Link
        href={`/properties/${property.id}`}
        className="bg-white h-44 flex flex-col justify-between pt-4 px-6 pb-6"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-body-lg">{property.title}</h3>
          <span className="text-body-sm text-grey-dark">{property.location}</span>
        </div>

        {price !== undefined && (
          <div className="flex items-baseline gap-1">
            <span className="text-label">{price}€</span>
            <span className="text-body-sm text-grey-dark">par nuit</span>
          </div>
        )}
      </Link>

    </div>
  )
}
