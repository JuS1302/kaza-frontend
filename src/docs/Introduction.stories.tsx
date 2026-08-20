import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'Documentation/Introduction',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', fontFamily: 'Inter, sans-serif', color: '#0D0D0D', lineHeight: 1.6 }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#99331A', marginBottom: '8px' }}>
        Kasa — Design System
      </h1>
      <p style={{ color: '#565656', marginBottom: '32px' }}>
        Catalogue de composants du projet Kasa, plateforme de location entre particuliers.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Stack technique</h2>
      <ul style={{ paddingLeft: '20px', color: '#565656', marginBottom: '32px' }}>
        <li>Next.js 16 avec App Router</li>
        <li>React 19</li>
        <li>TypeScript</li>
        <li>Tailwind CSS v4</li>
      </ul>

      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Comment utiliser ce catalogue ?</h2>
      <ul style={{ paddingLeft: '20px', color: '#565656', marginBottom: '32px' }}>
        <li>Clique sur un composant dans le menu à gauche pour le voir en action</li>
        <li>L'onglet <strong>Controls</strong> permet de modifier les props en temps réel</li>
        <li>L'onglet <strong>Docs</strong> affiche la documentation automatique</li>
      </ul>

      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Organisation</h2>
      <p style={{ color: '#565656' }}>
        Les composants sont listés sous <strong>Composants/</strong> dans le menu.<br />
        Les pages de documentation sont sous <strong>Documentation/</strong>.
      </p>
    </div>
  ),
}
