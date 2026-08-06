# Budgetly

Application de gestion de budget personnel : suivi des transactions, budgets par catégorie (règle 50/30/20), KPIs, export PDF/Excel.

## Stack

- Backend : Django + Django REST Framework + JWT (SimpleJWT) + MySQL
- Frontend : React + Vite + Chart.js

## Prérequis

- Python 3.x
- Node.js 18+
- MySQL

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Créer `backend/.env` :
```
SECRET_KEY=...
DEBUG=False
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:5173
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=127.0.0.1
DB_PORT=3306
```

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Structure du projet

```
budget-app-triooti/
├── backend/
│   ├── budget/
│   │   ├── models.py       # Category, Transaction, Budget, UserProfile
│   │   ├── serializers.py
│   │   ├── views.py        # ViewSets + AutoBudgetView + RebalanceGroupView
│   │   ├── signals.py      # Catégories par défaut à l'inscription
│   │   └── urls.py
│   └── core/settings.py
└── frontend/
    └── src/
        ├── services/        # api.js, auth.js, transactions.js, currency.js
        ├── components/      # Layout.jsx
        └── pages/           # Dashboard, Transactions, Budgets, Settings, Home
```

## Fonctionnalités

- Authentification JWT (login/register, refresh automatique)
- CRUD transactions, catégories, budgets
- Répartition automatique 50/30/20 avec rééquilibrage par groupe
- KPIs : taux d'épargne, respect des budgets, dépense moyenne/jour, projection, top catégorie
- Export PDF / Excel
- Filtres avancés sur les transactions

## Licence

Projet interne stage Triooti Web Association.