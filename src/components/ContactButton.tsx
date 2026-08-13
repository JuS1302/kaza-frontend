'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'

export default function ContactButton() {
  const router = useRouter()

  function handleClick() {
    const token = localStorage.getItem('kasa_token')
    router.push(token ? '/messages' : '/login?redirect=/messages')
  }

  return <Button variant="primary" onClick={handleClick}>Contacter l&apos;hôte</Button>
}
