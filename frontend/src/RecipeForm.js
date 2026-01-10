import { useState } from "react";

function Ingredient() {
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);

  function handleChange(i, e) {
    const values = [...ingredients];
    values[i][e.target.name] = e.target.value;
    setIngredients(values);
  }

  let addIngredients = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  let removeIngredients = (index) => {
    let newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  let handleSubmit = () => {
    alert(JSON.stringify(ingredients));
  };

  return (
    <div onSubmit={handleSubmit}>
      {ingredients.map((element, index) => (
        <div key={index}>
          <label htmlFor="ingredientName">Ingredient Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={element.name}
            onChange={(e) => handleChange(index, e)}
          />

          <label htmlFor="ingredientQuantity">Ingredient Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={element.quantity}
            onChange={(e) => handleChange(index, e)}
          />

          <label htmlFor="ingredientUnit">Ingredient Unit</label>
          <select
            name="unit"
            id="unit"
            value={element.unit}
            onChange={(e) => handleChange(index, e)}
          >
            <option value="cups">Cups</option>
            <option value="tablespoons">Tablespoons</option>
            <option value="teaspoons">Teaspoons</option>
            <option value="grams">Grams</option>
            <option value="kilograms">Kilograms</option>
            <option value="ounces">Ounces</option>
            <option value="pounds">Pounds</option>
            <option value="pieces">Pieces</option>
            <option value="whole">Whole</option>
            <option value="half">Half</option>
            <option value="quarter">Quarter</option>
            <option value="eighth">Eighth</option>
          </select>
          {index ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeIngredients(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addIngredients()}
        >
          Add
        </button>
        <button className="button submit" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

function RecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [prep_time, setPrep_time] = useState("");
  const [prep_time_unit, setPrep_time_unit] = useState("minutes");
  const [cook_time, setCook_time] = useState("");
  const [cook_time_unit, setCook_time_unit] = useState("minutes");
  const [servings, setServings] = useState("");

  function handleSubmit(e) {
    // Handle the submit myself
    e.preventDefault();

    // Log the output for validation checks
    console.log(
      recipeName,
      prep_time,
      prep_time_unit,
      cook_time,
      cook_time_unit,
      servings
    );

    // We build a custom JSON object to send to the backend
    const data = {
      recipeName: recipeName,
      prep_time: prep_time,
      prep_time_unit: prep_time_unit,
      cook_time: cook_time,
      cook_time_unit: cook_time_unit,
      servings: servings,
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

          <Ingredient />

          <button type="submit" value="Submit">
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
