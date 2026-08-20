import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Composants/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Simple: Story = {
  args: { label: 'Paris' },
}

export const AvecSuppression: Story = {
  args: { label: 'Paris', onRemove: fn() },
}
