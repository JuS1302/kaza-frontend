@AGENTS.md

# Projet Kasa — Contexte et références

## Contexte
Projet de formation OpenClassrooms. Refonte front-end d'une plateforme de location entre particuliers (Kasa). Mission fictive : développeur freelance qui implémente le front-end Next.js branché sur une API Express.js existante.

## Stack technique
- **Next.js 16.2.9** avec App Router (attention : breaking changes vs versions antérieures)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** — configuration dans `globals.css` via `@theme`, PAS de `tailwind.config.js`
- **ESLint**

## Backend (API)
- Dossier séparé, lancé avec `npm start` sur `http://localhost:3000`
- Doc API : `http://localhost:3000/docs.html`
- Base URL front : `NEXT_PUBLIC_API_URL=http://localhost:3000/api` (dans `.env.local`)
- Auth : JWT via `Authorization: Bearer <token>`

### Routes principales
| Méthode | Route | Auth |
|---|---|---|
| GET | `/api/properties` | non |
| GET | `/api/properties/:id` | non |
| POST | `/api/properties` | owner/admin |
| GET | `/api/properties/:id/ratings` | non |
| POST | `/api/properties/:id/ratings` | connecté |
| POST | `/api/properties/:id/favorite` | connecté |
| DELETE | `/api/properties/:id/favorite` | connecté |
| GET | `/api/users/:id/favorites` | self/admin |
| POST | `/auth/login` | — |
| POST | `/auth/register` | — |

> ⚠️ Les routes auth sont sur `/auth/...` (sans préfixe `/api`)

## Design tokens (Figma)

### Couleurs
```css
--color-red-main: #99331A
--color-red-dark: #842C16
--color-orange-light: #FFFBF9  /* fond de toutes les pages */
--color-black: #0D0D0D
--color-grey-light: #F5F5F5
--color-grey-dark: #565656
```

### Typographie (Inter)
| Classe | Taille | Poids |
|---|---|---|
| `.text-title` | 32px | 700 |
| `.text-subtitle` | 24px | 600 |
| `.text-body-lg` | 18px | 500 |
| `.text-body-md` | 16px | 400 |
| `.text-label` | 14px | 500 |
| `.text-caption` | 12px | 400 |

### Nav desktop (Figma)
- Largeur : 782px, centrée
- Border-radius : 10px
- Padding : 8px haut/bas, 100px gauche/droite
- Gap : 20px

### Responsive
- Breakpoint : `md` (768px) — en dessous = mobile, au-dessus = desktop
- **Desktop** : nav 782px centrée avec liens horizontaux
- **Mobile** : logo à gauche + icône hamburger, menu vertical qui s'ouvre/se ferme
- Pas de maquettes tablette → utiliser les breakpoints Tailwind par défaut

## Icônes (`public/icons/`)
`logo.svg` | `picto.svg` | `heart.svg` | `message.svg` | `menu.svg` | `close.svg` | `back.svg` | `delete.svg` | `location.svg` | `plus.svg` | `send.png`

## Structure des pages
```
src/app/
├── page.tsx                    → Accueil
├── layout.tsx
├── globals.css
├── not-found.tsx               → 404
├── properties/[id]/page.tsx    → Détail logement (fetch par id)
├── about/page.tsx
├── login/page.tsx
├── register/page.tsx
├── favorites/page.tsx
├── messages/page.tsx
└── add-property/page.tsx
```

## Composants existants
- `Header.tsx` — nav responsive avec menu hamburger mobile
- `Footer.tsx` — logo + copyright
- `Logo.tsx` — accepte `variant="full"` ou `variant="picto"`

## Sprint 1 (obligatoire)
- [ ] Liste des logements (page accueil)
- [ ] Favoris avec localStorage
- [ ] Navigation vers page détail
- [ ] Détail propriété (carrousel d'images)
- [ ] Contacter l'hôte (→ messagerie)
- [ ] Page login

## Sprint 2 (optionnel)
Ajouter propriété, inscription, favoris serveur, messagerie complète

## Checklist finale
- [ ] Tests unitaires (carrousel + favoris)
- [ ] SEO (Schema.org, meta)
- [ ] Accessibilité WCAG 2.1 AA (WAVE / Lighthouse)
- [ ] Documentation JSDoc ou Storybook
- [ ] Déploiement Vercel
