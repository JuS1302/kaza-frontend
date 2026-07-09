import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-10 py-2 border-t border-grey-light bg-white">
      <Logo variant="picto" />
      <p className="text-caption text-grey-dark">© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}
