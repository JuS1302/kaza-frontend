import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import ImageCarousel from './ImageCarousel'

const images = [
  'https://picsum.photos/900/600?random=1',
  'https://picsum.photos/900/600?random=2',
  'https://picsum.photos/900/600?random=3',
]

const meta: Meta<typeof ImageCarousel> = {
  title: 'Composants/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof ImageCarousel>

export const PlusieursImages: Story = {
  args: {
    images,
    initialIndex: 0,
    title: 'Appartement Paris',
    onClose: fn(),
  },
}

export const ImageUnique: Story = {
  args: {
    images: [images[0]],
    initialIndex: 0,
    title: 'Appartement Paris',
    onClose: fn(),
  },
}
