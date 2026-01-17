import { useState, useEffect } from "react";
import { getRecipe, getIngredients, getInstructions } from "./api";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";

function EditRecipeWrapper() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState(null);

  useEffect(() => {
    getRecipe(id).then((data) => {
      setRecipe(data);
    });
  }, [id]);

  useEffect(() => {
    getIngredients(id).then((data) => {
      setIngredients(data);
    });
  }, [id]);

  useEffect(() => {
    getInstructions(id).then((data) => {
      setInstructions(data);
    });
  }, [id]);

  const fullRecipe = {
    ...recipe,
    ingredients: ingredients,
    instructions: instructions,
  };

  if (!recipe || !ingredients || !instructions) {
    return <div>Loading...</div>;
  }

  return <RecipeForm initialRecipe={fullRecipe} isEditing={true} />;
}

export default EditRecipeWrapper;
