# This file is only to hold SQL statements
# Where the database is stored. It's in backend but the app.py is also there
DATABASE_LOCATION = r'C:\Coding\recipe-app\backend\recipes.db'

# Select all recipes
SELECT_ALL_RECIPES = 'SELECT * FROM recipes'

# Select a single recipe
SELECT_RECIPE = 'SELECT * FROM recipes WHERE recipe_id = ?'

# Create a recipe
CREATE_RECIPE = 'INSERT INTO recipes (recipe_name, prep_time, prep_time_unit, cook_time, cook_time_unit, servings, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'

# Delete a recipe
DELETE_RECIPE = 'DELETE FROM recipes WHERE recipe_id = ?'

# Update a recipe
UPDATE_RECIPE = 'UPDATE recipes SET recipe_name = ?, prep_time = ?, prep_time_unit = ?, cook_time = ?, cook_time_unit = ?, servings = ? WHERE recipe_id = ?'
