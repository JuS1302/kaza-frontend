import type { Metadata } from 'next'
import { getProperties } from '@/lib/api'
import FavoritesGrid from '@/components/FavoritesGrid'

export const metadata: Metadata = {
  title: 'Vos favoris',
  description: 'Retrouvez tous les logements que vous avez aimés sur Kasa.',
}

export default async function FavoritesPage() {
  const properties = await getProperties()

  return (
    <div className="flex flex-col px-4 md:px-0 pb-10 max-w-6xl mx-auto">

      <section className="flex flex-col gap-2 text-center pt-10 pb-10 md:pt-[71px]">
        <h1 className="text-title text-red-main">Vos favoris</h1>
        <p className="text-body-sm text-black">
          Retrouvez ici tous les logements que vous avez aimés.<br />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
        </p>
      </section>

      <FavoritesGrid properties={properties} />

    </div>
  )
}
