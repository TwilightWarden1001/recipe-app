import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      const response = await fetch("http://localhost:5000/api/recipes");
      const data = await response.json();
      setRecipes(data);
    }
    loadRecipes();

  }, []);

  return (
    <>
      <main>
        <h1>Recipes</h1>
        {
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <p>{recipe.name}</p>
            </div>
          ))}
      </main>
    </>
  )
}

export default App
