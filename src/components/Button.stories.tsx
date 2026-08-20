// On importe les types Storybook et le vrai composant Button
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Button from './Button'

// La configuration générale ("carte d'identité" du composant dans Storybook)
const meta: Meta<typeof Button> = {
  title: 'Composants/Button',        // où il apparaît dans le menu de Storybook
  component: Button,                  // quel composant on documente
  tags: ['autodocs'],                 // génère une page de doc automatiquement
  parameters: { layout: 'centered' }, // affiche le composant centré dans le canvas
}
export default meta

// Type TypeScript : une Story doit avoir les mêmes props que Button
type Story = StoryObj<typeof Button>

// Chaque "export const" = une variante visible dans Storybook
// "args" = les props qu'on passe au composant, comme : <Button variant="primary">Se connecter</Button>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Se connecter' },
}

export const Dark: Story = {
  args: { variant: 'dark', children: 'Confirmer' },
}

export const Light: Story = {
  args: { variant: 'light', children: 'Annuler' },
}

// Quand on passe un href, le Button devient un lien (<a>) au lieu d'un <button>
export const EnLien: Story = {
  args: { variant: 'primary', children: 'Voir les logements', href: '/' },
}
