import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";

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

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/create" element={<RecipeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
