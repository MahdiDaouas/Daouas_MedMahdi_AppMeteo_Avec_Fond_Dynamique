# 🌦️ App météo avec fond dynamique 

## 📌 Nom et description du projet
Ce projet est une application web de météo dynamique qui permet aux utilisateurs de consulter les prévisions météorologiques pour n'importe quelle ville.  
L’interface affiche :

- la météo actuelle,
- les prévisions horaires,
- les prévisions quotidiennes,
- des animations visuelles cohérentes avec le temps (pluie, nuages, soleil, nuit…).

L’application récupère des données en temps réel via des API gratuites et propose une interface responsive optimisée pour mobile, tablette et desktop.

---

## 🛠️ Technologies utilisées

### **Langages**
- HTML5  
- CSS3  
- JavaScript (ES6+)

### **API**
- **Open-Meteo** → prévisions météo (heure par heure et jour par jour)  
- **Nominatim (OpenStreetMap)** → géolocalisation et recherche de villes  
- **Geolocation API du navigateur** → localisation automatique de l’utilisateur  

### **Autres**
- Animations CSS & GIF météo  
- Media queries avancées pour la responsivité  
- Chargement dynamique du contenu (DOM & fetch asynchrone)

---

## 🌟 Fonctionnalités principales
- 🔍 **Recherche de ville** par nom  
- 📅 **Prévisions quotidiennes** (min/max, icône, conditions)  
- 🕒 **Prévisions heure par heure** (24h à partir de l’heure actuelle)  
- 🌍 **Localisation automatique** via “My Location”  
- 🌤️ **Icônes météo** basées sur le weathercode  
- 🎬 **Animations dynamiques** selon le temps (soleil, pluie, neige, brouillard…)  
- 💬 **Commentaires personnalisés** selon la météo du jour  
- 📱 **Interface responsive** adaptée à tous les écrans
- 🔊 **Sons pour chaque météo** Pour rendre l’expérience plus immersive

---

## 🔗 Lien vers la page GitHub Pages
 
👉 https://mahdidaouas.github.io/Daouas_MedMahdi_AppMeteo_Avec_Fond_Dynamique/

---

## 🚀 Nouveautés explorées
Durant le développement, j’ai étudié le fonctionnement des **API RESTful** et la gestion des données en temps réel via différents endpoints (latitude, longitude, météo horaire/journalière…).  
J’ai appris :

- À utiliser `fetch()` et les promesses (`then`, `catch`)
- À parser des réponses JSON pour alimenter dynamiquement l’interface
- À intégrer et comparer plusieurs API gratuites (Open-Meteo, Nominatim, WeatherAPI…)
- À utiliser l’API Geolocation du navigateur pour extraire la position réelle
- À créer des **backgrounds dynamiques** et animations météo  
- À gérer des problèmes asynchrones (chargement, affichage, delays)
- À optimiser l’affichage mobile grâce aux media queries

J’ai aussi beaucoup travaillé sur les animations CSS et JavaScript, la synchronisation météo → interface, et le débogage avancé via console et dev tools.

---

## ⚠️ Difficultés rencontrées
- Trouver des API **gratuites, fiables et sans clé**  
- Problèmes de **CORS** lors du développement local (fichiers ouverts hors serveur)  
- Responsivité complexe avec les animations (nuages, GIF, background)  
- Performances réduites sur mobile avec plusieurs éléments animés  
- Synchronisation du chargement (données arrivant avant l’affichage)  
- Gestion des erreurs d’entrée utilisateur (villes introuvables, lenteur réseau)

---

## ✅ Solutions apportées
Pour contourner les problèmes de CORS en local et choisir des API gratuites fiables, j’ai finalement conservé **Nominatim** (OpenStreetMap) pour la géolocalisation et **Open-Meteo** pour les données météo.  
L’utilisation d’un serveur local simple (`python -m http.server`) a supprimé les blocages CORS sans proxy ni clé API.

Pour les animations et fonds responsives, j’ai travaillé sur la gestion précise de la visibilité :

- Utilisation systématique de `opacity: 0/1` avec **transitions douces** (`transition: opacity 0.5s ease`) pour faire apparaître ou disparaître les overlays météo.
- Sur mobile, certains éléments (ex : `#cloud5`, `#cloud1`, `#rain1`…) sont masqués via `display: none` pour améliorer les performances.
- Ajustement automatique des éléments (width 100%, height auto) pour garder une expérience fluide sur les petits écrans.

Pour synchroniser météo ⇄ animations :

- La fonction `WeatherAnimation(weather)` commence toujours par mettre l’opacité de **tous les overlays à 0**, puis active uniquement celui correspondant au code météo.
- Le background du body change également via des classes comme `.bg-sunny`, `.bg-rainy`, etc.
- Le tout est déclenché **après la résolution complète des requêtes fetch**, pendant qu’un *loader* s’affiche (`classList.add('visible')`).

Enfin, toutes les erreurs sont interceptées proprement via `.catch()` avec des messages adaptés, et la géolocalisation utilise un fallback si l’utilisateur refuse l’autorisation.  
Ces solutions ont abouti à une application fluide, stable, et parfaitement responsive.

---