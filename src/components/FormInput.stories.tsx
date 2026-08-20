import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import FormInput from './FormInput'

const meta: Meta<typeof FormInput> = {
  title: 'Composants/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof FormInput>

export const Texte: Story = {
  args: { label: 'Nom', type: 'text', placeholder: 'Votre nom' },
}

export const Email: Story = {
  args: { label: 'Adresse email', type: 'email', placeholder: 'exemple@email.com' },
}

export const MotDePasse: Story = {
  args: { label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
}

export const Textarea: Story = {
  args: { label: 'Description', type: 'textarea', placeholder: 'Décrivez votre logement...' },
}

export const Checkbox: Story = {
  args: { label: 'Accepter les conditions', type: 'checkbox', checked: false },
}

export const AvecBoutonAjouter: Story = {
  args: { label: 'Équipement', placeholder: 'Ex : Wi-Fi', onAdd: fn() },
}
