import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import RedBlock from './RedBlock'

const meta: Meta<typeof RedBlock> = {
  title: 'Composants/RedBlock',
  component: RedBlock,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof RedBlock>

export const SansIcone: Story = {
  args: {
    title: 'Bienvenue sur Kasa',
    description: 'Trouvez le logement idéal parmi nos annonces de particuliers.',
  },
}

export const AvecIcone: Story = {
  args: {
    icon: 'location',
    title: 'Localisation',
    description: 'Trouvez des logements près de chez vous.',
  },
}
