import { useState, useEffect } from "react";
import "./App.css";
import RecipeForm from "./RecipeForm";

function DeleteRecipe() {
  const [recipeId, setRecipeId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
      method: "DELETE",
    });
  }
  return (
    <div>
      <h1>Delete Recipe</h1>
      <fieldset>
        <form>
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            id="recipeName"
            value={recipeId}
            onChange={(e) => setRecipeId(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e)}>Delete</button>
        </form>
      </fieldset>
    </div>
  );
}

// This a reusable function to get data from any table in my database
// NOTE: In the future, if you want to use "useEffect" and "useState"
// in a function that is not App, make sure it starts with "use"
function useGetData(apiEndpoint) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // See what we got
        setData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [apiEndpoint]);

  return data;
}

function App() {
  let recipes_table = "http://localhost:5000/api/recipes";
  let ingredients_table = "http://localhost:5000/api/ingredients";

  let recipes = useGetData(recipes_table);
  let ingredients = useGetData(ingredients_table);

  return (
    <div className="App">
      <button>Add Ingredient</button>
      <button>Delete Recipe</button>
      <button>Delete Ingredient</button>
      <button>Update Recipe</button>
      <button>Update Ingredient</button>
      <h1>My Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <div key={recipe.recipe_id} className="recipe-card">
            <h2>{recipe.recipe_name}</h2>
            <div className="recipe-info">
              Key {recipe.recipe_id} | Servings: {recipe.servings} | Cook time:{" "}
              {recipe.cook_time} {recipe.cook_time_unit} | Prep time:{" "}
              {recipe.prep_time} {recipe.prep_time_unit}
            </div>
          </div>
        ))}
      </ul>
      <h1>My Ingredients</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.ingredient_id}>{ingredient.ingredient_name}</li>
        ))}
      </ul>
      <div>
        <RecipeForm />
      </div>
      <div>
        <DeleteRecipe />
      </div>
    </div>
  );
}

export default App;
