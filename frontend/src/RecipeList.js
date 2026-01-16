import { useState, useEffect } from "react";
import { readAllRecipes } from "./api";
import RecipeCard from "./RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    readAllRecipes().then((data) => setRecipes(data));
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      <label htmlFor="site-search">Search For A Recipe: </label>
      <input type="text" id="site-search" />
      <br />
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipe_id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RecipeList;
