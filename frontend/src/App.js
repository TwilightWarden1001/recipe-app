import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import EditRecipeWrapper from "./EditRecipeWrapper";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>My Recipes</h1>

        {/* Navigation*/}
        <nav>
          <Link to="/">
            <button className="button add">All Recipes</button>
          </Link>
          <Link to="/create">
            <button className="button add">Add Recipe</button>
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit/:id" element={<EditRecipeWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
