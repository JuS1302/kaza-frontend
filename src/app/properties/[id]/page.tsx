import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPropertyById } from '@/lib/api'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Tag from '@/components/Tag'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const property = await getPropertyById(id).catch(() => null)
  if (!property) return { title: 'Logement introuvable' }
  return {
    title: property.title,
    description: property.description,
  }
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params
  const property = await getPropertyById(id).catch(() => null)
  if (!property) return notFound()

  const mainImage = property.pictures[0] ?? property.cover
  const smallImages = property.pictures.slice(1, 5)

  return (
    <div className="px-4 md:px-0 pt-25 pb-10 max-w-[971px] mx-auto flex flex-col gap-6">

      {/* Bouton retour */}
      <Button variant="light" href="/" icon={<Icon name="back" size={14} alt="" />} className="px-4 w-fit text-grey-dark">
        Retour aux annonces
      </Button>

      {/* Disposition principale : colonne gauche + colonne hôte */}
      <div className="flex flex-col md:flex-row gap-[10px]">

        {/* Colonne gauche : images + contenu */}
        <div className="flex flex-col gap-[10px] flex-1 min-w-0">

          {/* Grille d'images desktop : 1 grande à gauche + 2x2 à droite */}
          <div className="hidden md:flex gap-[10px]">
            <div className="relative w-[303px] h-[357px] rounded-[10px] overflow-hidden flex-shrink-0">
              <Image src={mainImage} alt={property.title} fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-[10px] flex-1">
              <div className="flex gap-[10px] flex-1">
                {smallImages.slice(0, 2).map((src, i) => (
                  <div key={i} className="relative flex-1 h-[174px] rounded-[10px] overflow-hidden">
                    <Image src={src} alt={`Photo ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex gap-[10px] flex-1">
                {smallImages.slice(2, 4).map((src, i) => (
                  <div key={i} className="relative flex-1 h-[174px] rounded-[10px] overflow-hidden">
                    <Image src={src} alt={`Photo ${i + 4}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grille d'images mobile : 1 grande + 4 petites en ligne */}
          <div className="md:hidden flex flex-col gap-[10px]">
            <div className="relative w-full h-[422px] rounded-[10px] overflow-hidden">
              <Image src={mainImage} alt={property.title} fill className="object-cover" />
            </div>
            <div className="flex gap-2">
              {smallImages.map((src, i) => (
                <div key={i} className="relative flex-1 h-[109px] rounded-[6px] overflow-hidden">
                  <Image src={src} alt={`Photo ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Carte de contenu : titre, localisation, description, équipements, catégories */}
          <div className="bg-white rounded-[10px] p-6 flex flex-col gap-10">

            {/* Titre + localisation + description */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-subtitle text-black">{property.title}</h1>
                <div className="flex items-center gap-2">
                  <Icon name="location" size={16} alt="Localisation" />
                  <span className="text-body-sm text-grey-dark">{property.location}</span>
                </div>
              </div>
              <p className="text-body-sm text-black">{property.description}</p>
            </div>

            {/* Équipements */}
            <div className="flex flex-col gap-4">
              <h2 className="text-body-sm font-medium text-black">Équipements</h2>
              <div className="flex flex-wrap gap-2">
                {property.equipments.map((eq) => (
                  <Tag key={eq} label={eq} />
                ))}
              </div>
            </div>

            {/* Catégories */}
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-body-sm font-medium text-black">Catégorie</h2>
              <div className="flex flex-wrap gap-[18px]">
                {property.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carte hôte : à droite sur desktop, en bas sur mobile */}
        <div className="md:w-[345px] md:self-start bg-white rounded-[10px] p-6 flex flex-col gap-2 flex-shrink-0">
          <h2 className="text-base font-medium text-black">Votre hôte</h2>
          <div className="flex items-center gap-[18px] py-4">
            <div className="relative w-[82px] h-[82px] rounded-[10px] overflow-hidden flex-shrink-0">
              <Image
                src={property.host.picture}
                alt={property.host.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-base text-black">{property.host.name}</p>
            <div className="flex items-center gap-1 bg-grey-light rounded-[10px] px-2 py-2">
              <Icon name="star" size={19} alt="Note" />
              <span className="text-base text-black">{property.rating}</span>
            </div>
          </div>
          <Button variant="primary" href="/messages">Contacter l&apos;hôte</Button>
          <Button variant="primary" href="/messages">Envoyer un message</Button>
        </div>
      </div>
    </div>
  )
}
