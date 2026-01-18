// API endpoints
const BASE_URL = "http://localhost:5000/api";
const RECIPES_URL = `${BASE_URL}/recipes`;
const INGREDIENTS_VIEW_URL = `${BASE_URL}/recipe_ingredients_view`;
const INSTRUCTIONS_VIEW_URL = `${BASE_URL}/recipe_instructions_view`;

// This reads ALL recipes from the recipe TABLE
export async function readAllRecipes() {
  try {
    const response = await fetch(RECIPES_URL);

    // Error handling for if the response isn't successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// This reads a SINGLE recipe from the recipe TABLE
export async function getRecipe(id) {
  try {
    const response = await fetch(`${RECIPES_URL}/${id}`);

    // Error handling for if the response isn't successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

// This reads ALL ingredients linked to a recipe in recipe_ingredients_view
export async function getIngredients(id) {
  try {
    const response = await fetch(`${INGREDIENTS_VIEW_URL}/${id}`);

    // Error handling for if the response isn't successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ingredients = await response.json();
    return ingredients;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// This reads ALL instructions linked to a recipe in recipe_instructions_view
export async function getInstructions(id) {
  try {
    const response = await fetch(`${INSTRUCTIONS_VIEW_URL}/${id}`);

    // Error handling for if the response isn't successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const instructions = await response.json();
    return instructions;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export function DeleteRecipe(recipe) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${recipe.recipe_name}"?`,
  );

  if (confirmed) {
    return fetch(`${RECIPES_URL}/${recipe.recipe_id}`, {
      method: "DELETE",
    });
  }
}
