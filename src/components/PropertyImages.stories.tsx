import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PropertyImages from './PropertyImages'

const images = [
  'https://picsum.photos/900/600?random=10',
  'https://picsum.photos/900/600?random=11',
  'https://picsum.photos/900/600?random=12',
  'https://picsum.photos/900/600?random=13',
  'https://picsum.photos/900/600?random=14',
]

const meta: Meta<typeof PropertyImages> = {
  title: 'Composants/PropertyImages',
  component: PropertyImages,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof PropertyImages>

export const CinqImages: Story = {
  args: {
    images,
    title: 'Appartement Paris',
  },
}

export const ImageUnique: Story = {
  args: {
    images: [images[0]],
    title: 'Appartement Paris',
  },
}
