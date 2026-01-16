def print_recipe(recipe_name, prep_time, prep_time_unit, cook_time, cook_time_unit, servings, recipe_type, created_at):
    # Helper function to debug recipe insertion
    print(f"RECIPE NAME: {recipe_name}")
    print(f"PREP TIME: {prep_time} {prep_time_unit}")
    print(f"COOK TIME: {cook_time} {cook_time_unit}")
    print(f"SERVINGS: {servings}")
    print(f"RECIPE TYPE: {recipe_type}")
    print(f"CREATED AT: {created_at}")


def print_ingredients(ingredients):
    # Helper function to debug ingredient insertion
    print("="*50)
    print("INGREDIENTS RECEIVED:")
    for ingredient in ingredients:
        print(ingredient)
    print("="*50)


def print_instructions(instructions):
    # Helper function to debug instruction insertion
    print("="*50)
    print("INSTRUCTIONS RECEIVED:")
    for instruction in instructions:
        print(instruction)
    print("="*50)
