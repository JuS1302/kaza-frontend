import Image from 'next/image'
import { getProperties } from '@/lib/api'
import PropertiesGrid from '@/components/PropertiesGrid'
import RedBlock from '@/components/RedBlock'

export default async function HomePage() {
  const properties = await getProperties()

  return (
    <div className="flex flex-col gap-8 md:gap-10 px-4 md:px-0 pb-6 md:pb-10 max-w-6xl mx-auto">

      {/* Hero — titre + sous-titre au-dessus, image seule en dessous */}
      <section className="flex flex-col">
        <div className="flex flex-col gap-2 pt-10 pb-10 md:py-10 text-center">
          <h1 className="text-title text-red-main">
            Chez vous,<br className="md:hidden" /> partout et ailleurs
          </h1>
          <p className="text-body-sm text-black">
            Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
          </p>
        </div>
        <div className="relative w-full h-[458px] rounded-[20px] overflow-hidden">
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
        <PropertiesGrid properties={properties} />
      </section>

      {/* Comment ça marche ? */}
      <section className="flex flex-col gap-10 bg-white rounded-[10px] py-10 px-2 md:px-10">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-subtitle">Comment ça marche ?</h2>
          <p className="text-body-sm">
            Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,<br className="hidden md:block" />
            Kasa vous aide à trouver un lieu qui vous ressemble.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <RedBlock
            title="Recherchez"
            description="Entrez votre destination, vos dates et laissez Kasa faire le reste."
          />
          <RedBlock
            title="Réservez"
            description="Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés."
          />
          <RedBlock
            title="Vivez l'expérience"
            description="Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout."
          />
        </div>
      </section>

    </div>
  )
}
