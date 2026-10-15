# FORSSA — Plateforme de mise en relation professionnelle

FORSSA met en relation les personnes qui cherchent un service ou un emploi avec des professionnels et des entreprises. Le projet est basé sur le design fourni dans l’archive Khedma, renommé FORSSA.

## Technologies
- React + TypeScript + Vite
- React Router pour les routes côté client
- Tailwind CSS
- Supabase (PostgreSQL + authentification)

## Démarrage local
1. Installer Node.js LTS (version compatible avec Vite).
2. Ouvrir un terminal dans le dossier du projet.
3. Installer les dépendances :
   ```bash
   npm install
   ```
4. Copier `.env.example` vers `.env.local` et renseigner l’URL du projet Supabase et la clé `anon` publique.
5. Démarrer :
   ```bash
   npm run dev
   ```
6. Construire pour production :
   ```bash
   npm run build
   ```

## Base de données Supabase
1. Créer un projet sur https://supabase.com/.
2. Dans le tableau de bord, ouvrir **SQL Editor**.
3. Copier-coller le contenu de `supabase/schema.sql` puis exécuter le script.
4. Dans **Project Settings → API**, copier Project URL et la clé `anon` publique dans `.env.local`. Ne jamais mettre la clé `service_role` dans le frontend ou sur GitHub.
5. Dans **Authentication → URL Configuration**, définir l’URL locale `http://localhost:5173` et ajouter les URLs de déploiement autorisées.

## Routes
- `/` : accueil
- `/recherche` : recherche de professionnels
- `/professionnel` : profil professionnel
- `/accord` : accord de mission
- `/suivi` : suivi de mission
- `/avis` : avis
- `/tableau-de-bord` : espace utilisateur
- `/connexion` : connexion / inscription

## État actuel et intégration base de données
Le design original contenait des données de démonstration locales. Le schéma SQL, le client Supabase et les fonctions de lecture/création de profils et d’authentification sont fournis dans `src/lib/`. Les écrans de démonstration existants ne sont pas tous encore connectés à ces fonctions : il faut les relier avant d’utiliser FORSSA en production. Les comptes réels doivent se connecter via `loginAccount` / `registerAccount`; ne pas considérer les boutons de démonstration comme une authentification sécurisée.

## GitHub
Depuis le dossier FORSSA :
```bash
git init
git add .
git commit -m "Initial FORSSA React platform"
git branch -M main
git remote add origin https://github.com/VOTRE-UTILISATEUR/forssa.git
git push -u origin main
```
Crée d’abord un dépôt vide nommé `forssa` sur GitHub. Vérifie que `.env.local` n’est jamais ajouté au dépôt.

## Déploiement conseillé
Importer le dépôt GitHub dans Vercel ou Netlify, puis configurer `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les variables d’environnement du projet. Pour un déploiement SPA, activer la redirection vers `index.html` afin que les routes React Router fonctionnent lors d’un accès direct.

## Important
Ceci est une base de projet prête à installer et à pousser sur GitHub, mais pas encore une plateforme de production complète. Avant la mise en production, connecter tous les formulaires aux fonctions Supabase, ajouter la validation et les états d’erreur, vérifier les règles RLS, les permissions par rôle et les parcours de mission.
