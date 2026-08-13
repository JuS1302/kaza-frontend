import { render, screen, fireEvent } from '@testing-library/react'
import ImageCarousel from '@/components/ImageCarousel'

// Remplace Picture par un <img> simple — next/image ne fonctionne pas dans les tests
jest.mock('../components/Picture', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

// Remplace Icon par un <span> simple — les SVG du dossier public ne sont pas accessibles dans les tests
jest.mock('../components/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}))

const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg']
const title = 'Appartement cosy'

describe('ImageCarousel', () => {
  it('affiche la photo au bon index initial', () => {
    render(<ImageCarousel images={images} initialIndex={1} title={title} onClose={jest.fn()} />)
    expect(screen.getByAltText(`${title} — photo 2`)).toBeInTheDocument()
  })

  it('affiche le compteur "1 / 3"', () => {
    render(<ImageCarousel images={images} initialIndex={0} title={title} onClose={jest.fn()} />)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('passe à la photo suivante au clic', () => {
    render(<ImageCarousel images={images} initialIndex={0} title={title} onClose={jest.fn()} />)
    fireEvent.click(screen.getByLabelText('Photo suivante'))
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('passe à la photo précédente au clic', () => {
    render(<ImageCarousel images={images} initialIndex={1} title={title} onClose={jest.fn()} />)
    fireEvent.click(screen.getByLabelText('Photo précédente'))
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('revient à la première photo après la dernière (cyclique)', () => {
    render(<ImageCarousel images={images} initialIndex={2} title={title} onClose={jest.fn()} />)
    fireEvent.click(screen.getByLabelText('Photo suivante'))
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('va à la dernière photo depuis la première en allant en arrière (cyclique)', () => {
    render(<ImageCarousel images={images} initialIndex={0} title={title} onClose={jest.fn()} />)
    fireEvent.click(screen.getByLabelText('Photo précédente'))
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('masque les flèches et le compteur si une seule image', () => {
    render(<ImageCarousel images={['seule.jpg']} initialIndex={0} title={title} onClose={jest.fn()} />)
    expect(screen.queryByLabelText('Photo suivante')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Photo précédente')).not.toBeInTheDocument()
    expect(screen.queryByText(/\/ 1/)).not.toBeInTheDocument()
  })

  it('appelle onClose au clic sur le bouton fermer', () => {
    const onClose = jest.fn()
    render(<ImageCarousel images={images} initialIndex={0} title={title} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Fermer le diaporama'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('appelle onClose sur la touche Échap', () => {
    const onClose = jest.fn()
    render(<ImageCarousel images={images} initialIndex={0} title={title} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('passe à la photo suivante avec la touche →', () => {
    render(<ImageCarousel images={images} initialIndex={0} title={title} onClose={jest.fn()} />)
    fireEvent.keyDown(document, { key: 'ArrowRight' })
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('passe à la photo précédente avec la touche ←', () => {
    render(<ImageCarousel images={images} initialIndex={1} title={title} onClose={jest.fn()} />)
    fireEvent.keyDown(document, { key: 'ArrowLeft' })
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })
})
