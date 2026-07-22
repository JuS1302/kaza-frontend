# Kasa — Front-end

Refonte du site Kasa (plateforme de location entre particuliers) en Next.js, connectée à une API Express.js existante.

## Stack technique

- **Next.js 16** avec App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

## Prérequis

- Node.js 18+
- Le backend Kasa doit tourner en local (voir ci-dessous)

## Lancer le projet en local

### 1. Lancer le backend

Cloner le dépôt du backend et démarrer le serveur :

```bash
npm install
npm start
```

Le backend écoute sur `http://localhost:3000`. La documentation de l'API est disponible sur `http://localhost:3000/docs.html`.

### 2. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet front-end :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. Lancer le front-end

```bash
npm install
npm run dev
```

Le site est accessible sur [http://localhost:3001](http://localhost:3001) (ou le port affiché dans le terminal).

## Structure du projet

```
src/
├── app/                    # Pages et routes (App Router Next.js)
│   ├── layout.tsx          # Layout global (Header, Footer)
│   ├── page.tsx            # Page d'accueil
│   ├── properties/[id]/    # Page détail d'un logement
│   ├── about/              # Page À propos
│   ├── login/              # Page connexion
│   └── not-found.tsx       # Page 404
├── components/             # Composants réutilisables
│   ├── Button.tsx
│   ├── PropertyCard.tsx
│   ├── PropertiesGrid.tsx
│   └── ...
└── lib/
    └── api.ts              # Fonctions d'appel à l'API + types TypeScript
```

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm run lint` | Vérifie le code avec ESLint |
