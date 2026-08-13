import Image from 'next/image'
import Link from 'next/link'

// Affiche le logo complet (desktop) ou juste le picto maison (mobile)
type LogoProps = {
  variant?: 'full' | 'picto'
  width?: number
  height?: number
  ariaHidden?: boolean
}

export default function Logo({ variant = 'full', width, height, ariaHidden }: LogoProps) {
  const src = variant === 'picto' ? '/icons/picto.svg' : '/icons/logo.svg'
  const w = width ?? (variant === 'picto' ? 40 : 120)
  const h = height ?? 40

  return (
    <Link
      href="/"
      aria-label="Accueil"
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
    >
      <Image src={src} alt="" width={w} height={h} />
    </Link>
  )
}
