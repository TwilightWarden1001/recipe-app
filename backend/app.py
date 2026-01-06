import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

DATABASE_LOCATION = 'backend/recipes.db'  
SELECT_COMMAND = 'SELECT * FROM recipes'

app = Flask(__name__)
CORS(app)  # Allows React to talk to Flask

def get_db_connection():
    connection = sqlite3.connect(DATABASE_LOCATION)

    # Returns rows as sqlite3.Row objects
    connection.row_factory = sqlite3.Row

    return connection

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    connection = get_db_connection()
    recipes = connection.execute(SELECT_COMMAND).fetchall()
    connection.close()

    # Stores all the recipes
    recipes_list = []

    # For each recipe, conver them into dictionaries
    for recipe in recipes:
        recipes_list.append(dict(recipe))

    return jsonify(recipes_list)

if __name__ == '__main__':
    app.run(debug=True)
