import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

DATABASE_LOCATION = 'recipes.db'
SELECT_STATEMENT = 'SELECT * FROM '

app = Flask(__name__)
CORS(app)  # Allows React to talk to Flask

def get_db_connection():
    connection = sqlite3.connect(DATABASE_LOCATION)
    connection.row_factory = sqlite3.Row  # Returns rows as sqlite3.Row objects
    return connection

def select_all(connection, table_name):
    rows = connection.execute(SELECT_STATEMENT + table_name)
    data = []

    for row in rows:
        data.append(dict(row))

    return jsonify(data)

def add_recipe(connection, table_name):
    # I don't get why this is name and not table name, makes no sense
    recipe_name = request.json['name']

    if len(recipe_name) == 0:
        return jsonify({'error': 'Recipe name cannot be empty'})
    # This is the part that makes sense. I forgot to commit these two lines make full sense
    connection.execute("INSERT INTO " + table_name + " (recipe_name) VALUES (?)", (recipe_name,))
    connection.commit()

    # I have no clue what this is doing
    return jsonify({'message': 'Recipe added successfully'})

def add_ingredient(connection, table_name):
    ingredient_name = request.json['name']
    connection.execute("INSERT INTO " + table_name + " (ingredient_name) VALUES (?)", (ingredient_name,))
    connection.commit()
    return jsonify({'message': 'Ingredient added successfully'})

def update_recipe(connection, table_name, recipe_id):
    print("Updating recipe in " + table_name)

def delete_recipe(connection, table_name, recipe_id):
    connection.execute("DELETE FROM " + table_name + " WHERE recipe_id = ?", (recipe_id,))
    connection.commit()
    return jsonify({'message': 'Recipe deleted successfully'})

# Handles selecting and adding recipes
@app.route('/api/recipes', methods=['GET', 'POST'])
def add_and_get_recipes():
    table_name = 'recipes'
    connection = get_db_connection()
    if request.method == 'GET':
        return select_all(connection, table_name)
    if request.method == 'POST':
        return add_recipe(connection, table_name)
    print("Invalid request method")

# Handles updating and deleting recipes
@app.route('/api/recipes/<int:recipe_id>', methods=['PUT', 'DELETE'])
def update_and_delete_recipes(recipe_id):
    table_name = 'recipes'
    connection = get_db_connection()
    if request.method == 'PUT':
        return update_recipe(connection, table_name, recipe_id)
    if request.method == 'DELETE':
        return delete_recipe(connection, table_name, recipe_id)
    print("Invalid request method")

# Handles selecting and adding recipes
@app.route('/api/ingredients', methods=['GET', 'POST'])
def add_and_get_ingredients():
    table_name = 'ingredients'
    connection = get_db_connection()
    if request.method == 'GET':
        return select_all(connection, table_name)
    if request.method == 'POST':
        return add_ingredient(connection, table_name)
    print("Invalid request method")

if __name__ == '__main__':
    app.run(debug=True)
