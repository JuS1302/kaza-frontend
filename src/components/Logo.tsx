import Image from 'next/image'
import Link from 'next/link'

// Affiche le logo complet (desktop) ou juste le picto maison (mobile)
type LogoProps = {
  variant?: 'full' | 'picto'
  width?: number
  height?: number
}

export default function Logo({ variant = 'full', width, height }: LogoProps) {
  const src = variant === 'picto' ? '/icons/picto.svg' : '/icons/logo.svg'
  const w = width ?? (variant === 'picto' ? 40 : 120)
  const h = height ?? 40

  return (
    <Link href="/">
      <Image src={src} alt="Kasa" width={w} height={h} />
    </Link>
  )
}
