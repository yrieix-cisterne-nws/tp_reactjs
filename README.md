# Weather App – TP React

Application météo en temps réel affichant les conditions météorologiques de 5 villes françaises, développée dans le cadre d'un TP React.

---

## Sommaire

1. [Présentation](#présentation)
2. [Fonctionnalités et pages](#fonctionnalités-et-pages)
3. [Technologies et outils](#technologies-et-outils)
4. [Installation et configuration](#installation-et-configuration)
   - [Pré-requis](#pré-requis)
   - [Installation du projet](#installation-du-projet)
   - [Lancement en développement](#lancement-en-développement)
   - [Compilation pour la production](#compilation-pour-la-production)
5. [Déploiement](#déploiement)
6. [Auteur](#auteur)
7. [Licence](#licence)

---

## Présentation

Weather App est une application React qui récupère et affiche la météo en temps réel pour cinq villes françaises (Paris, Lyon, Brest, Marseille, Strasbourg) via l'API open-meteo.com, gratuite et sans clé API. Elle propose une navigation multi-pages, un système de recherche et une page de détail par ville.

---

## Fonctionnalités et pages

- **Accueil** : Liste des villes avec leur température, icône météo et description. Recherche filtrante en temps réel et bouton d'actualisation des données.
- **Détail ville** : Page dédiée à chaque ville (`/city/:cityName`) affichant des informations supplémentaires : ressenti, coordonnées GPS.
- **À propos** : Présentation de l'application.
- **404** : Page personnalisée pour les URLs inconnues avec redirection vers l'accueil.

---

## Technologies et outils

- **React 18** : Framework principal pour la construction de l'interface et la gestion d'état (`useState`, `useEffect`, `useContext`).
- **Vite** : Bundler et serveur de développement ultra-rapide.
- **TailwindCSS v4** : Framework CSS utilitaire pour un design moderne et responsive.
- **Open-Meteo API** : Données météo en temps réel, gratuites et sans clé API.

---

## Installation et configuration

### Pré-requis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (fourni avec Node.js)
- Un terminal (cmd, PowerShell, ou terminal intégré VS Code)

### Installation du projet

1. **Cloner le dépôt :**
   ```sh
   git clone https://github.com/yrieix-cisterne-nws/tp_reactjs
   cd tp_reactjs
   ```

2. **Installer les dépendances :**
   ```sh
   npm install
   ```

   Cela installera toutes les librairies nécessaires, dont :
   - react
   - react-dom
   - react-router-dom
   - tailwindcss

### Lancement en développement

```sh
npm run dev
```
Le site sera accessible sur [http://localhost:5173](http://localhost:5173).

### Compilation pour la production

```sh
npm run build
```
Les fichiers optimisés seront générés dans le dossier `dist/`.

---

## Déploiement

Le site est en ligne : [App_meteo]()

---

## Auteur

**Yrieix Cisterne**  
Étudiant à la Normandie Web School

- [LinkedIn](https://www.linkedin.com/in/yrieix-cisterne)
- [GitHub](https://github.com/yrieix-cisterne-nws)
- [Site](https://yrieix-cisterne.fr/)


---

## Licence

Projet réalisé dans le cadre d'un TP pédagogique.  
Toute reproduction ou utilisation doit mentionner l'auteur.
