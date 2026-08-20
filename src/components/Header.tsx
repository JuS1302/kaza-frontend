'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import Icon from '@/components/Icon'

// Lit le token dans localStorage et se met à jour quand on dispatch 'kasa-auth-change'
function subscribeToAuth(callback: () => void) {
  window.addEventListener('kasa-auth-change', callback)
  return () => window.removeEventListener('kasa-auth-change', callback)
}

export default function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  // useSyncExternalStore : hook React pour lire une valeur extérieure à React (ici localStorage)
  // et se mettre à jour automatiquement quand elle change
  const isLoggedIn = useSyncExternalStore(
    subscribeToAuth,                               // 1. comment écouter les changements (événement kasa-auth-change)
    () => !!localStorage.getItem('kasa_token'),    // 2. valeur côté navigateur : true si token présent, false sinon
    () => false                                    // 3. valeur côté serveur (localStorage n'existe pas côté serveur)
  )

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function goTo(path: string) {
    router.push(isLoggedIn ? path : `/login?redirect=${path}`)
    setMenuOpen(false)
  }

  function handleLogout() {
    localStorage.removeItem('kasa_token')
    window.dispatchEvent(new Event('kasa-auth-change'))
    setMenuOpen(false)
    router.push('/')
  }

  return (
    <header className="w-full sticky top-0 z-40 bg-white md:static md:bg-transparent md:pt-10">
      {/* Desktop */}
      <nav className="hidden md:flex items-center w-full max-w-[960px] mx-auto rounded-[10px] px-8 lg:px-[100px] py-2 bg-white shadow-nav">
        <div className="flex-1 flex gap-5">
          <Link href="/" className="text-body-sm hover:text-red-main">Accueil</Link>
          <Link href="/about" className="text-body-sm hover:text-red-main">À propos</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-body-sm text-red-main hover:text-red-dark">
              Se déconnecter
            </button>
          ) : (
            <Link href="/login" className="text-body-sm hover:text-red-main">Se connecter</Link>
          )}
        </div>
        <Logo variant="full" ariaHidden />
        <div className="flex-1 flex items-center justify-end gap-[34px]">
          <button onClick={() => goTo('/add-property')} className="text-body-sm text-red-main hover:text-red-dark">
            +Ajouter un logement
          </button>
          <div className="flex items-center gap-2">
            <Link href="/favorites">
              <Icon name="heart" size={20} alt="Favoris" />
            </Link>
            <span className="block w-px h-1.25 bg-red-main" aria-hidden="true" />
            <button onClick={() => goTo('/messages')} aria-label="Messagerie">
              <Icon name="message" size={20} alt="Messagerie" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile - barre du haut (toujours visible) */}
      <nav className="flex md:hidden items-center justify-between px-4 py-4">
        <Logo variant="picto" width={46} height={53} />
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Icon name="menu" size={45} />
        </button>
      </nav>

      {/* Mobile - overlay plein écran */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 bg-white z-50 flex flex-col md:hidden" role="dialog" aria-modal="true" aria-label="Menu de navigation">
          {/* En-tête de l'overlay : logo + croix */}
          <div className="flex items-center justify-between px-4 py-4">
            <Logo variant="picto" width={46} height={53} />
            <button onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">
              <Icon name="close" size={45} />
            </button>
          </div>

          {/* Liens de navigation */}
          <div className="flex flex-col px-4 pt-4">
            <Link href="/" className="text-menu py-6" onClick={() => setMenuOpen(false)}>Accueil</Link>
            <hr className="border-grey-light" />
            <Link href="/about" className="text-menu py-6" onClick={() => setMenuOpen(false)}>À propos</Link>
            <hr className="border-grey-light" />
            <button onClick={() => goTo('/messages')} className="text-menu py-6 text-left">Messagerie</button>
            <hr className="border-grey-light" />
            <Link href="/favorites" className="text-menu py-6" onClick={() => setMenuOpen(false)}>Favoris</Link>
            <hr className="border-grey-light" />
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-menu py-6 text-left text-red-main">
                Se déconnecter
              </button>
            ) : (
              <Link href="/login" className="text-menu py-6" onClick={() => setMenuOpen(false)}>Se connecter</Link>
            )}
            <Button
              variant="primary"
              onClick={() => goTo('/add-property')}
              className="mt-4 self-start"
            >
              Ajouter un logement
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
