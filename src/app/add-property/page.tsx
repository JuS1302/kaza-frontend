import type { Metadata } from 'next'
import Icon from '@/components/Icon'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Ajouter un logement',
  description: 'Votre compte doit être validé par la communauté Kasa avant de pouvoir publier une annonce.',
}

export default function AddPropertyPage() {
  return (
    <div className="flex items-center justify-center flex-1 px-4 py-8 md:py-16">
      <div className="w-full max-w-[742px] bg-red-dark text-white rounded-[10px] px-6 py-10 md:px-[100px] md:py-16 flex flex-col items-center gap-4 text-center">
        <Icon name="star" size={40} />
        <h1 className="text-title">Presque prêt à devenir super hôte !</h1>
        <p className="text-body-sm">
          Avant de pouvoir publier votre premier logement, votre compte doit être validé par la communauté Kasa.
          Cette étape nous permet de garantir des annonces fiables et des échanges de confiance entre hôtes et voyageurs.
        </p>
        <p className="text-body-sm">
          Revenez bientôt : vous serez prévenu dès que votre compte sera validé.
        </p>
        <Button variant="light" href="/" className="mt-2">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  )
}
