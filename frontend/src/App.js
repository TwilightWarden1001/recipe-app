import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes when component loads
    fetch('http://127.0.0.1:5000/api/recipes')
      .then(response => response.json())
      .then(data => {
        console.log(data);  // See what we got
        setRecipes(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>My Recipes</h1>
      <ul>
       {recipes.map(recipe => (
          <div key={recipe.recipe_id} className="recipe-card">
            <h2>{recipe.recipe_name}</h2>
            <div className="recipe-info">
              Servings: {recipe.servings} | Cook time: {recipe.cook_time} {recipe.cook_time_unit}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;