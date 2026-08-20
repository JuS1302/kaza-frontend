import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ContactButton from './ContactButton'

const meta: Meta<typeof ContactButton> = {
  title: 'Composants/ContactButton',
  component: ContactButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // Active le mock de l'App Router Next.js (nécessaire car le composant utilise useRouter)
    nextjs: { appDirectory: true },
  },
}
export default meta

type Story = StoryObj<typeof ContactButton>

export const Default: Story = {}
