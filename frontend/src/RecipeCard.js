function DeleteRecipe(recipe) {
  // Show confirmation popup
  const confirmed = window.confirm(
    `Are you sure you want to delete "${recipe.recipe_name}"?`
  );

  // Only delete if they clicked OK
  if (confirmed) {
    let recipeId = recipe.recipe_id;
    fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
      method: "DELETE",
    });
  }
}

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h2>{recipe.recipe_name}</h2>
      <div className="recipe-info">
        Key {recipe.recipe_id} | Servings: {recipe.servings} | Cook time:{" "}
        {recipe.cook_time} {recipe.cook_time_unit} | Prep time:{" "}
        {recipe.prep_time} {recipe.prep_time_unit}
        <button onClick={() => DeleteRecipe(recipe)}>Delete Recipe</button>
        <button>Edit Recipe</button>
      </div>
    </div>
  );
}

export default RecipeCard;
