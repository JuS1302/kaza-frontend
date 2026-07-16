 // Décrit la forme des données reçues de l'API

  type PropertyHost = {
    name: string
    picture: string
  }

  // Une propriété (utilisée sur toutes les pages)
  export type Property = {
    id: string
    title: string
    cover: string
    pictures: string[]
    description: string
    location: string
    rating: string       // l'API renvoie "5", "4"... pas un nombre
    host: PropertyHost
    equipments: string[]
    tags: string[]
    price_per_night?: number
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // Récupère toutes les propriétés (page d'accueil)
  export async function getProperties(): Promise<Property[]> {
    const res = await fetch(`${API_URL}/properties`)
    if (!res.ok) throw new Error('Erreur lors du chargement des propriétés')
    return res.json()
  }

  // Récupère une propriété par son id (page détail)
  export async function getPropertyById(id: string): Promise<Property> {
    const res = await fetch(`${API_URL}/properties/${id}`)
    if (!res.ok) throw new Error(`Propriété introuvable : ${id}`)
    return res.json()
  }
