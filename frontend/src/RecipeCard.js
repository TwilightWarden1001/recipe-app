import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
    >
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
      </div>
    </div>
  );
}
export default RecipeCard;
