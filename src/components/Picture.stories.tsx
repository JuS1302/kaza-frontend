import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Picture from './Picture'

const meta: Meta<typeof Picture> = {
  title: 'Composants/Picture',
  component: Picture,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Picture>

export const DimensionsFixees: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Photo exemple',
    width: 400,
    height: 300,
  },
}

export const RemplissageConteneur: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Photo exemple',
    fill: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '400px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
}
