// API endpoints - keep these at the top
const BASE_URL = "http://localhost:5000/api";
const RECIPES_URL = `${BASE_URL}/recipes`;
const INGREDIENTS_VIEW_URL = `${BASE_URL}/recipe_ingredients_view`;
const INSTRUCTIONS_VIEW_URL = `${BASE_URL}/recipe_instructions_view`;

// API functions
export function readAllRecipes() {
  return fetch(RECIPES_URL)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export function getRecipe(id) {
  return fetch(`${RECIPES_URL}/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export function getIngredients(id) {
  return fetch(`${INGREDIENTS_VIEW_URL}/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export function getInstructions(id) {
  return fetch(`${INSTRUCTIONS_VIEW_URL}/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export function DeleteRecipe(recipe) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${recipe.recipe_name}"?`
  );

  if (confirmed) {
    return fetch(`${RECIPES_URL}/${recipe.recipe_id}`, {
      method: "DELETE",
    });
  }
}
