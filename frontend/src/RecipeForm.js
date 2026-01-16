import { useState } from "react";
import Ingredient from "./Ingredient";
import Instructions from "./Instructions";

function RecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [prep_time_unit, setPrep_time_unit] = useState("minutes");
  const [cook_time, setCook_time] = useState("");
  const [cook_time_unit, setCook_time_unit] = useState("minutes");
  const [servings, setServings] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "cups" },
  ]);
  const [instructions, setInstructions] = useState([{ step: "", text: "" }]);

  function handleSubmit(e) {
    // Handle the submit myself
    e.preventDefault();

    // We build a custom JSON object to send to the backend
    const data = {
      recipeName: recipeName,
      prep_time: prep_time,
      prep_time_unit: prep_time_unit,
      cook_time: cook_time,
      cook_time_unit: cook_time_unit,
      servings: servings,
      recipeType: recipeType,
      ingredients: ingredients,
      instructions: instructions,
    };

    // Make a request to the custom API
    fetch("http://localhost:5000/api/recipes", {
      method: "POST",
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
    setRecipeName("");
    setPrep_time("");
    setPrep_time_unit("");
    setCook_time("");
    setCook_time_unit("");
    setServings("");
    setIngredients([{ name: "", unit: "cups", quantity: "" }]);
    setInstructions([{ step: "", text: "" }]);
  }

  return (
    <div>
      <h1>Recipe Form</h1>
      <fieldset>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Recipe Name */}
          <label htmlFor="recipeName">Recipe Name*</label>
          <input
            type="text"
            name="recipeName"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter Recipe Name"
            required
          />

          {/* Prep Time */}
          <label htmlFor="prep_time">Prep Time*</label>
          <input
            type="number"
            name="prep_time"
            id="prep_time"
            value={prep_time}
            onChange={(e) => setPrep_time(e.target.value)}
            placeholder="Enter Prep Time"
            required
          />

          {/* Prep Time Unit */}
          <label htmlFor="prep_time_unit">Prep Time Unit*</label>
          <select
            name="prep_time_unit"
            id="prep_time_unit"
            value={prep_time_unit || "minutes"}
            onChange={(e) => setPrep_time_unit(e.target.value)}
            required
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>

          {/* Cook Time */}
          <label htmlFor="cook_time">Cook Time*</label>
          <input
            type="number"
            name="cook_time"
            id="cook_time"
            value={cook_time}
            onChange={(e) => setCook_time(e.target.value)}
            placeholder="Enter Cook Time"
            required
          />

          {/* Cook Time Unit */}
          <label htmlFor="cook_time_unit">Cook Time Unit*</label>
          <select
            name="cook_time_unit"
            id="cook_time_unit"
            value={cook_time_unit}
            onChange={(e) => setCook_time_unit(e.target.value)}
            required
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>

          {/* Servings */}
          <label htmlFor="servings">Servings*</label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            placeholder="Enter Servings"
            required
          />

          {/* Recipe Types*/}
          <label htmlFor="recipeType">Recipe Type*</label>
          <select
            name="recipeType"
            id="recipeType"
            value={recipeType}
            onChange={(e) => setRecipeType(e.target.value)}
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
          <ol>
            <Ingredient
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </ol>
          <br />

          {/* Instructions */}
          <ol>
            <Instructions
              instructions={instructions}
              setInstructions={setInstructions}
            />
          </ol>
          <br />

          <button className="button submit" type="submit" value="Submit">
            Submit
          </button>
          <button
            className="button reset"
            ype="reset"
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
