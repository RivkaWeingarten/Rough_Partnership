// import crystals from "@/crystals.json";
import getResourceNumbers from "../actions/getResourceNumbers";
import CrystalAccordion from "@/components/crystals/CrystalAccordion";

async function CrystalsPage() {
  const { resourceNumbers, error } = await getResourceNumbers();
  return (
    <div>
      <section className="px-4 py-6">
        <div className="container mx-auto px-4 py-6">
          {resourceNumbers?.length === 0 ? (
            <p>No diamonds in this lot</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {resourceNumbers?.map((resourceNumber) => (
                <CrystalAccordion
                  key={resourceNumber.id}
                  resourceNumber={resourceNumber}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CrystalsPage;
