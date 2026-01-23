import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
  const recipe_id = recipe.recipe_id;
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${recipe_id}`)}
    >
      <div className="recipe-type">{recipe.recipe_type}</div>
      <h3 className="recipe-name">{recipe.recipe_name}</h3>
      <div className="recipe-info">{/* TODO: Add time logic*/}</div>
    </div>
  );
}
export default RecipeCard;
