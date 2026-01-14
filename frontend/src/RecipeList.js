import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

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

function RecipeList() {
  let recipes_table = "http://localhost:5000/api/recipes";
  let recipes = useGetData(recipes_table);

  return (
    <div>
      <h1>Recipe List</h1>
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
