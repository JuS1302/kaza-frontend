import { getProperties } from '@/lib/api'

  // "async" permet d'attendre la réponse de l'API avant d'afficher la page
  export default async function HomePage() {
    const properties = await getProperties()

    return (
      <main>
        <h1>Logements ({properties.length})</h1>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>{property.title}</li>
          ))}
        </ul>
      </main>
    )
  }
