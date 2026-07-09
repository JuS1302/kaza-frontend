'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full pt-10">
      {/* Desktop */}
      <nav className="hidden md:flex items-center justify-between w-[782px] mx-auto rounded-[10px] px-[100px] py-2 gap-5 bg-white shadow-nav">
        <div className="flex gap-5">
          <Link href="/" className="text-sm font-normal hover:text-red-main">Accueil</Link>
          <Link href="/about" className="text-sm font-normal hover:text-red-main">À propos</Link>
        </div>
        <Logo variant="full" />
        <div className="flex items-center gap-[34px]">
          <Link href="/add-property" className="text-sm font-normal text-red-main">+Ajouter un logement</Link>
          <div className="flex items-center gap-2">
            <Link href="/favorites">
              <Image src="/icons/heart.svg" alt="Favoris" width={20} height={20} />
            </Link>
            <span className="block w-px h-1.25 bg-red-main" aria-hidden="true" />
            <Link href="/messages">
              <Image src="/icons/message.svg" alt="Messagerie" width={20} height={20} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile - barre du haut */}
      <nav className="flex md:hidden items-center justify-between px-4 py-4">
        <Logo variant="picto" />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <Image
            src={menuOpen ? '/icons/close.svg' : '/icons/menu.svg'}
            alt=""
            width={24}
            height={24}
          />
        </button>
      </nav>

      {/* Mobile - menu ouvert */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-6 gap-6">
          <Link href="/" className="text-body-lg" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <hr className="border-grey-light" />
          <Link href="/about" className="text-body-lg" onClick={() => setMenuOpen(false)}>À propos</Link>
          <hr className="border-grey-light" />
          <Link href="/messages" className="text-body-lg" onClick={() => setMenuOpen(false)}>Messagerie</Link>
          <hr className="border-grey-light" />
          <Link href="/favorites" className="text-body-lg" onClick={() => setMenuOpen(false)}>Favoris</Link>
          <hr className="border-grey-light" />
          <Link
            href="/add-property"
            onClick={() => setMenuOpen(false)}
            className="bg-red-dark text-white text-label px-4 py-2 rounded-full w-fit"
          >
            Ajouter un logement
          </Link>
        </div>
      )}
    </header>
  )
}
