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
  // Les routes auth sont sur /auth/... sans le préfixe /api
  const AUTH_URL = API_URL?.replace('/api', '') ?? 'http://localhost:3000'

  // Récupère toutes les propriétés (page d'accueil)
  export async function getProperties(): Promise<Property[]> {
    const res = await fetch(`${API_URL}/properties`)
    if (!res.ok) throw new Error('Erreur lors du chargement des propriétés')
    return res.json()
  }

  // Connecte un utilisateur et retourne le token JWT
  export async function login(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch(`${AUTH_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error('Email ou mot de passe incorrect')
    return res.json()
  }

  // Récupère une propriété par son id (page détail)
  export async function getPropertyById(id: string): Promise<Property> {
    const res = await fetch(`${API_URL}/properties/${id}`)
    if (!res.ok) throw new Error(`Propriété introuvable : ${id}`)
    return res.json()
  }
