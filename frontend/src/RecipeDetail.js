import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  getRecipe,
  getIngredients,
  getInstructions,
  DeleteRecipe,
} from "./api";

function returnDate(date) {
  return new Date(date).toLocaleDateString();
}

function RecipeDetail() {
  // Get the ID from the URL
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const navigate = useNavigate();

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
    <div className="recipe-detail">
      <div>
        <button className="button back" onClick={() => navigate("/")}>
          <a href="/">Back to Recipe List</a>
        </button>
        <button className="button edit" onClick={() => navigate(`/edit/${id}`)}>
          Edit Recipe
        </button>
        <button className="button delete" onClick={() => DeleteRecipe(recipe)}>
          Delete Recipe
        </button>
      </div>
      <div className="recipe-info">
        <h1>{recipe.recipe_name}</h1>
        <div className="recipe-meta">
          <span className="meta-item">
            <span className="bold">Servings:</span> {recipe.servings}
          </span>
          <span className="meta-item">
            <span className="bold">Prep:</span> {recipe.prep_time}{" "}
            {recipe.prep_time_unit}
          </span>
          <span className="meta-item">
            <span className="bold">Cook:</span> {recipe.cook_time}{" "}
            {recipe.cook_time_unit}
          </span>
          <span className="meta-item">
            <span className="bold">Total:</span> {total_time} {total_time_unit}
          </span>
          <span className="meta-item">
            <span className="bold">Type:</span> {recipe.recipe_type}
          </span>
          <span className="meta-item">
            <span className="bold">Created:</span>{" "}
            {returnDate(recipe.created_at)}
          </span>
        </div>
      </div>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.index}>
            {ingredient.ingredient_quantity}
            {ingredient.ingredient_unit} {ingredient.ingredient_name}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ul>
        {instructions.map((instruction) => (
          <li key={instruction.index}>
            Step {instruction.step_number}: {instruction.instruction_text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetail;
