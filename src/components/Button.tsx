import Link from 'next/link'

type ButtonVariant = 'primary' | 'dark' | 'light'

type ButtonProps = {
  variant?: ButtonVariant
  icon?: React.ReactNode
  children?: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

// Couleurs selon la variante Figma
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-red-main text-white',
  dark: 'bg-red-dark text-white',
  light: 'bg-grey-light text-black',
}

export default function Button({
  variant = 'primary',
  icon,
  children,
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const base = `flex items-center justify-center h-9 rounded-[10px] py-2 px-8 text-label ${variantStyles[variant]} ${className}`


  if (href) {
    return (
      <Link href={href} onClick={onClick} className={base}>
        {icon}
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={base}>
      {icon}
      {children}
    </button>
  )
}
