import Image from 'next/image'
import { getProperties } from '@/lib/api'
import PropertyCard from '@/components/PropertyCard'
import RedBlock from '@/components/RedBlock'

export default async function HomePage() {
  const properties = await getProperties()

  return (
    <div className="flex flex-col gap-8 md:gap-10 px-4 md:px-8 pb-6 md:pb-10 max-w-6xl mx-auto">

      {/* Hero — titre + sous-titre au-dessus, image seule en dessous */}
      <section className="flex flex-col">
        <div className="flex flex-col gap-2 md:gap-2 pt-[50px] pb-10 md:py-10 text-center">
          <h1 className="text-title text-red-main">
            Chez vous,<br className="md:hidden" /> partout et ailleurs
          </h1>
          <p className="text-body-sm text-black">
            Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
          </p>
        </div>
        <div className="relative w-full h-[458px] md:h-100 rounded-[20px] md:rounded-[10px] overflow-hidden">
          <Image
            src="/images/hero home.jpg"
            alt="Chez vous, partout et ailleurs"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Grille de propriétés */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.slice(0, 12).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              price={property.price_per_night}
            />
          ))}
        </div>
      </section>

      {/* Comment ça marche ? */}
      <section className="flex flex-col gap-6 md:gap-8 bg-white rounded-[10px] py-8 px-4 md:py-12 md:px-8">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-subtitle">Comment ça marche ?</h2>
          <p className="text-body-sm">
            Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,<br className="hidden md:block" />
            Kasa vous aide à trouver un lieu qui vous ressemble.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RedBlock
            title="Réservation"
            description="Trouvez le logement idéal et réservez en quelques clics, en toute simplicité."
          />
          <RedBlock
            title="Découvrez"
            description="Explorez des logements uniques et authentiques partout en France."
          />
          <RedBlock
            title="Hôtes responsables"
            description="Des hôtes vérifiés et engagés pour vous garantir un séjour inoubliable."
          />
        </div>
      </section>

    </div>
  )
}
