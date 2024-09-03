"use client";
import { useRef } from 'react'
import { toast } from 'react-toastify';
import { addLot } from '@/app/actions/addLot.js';

 function AddLotForm()   {
  const formRef = useRef(null)
  const addNewLot = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const lotData = Object.fromEntries(formData.entries());
    console.log(lotData); // Debugging: Check the form data in the console

    try {
      const data = await addLot(lotData);
      toast.success(`Added Lot: ${data.lotName}`);
    } catch (error) {
      toast.error(error.message);
    }

    formRef.current?.reset();
  };
 

  return (
<section className="bg-blue-50 py-16">
  <div className="container mx-auto max-w-2xl">
    <div className="bg-white px-8 py-10 shadow-lg rounded-lg border">
      <form onSubmit={addNewLot}>
        <h2 className="text-3xl text-center font-semibold mb-8">Add A Rough Lot</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Lot Number</label>
            <input
              type="text"
              id="lotName"
              name="lotName"
              className="border rounded w-full py-2 px-4"
              placeholder="Enter Lot Number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Carat Weight</label>
            <input
              type="number"
              id="totalCts"
              name="totalCts"
              className="border rounded w-full py-2 px-4"
              placeholder="Enter total rough carats"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Cost</label>
            <input
              type="number"
              id="cost"
              name="cost"
              className="border rounded w-full py-2 px-4"
              placeholder="Enter cost"
            />
          </div>

          

          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Number of Stones</label>
            <input
              type="number"
              id="totalStones"
              name="totalStones"
              className="border rounded w-full py-2 px-4"
              placeholder="Number of stones"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              className="border rounded w-full py-2 px-4"
              defaultValue={"DTCA"}
              placeholder="Source"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Origin</label>
            <input
              type="text"
              id="origin"
              name="origin"
              className="border rounded w-full py-2 px-4"
              placeholder="Origin"
              defaultValue={"Botswana"}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Box Number</label>
            <input
              type="text"
              id="boxNumber"
              name="boxNumber"
              className="border rounded w-full py-2 px-4"
              placeholder="Box number"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              className="border rounded w-full py-2 px-4"
              placeholder="e.g. 5-10ct..."
              rows="3"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="border rounded w-full py-2 px-4"
              placeholder="Enter notes"
              rows="3"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit Rough Lot
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

  );
}

export default AddLotForm;
