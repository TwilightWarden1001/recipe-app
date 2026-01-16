import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRecipe,
  getIngredients,
  getInstructions,
  DeleteRecipe,
} from "./api";

function RecipeDetail() {
  // Get the ID from the URL
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // Get the Recipe linked to the ID
  useEffect(() => {
    getRecipe(id).then((data) => setRecipe(data));
  }, [id]);

  // Get all ingredients linked to the ID
  useEffect(() => {
    getIngredients(id).then((data) => setIngredients(data));
  }, [id]);

  // Get all the instructions linked to the ID
  useEffect(() => {
    getInstructions(id).then((data) => setInstructions(data));
  }, [id]);

  // Calculate the total time
  const total_time = recipe.cook_time + recipe.prep_time;
  const total_time_unit = recipe.cook_time_unit;

  return (
    <div>
      <button className="button edit">Edit Recipe</button>
      <button className="button delete" onClick={() => DeleteRecipe(recipe)}>
        Delete Recipe
      </button>
      <h1>{recipe.recipe_name}</h1>
      <p>Servings: {recipe.servings}</p>
      <p>
        Cook time: {recipe.cook_time} {recipe.cook_time_unit}
      </p>
      <p>
        Prep time: {recipe.prep_time} {recipe.prep_time_unit}
      </p>
      <p>
        Total time: {total_time} {total_time_unit}
      </p>
      <p>Recipe Type: {recipe.recipe_type}</p>
      <p>Added: {new Date(recipe.created_at).toLocaleDateString()}</p>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.ingredient_id}>
              {ingredient.ingredient_quantity}
              {ingredient.ingredient_unit} {ingredient.ingredient_name}
            </li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {instructions.map((instruction) => (
            <li key={instruction.instruction_id}>
              {instruction.instruction_text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetail;
