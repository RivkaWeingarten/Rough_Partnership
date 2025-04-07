import React, { useState } from "react";
import options from "@/roughOptionsPrograms.json";

const EditOptionForm = ({ option, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({ ...option });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues); // Pass updated option values back to parent
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Edit Option</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <select
              name="estProgram"
              className="border rounded py-1 px-2 w-full sm:w-auto sm:min-w-[100px]"
              value={formValues.estProgram}
              onChange={handleChange}
            >
              {options.map((opt) => (
                <option key={opt.program} value={opt.program}>
                  {opt.program}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Est Weight</label>
            <input
              type="number"
              name="estWeight"
              value={formValues.estWeight}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label>Estimated Color</label>
            <select
              id="estColor"
              name="estColor"
              value={formValues.estColor}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>
            </select>
          </div>
          <div>
            <label>Estimated Clarity</label>
            <select
              id="estClarity"
              name="estClarity"
              value={formValues.estClarity}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="IF">IF</option>
              <option value="VVS1">VVS1</option>
              <option value="VVS2">VVS2</option>
              <option value="VS1">VS1</option>
              <option value="VS2">VS2</option>
              <option value="SI1">SI1</option>
              <option value="SI2">SI2</option>
              <option value="I1">I1</option>
              <option value="I2">I2</option>
            </select>
          </div>

          <div>
            <label>Discount</label>
            <input
              type="number"
              name="estDiscount"
              value={formValues.estDiscount}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label>Total Price</label>
            <input
              type="number"
              name="estPrice"
              value={formValues.estPrice}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <textarea
            id="notes"
            name="notes"
            value={formValues.notes}
            onChange={handleChange}
            className="block w-full p-1 border border-gray-300 rounded-md sm:w-auto sm:min-w-[200px]"
            rows={1}
            placeholder="Notes"
          />
          <div className="mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOptionForm;
