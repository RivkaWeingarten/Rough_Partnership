import React from "react";

function AddCrystalForm() {
  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Rough Diamond
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Resource Number
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="240-1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Rough Weight
                </label>
                <input
                  type="text"
                  id="roughWeight"
                  name="roughWeight"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="3.25"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  for="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Fluorescence
                </label>
                <select
                  id="fluor"
                  name="fluor"
                  className="border rounded w-full py-2 px-3"
                  required
                >
                  <option value="None">None</option>
                  <option value="Faint">Faint</option>
                  <option value="Medium Blue">Medium Blue</option>
                  <option value="Strong Blue">Strong Blue</option>
                  <option value="Very Strong Blue">Very Strong Blue</option>
                  <option value="Medium Yellow">Medium Yellow</option>
                  <option value="Strong Yellow">Strong Yellow</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  for="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add an optional description "
                ></textarea>
              </div>

              <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Options for 'A' stone
                </label>

                {/* Line 1 */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center">
                  <div className="flex items-center w-full sm:w-auto sm:min-w-[150px]">
                    <label htmlFor="7_option" className="mr-2 sm:w-[150px]">
                      7@
                    </label>
                    <input
                      type="number"
                      id="7"
                      name="options.7"
                      step={0.25}
                      className="border rounded w-full py-2 px-3 sm:w-[150px]"
                    />
                  </div>
                  <div className="flex-grow">
                    <textarea
                      className="block w-full p-2 border border-gray-300 rounded-md"
                      rows={1}
                      placeholder="Enter notes here"
                    ></textarea>
                  </div>
                </div>

                {/* Line 2 */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center mt-4">
                  <div className="flex items-center w-full sm:w-auto sm:min-w-[150px]">
                    <label htmlFor="7_PI_option" className="mr-2 sm:w-[150px]">
                      7-PI@
                    </label>
                    <input
                      type="number"
                      id="7_PI"
                      name="options.7_PI"
                      step={0.25}
                      className="border rounded w-full py-2 px-3 sm:w-[150px]"
                    />
                  </div>
                  <div className="flex-grow">
                    <textarea
                      className="block w-full p-2 border border-gray-300 rounded-md"
                      rows={1}
                      placeholder="Enter notes here"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  for="images"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Images (Select up to 4 images)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  className="border rounded w-full py-2 px-3"
                  accept="image/*"
                  multiple
                />
              </div>

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddCrystalForm;
