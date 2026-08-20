import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Composants/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Logo>

export const Complet: Story = {
  args: { variant: 'full' },
}

export const Picto: Story = {
  args: { variant: 'picto' },
}
