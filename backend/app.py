import os
from flask import Flask, jsonify
import psycopg
from psycopg.rows import dict_row
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def fetch_recipes():
    user_password = os.environ['POSTGRE_PASSWORD']

    with psycopg.connect(
            host="localhost",
            dbname="recipe_app",
            user="postgres",
            password=user_password,
            row_factory=dict_row) as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM recipes")
            return cursor.fetchall()


@app.route('/api/recipes', methods=['GET'])
def return_recipe():
    recipe = fetch_recipes()
    return jsonify(recipe)


if __name__ == "__main__":
    app.run(debug=True)
