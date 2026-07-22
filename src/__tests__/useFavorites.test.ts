import { renderHook, act } from '@testing-library/react'
import { useFavorites } from '@/hooks/useFavorites'

// Simule localStorage pour les tests
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
})

describe('useFavorites', () => {
  it('démarre avec une liste vide si localStorage est vide', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites.size).toBe(0)
  })

  it('ajoute un logement aux favoris', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite('abc123')
    })

    expect(result.current.favorites.has('abc123')).toBe(true)
  })

  it('retire un logement déjà en favori', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => { result.current.toggleFavorite('abc123') })
    act(() => { result.current.toggleFavorite('abc123') })

    expect(result.current.favorites.has('abc123')).toBe(false)
  })

  it('persiste les favoris dans localStorage', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => { result.current.toggleFavorite('abc123') })

    const stored = JSON.parse(localStorageMock.getItem('kasa_favorites') ?? '[]')
    expect(stored).toContain('abc123')
  })

  it('charge les favoris existants depuis localStorage au démarrage', () => {
    localStorageMock.setItem('kasa_favorites', JSON.stringify(['xyz789']))

    const { result } = renderHook(() => useFavorites())

    expect(result.current.favorites.has('xyz789')).toBe(true)
  })

  it('peut gérer plusieurs favoris indépendamment', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => { result.current.toggleFavorite('a1') })
    act(() => { result.current.toggleFavorite('b2') })
    act(() => { result.current.toggleFavorite('a1') }) // retire a1

    expect(result.current.favorites.has('a1')).toBe(false)
    expect(result.current.favorites.has('b2')).toBe(true)
  })
})
