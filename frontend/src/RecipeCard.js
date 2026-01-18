import { useNavigate } from "react-router-dom";

function returnDate(date) {
  return new Date(date).toLocaleDateString();
}

function RecipeCard({ recipe }) {
  const recipe_id = recipe.recipe_id;
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${recipe_id}`)}
    >
      <h2>{recipe.recipe_name}</h2>
      <div className="recipe-info">
        Prep Time: {recipe.prep_time} {recipe.prep_time_unit} | Cook Time:{" "}
        {recipe.cook_time} {recipe.cook_time_unit} | Servings: {recipe.servings}{" "}
        | Recipe Type: {recipe.recipe_type} | Added:{" "}
        {returnDate(recipe.created_at)}
      </div>
    </div>
  );
}
export default RecipeCard;
