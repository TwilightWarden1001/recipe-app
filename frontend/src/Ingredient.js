function Ingredient({ ingredients, setIngredients }) {
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

  return (
    <div>
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
          Add Ingredient
        </button>
      </div>
    </div>
  );
}

export default Ingredient;
