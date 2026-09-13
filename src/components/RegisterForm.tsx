'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import FormInput from '@/components/FormInput'
import Button from '@/components/Button'
import { register } from '@/lib/api'

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await register(`${firstName} ${lastName}`.trim(), email, password)
      localStorage.setItem('kasa_token', token)
      window.dispatchEvent(new Event('kasa-auth-change'))
      router.push(redirect)
    } catch (err) {
      // On affiche le message précis renvoyé par l'API (plus utile qu'un message générique pour comprendre le blocage)
      setError(err instanceof Error ? err.message : 'Impossible de créer le compte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center flex-1 px-4 py-8 md:py-16">
      <div className="w-full max-w-[742px] bg-white rounded-[10px] px-6 py-10 md:px-[180px] md:py-20 border border-grey-light flex flex-col gap-[38px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-red-main text-center">Rejoignez Kasa</h1>
          <p className="text-body-sm text-grey-dark text-center">
            Créez votre compte pour réserver vos prochains séjours et échanger avec nos hôtes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormInput
            label="Prénom"
            name="firstName"
            value={firstName}
            onChange={setFirstName}
          />
          <FormInput
            label="Nom"
            name="lastName"
            value={lastName}
            onChange={setLastName}
          />
          <FormInput
            label="Adresse email"
            type="email"
            name="email"
            value={email}
            onChange={setEmail}
          />
          <FormInput
            label="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={setPassword}
          />

          {error && <p className="text-red-main text-body-sm">{error}</p>}

          <Button type="submit" variant="primary" className="w-full md:w-auto md:mx-auto">
            {loading ? 'Création du compte...' : 'Créer mon compte'}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-2 text-body-sm">
          <p className="text-grey-dark">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-red-main font-medium hover:text-red-dark">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
