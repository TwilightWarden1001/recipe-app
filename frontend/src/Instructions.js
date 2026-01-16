function Instructions({ instructions, setInstructions }) {
  function handleChange(index, element) {
    const values = [...instructions];
    values[index][element.name] = element.value;
    setInstructions(values);
  }

  function addInstructions() {
    setInstructions([...instructions, { step: "", text: "" }]);
  }

  function removeInstructions(index) {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  }

  return (
    <div>
      {instructions.map((element, index) => (
        <div key={index}>
          <div className="instruction-wrapper">
            <label htmlFor="instructionText">Step {index + 1}</label>
            <input
              type="text"
              name="text"
              id="text"
              value={element.text}
              onChange={(e) => handleChange(index, e.target)}
            />

            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeInstructions(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      ))}

      <button
        className="button add"
        type="button"
        onClick={() => addInstructions()}
      >
        Add Instruction
      </button>
    </div>
  );
}

export default Instructions;
