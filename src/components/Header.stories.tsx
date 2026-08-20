import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Composants/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Active le mock de l'App Router Next.js (nécessaire car le composant utilise useRouter)
    nextjs: { appDirectory: true },
  },
}
export default meta

type Story = StoryObj<typeof Header>

export const Desktop: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}
