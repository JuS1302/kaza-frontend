'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import FormInput from '@/components/FormInput'
import Button from '@/components/Button'
import { login } from '@/lib/api'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await login(email, password)
      localStorage.setItem('kasa_token', token)
      router.push(redirect)
    } catch {
      setError('Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center flex-1 px-4 py-16">
      <div className="w-full max-w-[742px] bg-white rounded-[10px] px-[180px] py-20 border border-grey-light flex flex-col gap-[38px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-red-main text-center">Heureux de vous revoir</h1>
          <p className="text-body-sm text-grey-dark text-center">
            Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

          <Button type="submit" variant="primary" className="mx-auto">
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-2 text-body-sm">
          <Link href="/forgot-password" className="text-red-main hover:text-red-dark">
            Mot de passe oublié
          </Link>
          <p className="text-grey-dark">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-red-main font-medium hover:text-red-dark">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
