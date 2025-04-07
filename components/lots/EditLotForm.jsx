"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateLot } from "@/app/actions/updateLot.js";
import { getLotDetails } from "@/app/actions/getLotDetails.js"; // Create this function to fetch lot details
import { useRouter } from "next/navigation";

function EditLotForm({ lotName }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    lotName: "",
    totalCts: "",
    totalStones: "",
    cost: "",
    source: "DTCA",
    origin: "Botswana",
    boxNumber: "",
    description: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchLot() {
      try {
        const lotData = await getLotDetails(lotName); // Fetch lot details
        if (lotData) {
          setFormValues(lotData);
        }
      } catch (error) {
        console.error("Failed to fetch lot details:", error);
      }
    }

    if (lotName) {
      fetchLot();
    }
  }, [lotName]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const editLot = async (event) => {
    event.preventDefault();

    try {
      const data = await updateLot(lotName, formValues);
      toast.success(`Updated Lot: ${data.lotName}`);
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white px-8 py-10 shadow-lg rounded-lg border">
          <form onSubmit={editLot}>
            <h2 className="text-3xl text-center font-semibold mb-8">
              Edit Lot {lotName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Lot Number
                </label>
                <input
                  type="text"
                  name="lotName"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.lotName || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Total Carat Weight
                </label>
                <input
                  type="number"
                  name="totalCts"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.totalCts || ""}
                  onChange={handleChange}
                  step={0.01}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Total Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.cost || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Total Number of Stones
                </label>
                <input
                  type="number"
                  name="totalStones"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.totalStones || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Source
                </label>
                <input
                  type="text"
                  name="source"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.source || "DTCA"}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.origin || "Botswana"}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Box Number
                </label>
                <input
                  type="text"
                  name="boxNumber"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.boxNumber || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.description || ""}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  className="border rounded w-full py-2 px-4"
                  value={formValues.notes || ""}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
              >
                Update Lot {lotName}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditLotForm;
