# Recipe App

A full-stack CRUD application for managing recipes built with React, Flask, and SQLite.

## Tech Stack

**Frontend:** React, HTML, CSS, JavaScript  
**Backend:** Python, Flask, Flask-CORS  
**Database:** SQLite3

## Features

- View all recipes with servings information
- Normalized database schema with proper relationships
- RESTful API endpoints

## Database Schema

- `recipes` - stores recipe details (name, prep time, cook time, servings)
- `ingredients` - stores unique ingredient names
- `recipe_ingredients` - join table linking recipes to ingredients with quantities

## Installation

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install flask flask-cors
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Usage

1. Start Flask backend (runs on http://127.0.0.1:5000)
2. Start React frontend (runs on http://localhost:3000)
3. View recipes in your browser

## Future Features

- Create new recipes (C in CRUD)
- Update existing recipes (U in CRUD)
- Delete recipes (D in CRUD)
- Ingredient nutrition tracking
- AI-powered recipe scraping from websites

## Author

Benjamin - Full-stack developer in training
