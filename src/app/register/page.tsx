import type { Metadata } from 'next'
import { Suspense } from 'react'
import RegisterForm from '@/components/RegisterForm'

export const metadata: Metadata = {
  title: 'Inscription',
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
