import { useState, useEffect } from "react";
import "./App.css";
import RecipeForm from "./RecipeForm";
import RecipeCard from "./RecipeCard";

// This a reusable function to read data from any table in my database. NOT Update/Delete/Create.
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
      <button>Add Recipe</button>
      <h1>My Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipe_id}>
            <RecipeCard recipe={recipe} />
          </li>
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
    </div>
  );
}

export default App;
