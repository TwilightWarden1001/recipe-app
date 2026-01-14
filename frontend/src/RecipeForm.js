import { useState } from "react";
import Ingredient from "./Ingredient";

function RecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [prep_time_unit, setPrep_time_unit] = useState("minutes");
  const [cook_time, setCook_time] = useState("");
  const [cook_time_unit, setCook_time_unit] = useState("minutes");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);

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
      ingredients: ingredients,
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
  }

  return (
    <div>
      <h1>Recipe Form</h1>
      <fieldset>
        <form onSubmit={(e) => handleSubmit(e)}>
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

          <label htmlFor="servings">Servings*</label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            placeholder="Enter Servings"
            required
          />

          <Ingredient
            ingredients={ingredients}
            setIngredients={setIngredients}
          />

          <button className="button submit" type="submit" value="Submit">
            Submit
          </button>
          <button type="reset" value="Reset" onClick={(e) => handleReset(e)}>
            Reset
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default RecipeForm;
