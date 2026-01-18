import { useState, useEffect } from "react";
import { readAllRecipes } from "./api";
import RecipeCard from "./RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    readAllRecipes().then((data) => setRecipes(data));
  }, []);

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
      <div className="form-row">
        <label htmlFor="site-search">Search For A Recipe: </label>
        <input type="text" id="site-search" />
        <button className="button search">Search</button>
      </div>
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
