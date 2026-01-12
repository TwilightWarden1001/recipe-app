import sqlite3
from datetime import datetime, timezone
from flask import Flask, jsonify, request
from flask_cors import CORS
from queries import DATABASE_LOCATION, SELECT_ALL_RECIPES, CREATE_RECIPE, DELETE_RECIPE, UPDATE_RECIPE

app = Flask(__name__)
CORS(app)  # Allows React to talk to Flask


def get_db_connection():
    connection = sqlite3.connect(DATABASE_LOCATION)
    connection.row_factory = sqlite3.Row  # Returns rows as sqlite3.Row objects
    return connection


def create_recipe(connection):
    # All recipe parts
    recipe_name = request.json['name']
    prep_time = request.json['prep_time']
    prep_time_unit = request.json['prep_time_unit']
    cook_time = request.json['cook_time']
    cook_time_unit = request.json['cook_time_unit']
    servings = request.json['servings']
    created_at = datetime.now(timezone.utc)

    connection.execute(CREATE_RECIPE, (recipe_name, prep_time,
                       prep_time_unit, cook_time, cook_time_unit, servings, created_at))
    connection.commit()
    connection.close()

    return jsonify({'message': 'Recipe Added Successfully'})


def read_all_recipes(connection):
    rows = connection.execute(SELECT_ALL_RECIPES)
    data = []

    for row in rows:
        data.append(dict(row))

    return jsonify(data)


def update_recipe(connection, recipe_id):
    recipe_name = request.json['name']
    prep_time = request.json['prep_time']
    prep_time_unit = request.json['prep_time_unit']
    cook_time = request.json['cook_time']
    cook_time_unit = request.json['cook_time_unit']
    servings = request.json['servings']

    connection.execute(UPDATE_RECIPE, (recipe_name, prep_time,
                       prep_time_unit, cook_time, cook_time_unit, servings, recipe_id))
    connection.commit()
    connection.close()
    return jsonify({'message': 'Recipe Updated Successfully'})


def delete_recipe(connection, recipe_id):
    connection.execute(DELETE_RECIPE, (recipe_id,))
    connection.commit()
    connection.close()
    return jsonify({'message': 'Recipe Deleted Successfully'})


@app.route('/api/recipes', methods=['GET', 'POST'])
# Handles selecting and adding recipes
def add_and_get_recipes():
    connection = get_db_connection()
    # Create in CRUD
    if request.method == 'POST':
        return create_recipe(connection)

    # Read/Write in CRUD
    if request.method == 'GET':
        return read_all_recipes(connection)
    print("Invalid request method")


@app.route('/api/recipes/<int:recipe_id>', methods=['PUT', 'DELETE'])
# Handles updating and deleting recipes
def update_and_delete_recipes(recipe_id):
    connection = get_db_connection()
    # Update in CRUD
    if request.method == 'PUT':
        return update_recipe(connection, recipe_id)

    # Delete in CRUD
    if request.method == 'DELETE':
        return delete_recipe(connection, recipe_id)
    print("Invalid request method")


if __name__ == '__main__':
    app.run(debug=True)
