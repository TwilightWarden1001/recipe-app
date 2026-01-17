function Ingredient({ ingredients, setIngredients }) {
  function handleChange(i, e) {
    const values = [...ingredients];
    values[i][e.target.name] = e.target.value;
    setIngredients(values);
  }

  let addIngredients = () => {
    setIngredients([
      ...ingredients,
      { ingredient_name: "", ingredient_quantity: "", ingredient_unit: "" },
    ]);
  };

  let removeIngredient = (index) => {
    let newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div>
      {ingredients.map((element, index) => (
        <div key={index}>
          <label htmlFor="ingredient_name">Ingredient Name</label>
          <input
            type="text"
            name="ingredient_name"
            id="ingredient_name"
            value={element.ingredient_name}
            onChange={(e) => handleChange(index, e)}
          />

          <label htmlFor="ingredient_quantity">Ingredient Quantity</label>
          <input
            type="number"
            name="ingredient_quantity"
            id="ingredient_quantity"
            value={element.ingredient_quantity}
            onChange={(e) => handleChange(index, e)}
          />

          <label htmlFor="ingredient_unit">Ingredient Unit</label>
          <select
            name="ingredient_unit"
            id="ingredient_unit"
            value={element.ingredient_unit}
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
              onClick={() => removeIngredient(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <br />
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addIngredients()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}

export default Ingredient;
