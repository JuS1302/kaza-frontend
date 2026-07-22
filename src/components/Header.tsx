'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Button from '@/components/Button'
import Icon from '@/components/Icon'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="w-full sticky top-0 z-40 bg-white md:static md:bg-transparent md:pt-10">
      {/* Desktop */}
      <nav className="hidden md:flex items-center justify-between w-[782px] mx-auto rounded-[10px] px-[100px] py-2 gap-5 bg-white shadow-nav">
        <div className="flex gap-5">
          <Link href="/" className="text-body-sm hover:text-red-main">Accueil</Link>
          <Link href="/about" className="text-body-sm hover:text-red-main">À propos</Link>
        </div>
        <Logo variant="full" />
        <div className="flex items-center gap-[34px]">
          <Link href="/add-property" className="text-body-sm text-red-main">+Ajouter un logement</Link>
          <div className="flex items-center gap-2">
            <Link href="/favorites">
              <Icon name="heart" size={20} alt="Favoris" />
            </Link>
            <span className="block w-px h-1.25 bg-red-main" aria-hidden="true" />
            <Link href="/messages">
              <Icon name="message" size={20} alt="Messagerie" />
            </Link>
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
            <Link href="/messages" className="text-menu py-6" onClick={() => setMenuOpen(false)}>Messagerie</Link>
            <hr className="border-grey-light" />
            <Link href="/favorites" className="text-menu py-6" onClick={() => setMenuOpen(false)}>Favoris</Link>
            <Button
              variant="primary"
              href="/add-property"
              onClick={() => setMenuOpen(false)}
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
