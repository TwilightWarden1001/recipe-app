import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ingredient from "./Ingredient";
import Instructions from "./Instructions";

function RecipeForm({ initialRecipe = null, isEditing = false }) {
  // Get the ID from the URL. (It will just return {} or null if it's not there)
  const { id } = useParams();
  const [recipe_name, set_recipe_name] = useState("");
  const [prep_time, set_prep_time] = useState("");
  const [prep_time_unit, set_prep_time_unit] = useState("minutes");
  const [cook_time, set_cook_time] = useState("");
  const [cook_time_unit, set_cook_time_unit] = useState("minutes");
  const [servings, set_servings] = useState("");
  const [recipeType, set_recipe_type] = useState("");
  const [ingredients, set_ingredients] = useState([
    { ingredient_name: "", ingredient_quantity: "", ingredient_unit: "cups" },
  ]);
  const [instructions, set_instructions] = useState([
    { instruction_text: "", step_number: "" },
  ]);

  useEffect(() => {
    if (initialRecipe) {
      set_recipe_name(initialRecipe.recipe_name);
      set_prep_time(initialRecipe.prep_time);
      set_prep_time_unit(initialRecipe.prep_time_unit);
      set_cook_time(initialRecipe.cook_time);
      set_cook_time_unit(initialRecipe.cook_time_unit);
      set_servings(initialRecipe.servings);
      set_recipe_type(initialRecipe.recipe_type);
      set_ingredients(initialRecipe.ingredients);
      set_instructions(initialRecipe.instructions);
    }
  }, [initialRecipe]);

  console.log(initialRecipe);

  function handleSubmit(e) {
    e.preventDefault();

    // We build a custom JSON object to send to the backend
    const data = {
      recipeName: recipe_name,
      prep_time: prep_time,
      prep_time_unit: prep_time_unit,
      cook_time: cook_time,
      cook_time_unit: cook_time_unit,
      servings: servings,
      recipeType: recipeType,
      ingredients: ingredients,
      instructions: instructions,
    };

    let url = "";
    let method = "";

    if (isEditing) {
      url = `http://localhost:5000/api/recipes/${id}`;
      method = "PUT";
    } else {
      url = "http://localhost:5000/api/recipes";
      method = "POST";
    }

    // Make a request to the custom API
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      // Standard error handling
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  }

  // Basic reset function to handle restarting
  function handleReset(e) {
    e.preventDefault();
    set_recipe_name("");
    set_prep_time("");
    set_prep_time_unit("minutes");
    set_cook_time("");
    set_cook_time_unit("minutes");
    set_servings("");
    set_recipe_type("Breakfast & Brunch");
    set_ingredients([{ name: "", unit: "cups", quantity: "" }]);
    set_instructions([{ step: "", text: "" }]);
  }

  return (
    <div className="recipe-form">
      <h1>Recipe Form</h1>
      <fieldset>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Recipe Name */}
          <label htmlFor="recipe_name">Recipe Name*</label>
          <input
            type="text"
            name="recipe_name"
            id="recipe_name"
            value={recipe_name}
            onChange={(e) => set_recipe_name(e.target.value)}
            placeholder="Enter Recipe Name"
            required
          />
          <br />

          <div className="form-row">
            <div className="form-field">
              {/* Prep Time */}
              <label htmlFor="prep_time">Prep Time*</label>
              <input
                type="number"
                name="prep_time"
                id="prep_time"
                value={prep_time}
                onChange={(e) => set_prep_time(e.target.value)}
                placeholder="Enter Prep Time"
                required
              />
            </div>

            {/* Prep Time Unit */}
            <div className="form-field">
              <label htmlFor="prep_time_unit">Prep Time Unit*</label>
              <select
                name="prep_time_unit"
                id="prep_time_unit"
                value={prep_time_unit || "minutes"}
                onChange={(e) => set_prep_time_unit(e.target.value)}
                required
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              {/* Cook Time */}
              <label htmlFor="cook_time">Cook Time*</label>
              <input
                type="number"
                name="cook_time"
                id="cook_time"
                value={cook_time}
                onChange={(e) => set_cook_time(e.target.value)}
                placeholder="Enter Cook Time"
                required
              />
            </div>

            {/* Cook Time Unit */}
            <div className="form-field">
              {/* Cook Time Unit */}
              <label htmlFor="cook_time_unit">Cook Time Unit*</label>
              <select
                name="cook_time_unit"
                id="cook_time_unit"
                value={cook_time_unit}
                onChange={(e) => set_cook_time_unit(e.target.value)}
                required
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>

          {/* Servings */}
          <label htmlFor="servings">Servings*</label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => set_servings(e.target.value)}
            placeholder="Enter Servings"
            required
          />

          {/* Recipe Types*/}
          <label htmlFor="recipe_type">Recipe Type*</label>
          <select
            name="recipe_type"
            id="recipe_type"
            value={recipeType}
            onChange={(e) => set_recipe_type(e.target.value)}
            required
          >
            <option value="Breakfast & Brunch">Breakfast & Brunch</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Healthy">Healthy</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Snacks">Snacks</option>
            <option value="Desserts">Desserts</option>
            <option value="Bread">Bread</option>
            <option value="Soups">Soups</option>
          </select>
          <br />

          {/* Ingredients */}
          <Ingredient
            ingredients={ingredients}
            setIngredients={set_ingredients}
          />
          <br />

          {/* Instructions */}
          <Instructions
            instructions={instructions}
            setInstructions={set_instructions}
          />
          <br />

          <button className="button submit" type="submit" value="Submit">
            Submit
          </button>
          <button
            className="button reset"
            ype="reset"
            type="reset"
            value="Reset"
            onClick={(e) => handleReset(e)}
          >
            Reset
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default RecipeForm;
