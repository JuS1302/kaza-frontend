import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Composants/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    name: {
      control: 'select',
      options: ['back', 'burger', 'close', 'delete', 'heart', 'grey-heart', 'location', 'menu', 'message', 'plus', 'send', 'star'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Icon>

export const Heart: Story = {
  args: { name: 'heart', size: 32 },
}

export const Location: Story = {
  args: { name: 'location', size: 32 },
}

export const Message: Story = {
  args: { name: 'message', size: 32 },
}

export const Fermer: Story = {
  args: { name: 'close', size: 32 },
}

export const ToutesLesIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
      {(['back', 'burger', 'close', 'delete', 'heart', 'grey-heart', 'location', 'menu', 'message', 'plus', 'send', 'star'] as const).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name={name} size={32} />
          <span style={{ fontSize: '12px', color: '#565656' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}
