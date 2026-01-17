import sqlite3
from datetime import datetime, timezone
from flask import Flask, jsonify, request
from flask_cors import CORS
from queries import (
    DATABASE_LOCATION,
    SELECT_ALL_RECIPES,
    SELECT_RECIPE,
    CREATE_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE,
    GET_RECIPE_INGREDIENTS,
    GET_RECIPE_INSTRUCTIONS,
    INSERT_INGREDIENT,
    INSERT_RECIPE_INGREDIENT,
    INSERT_INSTRUCTION,
    INSERT_RECIPE_INSTRUCTION,
    DELETE_ALL_RECIPE_INGREDIENTS,
    DELETE_ALL_RECIPE_INSTRUCTIONS,
    CHECK_INGREDIENT
)
from helper import print_recipe, print_ingredients, print_instructions
app = Flask(__name__)
CORS(app)  # Allows React to talk to Flask


def connect_to_db():
    connection = sqlite3.connect(DATABASE_LOCATION)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()
    return connection, cursor


def create_recipe(connection, cursor):
    recipe_name = request.json['recipeName']
    prep_time = request.json['prep_time']
    prep_time_unit = request.json['prep_time_unit']
    cook_time = request.json['cook_time']
    cook_time_unit = request.json['cook_time_unit']
    servings = request.json['servings']
    recipe_type = request.json['recipeType']
    created_at = datetime.now(timezone.utc)
    print_recipe(recipe_name, prep_time, prep_time_unit,
                 cook_time, cook_time_unit, servings, recipe_type, created_at)

    # Add the recipe
    cursor.execute(CREATE_RECIPE, (recipe_name, prep_time,
                                   prep_time_unit, cook_time, cook_time_unit, servings, recipe_type, created_at))

    # Get the key of the recipe
    recipe_id = cursor.lastrowid

    # Ingredients
    ingredients = request.json['ingredients']
    print_ingredients(ingredients)

    # Handle Ingredients
    for ingredient in ingredients:
        # Get each part of the ingredient
        ingredient_name = ingredient['name']
        ingredient_quantity = ingredient['quantity']
        ingredient_unit = ingredient['unit']

        # Insert the ingredient name and get the key
        cursor.execute(INSERT_INGREDIENT, (ingredient_name,))
        ingredient_id = cursor.lastrowid

        # Insert the key into the join table
        cursor.execute(INSERT_RECIPE_INGREDIENT, (recipe_id,
                       ingredient_id, ingredient_quantity, ingredient_unit))

    # Instructions
    instructions = request.json['instructions']
    print_instructions(instructions)

    # Handle Instructions
    for step_number, instruction in enumerate(instructions, start=1):
        # Get each part of the instruction
        instruction_text = instruction['text']

        # Insert the instruction and get the key
        cursor.execute(INSERT_INSTRUCTION, (step_number, instruction_text))
        instruction_id = cursor.lastrowid

        # Insert the key into the join table
        cursor.execute(INSERT_RECIPE_INSTRUCTION, (recipe_id, instruction_id))

    connection.commit()
    connection.close()
    return jsonify({'message': 'Recipe Added Successfully'})


def read_all_recipes(cursor):
    rows = cursor.execute(SELECT_ALL_RECIPES)
    data = []
    for row in rows:
        data.append(dict(row))
    return jsonify(data)


def read_single_recipe(cursor, recipe_id):
    row = cursor.execute(SELECT_RECIPE, (recipe_id,)).fetchone()
    data = dict(row)
    return jsonify(data)


def read_recipe_ingredients(cursor, recipe_id):
    rows = cursor.execute(GET_RECIPE_INGREDIENTS, (recipe_id,))
    data = []
    for row in rows:
        data.append(dict(row))
    return jsonify(data)


def read_recipe_instructions(cursor, recipe_id):
    rows = cursor.execute(GET_RECIPE_INSTRUCTIONS, (recipe_id,))
    data = []
    for row in rows:
        data.append(dict(row))
    return jsonify(data)


def update_recipe(connection, cursor, recipe_id):
    # Get all the recipe parts
    recipe_name = request.json['recipeName']
    prep_time = request.json['prep_time']
    prep_time_unit = request.json['prep_time_unit']
    cook_time = request.json['cook_time']
    cook_time_unit = request.json['cook_time_unit']
    servings = request.json['servings']
    recipe_type = request.json['recipeType']

    # Update the Recipe Parts
    cursor.execute(UPDATE_RECIPE, (recipe_name, prep_time, prep_time_unit,
                   cook_time, cook_time_unit, servings, recipe_type, recipe_id))

    # Get all the ingredients
    ingredients = request.json['ingredients']

    # Delete all the recipe ingredients
    cursor.execute(DELETE_ALL_RECIPE_INGREDIENTS, (recipe_id,))

    # Get all the ingredient IDs
    ingredient_ids = []
    for ingredient in ingredients:
        ingredient_name = ingredient['ingredient_name']
        ingredient_id = cursor.execute(
            CHECK_INGREDIENT, (ingredient_name,)).fetchone()
        if ingredient_id is None:
            cursor.execute(INSERT_INGREDIENT, (ingredient_name,))
            ingredient_id = cursor.lastrowid
        else:
            ingredient_id = ingredient_id[0]
        ingredient_ids.append(ingredient_id)

    # Add the new ingredients
    for i, ingredient in enumerate(ingredients):
        ingredient_quantity = ingredient['ingredient_quantity']
        ingredient_unit = ingredient['ingredient_unit']
        ingredient_id = ingredient_ids[i]
        cursor.execute(INSERT_RECIPE_INGREDIENT, (recipe_id,
                       ingredient_id, ingredient_quantity, ingredient_unit))

    # Delete all the instructions
    cursor.execute(DELETE_ALL_RECIPE_INSTRUCTIONS, (recipe_id,))

    # Get all the instructions
    instructions = request.json['instructions']

    # Create instructions, link them in recipe_ingredients
    for i, instruction in enumerate(instructions):
        step_number = instruction['step_number']
        instruction_text = instruction['instruction_text']
        cursor.execute(INSERT_INSTRUCTION, (step_number, instruction_text))
        instruction_id = cursor.lastrowid
        cursor.execute(INSERT_RECIPE_INSTRUCTION, (recipe_id, instruction_id))

    connection.commit()
    connection.close()
    return jsonify({'message': 'Recipe Updated Successfully'})


def delete_recipe(connection, cursor, recipe_id):
    cursor.execute(DELETE_RECIPE, (recipe_id,))
    connection.commit()
    connection.close()
    return jsonify({'message': 'Recipe Deleted Successfully'})


@app.route('/api/recipes', methods=['GET', 'POST'])
# Handles selecting and adding recipes
def add_and_get_recipes():
    result = connect_to_db()
    connection = result[0]
    cursor = result[1]

    # Create in CRUD
    if request.method == 'POST':
        return create_recipe(connection, cursor)

    # Read/Write in CRUD
    if request.method == 'GET':
        return read_all_recipes(cursor)
    print("Invalid request method")


@app.route('/api/recipes/<int:recipe_id>', methods=['GET', 'PUT', 'DELETE'])
# Handles updating and deleting recipes
def update_and_delete_recipes(recipe_id):
    result = connect_to_db()
    connection = result[0]
    cursor = result[1]

    # Read in CRUD
    if request.method == 'GET':
        return read_single_recipe(cursor, recipe_id)

    # Update in CRUD
    if request.method == 'PUT':
        return update_recipe(connection, cursor, recipe_id)

    # Delete in CRUD
    if request.method == 'DELETE':
        return delete_recipe(connection, cursor, recipe_id)
    print("Invalid request method")


@app.route('/api/recipe_ingredients_view/<int:recipe_id>', methods=['GET'])
# Handles getting recipe ingredients
def get_recipe_ingredients(recipe_id):
    result = connect_to_db()
    cursor = result[1]

    if request.method == 'GET':
        return read_recipe_ingredients(cursor, recipe_id)
    print("Invalid request method")


@app.route('/api/recipe_instructions_view/<int:recipe_id>', methods=['GET'])
# Handles getting recipe instructions
def get_recipe_instructions(recipe_id):
    result = connect_to_db()
    cursor = result[1]

    if request.method == 'GET':
        return read_recipe_instructions(cursor, recipe_id)
    print("Invalid request method")


if __name__ == '__main__':
    app.run(debug=True)
