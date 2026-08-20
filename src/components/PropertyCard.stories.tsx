import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import PropertyCard from './PropertyCard'

const mockProperty = {
  id: '1',
  title: 'Appartement lumineux à Paris',
  location: 'Paris, France',
  cover: 'https://picsum.photos/400/376',
  pictures: ['https://picsum.photos/400/376'],
  description: 'Bel appartement au cœur de Paris.',
  rating: '4',
  host: { name: 'Marie D.', picture: 'https://picsum.photos/40/40' },
  equipments: ['Wi-Fi', 'Cuisine'],
  tags: ['Calme', 'Lumineux'],
  price_per_night: 85,
}

const meta: Meta<typeof PropertyCard> = {
  title: 'Composants/PropertyCard',
  component: PropertyCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof PropertyCard>

export const Default: Story = {
  args: {
    property: mockProperty,
    price: 85,
    isFavorite: false,
    onToggleFavorite: fn(),
  },
}

export const Favori: Story = {
  args: {
    property: mockProperty,
    price: 85,
    isFavorite: true,
    onToggleFavorite: fn(),
  },
}

export const SansPrix: Story = {
  args: {
    property: mockProperty,
    isFavorite: false,
    onToggleFavorite: fn(),
  },
}
