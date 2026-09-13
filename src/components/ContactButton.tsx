'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'

type ContactButtonProps = {
  propertyId: string
}

export default function ContactButton({ propertyId }: ContactButtonProps) {
  const router = useRouter()

  function handleClick() {
    const token = localStorage.getItem('kasa_token')
    const target = `/messages?propertyId=${propertyId}`
    router.push(token ? target : `/login?redirect=${encodeURIComponent(target)}`)
  }

  return <Button variant="primary" onClick={handleClick}>Contacter l&apos;hôte</Button>
}
