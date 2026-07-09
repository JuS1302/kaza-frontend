import Image from 'next/image'
import Link from 'next/link'

// Affiche le logo complet (desktop) ou juste le picto maison (mobile)
type LogoProps = {
  variant?: 'full' | 'picto'
}

export default function Logo({ variant = 'full' }: LogoProps) {
  const src = variant === 'picto' ? '/icons/picto.svg' : '/icons/logo.svg'
  const width = variant === 'picto' ? 40 : 120
  const height = 40

  return (
    <Link href="/">
      <Image src={src} alt="Kasa" width={width} height={height} />
    </Link>
  )
}
