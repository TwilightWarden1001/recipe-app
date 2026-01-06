import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React to talk to Flask

def get_db_connection():
    conn = sqlite3.connect('recipes.db')
    conn.row_factory = sqlite3.Row  # Returns rows as dictionaries
    return conn

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    conn = get_db_connection()
    recipes = conn.execute('SELECT * FROM recipes').fetchall()
    conn.close()

    # Convert to list of dicts
    recipes_list = [dict(recipe) for recipe in recipes]
    return jsonify(recipes_list)

if __name__ == '__main__':
    app.run(debug=True)
