import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'Documentation/Design Tokens',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof meta>

const couleurs = [
  { name: 'red-main', value: '#99331A', label: 'Rouge principal' },
  { name: 'red-dark', value: '#842C16', label: 'Rouge foncé' },
  { name: 'orange-light', value: '#FFFBF9', label: 'Fond des pages' },
  { name: 'black', value: '#0D0D0D', label: 'Noir' },
  { name: 'grey-light', value: '#F5F5F5', label: 'Gris clair' },
  { name: 'grey-dark', value: '#565656', label: 'Gris foncé' },
]

const typographie = [
  { classe: 'text-title', taille: '32px', poids: '700', exemple: 'Titre de page' },
  { classe: 'text-subtitle', taille: '24px', poids: '600', exemple: 'Sous-titre' },
  { classe: 'text-body-lg', taille: '18px', poids: '500', exemple: 'Corps de texte large' },
  { classe: 'text-body-md', taille: '16px', poids: '400', exemple: 'Corps de texte normal' },
  { classe: 'text-label', taille: '14px', poids: '500', exemple: 'Label de bouton' },
  { classe: 'text-body-sm', taille: '14px', poids: '400', exemple: 'Texte secondaire' },
  { classe: 'text-caption', taille: '12px', poids: '400', exemple: 'Légende / copyright' },
]

export const Couleurs: Story = {
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Couleurs</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {couleurs.map(({ name, value, label }) => (
          <div key={name} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
            <div style={{ backgroundColor: value, height: '80px', borderBottom: '1px solid #e5e5e5' }} />
            <div style={{ padding: '12px', backgroundColor: 'white' }}>
              <p style={{ fontWeight: 600, margin: 0, fontSize: '14px' }}>{label}</p>
              <p style={{ color: '#565656', fontSize: '12px', margin: '4px 0 0' }}>{name}</p>
              <p style={{ color: '#565656', fontSize: '12px', margin: 0 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Typographie: Story = {
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '700px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Typographie</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {typographie.map(({ classe, taille, poids, exemple }) => (
          <div key={classe} style={{ display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid #f5f5f5', padding: '16px 0' }}>
            <div style={{ width: '160px', flexShrink: 0 }}>
              <code style={{ fontSize: '12px', backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>{classe}</code>
              <p style={{ fontSize: '11px', color: '#565656', margin: '4px 0 0' }}>{taille} · {poids}</p>
            </div>
            <p className={classe} style={{ margin: 0 }}>{exemple}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}
