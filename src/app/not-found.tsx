import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page introuvable',
}

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-6 py-20">
      <h1 className="text-title text-red-main">404</h1>
      <p className="text-body-sm text-grey-dark">Cette page n&apos;existe pas.</p>
      <Link href="/" className="text-label text-red-main underline hover:text-red-dark">
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}
