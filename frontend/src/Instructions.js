function Instructions({ instructions, setInstructions }) {
  function handleChange(index, element) {
    const values = [...instructions];
    values[index][element.name] = element.value;
    setInstructions(values);
  }

  function addInstructions() {
    setInstructions([
      ...instructions,
      { instruction_text: "", step_number: "" },
    ]);
  }

  function removeInstructions(index) {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  }

  return (
    <div>
      {instructions.map((element, index) => (
        <div key={instructions.step_number}>
          <div className="instruction-wrapper">
            <label htmlFor="instruction_text">Step {index + 1}</label>
            <input
              type="text"
              name="instruction_text"
              id="instruction_text"
              value={element.instruction_text}
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
