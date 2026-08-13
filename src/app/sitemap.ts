import type { MetadataRoute } from 'next'
import { getProperties } from '@/lib/api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kasa.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties().catch(() => [])

  const propertyUrls = properties.map((property) => ({
    url: `${SITE_URL}/properties/${property.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    },
    ...propertyUrls,
  ]
}
