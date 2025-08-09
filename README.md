Ce backend permet de gérer les informations des employés d’une entreprise avec un système d’authentification administrateur.
Fonctionnalités principales :

CRUD complet (Créer, Lire, Modifier, Supprimer) pour les employés.

Authentification & autorisation (compte administrateur uniquement).

Validation des données.

Connexion à une base de données via TypeORM.

Sécurité avec JWT et gestion des mots de passe hashés.

 Fonctionnalités
Login / register administrateur

📄 Lister tous les employés

➕ Ajouter un employé

✏️ Modifier un employé

❌ Supprimer un employé

📅 Gestion de la date d’embauche

Configurer la base de données

Créer la base de donnee dans postgres:
gestion_employes

Créer un fichier .env à la racine :

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=motdepasse
DATABASE_NAME=gestion_employes
JWT_SECRET=ton_secret
PORT=3000

Lancer le serveur 
npm run start:dev

Pour acceder a la docummentation swagger: http://localhost:3000/api


