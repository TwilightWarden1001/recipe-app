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
          <li key={recipe.recipe_id}>
            {recipe.recipe_name} - {recipe.servings} servings
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;