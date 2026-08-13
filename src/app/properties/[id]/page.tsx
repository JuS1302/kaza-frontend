import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPropertyById } from '@/lib/api'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Tag from '@/components/Tag'
import Picture from '@/components/Picture'
import PropertyImages from '@/components/PropertyImages'
import ContactButton from '@/components/ContactButton'

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kasa.fr'

export default async function PropertyPage({ params }: Props) {
  const { id } = await params
  const property = await getPropertyById(id).catch(() => null)
  if (!property) return notFound()

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.title,
    description: property.description,
    image: property.pictures[0],
    address: property.location,
    url: `${SITE_URL}/properties/${property.id}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: property.rating,
      bestRating: '5',
      ratingCount: '1',
    },
    host: {
      '@type': 'Person',
      name: property.host.name,
      image: property.host.picture,
    },
  }

  return (
    <div className="px-4 md:px-8 lg:px-0 pt-6 md:pt-25 pb-10 max-w-[971px] mx-auto flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Bouton retour */}
      <Button variant="light" href="/" icon={<Icon name="back" size={14} alt="" />} className="px-4 w-fit text-grey-dark">
        Retour aux annonces
      </Button>

      {/* Disposition principale : colonne gauche + colonne hôte */}
      <div className="flex flex-col lg:flex-row gap-[10px]">

        {/* Colonne gauche : images + contenu */}
        <div className="flex flex-col gap-[10px] flex-1 min-w-0">

          {/* Grille d'images cliquable — ouvre le carousel au clic */}
          <PropertyImages images={property.pictures} title={property.title} />

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
        <div className="lg:w-[345px] lg:self-start bg-white rounded-[10px] p-6 flex flex-col gap-2 flex-shrink-0">
          <h2 className="text-base font-medium text-black">Votre hôte</h2>
          <div className="flex items-center gap-[18px] py-4">
            <div className="relative w-[82px] h-[82px] overflow-hidden flex-shrink-0">
              <Picture fill src={property.host.picture} alt={property.host.name} />
            </div>
            <p className="text-base text-black">{property.host.name}</p>
            <div className="flex items-center gap-1 bg-grey-light rounded-[10px] px-2 py-2">
              <Icon name="star" size={19} alt="Note" />
              <span className="text-base text-black">{property.rating}</span>
            </div>
          </div>
          <div className="w-fit lg:w-full">
            <ContactButton />
          </div>
        </div>
      </div>
    </div>
  )
}
