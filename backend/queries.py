# This file is only to hold SQL statements
# Where the database is stored. It's in backend but the app.py is also there
DATABASE_LOCATION = r'C:\Coding\recipe-app\backend\recipes.db'

# Select all recipes
SELECT_ALL_RECIPES = 'SELECT * FROM recipes'

# Select a single recipe
SELECT_RECIPE = 'SELECT * FROM recipes WHERE recipe_id = ?'

# Create a recipe
CREATE_RECIPE = 'INSERT INTO recipes (recipe_name, prep_time, prep_time_unit, cook_time, cook_time_unit, servings, recipe_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

# Delete a recipe
DELETE_RECIPE = 'DELETE FROM recipes WHERE recipe_id = ?'

# Update a recipe
UPDATE_RECIPE = 'UPDATE recipes SET recipe_name = ?, prep_time = ?, prep_time_unit = ?, cook_time = ?, cook_time_unit = ?, servings = ?, recipe_type = ? WHERE recipe_id = ?'

# Get RecipeIngredinets
GET_RECIPE_INGREDIENTS = 'SELECT ingredient_name, ingredient_quantity, ingredient_unit FROM recipe_ingredients_view WHERE recipe_id = ?'

# Get RecipeInstructions
GET_RECIPE_INSTRUCTIONS = 'SELECT instruction_text, step_number FROM recipe_instructions_view WHERE recipe_id = ?'

# Insert an ingredient
INSERT_INGREDIENT = 'INSERT INTO ingredients (ingredient_name) VALUES (?)'

# Insert a recipe ingredient
INSERT_RECIPE_INGREDIENT = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, ingredient_quantity, ingredient_unit) VALUES (?, ?, ?, ?)'

# Insert an instruction
INSERT_INSTRUCTION = 'INSERT INTO instructions (instruction_text) VALUES (?)'

# Insert a recipe instruction
INSERT_RECIPE_INSTRUCTION = 'INSERT INTO recipe_instructions (recipe_id, instruction_id, step_number) VALUES (?, ?, ?)'

DELETE_ALL_RECIPE_INGREDIENTS = 'DELETE FROM recipe_ingredients WHERE recipe_id = ?'

DELETE_ALL_RECIPE_INSTRUCTIONS = 'DELETE FROM recipe_instructions WHERE recipe_id = ?'

CHECK_INGREDIENT = 'SELECT ingredient_id FROM ingredients WHERE ingredient_name = ?'
