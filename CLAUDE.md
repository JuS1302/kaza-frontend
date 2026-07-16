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
| Classe | Taille | Poids | Note |
|---|---|---|---|
| `.text-title` | 32px | 700 | line-height: 1.43 |
| `.text-subtitle` | 24px | 600 | |
| `.text-menu` | 24px | 400 | liens menu mobile uniquement |
| `.text-body-lg` | 18px | 500 | |
| `.text-body-md` | 16px | 400 | |
| `.text-label` | 14px | 500 | |
| `.text-body-sm` | 14px | 400 | |
| `.text-caption` | 12px | 400 | |

> ⚠️ `line-height` sur le `body` doit être `1.43` (sans unité), PAS `143%`. Avec `%`, la valeur calculée est héritée figée (22.88px pour 16px base) et écrase le line-height des grands titres.

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
`logo.svg` | `picto.svg` | `heart.svg` | `grey-heart.svg` | `message.svg` | `menu.svg` | `close.svg` | `back.svg` | `delete.svg` | `location.svg` | `plus.svg` | `send.png`

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
- `Logo.tsx` — accepte `variant="full"` ou `variant="picto"`, `width`, `height` optionnels
- `Button.tsx` — variantes `primary`, `dark`, `light` ; accepte `href` pour lien
- `Icon.tsx` — accepte `IconName`, `size`, `alt`, `className`
- `PropertyCard.tsx` — card logement avec favoris, prix, lien vers détail
- `RedBlock.tsx` — bloc rouge avec titre + description (icon optionnelle)
- `Tag.tsx` — étiquette avec suppression optionnelle
- `FormInput.tsx` — champ texte/textarea/checkbox
- `Picture.tsx` — wrapper Image avec border-radius

## Sprint 1 (obligatoire)
- [x] Liste des logements (page accueil)
- [ ] Favoris avec localStorage
- [x] Navigation vers page détail (cards linkées vers `/properties/[id]`)
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
