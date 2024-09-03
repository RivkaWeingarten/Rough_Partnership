// import crystals from "@/crystals.json";

import AddLotForm from "@/components/AddLotForm";

async function AddLot() {

  return (
    <div>
      <section className="px-4 py-6">
        <div className="container mx-auto px-4 py-6">
          <AddLotForm />
        </div>
      </section>
    </div>
  );
}

export default AddLot;