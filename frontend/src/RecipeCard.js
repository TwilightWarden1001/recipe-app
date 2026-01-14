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
        Servings: {recipe.servings} | Cook time: {recipe.cook_time}{" "}
        {recipe.cook_time_unit} | Prep time: {recipe.prep_time}{" "}
        {recipe.prep_time_unit} | Added:{" "}
        {new Date(recipe.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        <br />
        <button className="button delete" onClick={() => DeleteRecipe(recipe)}>
          Delete Recipe
        </button>
        <button className="button edit">Edit Recipe</button>
      </div>
    </div>
  );
}
export default RecipeCard;
